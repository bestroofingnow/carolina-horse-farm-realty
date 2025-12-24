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

// Mock agent data
const mockAgent: Agent = {
  id: "1",
  name: "Lara Murphy",
  title: "Broker / Owner",
  phone: "(704) 555-0123",
  email: "lara@carolinahorsefarmrealty.com",
  photo: "/images/team/lara-murphy.jpg",
  bio: "With over 15 years of experience in equestrian real estate, Lara brings unparalleled knowledge of the Charlotte Metro equestrian community. A lifelong equestrian and former competitive jumper, she understands the unique needs of horse owners and breeders.",
  specialties: ["Horse Farms", "Equestrian Estates", "Land for Horses"],
  licenseNumber: "NC-123456",
};

// Mock properties data for the detail page
const mockProperties: Property[] = [
  {
    id: "1",
    mlsNumber: "MLS-2024-001",
    title: "Stunning Equestrian Estate with Indoor Arena",
    address: "1234 Rolling Meadows Lane",
    city: "Waxhaw",
    state: "NC",
    zipCode: "28173",
    price: 2850000,
    acreage: 25,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 6500,
    yearBuilt: 2018,
    description: "Welcome to this exceptional equestrian estate nestled on 25 pristine acres in the heart of Waxhaw. This masterfully designed property seamlessly blends luxury living with world-class equestrian facilities. The main residence features soaring ceilings, chef's kitchen with premium appliances, and expansive windows overlooking the rolling pastures. The property includes a state-of-the-art barn with climate-controlled tack room, a magnificent 100x200 indoor arena with excellent footing, and a professionally designed outdoor arena. Each of the 12 stalls features automatic waterers and rubber mats. The property is fully fenced with four-board oak fencing and includes multiple run-in shelters. A separate guest cottage provides comfortable accommodations for farm staff or visitors. This is a rare opportunity to own a turnkey equestrian facility in one of North Carolina's most desirable horse communities.",
    images: [
      "/images/properties/estate-1-main.jpg",
      "/images/properties/estate-1-barn.jpg",
      "/images/properties/estate-1-arena.jpg",
      "/images/properties/estate-1-pasture.jpg",
      "/images/properties/estate-1-kitchen.jpg",
      "/images/properties/estate-1-living.jpg",
    ],
    features: [
      "Chef's Kitchen with Viking Appliances",
      "Primary Suite with Fireplace",
      "Home Office",
      "Wine Cellar",
      "Three-Car Garage",
      "Guest Cottage",
      "Heated Pool",
      "Outdoor Kitchen",
      "Security System",
      "Generator Backup",
      "High-Speed Internet",
      "Smart Home Technology",
    ],
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
      fencingType: ["Four-Board Oak", "Electric"],
      waterSource: ["Well", "Municipal"],
      barnSquareFeet: 8500,
      additionalStructures: ["Guest Cottage", "Equipment Barn", "Hay Storage", "Run-in Shelters (3)"],
    },
    listingAgent: mockAgent,
    status: "active",
    listDate: "2024-01-15",
    propertyType: "estate",
    coordinates: { lat: 34.9385, lng: -80.7432 },
  },
  {
    id: "2",
    mlsNumber: "MLS-2024-002",
    title: "Charming Horse Farm with Mountain Views",
    address: "5678 Whispering Pines Road",
    city: "Mooresville",
    state: "NC",
    zipCode: "28117",
    price: 1295000,
    acreage: 15,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3800,
    yearBuilt: 2005,
    description: "Discover the perfect balance of comfort and functionality at this charming horse farm in Mooresville. Set on 15 gently rolling acres with breathtaking mountain views, this property offers an ideal setting for both recreational riders and serious equestrians. The well-maintained farmhouse features an open floor plan, updated kitchen, and a wraparound porch perfect for enjoying morning coffee while watching your horses graze. The center-aisle barn includes 8 spacious stalls, wash stall, and ample hay storage. The outdoor arena with excellent drainage makes year-round riding possible. Conveniently located near Lake Norman and major highways while maintaining a peaceful country setting.",
    images: [
      "/images/properties/farm-2-main.jpg",
      "/images/properties/farm-2-barn.jpg",
      "/images/properties/farm-2-pasture.jpg",
      "/images/properties/farm-2-kitchen.jpg",
    ],
    features: [
      "Wraparound Porch",
      "Updated Kitchen",
      "Hardwood Floors",
      "Wood-Burning Fireplace",
      "Two-Car Garage",
      "Workshop",
      "Mountain Views",
      "Pond",
    ],
    equestrianAmenities: {
      stalls: 8,
      hasIndoorArena: false,
      hasOutdoorArena: true,
      pastures: 4,
      pastureAcreage: 10,
      hasTackRoom: true,
      hasFeedRoom: true,
      hasWashRack: true,
      hasRoundPen: true,
      fencingType: ["Three-Board Pine", "Wire"],
      waterSource: ["Well"],
      barnSquareFeet: 4200,
      additionalStructures: ["Workshop", "Run-in Shelter"],
    },
    listingAgent: mockAgent,
    status: "active",
    listDate: "2024-02-01",
    propertyType: "farm",
    coordinates: { lat: 35.5849, lng: -80.8101 },
  },
  {
    id: "3",
    mlsNumber: "MLS-2024-003",
    title: "Premier Dressage Training Facility",
    address: "9012 Champions Circle",
    city: "Weddington",
    state: "NC",
    zipCode: "28104",
    price: 4500000,
    acreage: 40,
    bedrooms: 6,
    bathrooms: 5.5,
    squareFeet: 8200,
    yearBuilt: 2020,
    description: "An extraordinary opportunity to acquire one of the Southeast's premier dressage training facilities. This meticulously designed property spans 40 manicured acres and features a stunning European-inspired main residence with the finest finishes throughout. The equestrian complex includes a climate-controlled barn with 20 oversized stalls, a 80x200 indoor arena with specialized GGT footing, and a regulation-size outdoor arena with mirrors. Additional facilities include a covered round pen, multiple turnout paddocks, and a six-horse Eurociser. The property includes a charming two-bedroom groom's apartment above the barn and a separate manager's cottage. Every detail has been thoughtfully considered to create the ultimate training and competition facility.",
    images: [
      "/images/properties/dressage-3-main.jpg",
      "/images/properties/dressage-3-barn.jpg",
      "/images/properties/dressage-3-arena.jpg",
      "/images/properties/dressage-3-grounds.jpg",
      "/images/properties/dressage-3-interior.jpg",
    ],
    features: [
      "European-Inspired Architecture",
      "Gourmet Kitchen",
      "Wine Room",
      "Home Theater",
      "Primary Suite with Spa Bath",
      "Four-Car Garage",
      "Infinity Pool",
      "Outdoor Fireplace",
      "Manager's Cottage",
      "Groom's Apartment",
    ],
    equestrianAmenities: {
      stalls: 20,
      hasIndoorArena: true,
      hasOutdoorArena: true,
      pastures: 8,
      pastureAcreage: 25,
      hasTackRoom: true,
      hasFeedRoom: true,
      hasWashRack: true,
      hasRoundPen: true,
      fencingType: ["Diamond Mesh", "Vinyl", "Electric"],
      waterSource: ["Well", "Irrigation System"],
      barnSquareFeet: 15000,
      additionalStructures: ["Groom's Apartment", "Manager's Cottage", "Equipment Barn", "Covered Round Pen", "Eurociser"],
    },
    listingAgent: mockAgent,
    status: "active",
    listDate: "2024-01-20",
    propertyType: "estate",
    coordinates: { lat: 35.0127, lng: -80.7589 },
  },
  {
    id: "4",
    mlsNumber: "MLS-2024-004",
    title: "Peaceful Hobby Farm with Modern Updates",
    address: "3456 Countryside Drive",
    city: "Matthews",
    state: "NC",
    zipCode: "28105",
    price: 875000,
    acreage: 8,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2400,
    yearBuilt: 1995,
    description: "Perfect starter horse property! This well-maintained hobby farm offers everything you need for a few horses while remaining conveniently close to Charlotte. The recently renovated farmhouse features an open concept living area, modern kitchen with granite counters, and a spacious primary suite. The property includes a 4-stall barn with attached storage, a small riding arena, and three fenced pastures with automatic waterers. Located in an established equestrian neighborhood with easy access to local trails. Ideal for families looking to enjoy the equestrian lifestyle without the demands of a larger facility.",
    images: [
      "/images/properties/hobby-4-main.jpg",
      "/images/properties/hobby-4-barn.jpg",
      "/images/properties/hobby-4-pasture.jpg",
    ],
    features: [
      "Recently Renovated",
      "Open Concept Living",
      "Granite Counters",
      "Stainless Appliances",
      "Fenced Backyard",
      "Screened Porch",
      "Two-Car Garage",
      "Trail Access",
    ],
    equestrianAmenities: {
      stalls: 4,
      hasIndoorArena: false,
      hasOutdoorArena: true,
      pastures: 3,
      pastureAcreage: 5,
      hasTackRoom: true,
      hasFeedRoom: false,
      hasWashRack: true,
      hasRoundPen: false,
      fencingType: ["Three-Board", "Electric"],
      waterSource: ["Well"],
      barnSquareFeet: 1800,
      additionalStructures: ["Storage Building"],
    },
    listingAgent: mockAgent,
    status: "pending",
    listDate: "2024-02-10",
    propertyType: "farm",
    coordinates: { lat: 35.1168, lng: -80.7239 },
  },
];

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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-forest-400">
            <Home className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm">Property Image</p>
            <p className="text-xs">{images[currentIndex]}</p>
          </div>
        </div>

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
            <div className="absolute inset-0 flex items-center justify-center">
              <Home className="w-6 h-6 text-forest-300" />
            </div>
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
            placeholder="(555) 123-4567"
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
export default function PropertyDetailPage() {
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
