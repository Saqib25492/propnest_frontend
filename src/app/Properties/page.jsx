"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FilterToggle from "./components/FilterToggle";
import FilterSidebar from "./components/FilterSidebar";
import PropertyGrid from "./components/PropertyGrid";
import { Loader2 } from "lucide-react";

export default function PropertiesPage() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    price: [500, 10000],
    minBedrooms: null,
    minBathrooms: null,
  });

  const fetchProperties = async (pageNum = 1, customFilters = filters) => {
    try {
      setLoading(true);

      const res = await axios.get(`propnest-fnhzaaakhudzcfd6.uaenorth-01.azurewebsites.net/api/properties`, {
        params: {
          page: pageNum,
          limit: 12,
          minPrice: customFilters.price[0],
          maxPrice: customFilters.price[1],
          minBedrooms: customFilters.minBedrooms,
          minBathrooms: customFilters.minBathrooms,
        },
      });

      if (pageNum === 1) {
        setProperties(res.data.data); // reset
      } else {
        setProperties((prev) => [...prev, ...res.data.data]); // append
      }

      setHasMore(pageNum < res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle scroll-based pagination
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (nearBottom && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Fetch when page changes (except page 1)
  useEffect(() => {
    if (page > 1) fetchProperties(page);
  }, [page]);

  // Refetch from page 1 when filters change
  useEffect(() => {
    setPage(1);
    fetchProperties(1, filters);
  }, [filters]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:block w-64 shrink-0">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          onApply={() => {
            setPage(1);
            fetchProperties(1);
          }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="md:hidden mb-4">
          <FilterToggle
            filters={filters}
            setFilters={setFilters}
            onApply={() => {
              setPage(1);
              fetchProperties(1);
            }}
          />
        </div>

        <PropertyGrid properties={properties} />

        {loading && (
          <div className="flex justify-center items-center h-20">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          </div>
        )}
        {!hasMore && !loading && (
          <p className="text-center text-sm text-gray-400">
            No more properties
          </p>
        )}
      </main>
    </div>
  );
}
