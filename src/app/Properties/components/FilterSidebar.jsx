// src/app/Properties/components/FilterSidebar.jsx

'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function FilterSidebar({ filters, setFilters, onApply }) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleCheckboxChange = (type, value) => {
    const updated = localFilters[type]?.includes(value)
      ? localFilters[type].filter(v => v !== value)
      : [...(localFilters[type] || []), value]
    setLocalFilters({ ...localFilters, [type]: updated })
  }

  const handlePriceChange = (value) => {
    setLocalFilters({ ...localFilters, price: value })
  }

  const applyFilters = () => {
    setFilters(localFilters)
    onApply()
  }

  return (
    <aside className="w-full h-screen md:w-64 bg-white border-r p-6 space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Price Range</h4>
        <Slider
          defaultValue={[localFilters.price[0], localFilters.price[1]]}
          min={500}
          max={10000}
          step={100}
          onValueChange={handlePriceChange}
        />
        <div className="text-sm text-gray-600 mt-2">
          ${localFilters.price[0]} - ${localFilters.price[1]}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-semibold mb-2">Bedrooms</h4>
        {[1, 2, 3, 4].map((room) => (
          <label key={room} className="flex items-center gap-2 text-sm mb-1">
            <Checkbox
              checked={localFilters.bedrooms?.includes(room)}
              onCheckedChange={() => handleCheckboxChange("bedrooms", room)}
            />
            {room}+ Bedrooms
          </label>
        ))}
      </div>

      <Separator />

      <div>
        <h4 className="font-semibold mb-2">Bathrooms</h4>
        {[1, 2, 3].map((bath) => (
          <label key={bath} className="flex items-center gap-2 text-sm mb-1">
            <Checkbox
              checked={localFilters.bathrooms?.includes(bath)}
              onCheckedChange={() => handleCheckboxChange("bathrooms", bath)}
            />
            {bath}+ Bathrooms
          </label>
        ))}
      </div>

      <Button className="mt-4 w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </aside>
  )
}
