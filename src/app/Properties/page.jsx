// src/app/Properties/page.jsx

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FilterToggle from "./components/FilterToggle";
import FilterSidebar from "./components/FilterSidebar";
import PropertyGrid from "./components/PropertyGrid";
import { Loader2 } from "lucide-react";

export default function PropertiesPage() {
  const [loading, setLoading] = useState(true);
  const defaultFilters = {
    price: [500, 10000], // min/max range for slider
    // you can add more defaults here later like type, location, etc.
  };

  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProperties = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://propnest-fnhzaaakhudzcfd6.uaenorth-01.azurewebsites.net/api/properties?page=${pageNum}&limit=12`
      );
      setProperties((prev) => [...prev, ...res.data.data]);
      setHasMore(pageNum < res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    const handleScroll = () => {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
        if (nearBottom && !loading && hasMore) {
        setPage(prev => prev + 1);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

  useEffect(() => {
    fetchProperties(page);
  }, [page]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 shrink-0">
        <FilterSidebar
          filters={defaultFilters}
          setFilters={() => {}}
          onApply={() => {}}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Toggle button for mobile */}
        <div className="md:hidden mb-4">
          <FilterToggle filters={defaultFilters} onChange={() => {}} />
        </div>

        <PropertyGrid properties={properties} />
        {loading && (
          <div className="flex justify-center items-center h-20">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          </div>
        )}
        {!hasMore && (
          <p className="text-center text-sm text-gray-400">
            No more properties
          </p>
        )}
      </main>
    </div>
  );
}
