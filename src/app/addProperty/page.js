"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { propertySchema } from "@/lib/validation/propertySchema";
import { uploadPropertyMedia } from "@/lib/utils/uploadPropertyMedia";
import { toast, Toaster } from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, Loader2, Upload, X } from "lucide-react";

export default function UploadPropertyPage() {
  const [useVideoUpload, setUseVideoUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle')
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(propertySchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setUploadProgress(0);

    try {
      // STEP 1: Submit property text info
      const propertyData = { ...data };
      delete propertyData.images;
      delete propertyData.video;

      const textRes = await axios.post(
        "http://localhost:5000/api/properties",
        propertyData
      );
      const propertyId = textRes.data.propertyId;


      setUploadStatus('uploading')
      // STEP 2: Upload media if any
      if (data.images?.length || data.video) {
        await uploadPropertyMedia(
          propertyId,
          data.images,
          data.video,
          (percent) => {
            setUploadProgress(percent);
          }
        );
      }
      setIsSent(true);
      reset();
      setUploadStatus('success')
      setSelectedImages([]);
      setImagePreviews([]);
      setSelectedVideoFile(null);
      toast.success(
        "Property uploaded successfully and media processing started!"
      );
    } catch (err) {
      setUploadStatus('error')
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) {
      toast.error("Please select maximum 5 images");
      return;
    }

    setSelectedImages(files);
    setValue("images", files);

    // Creating previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 5) {
      toast.error("Please select a maximum of 5 images");
      return;
    }
    setSelectedImages(files);
    setValue("images", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    URL.revokeObjectURL(imagePreviews[index]);

    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
    setValue("images", newImages);
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideoFile(file);
      setValue("video", file);
    } else {
      setSelectedVideoFile(null);
      setValue("video", undefined);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto space-y-6 py-10 px-4"
    >
      <Toaster position="top-right" reverseOrder={false} />
      {/* Property Basics */}
      <Card>
        <CardHeader>
          <CardTitle>Property Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Property Title" {...register("title")} />
          <p className="text-sm text-red-500">{errors.title?.message}</p>

          <Textarea placeholder="Address" {...register("address")} />
          <p className="text-sm text-red-500">{errors.address?.message}</p>

          <Input
            type="number"
            placeholder="Area (sqft)"
            {...register("area")}
          />
          <p className="text-sm text-red-500">{errors.area?.message}</p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Property Features</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Input
            type="number"
            min={1}
            placeholder="Rooms"
            {...register("rooms")}
          />
          <Input
            type="number"
            min={1}
            placeholder="Bathrooms"
            {...register("bathrooms")}
          />
          <Input type="number" placeholder="Price" {...register("price")} />
        </CardContent>
      </Card>

      {/* Media */}
      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Property Images (max 5)</Label>
            <div
              className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Upload Property Images
                </p>
                <p className="text-gray-600 mb-4">
                  Drag and drop images here, or click to select files
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  // {...register('images')}
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  Select Images
                </Button>
              </div>
            </div>
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">
                  Selected Images ({imagePreviews.length}/5)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.images && (
              <p className="text-sm text-red-500 mt-2">
                {errors.images?.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={useVideoUpload}
              onCheckedChange={setUseVideoUpload}
            />
            <Label>
              {useVideoUpload ? "Upload Video File" : "Use Video URL"}
            </Label>
          </div>

          {useVideoUpload ? (
            <div>
              <Label htmlFor="video-file">Video File (max 100MB)</Label>
              <div className="mt-1">
                <div className="relative">
                  <Input
                    id="video-file"
                    type="file"
                    accept="video/mp4,video/quicktime"
                    onChange={handleVideoFileChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="video-file"
                    className="flex h-10 w-full cursor-pointer items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {selectedVideoFile ? (
                      <span className="text-foreground">
                        {selectedVideoFile.name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Choose video file...
                      </span>
                    )}
                  </label>
                </div>
              </div>
              {selectedVideoFile && (
                <p className="text-sm text-gray-600 mt-1">
                  Size: {(selectedVideoFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
              {errors.video && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.video.message}
                </p>
              )}
            </div>
          ) : (
            <div>
              <Label htmlFor="video-url">Video URL</Label>
              <Input
                id="video-url"
                placeholder="https://..."
                {...register("video")}
              />
              <p className="text-sm text-red-500">{errors.video?.message}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {uploadStatus === 'uploading' && (
        <div className="mt-4">
          <div className="text-sm text-gray-700 mb-1">
            Uploading video: <span className="font-medium">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {uploadStatus === 'success' && (
        <div className="mt-2 flex items-center text-green-600 text-sm font-medium">
          <CheckCircle className="h-4 w-4 mr-1" />
          Video uploaded successfully!
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="mt-2 text-red-600 text-sm font-medium">
          ❌ Failed to upload video. Please try again.
        </div>
      )}


      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="px-8 py-2 bg-black "
          disabled={isLoading || isSent}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading Property...
            </>
          ) : isSent ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Submitted
            </>
          ) : (
            "Upload Property"
          )}
        </Button>
      </div>
    </form>
  );
}
