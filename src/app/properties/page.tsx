"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  Bed,
  Bath,
  TreePine,
  Home,
  Square,
  MapPin,
  ArrowUpDown,
} from "lucide-react";
import { mockProperties, cities } from "@/lib/mock-data";
import { Property, PropertyFilters } from "@/types";

// Price formatting helper
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Sort options
type SortOption = "price-high" | "price-low" | "newest" | "acreage";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "price-high", label: "Price: High to Low" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "newest", label: "Newest Listings" },
  { value: "acreage", label: "Largest Acreage" },
];

// Price range options
const priceOptions = [
  { value: "", label: "Any" },
  { value: "500000", label: "$500,000" },
  { value: "750000", label: "$750,000" },
  { value: "1000000", label: "$1,000,000" },
  { value: "1500000", label: "$1,500,000" },
  { value: "2000000", label: "$2,000,000" },
  { value: "3000000", label: "$3,000,000" },
  { value: "5000000", label: "$5,000,000" },
];

// Acreage options
const acreageOptions = [
  { value: "", label: "Any" },
  { value: "5", label: "5+ Acres" },
  { value: "10", label: "10+ Acres" },
  { value: "20", label: "20+ Acres" },
  { value: "30", label: "30+ Acres" },
  { value: "50", label: "50+ Acres" },
];

// Stall options
const stallOptions = [
  { value: "", label: "Any" },
  { value: "2", label: "2+ Stalls" },
  { value: "4", label: "4+ Stalls" },
  { value: "8", label: "8+ Stalls" },
  { value: "12", label: "12+ Stalls" },
  { value: "20", label: "20+ Stalls" },
];

// Property type options
const propertyTypeOptions = [
  { value: "", label: "All Types" },
  { value: "farm", label: "Farm" },
  { value: "estate", label: "Estate" },
  { value: "land", label: "Land" },
];

// Property Card Component
function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-cream-200"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-cream-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center">
          <Home className="h-16 w-16 text-forest-300" />
        </div>
        {/* Status Badge */}
        {property.status === "active" && (
          <div className="absolute top-4 left-4 bg-forest-700 text-cream-50 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            For Sale
          </div>
        )}
        {/* Property Type Badge */}
        <div className="absolute top-4 right-4 bg-cream-50/90 backdrop-blur-sm text-forest-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
          {property.propertyType}
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="text-2xl font-bold text-forest-900 mb-2">
          {formatPrice(property.price)}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-forest-800 mb-2 group-hover:text-saddle-600 transition-colors line-clamp-1">
          {property.title}
        </h3>

        {/* Address */}
        <div className="flex items-center gap-1.5 text-forest-600 mb-4">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">
            {property.city}, {property.state}
          </span>
        </div>

        {/* Property Details */}
        {property.propertyType !== "land" && (
          <div className="flex items-center gap-4 text-sm text-forest-600 mb-4 pb-4 border-b border-cream-200">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <TreePine className="h-4 w-4" />
              <span>{property.acreage} Acres</span>
            </div>
          </div>
        )}

        {property.propertyType === "land" && (
          <div className="flex items-center gap-4 text-sm text-forest-600 mb-4 pb-4 border-b border-cream-200">
            <div className="flex items-center gap-1.5">
              <TreePine className="h-4 w-4" />
              <span>{property.acreage} Acres</span>
            </div>
          </div>
        )}

        {/* Equestrian Badges */}
        <div className="flex flex-wrap gap-2">
          {property.equestrianAmenities.stalls > 0 && (
            <span className="inline-flex items-center gap-1 bg-saddle-50 text-saddle-700 text-xs font-medium px-2.5 py-1 rounded-full">
              <Square className="h-3 w-3" />
              {property.equestrianAmenities.stalls} Stalls
            </span>
          )}
          {property.equestrianAmenities.hasIndoorArena && (
            <span className="inline-flex items-center gap-1 bg-forest-50 text-forest-700 text-xs font-medium px-2.5 py-1 rounded-full">
              Indoor Arena
            </span>
          )}
          {property.equestrianAmenities.hasOutdoorArena && (
            <span className="inline-flex items-center gap-1 bg-forest-50 text-forest-700 text-xs font-medium px-2.5 py-1 rounded-full">
              Outdoor Arena
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function PropertiesPage() {
  // Filter state
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...mockProperties];

    // Apply filters
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.minAcreage) {
      result = result.filter((p) => p.acreage >= filters.minAcreage!);
    }
    if (filters.minStalls) {
      result = result.filter(
        (p) => p.equestrianAmenities.stalls >= filters.minStalls!
      );
    }
    if (filters.city) {
      result = result.filter((p) => p.city === filters.city);
    }
    if (filters.hasIndoorArena) {
      result = result.filter((p) => p.equestrianAmenities.hasIndoorArena);
    }
    if (filters.propertyType) {
      result = result.filter((p) => p.propertyType === filters.propertyType);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.listDate).getTime() - new Date(a.listDate).getTime()
        );
        break;
      case "acreage":
        result.sort((a, b) => b.acreage - a.acreage);
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== "" && v !== false
  );

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://storage.googleapis.com/msgsndr/OTLRU5jdjnOObaWbFyny/media/6949d47259a0a601bc7a907e.png"
            alt="Carolina Horse Farm Properties"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-forest-900/75" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream-50 mb-4">
            Browse Horse Properties
          </h1>
          <p className="text-lg md:text-xl text-cream-200 max-w-3xl mx-auto">
            Discover exceptional equestrian properties throughout the Charlotte
            Metro area. From sprawling estates to turnkey training facilities,
            find your perfect horse property.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="lg:flex lg:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-cream-200"
            >
              <span className="flex items-center gap-2 font-medium text-forest-800">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-saddle-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </span>
              {isFiltersOpen ? (
                <ChevronUp className="h-5 w-5 text-forest-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-forest-600" />
              )}
            </button>
          </div>

          {/* Filters Sidebar */}
          <aside
            className={`lg:w-80 flex-shrink-0 ${
              isFiltersOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-forest-900">
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-saddle-600 hover:text-saddle-700 font-medium flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={filters.minPrice || ""}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          minPrice: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      className="w-full px-3 py-2 bg-cream-50 border border-cream-200 rounded-md text-sm text-forest-800 focus:ring-2 focus:ring-saddle-500 focus:border-transparent"
                    >
                      <option value="">Min Price</option>
                      {priceOptions.slice(1).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filters.maxPrice || ""}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          maxPrice: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      className="w-full px-3 py-2 bg-cream-50 border border-cream-200 rounded-md text-sm text-forest-800 focus:ring-2 focus:ring-saddle-500 focus:border-transparent"
                    >
                      <option value="">Max Price</option>
                      {priceOptions.slice(1).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Acreage */}
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">
                    Minimum Acreage
                  </label>
                  <select
                    value={filters.minAcreage || ""}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        minAcreage: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-full px-3 py-2 bg-cream-50 border border-cream-200 rounded-md text-sm text-forest-800 focus:ring-2 focus:ring-saddle-500 focus:border-transparent"
                  >
                    {acreageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of Stalls */}
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">
                    Number of Stalls
                  </label>
                  <select
                    value={filters.minStalls || ""}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        minStalls: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-full px-3 py-2 bg-cream-50 border border-cream-200 rounded-md text-sm text-forest-800 focus:ring-2 focus:ring-saddle-500 focus:border-transparent"
                  >
                    {stallOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">
                    City
                  </label>
                  <select
                    value={filters.city || ""}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        city: e.target.value || undefined,
                      })
                    }
                    className="w-full px-3 py-2 bg-cream-50 border border-cream-200 rounded-md text-sm text-forest-800 focus:ring-2 focus:ring-saddle-500 focus:border-transparent"
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={filters.propertyType || ""}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        propertyType: e.target.value || undefined,
                      })
                    }
                    className="w-full px-3 py-2 bg-cream-50 border border-cream-200 rounded-md text-sm text-forest-800 focus:ring-2 focus:ring-saddle-500 focus:border-transparent"
                  >
                    {propertyTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Indoor Arena Checkbox */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasIndoorArena || false}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          hasIndoorArena: e.target.checked || undefined,
                        })
                      }
                      className="w-5 h-5 rounded border-cream-300 text-saddle-600 focus:ring-saddle-500"
                    />
                    <span className="text-sm font-medium text-forest-700">
                      Indoor Arena Required
                    </span>
                  </label>
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={clearFilters}
                  className="w-full py-2.5 px-4 bg-cream-100 hover:bg-cream-200 text-forest-700 font-medium rounded-md transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="flex-1 mt-6 lg:mt-0">
            {/* Results Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-forest-600 font-medium">
                Showing{" "}
                <span className="text-forest-900">
                  {filteredProperties.length}
                </span>{" "}
                {filteredProperties.length === 1 ? "property" : "properties"}
              </p>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-forest-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 bg-white border border-cream-200 rounded-md text-sm text-forest-800 focus:ring-2 focus:ring-saddle-500 focus:border-transparent"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Property Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-12 text-center">
                <Home className="h-16 w-16 text-cream-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-forest-900 mb-2">
                  No Properties Found
                </h3>
                <p className="text-forest-600 mb-6">
                  No properties match your current filters. Try adjusting your
                  search criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-forest-700 hover:bg-forest-600 text-cream-50 font-medium rounded-md transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
