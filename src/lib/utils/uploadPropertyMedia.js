import axios from 'axios';

export async function uploadPropertyMedia(propertyId, images, video, onProgress) {
  const formData = new FormData();
  formData.append('propertyId', propertyId);

  if (images && images.length > 0) {
    images.forEach((img) => formData.append('images', img));
  }

  if (video) {
    formData.append('video', video);
  }

  const res = await axios.post(
    'http://localhost:5000/api/upload/media',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total)
        if (onProgress) onProgress(percent)
      },
    }
  );

  return res.data;
}
