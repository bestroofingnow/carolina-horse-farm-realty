"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Home,
  MapPin,
  Bed,
  Bath,
  TreeDeciduous,
  Award,
  Handshake,
  Heart,
  Phone,
  Mail,
  Star,
  ChevronRight,
} from "lucide-react";
import { mockProperties, testimonials, cities, stats } from "@/lib/mock-data";
import { Property } from "@/types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="property-card bg-white rounded-lg overflow-hidden shadow-lg border border-forest-100">
      <div className="relative h-64 bg-gradient-to-br from-forest-700 to-forest-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <Home className="w-16 h-16 text-forest-300 opacity-50" />
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-gold-600 text-charcoal-900 px-3 py-1 rounded-full text-sm font-medium">
            {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-forest-900/80 text-white px-4 py-2 rounded text-xl font-bold">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-forest-900 mb-2">{property.title}</h3>
        <div className="flex items-center text-forest-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.city}, {property.state}</span>
        </div>
        <div className="flex items-center gap-4 text-forest-700 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center gap-1">
            <TreeDeciduous className="w-4 h-4" />
            <span>{property.acreage} acres</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {property.equestrianAmenities.stalls > 0 && (
            <span className="bg-forest-100 text-forest-700 px-3 py-1 rounded-full text-xs font-medium">
              {property.equestrianAmenities.stalls} Stalls
            </span>
          )}
          {property.equestrianAmenities.hasIndoorArena && (
            <span className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-xs font-medium">
              Indoor Arena
            </span>
          )}
          {property.equestrianAmenities.hasOutdoorArena && (
            <span className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-xs font-medium">
              Outdoor Arena
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ValuePropCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-8 bg-white rounded-xl shadow-md border border-forest-100 hover:shadow-lg transition-shadow">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-100 text-forest-700 mb-6">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-forest-900 mb-3">{title}</h3>
      <p className="text-forest-600 leading-relaxed">{description}</p>
    </div>
  );
}

function TestimonialCard({
  name,
  location,
  quote,
  propertyType,
  rating,
}: {
  name: string;
  location: string;
  quote: string;
  propertyType: string;
  rating: number;
}) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-forest-100">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
        ))}
      </div>
      <blockquote className="text-forest-700 leading-relaxed mb-6 italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="border-t border-forest-100 pt-4">
        <p className="font-bold text-forest-900">{name}</p>
        <p className="text-sm text-forest-600">{location}</p>
        <p className="text-xs text-gold-700 mt-1">{propertyType}</p>
      </div>
    </div>
  );
}

const fallbackProperties: Property[] = [
  {
    id: "1",
    mlsNumber: "MLS-001",
    title: "Stunning Equestrian Estate",
    address: "1234 Rolling Hills Road",
    city: "Waxhaw",
    state: "NC",
    zipCode: "28173",
    price: 1850000,
    acreage: 25,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4500,
    yearBuilt: 2018,
    description: "Magnificent equestrian estate.",
    images: [],
    features: [],
    equestrianAmenities: {
      stalls: 12,
      hasIndoorArena: true,
      hasOutdoorArena: true,
      pastures: 6,
      pastureAcreage: 18,
      hasTackRoom: true,
      hasFeedRoom: true,
      hasWashRack: true,
      hasRoundPen: true,
      fencingType: [],
      waterSource: [],
      additionalStructures: [],
    },
    listingAgent: { id: "1", name: "Lara Murphy", title: "Broker", phone: "", email: "", photo: "", bio: "", specialties: [], licenseNumber: "" },
    status: "active",
    listDate: "2024-01-15",
    propertyType: "estate",
  },
  {
    id: "2",
    mlsNumber: "MLS-002",
    title: "Premier Horse Farm",
    address: "567 Bridle Path Lane",
    city: "Mooresville",
    state: "NC",
    zipCode: "28117",
    price: 2495000,
    acreage: 42,
    bedrooms: 6,
    bathrooms: 5,
    squareFeet: 5800,
    yearBuilt: 2015,
    description: "Exceptional horse farm.",
    images: [],
    features: [],
    equestrianAmenities: {
      stalls: 20,
      hasIndoorArena: true,
      hasOutdoorArena: true,
      pastures: 10,
      pastureAcreage: 32,
      hasTackRoom: true,
      hasFeedRoom: true,
      hasWashRack: true,
      hasRoundPen: true,
      fencingType: [],
      waterSource: [],
      additionalStructures: [],
    },
    listingAgent: { id: "1", name: "Lara Murphy", title: "Broker", phone: "", email: "", photo: "", bio: "", specialties: [], licenseNumber: "" },
    status: "active",
    listDate: "2024-02-01",
    propertyType: "farm",
  },
  {
    id: "3",
    mlsNumber: "MLS-003",
    title: "Charming Country Estate",
    address: "890 Meadow View Drive",
    city: "Charlotte",
    state: "NC",
    zipCode: "28277",
    price: 975000,
    acreage: 12,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    yearBuilt: 2010,
    description: "Beautiful country estate.",
    images: [],
    features: [],
    equestrianAmenities: {
      stalls: 6,
      hasIndoorArena: false,
      hasOutdoorArena: true,
      pastures: 4,
      pastureAcreage: 8,
      hasTackRoom: true,
      hasFeedRoom: true,
      hasWashRack: true,
      hasRoundPen: false,
      fencingType: [],
      waterSource: [],
      additionalStructures: [],
    },
    listingAgent: { id: "1", name: "Lara Murphy", title: "Broker", phone: "", email: "", photo: "", bio: "", specialties: [], licenseNumber: "" },
    status: "active",
    listDate: "2024-02-10",
    propertyType: "estate",
  },
];

const fallbackTestimonials = [
  {
    id: "1",
    name: "Sarah and Michael Thompson",
    location: "Waxhaw, NC",
    quote: "Carolina Horse Farm Realty made our dream of owning a horse property a reality. Their expertise in equestrian properties was invaluable.",
    propertyType: "Equestrian Estate",
    rating: 5,
  },
  {
    id: "2",
    name: "Jennifer Davis",
    location: "Mooresville, NC",
    quote: "As a first-time horse property buyer, I had so many questions. The team guided me through every step with patience and professionalism.",
    propertyType: "Horse Farm",
    rating: 5,
  },
  {
    id: "3",
    name: "Robert and Elizabeth Chen",
    location: "Charlotte, NC",
    quote: "Their knowledge of equestrian facilities, local zoning, and the Charlotte horse community is unmatched. Highly recommend!",
    propertyType: "Training Facility",
    rating: 5,
  },
];

const fallbackCities = [
  "Charlotte", "Waxhaw", "Mooresville", "Huntersville", "Tryon",
  "Cornelius", "Davidson", "Matthews", "Mint Hill", "Pineville", "Fort Mill"
];

const fallbackStats = [
  { label: "Properties Sold", value: "150+" },
  { label: "Happy Clients", value: "200+" },
  { label: "Years Experience", value: "15+" },
  { label: "Cities Served", value: "11" },
];

const valueProps = [
  {
    icon: Award,
    title: "Expert Equestrian Knowledge",
    description: "Our team understands the unique requirements of horse properties, from barn layouts to pasture management and riding facilities.",
  },
  {
    icon: MapPin,
    title: "Local Market Expertise",
    description: "Deep knowledge of the Charlotte Metro area equestrian communities, zoning regulations, and property values.",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "We take the time to understand your specific equestrian needs and match you with properties that fit your lifestyle.",
  },
  {
    icon: Handshake,
    title: "Trusted Partnership",
    description: "Building lasting relationships with our clients through honest communication and dedicated support throughout your journey.",
  },
];

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState("");

  const featuredProperties = mockProperties.slice(0, 6);
  const displayProperties = featuredProperties.length > 0 ? featuredProperties : fallbackProperties;
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const displayCities = cities.length > 0 ? cities : fallbackCities;
  const displayStats = stats.length > 1 ? stats : fallbackStats;

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://blog.carolinahorsefarmrealty.com/wp-content/uploads/2025/12/Carolina-Horse-Farm-Realty-scaled.png"
            alt="Carolina Horse Farm Realty - Equestrian Properties"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={75}
          />
        </div>
        <div className="hero-gradient absolute inset-0" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect<br />
              <span className="text-gold-400">Horse Farm Property</span>
            </h1>
            <p className="text-xl sm:text-2xl text-cream-100 mb-10 max-w-2xl leading-relaxed">
              Specializing in farm houses, equestrian properties, and homes with land in the Charlotte Metro area
            </p>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-2xl max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <label htmlFor="city" className="block text-sm font-medium text-forest-700 mb-2">
                    Select City
                  </label>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="select-field w-full"
                  >
                    <option value="">All Cities</option>
                    {displayCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Link
                    href={selectedCity ? `/properties?city=${selectedCity}` : "/properties"}
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8"
                  >
                    <Search className="w-5 h-5" />
                    Quick Search
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/properties"
                className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                <Home className="w-5 h-5" />
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-forest-900 flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-forest-800 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {displayStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-cream-100 mb-2">
                  {stat.value}
                </div>
                <div className="text-forest-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-forest-600 max-w-2xl mx-auto">
              Discover exceptional equestrian properties handpicked for discerning buyers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProperties.map((property) => (
              <Link key={property.id} href={`/properties/${property.id}`}>
                <PropertyCard property={property} />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              View All Properties
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 bg-forest-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-4">
              Why Choose Carolina Horse Farm Realty
            </h2>
            <p className="text-lg text-forest-600 max-w-2xl mx-auto">
              Your trusted partner in finding the perfect equestrian property
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <ValuePropCard key={index} {...prop} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-cream-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-forest-600 max-w-2xl mx-auto">
              Hear from horse enthusiasts who found their dream properties with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                location={testimonial.location}
                quote={testimonial.quote}
                propertyType={testimonial.propertyType}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-forest-800 to-forest-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Horse Property?
          </h2>
          <p className="text-xl text-cream-200 mb-10 max-w-2xl mx-auto">
            Let us help you discover the perfect equestrian estate. Contact us today for a personalized consultation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="btn-secondary flex items-center gap-2 text-lg px-10 py-4"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </Link>
            <a
              href="tel:+17045550123"
              className="flex items-center gap-3 text-cream-100 hover:text-white transition-colors text-lg"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <span className="font-medium">(704) 555-0123</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
