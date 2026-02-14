import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { serviceAreas } from "@/lib/service-areas";

const siteUrl = "https://carolinahorsefarmrealty.com";

export const metadata: Metadata = {
  title: "Service Areas - Equestrian Properties Across the Carolinas",
  description:
    "Carolina Horse Farm Realty serves horse property buyers and sellers across NC and SC. Explore our service areas including Charlotte, Tryon, Waxhaw, Columbus, and more.",
  alternates: { canonical: `${siteUrl}/areas` },
  openGraph: {
    title: "Service Areas | Carolina Horse Farm Realty",
    description:
      "Explore equestrian communities across the Carolinas. Find horse farms and equestrian properties in Charlotte, Tryon, Waxhaw, and beyond.",
    url: `${siteUrl}/areas`,
    type: "website",
  },
};

function AreasPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/areas/#webpage`,
        url: `${siteUrl}/areas`,
        name: "Service Areas - Equestrian Properties Across the Carolinas",
        description:
          "Explore equestrian communities and horse farm properties across North and South Carolina.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: { "@id": `${siteUrl}/areas/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/areas/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Service Areas",
            item: `${siteUrl}/areas`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <AreasPageSchema />

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-forest-900">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 opacity-95" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Areas We Serve
          </h1>
          <p className="text-xl md:text-2xl text-forest-200 max-w-3xl mx-auto">
            From the rolling hills of Waxhaw to the world-class facilities of
            Tryon, we serve the premier equestrian communities of the Carolinas.
          </p>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm border border-forest-100 hover:shadow-lg hover:border-gold-300 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                    <MapPin className="w-6 h-6 text-gold-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-forest-900 mb-1 group-hover:text-gold-700 transition-colors">
                      {area.name}
                    </h2>
                    <p className="text-sm text-forest-500 mb-3">{area.county}</p>
                    <p className="text-forest-600 text-sm leading-relaxed line-clamp-3">
                      {area.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-gold-600 text-sm font-medium">
                      View area details
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don&apos;t See Your Area?
          </h2>
          <p className="text-forest-200 max-w-xl mx-auto mb-8">
            We serve equestrian communities throughout North and South Carolina.
            Contact us to discuss your area.
          </p>
          <Link
            href="/contact"
            className="btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold"
          >
            Contact Us <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
