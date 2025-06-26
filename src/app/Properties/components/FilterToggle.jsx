'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import FilterSidebar from "./FilterSidebar"

export default function FilterToggle({ filters, setFilters, onApply }) {
  const [open, setOpen] = useState(false)

  const handleApply = () => {
      onApply()
      setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 text-sm font-medium">
          <Filter size={18} />
          Filters
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] sm:w-[320px]">
        {/* ✅ Required for a11y */}
        <SheetTitle className="sr-only">Property Filters</SheetTitle>

        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          onApply={handleApply}
        />
      </SheetContent>
    </Sheet>
  )
}
