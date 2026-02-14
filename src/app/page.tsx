"use client";

import { useState } from "react";
import Link from "next/link";
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
    mlsNumber: "4284811",
    title: "Working Equestrian Farm in Valley Farm Community",
    address: "4107 Cahnnas Way",
    city: "Waxhaw",
    state: "NC",
    zipCode: "28173",
    price: 925000,
    acreage: 10,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2447,
    yearBuilt: 2000,
    description: "Turnkey equestrian farm on 10 acres with 9-stall barn and lighted arena.",
    images: [],
    features: [],
    equestrianAmenities: {
      stalls: 9,
      hasIndoorArena: false,
      hasOutdoorArena: true,
      pastures: 4,
      pastureAcreage: 7,
      hasTackRoom: true,
      hasFeedRoom: true,
      hasWashRack: true,
      hasRoundPen: true,
      fencingType: ["Board", "Wire"],
      waterSource: ["Well"],
      additionalStructures: ["Equipment Shed", "Run-in Shed"],
    },
    listingAgent: { id: "1", name: "Lara Murphy", title: "Broker", phone: "(704) 929-3289", email: "lara@carolinahorsefarmrealty.com", photo: "", bio: "", specialties: [], licenseNumber: "" },
    status: "active",
    listDate: "2025-09-15",
    propertyType: "farm",
  },
  {
    id: "4",
    mlsNumber: "THC-001",
    title: "Lukas Farm - Premier Equestrian Facility",
    address: "Lambs Grill Road",
    city: "Rutherfordton",
    state: "NC",
    zipCode: "28139",
    price: 2600000,
    acreage: 37.59,
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 2900,
    yearBuilt: 1994,
    description: "Premier equestrian property featuring 28 custom stalls and covered arena.",
    images: [],
    features: [],
    equestrianAmenities: {
      stalls: 28,
      hasIndoorArena: true,
      hasOutdoorArena: true,
      pastures: 6,
      pastureAcreage: 20,
      hasTackRoom: true,
      hasFeedRoom: true,
      hasWashRack: true,
      hasRoundPen: true,
      fencingType: ["Board", "Electric"],
      waterSource: ["Well", "Creek"],
      additionalStructures: ["Stallion Barn", "Workshop"],
    },
    listingAgent: { id: "1", name: "Lara Murphy", title: "Broker", phone: "(704) 929-3289", email: "lara@carolinahorsefarmrealty.com", photo: "", bio: "", specialties: [], licenseNumber: "" },
    status: "active",
    listDate: "2025-07-01",
    propertyType: "estate",
  },
  {
    id: "6",
    mlsNumber: "THC-003",
    title: "Hidden Hollow Farm",
    address: "Peniel Road",
    city: "Columbus",
    state: "NC",
    zipCode: "28722",
    price: 4995000,
    acreage: 92,
    bedrooms: 4,
    bathrooms: 6,
    squareFeet: 4917,
    yearBuilt: 2015,
    description: "92-acre mountain paradise with private waterfall and Blue Ridge views.",
    images: [],
    features: [],
    equestrianAmenities: {
      stalls: 6,
      hasIndoorArena: false,
      hasOutdoorArena: true,
      pastures: 4,
      pastureAcreage: 30,
      hasTackRoom: true,
      hasFeedRoom: true,
      hasWashRack: true,
      hasRoundPen: false,
      fencingType: ["Board", "Vinyl"],
      waterSource: ["Well", "Spring"],
      additionalStructures: ["2BR Apartment", "Riders Lounge"],
    },
    listingAgent: { id: "1", name: "Lara Murphy", title: "Broker", phone: "(704) 929-3289", email: "lara@carolinahorsefarmrealty.com", photo: "", bio: "", specialties: [], licenseNumber: "" },
    status: "active",
    listDate: "2025-04-20",
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
  "Charlotte", "Columbus", "Forest City", "Matthews", "Mill Spring",
  "Mooresville", "Rutherfordton", "Tryon", "Waxhaw"
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
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/hero-poster.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
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
              href="tel:+17049293289"
              className="flex items-center gap-3 text-cream-100 hover:text-white transition-colors text-lg"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <span className="font-medium">(704) 929-3289</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
