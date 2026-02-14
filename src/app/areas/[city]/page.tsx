import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  Home,
  Bed,
  Bath,
  TreeDeciduous,
  ChevronRight,
  CheckCircle,
  Phone,
  Star,
} from "lucide-react";
import {
  serviceAreas,
  getAllServiceAreaSlugs,
  getServiceAreaBySlug,
} from "@/lib/service-areas";
import { mockProperties } from "@/lib/mock-data";
import { Property } from "@/types";

const siteUrl = "https://carolinahorsefarmrealty.com";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateStaticParams() {
  return getAllServiceAreaSlugs().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) return {};

  return {
    title: `Horse Farms & Equestrian Properties in ${area.name}, NC`,
    description: `Find horse farms and equestrian properties for sale in ${area.name}, ${area.county}, North Carolina. Expert equestrian real estate services from Carolina Horse Farm Realty.`,
    alternates: { canonical: `${siteUrl}/areas/${area.slug}` },
    openGraph: {
      title: `Equestrian Properties in ${area.name} | Carolina Horse Farm Realty`,
      description: `Discover horse farms and equestrian estates in ${area.name}, NC. ${area.description.slice(0, 150)}`,
      url: `${siteUrl}/areas/${area.slug}`,
      type: "website",
    },
  };
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-lg border border-forest-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-56 bg-forest-100 overflow-hidden">
        {property.images.length > 0 ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-forest-700 to-forest-900 flex items-center justify-center">
            <Home className="w-16 h-16 text-forest-300 opacity-50" />
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="bg-forest-900/80 text-white px-4 py-2 rounded text-lg font-bold">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-forest-900 mb-2 group-hover:text-gold-700 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center text-forest-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.city}, {property.state}
          </span>
        </div>
        <div className="flex items-center gap-4 text-forest-700 text-sm">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} beds</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} baths</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <TreeDeciduous className="w-4 h-4" />
            <span>{property.acreage} acres</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) notFound();

  const cityProperties = mockProperties.filter(
    (p) => p.city.toLowerCase() === area.name.toLowerCase()
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/areas/${area.slug}/#webpage`,
        url: `${siteUrl}/areas/${area.slug}`,
        name: `Horse Farms & Equestrian Properties in ${area.name}, NC`,
        description: `Find equestrian properties for sale in ${area.name}, ${area.county}, North Carolina.`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: { "@id": `${siteUrl}/areas/${area.slug}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/areas/${area.slug}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Service Areas",
            item: `${siteUrl}/areas`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: area.name,
            item: `${siteUrl}/areas/${area.slug}`,
          },
        ],
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/areas/${area.slug}/#agent`,
        name: "Carolina Horse Farm Realty",
        description: `Equestrian real estate specialists serving ${area.name}, ${area.county}, North Carolina.`,
        areaServed: {
          "@type": "City",
          name: area.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: area.county,
          },
        },
        url: `${siteUrl}/areas/${area.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-forest-900">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 opacity-95" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-gold-400 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {area.county}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Equestrian Properties in {area.name}
          </h1>
          <p className="text-xl text-forest-200 max-w-3xl mx-auto">
            {area.description.split(". ").slice(0, 2).join(". ")}.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-forest-900 text-center mb-4">
            Why Buy a Horse Farm in {area.name}?
          </h2>
          <p className="text-forest-600 text-center max-w-2xl mx-auto mb-12">
            {area.description}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {area.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-cream-50 rounded-lg p-4 border border-forest-100"
              >
                <CheckCircle className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <span className="text-forest-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties in this area */}
      {cityProperties.length > 0 && (
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-forest-900 text-center mb-4">
              Properties in {area.name}
            </h2>
            <p className="text-forest-600 text-center max-w-xl mx-auto mb-12">
              Browse available equestrian properties in the {area.name} area.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Attractions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-forest-900 text-center mb-12">
            Nearby Attractions & Amenities
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {area.nearbyAttractions.map((attraction, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-cream-50 rounded-full px-5 py-3 border border-forest-100"
              >
                <Star className="w-4 h-4 text-gold-500" />
                <span className="text-forest-700 text-sm font-medium">
                  {attraction}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Looking for a Horse Farm in {area.name}?
          </h2>
          <p className="text-forest-200 max-w-xl mx-auto mb-8">
            Our equestrian property specialists know the {area.name} area
            inside and out. Let us help you find the perfect property.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/properties"
              className="btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold"
            >
              Browse All Properties <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+17049293289"
              className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold text-white border-white hover:bg-white hover:text-forest-900"
            >
              <Phone className="w-5 h-5" />
              (704) 929-3289
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
