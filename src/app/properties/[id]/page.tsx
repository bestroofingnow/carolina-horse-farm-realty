import type { Metadata } from "next";
import PropertyDetailContent from "./PropertyDetailContent";
import { mockProperties } from "@/lib/mock-data";

const siteUrl = "https://carolinahorsefarmrealty.com";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return mockProperties.map((property) => ({
    id: property.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return { title: "Property Not Found" };
  }

  const title = `${property.title} - ${property.city}, ${property.state}`;
  const description = `${property.description.slice(0, 155)}...`;
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(property.price);

  return {
    title,
    description: `${price} | ${property.acreage} acres | ${property.bedrooms} bed ${property.bathrooms} bath | ${property.equestrianAmenities.stalls} stalls. ${description}`,
    alternates: { canonical: `${siteUrl}/properties/${id}` },
    openGraph: {
      title: `${title} | ${price}`,
      description: property.description.slice(0, 200),
      url: `${siteUrl}/properties/${id}`,
      type: "website",
      images: property.images.length > 0 ? [property.images[0]] : [],
    },
  };
}

function PropertySchema({ id }: { id: string }) {
  const property = mockProperties.find((p) => p.id === id);
  if (!property) return null;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${siteUrl}/properties/${id}/#listing`,
        url: `${siteUrl}/properties/${id}`,
        name: property.title,
        description: property.description,
        datePosted: property.listDate,
        offers: {
          "@type": "Offer",
          price: property.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        about: {
          "@type": "SingleFamilyResidence",
          name: property.title,
          address: {
            "@type": "PostalAddress",
            streetAddress: property.address,
            addressLocality: property.city,
            addressRegion: property.state,
            postalCode: property.zipCode,
            addressCountry: "US",
          },
          numberOfRooms: property.bedrooms,
          numberOfBathroomsTotal: property.bathrooms,
          floorSize: {
            "@type": "QuantitativeValue",
            value: property.squareFeet,
            unitCode: "FTK",
          },
          lotSize: {
            "@type": "QuantitativeValue",
            value: property.acreage,
            unitText: "acres",
          },
          yearBuilt: property.yearBuilt > 0 ? property.yearBuilt : undefined,
          amenityFeature: [
            ...(property.equestrianAmenities.stalls > 0
              ? [{ "@type": "LocationFeatureSpecification", name: `${property.equestrianAmenities.stalls} Horse Stalls`, value: true }]
              : []),
            ...(property.equestrianAmenities.hasIndoorArena
              ? [{ "@type": "LocationFeatureSpecification", name: "Indoor Riding Arena", value: true }]
              : []),
            ...(property.equestrianAmenities.hasOutdoorArena
              ? [{ "@type": "LocationFeatureSpecification", name: "Outdoor Riding Arena", value: true }]
              : []),
            ...(property.equestrianAmenities.hasRoundPen
              ? [{ "@type": "LocationFeatureSpecification", name: "Round Pen", value: true }]
              : []),
            ...(property.equestrianAmenities.hasTackRoom
              ? [{ "@type": "LocationFeatureSpecification", name: "Tack Room", value: true }]
              : []),
            ...(property.equestrianAmenities.hasWashRack
              ? [{ "@type": "LocationFeatureSpecification", name: "Wash Rack", value: true }]
              : []),
            ...property.features.map((f) => ({
              "@type": "LocationFeatureSpecification",
              name: f,
              value: true,
            })),
          ],
        },
        broker: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/properties/${id}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Properties", item: `${siteUrl}/properties` },
          { "@type": "ListItem", position: 3, name: property.title, item: `${siteUrl}/properties/${id}` },
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

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <PropertySchema id={id} />
      <PropertyDetailContent />
    </>
  );
}
