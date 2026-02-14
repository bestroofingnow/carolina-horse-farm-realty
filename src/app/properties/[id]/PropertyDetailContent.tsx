"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Bed,
  Bath,
  Ruler,
  Trees,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  Fence,
  Droplets,
  Building2,
  CircleDot,
  Square,
  Warehouse,
} from "lucide-react";
import { Property, Agent, EquestrianAmenities } from "@/types";
import { mockProperties, mockAgent } from "@/lib/mock-data";

// Helper function to format price
function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Helper function to format number with commas
function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

// Status badge component
function StatusBadge({ status }: { status: Property["status"] }) {
  const statusStyles = {
    active: "bg-forest-600 text-white",
    pending: "bg-gold-500 text-white",
    sold: "bg-saddle-700 text-white",
  };

  const statusLabels = {
    active: "Active",
    pending: "Pending",
    sold: "Sold",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

// Photo Gallery Component
function PhotoGallery({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/10] bg-forest-100 rounded-xl overflow-hidden group">
        {images[currentIndex] ? (
          <Image
            src={images[currentIndex]}
            alt={`${title} - Photo ${currentIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
            priority={currentIndex === 0}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-forest-400">
              <Home className="w-16 h-16 mx-auto mb-2" />
              <p className="text-sm">Property Image</p>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-forest-800" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-forest-800" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 rounded-full text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden bg-forest-100 transition-all ${
              index === currentIndex
                ? "ring-2 ring-forest-600 ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            {image ? (
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Home className="w-6 h-6 text-forest-300" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Quick Stats Component
function QuickStats({ property }: { property: Property }) {
  const stats = [
    { icon: Bed, label: "Beds", value: property.bedrooms },
    { icon: Bath, label: "Baths", value: property.bathrooms },
    { icon: Ruler, label: "Sq Ft", value: formatNumber(property.squareFeet) },
    { icon: Trees, label: "Acres", value: property.acreage },
    { icon: Calendar, label: "Built", value: property.yearBuilt },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 p-6 bg-forest-50 rounded-xl border border-forest-100">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <stat.icon className="w-6 h-6 mx-auto mb-2 text-forest-600" />
          <p className="text-2xl font-bold text-forest-900">{stat.value}</p>
          <p className="text-sm text-forest-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

// Home Features Component
function HomeFeatures({ features }: { features: string[] }) {
  return (
    <div className="bg-white rounded-xl border border-forest-100 p-6">
      <h2 className="text-2xl font-bold text-forest-900 mb-6">Home Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-forest-100 flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-forest-600" />
            </div>
            <span className="text-forest-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Equestrian Amenities Component
function EquestrianAmenitiesSection({ amenities }: { amenities: EquestrianAmenities }) {
  const amenityItems = [
    { icon: Home, label: "Stalls", value: amenities.stalls.toString() },
    { icon: Building2, label: "Indoor Arena", value: amenities.hasIndoorArena ? "Yes" : "No" },
    { icon: Square, label: "Outdoor Arena", value: amenities.hasOutdoorArena ? "Yes" : "No" },
    { icon: Trees, label: "Pastures", value: amenities.pastures.toString() },
    { icon: Trees, label: "Pasture Acreage", value: `${amenities.pastureAcreage} acres` },
    { icon: Home, label: "Tack Room", value: amenities.hasTackRoom ? "Yes" : "No" },
    { icon: Warehouse, label: "Feed Room", value: amenities.hasFeedRoom ? "Yes" : "No" },
    { icon: Droplets, label: "Wash Rack", value: amenities.hasWashRack ? "Yes" : "No" },
    { icon: CircleDot, label: "Round Pen", value: amenities.hasRoundPen ? "Yes" : "No" },
    { icon: Fence, label: "Fencing", value: amenities.fencingType.join(", ") },
    { icon: Droplets, label: "Water Source", value: amenities.waterSource.join(", ") },
    { icon: Ruler, label: "Barn Sq Ft", value: amenities.barnSquareFeet ? formatNumber(amenities.barnSquareFeet) : "N/A" },
  ];

  return (
    <div className="bg-gradient-to-br from-saddle-50 to-cream-50 rounded-xl border-2 border-saddle-200 p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-saddle-600 flex items-center justify-center">
          <Home className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-saddle-900">Equestrian Features</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenityItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-saddle-100">
            <div className="flex items-center gap-2 mb-2">
              <item.icon className="w-5 h-5 text-saddle-600" />
              <span className="text-sm font-medium text-saddle-700">{item.label}</span>
            </div>
            <p className="text-lg font-bold text-forest-900">{item.value}</p>
          </div>
        ))}
      </div>

      {amenities.additionalStructures.length > 0 && (
        <div className="mt-6 pt-6 border-t border-saddle-200">
          <h3 className="text-lg font-semibold text-saddle-800 mb-4">Additional Structures</h3>
          <div className="flex flex-wrap gap-2">
            {amenities.additionalStructures.map((structure, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-saddle-700 border border-saddle-200"
              >
                {structure}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Contact Form Component
function ContactForm({ property }: { property: Property }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I am interested in learning more about ${property.title} (${property.mlsNumber}).`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Go High Level webhook
      const webhookData = {
        // Form source
        formName: "Property Inquiry Form",
        formSource: "Carolina Horse Farm Realty Website",
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",

        // Contact information
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,

        // Property information
        propertyTitle: property.title,
        propertyMLS: property.mlsNumber,
        propertyPrice: property.price,
        propertyAddress: `${property.address}, ${property.city}, ${property.state} ${property.zipCode}`,
        propertyType: property.propertyType,
        propertyAcreage: property.acreage,
        propertyId: property.id,
      };

      const response = await fetch(
        "https://services.leadconnectorhq.com/hooks/OTLRU5jdjnOObaWbFyny/webhook-trigger/05419169-3e67-4ec5-8d8f-17c2a7358945",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        }
      );

      if (!response.ok) {
        throw new Error("Webhook submission failed");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      // Still show success to user but log error
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl border border-forest-100 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-forest-600" />
        </div>
        <h3 className="text-xl font-bold text-forest-900 mb-2">Thank You!</h3>
        <p className="text-forest-600">
          Your inquiry has been sent. We will be in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-forest-100 p-8">
      <h2 className="text-2xl font-bold text-forest-900 mb-2">Interested in this property?</h2>
      <p className="text-forest-600 mb-6">
        Fill out the form below and we will get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-forest-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-forest-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-forest-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="(704) 929-3289"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-forest-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="input-field resize-none"
            placeholder="Tell us about your needs..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </div>
  );
}

// Agent Card Component
function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="bg-white rounded-xl border border-forest-100 p-6">
      <h3 className="text-lg font-bold text-forest-900 mb-4">Listing Agent</h3>

      <div className="flex items-start gap-4">
        {/* Agent Photo Placeholder */}
        <div className="flex-shrink-0 w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-forest-400">
            {agent.name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>

        <div className="flex-grow">
          <h4 className="text-lg font-bold text-forest-900">{agent.name}</h4>
          <p className="text-saddle-600 font-medium">{agent.title}</p>

          <div className="mt-3 space-y-2">
            <a
              href={`tel:${agent.phone}`}
              className="flex items-center gap-2 text-forest-700 hover:text-forest-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{agent.phone}</span>
            </a>
            <a
              href={`mailto:${agent.email}`}
              className="flex items-center gap-2 text-forest-700 hover:text-forest-900 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">{agent.email}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-forest-100">
        <div className="flex flex-wrap gap-2">
          {agent.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-forest-50 rounded-full text-xs font-medium text-forest-700"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Property Detail Page Component
export default function PropertyDetailContent() {
  const params = useParams();
  const id = params.id as string;

  // Find property by ID
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-forest-900 mb-4">Property Not Found</h1>
          <p className="text-forest-600 mb-6">
            The property you are looking for does not exist or has been removed.
          </p>
          <Link href="/properties" className="btn-primary">
            View All Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-forest-600 hover:text-forest-900 transition-colors">
              Home
            </Link>
            <span className="text-forest-300">/</span>
            <Link href="/properties" className="text-forest-600 hover:text-forest-900 transition-colors">
              Properties
            </Link>
            <span className="text-forest-300">/</span>
            <span className="text-forest-900 font-medium truncate">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery */}
            <PhotoGallery images={property.images} title={property.title} />

            {/* Property Header */}
            <div className="bg-white rounded-xl border border-forest-100 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <StatusBadge status={property.status} />
                    <span className="text-sm text-forest-500">MLS# {property.mlsNumber}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-forest-900 mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-forest-600">
                    <MapPin className="w-5 h-5" />
                    <span>
                      {property.address}, {property.city}, {property.state} {property.zipCode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-forest-900">{formatPrice(property.price)}</p>
                  <p className="text-forest-600">Listed {new Date(property.listDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <QuickStats property={property} />

            {/* Property Description */}
            <div className="bg-white rounded-xl border border-forest-100 p-6">
              <h2 className="text-2xl font-bold text-forest-900 mb-4">Property Description</h2>
              <p className="text-forest-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Home Features */}
            <HomeFeatures features={property.features} />

            {/* Equestrian Amenities */}
            <EquestrianAmenitiesSection amenities={property.equestrianAmenities} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <ContactForm property={property} />

            {/* Agent Card */}
            <AgentCard agent={property.listingAgent} />

            {/* Back to Properties Link */}
            <Link
              href="/properties"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-forest-200 rounded-xl text-forest-700 font-medium hover:border-forest-400 hover:bg-forest-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              View All Properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
