'use client';

import { useState } from 'react';
import { Heart, MapPin, Bath, BedDouble, Ruler } from 'lucide-react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function PropertyCard({ images, title, rating, address, rooms, bathrooms, area, price }) {
  const [liked, setLiked] = useState(false);

  return (
    
    <div className="bg-white text-black rounded-2xl shadow-md overflow-hidden w-full max-w-sm border border-gray-200">
      {/* Image Carousel */}
      <div className="relative">
        <Swiper spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }} modules={[Pagination]}>
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Property ${index + 1}`}
                className="w-full h-48 object-cover p-1 rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Heart Icon */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 z-10 bg-white p-1.5 rounded-full shadow-md"
        >
          <Heart
            size={20}
            className={liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title and Rating */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-gray-600">{rating} ★</span>
        </div>

        {/* Address */}
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-1" />
          {address}
        </div>

        {/* Rooms, Baths, Area */}
        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <div className="flex items-center gap-1">
            <BedDouble size={16} /> {rooms} Rooms
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} /> {bathrooms} Baths
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={16} /> {area} sqft
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-bold">${price}</span>
          <button className="px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer  transition">
            Reserve
          </button>
        </div>
      </div>
    </div>

   
  );
}
