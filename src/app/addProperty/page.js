'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { propertySchema } from '@/lib/validation/propertySchema'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function UploadPropertyPage() {
  const [useVideoUpload, setUseVideoUpload] = useState(false)
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(propertySchema),
  })

  const onSubmit = async (data) => {
    const formData = new FormData()

    // Append form fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        Array.from(value).forEach((file) => {
          formData.append('images', file)
        })
      } else if (key === 'video' && value instanceof File) {
        formData.append('video', value)
      } else {
        formData.append(key, value)
      }
    })

    try {
      const res = await axios.post('https://propnest-fnhzaaakhudzcfd6.uaenorth-01.azurewebsites.net/api/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log('Upload success:', res.data)
      reset() // optional: reset form after success
      alert('Property uploaded successfully!')
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Upload failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6 py-10 px-4">
      {/* Property Basics */}
      <Card>
        <CardHeader>
          <CardTitle>Property Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Property Title" {...register('title')} />
          <p className="text-sm text-red-500">{errors.title?.message}</p>

          <Textarea placeholder="Address" {...register('address')} />
          <p className="text-sm text-red-500">{errors.address?.message}</p>

          <Input type="number" placeholder="Area (sqft)" {...register('area')} />
          <p className="text-sm text-red-500">{errors.area?.message}</p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Property Features</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Input type="number" min={1} placeholder="Rooms" {...register('rooms')} />
          <Input type="number" min={1} placeholder="Bathrooms" {...register('bathrooms')} />
          <Input type="number" placeholder="Price" {...register('price')} />
        </CardContent>
      </Card>

      {/* Media */}
      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Upload Images (max 5)</Label>
            <Input type="file" multiple accept="image/*" {...register('images')} />
            <p className="text-sm text-red-500">{errors.images?.message}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={useVideoUpload} onCheckedChange={setUseVideoUpload} />
            <Label>{useVideoUpload ? 'Upload Video File' : 'Use Video URL'}</Label>
          </div>

          {useVideoUpload ? (
            <div>
              <Label>Video File (max 100MB)</Label>
              <Input
                type="file"
                accept="video/mp4,video/quicktime"
                onChange={(e) => setValue('video', e.target.files[0])}
              />
              <p className="text-sm text-red-500">{errors.video?.message}</p>
            </div>
          ) : (
            <div>
              <Label>Video URL</Label>
              <Input placeholder="https://..." {...register('video')} />
              <p className="text-sm text-red-500">{errors.video?.message}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" className="px-8">
          Upload Property
        </Button>
      </div>
    </form>
  )
}
