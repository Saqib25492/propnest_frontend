'use client';

import { useEffect } from 'react';
// or react-hot-toast
import { getSocket } from '@/lib/ws/socketClient';
import { toast, Toaster } from 'react-hot-toast'; // or react-hot-toast

export default function UploadToastListener() {
  useEffect(() => {
    const socket = getSocket();

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === 'media_uploaded' && data.propertyId) {
          toast.success(`Images and video updated successfully`);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };
  }, []);

  return <Toaster position="top-right" />; 
}
