import * as yup from "yup";
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

export const propertySchema = yup.object().shape({

     
  title: yup.string().required("Title is required"),
  rating: yup
    .number()
    .min(0, "Rating cannot be below 0")
    .max(5, "Rating cannot exceed 5")
    .default(4),

  address: yup.string().required("Address is required"),
  rooms: yup.number().min(1).required("Rooms required"),
  bathrooms: yup.number().min(1).required("Bathrooms required"),
  area: yup.number().min(100).required("Area required"),
  price: yup.number().min(500).required("Price required"),
  images: yup
    .mixed()
    .test(
      "required",
      "At least one image is required",
      (value) => value && value.length > 0
    )
    .test(
      "maxCount",
      "You can upload up to 5 images only",
      (value) => value && value.length <= 5
    ),

  video: yup
    .mixed()
    .nullable()
    .test("fileSize", "Video must be less than 100MB", (value) => {
      if (!value) return true; // allow empty video
      return value.size <= MAX_VIDEO_SIZE;
    })
    .test("fileType", "Only MP4 or MOV files allowed", (value) => {
      if (!value) return true;
      return ["video/mp4", "video/quicktime"].includes(value.type);
    }),
});
