// src/app/Properties/components/PropertyGrid.jsx

'use client'

import PropertyCard from './PropertyCard'

export default function PropertyGrid({ properties }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No properties match the selected filters.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property._id || property.id}
          images={property.images || []}
          title={property.title}
          rating={property.rating}
          address={property.address}
          rooms={property.rooms}
          bathrooms={property.bathrooms}
          area={property.area}
          price={property.price}
        />
      ))}
    </div>
  )
}
