import type { Metadata } from "next";
import PropertiesContent from "./PropertiesContent";
import { mockProperties } from "@/lib/mock-data";

const siteUrl = "https://carolinahorsefarmrealty.com";

export const metadata: Metadata = {
  title: "Horse Farms & Equestrian Properties for Sale in NC",
  description:
    "Browse horse farms, equestrian estates, and land for horses in North Carolina. Filter by acreage, stalls, arena, and city. Properties from $289,900 to $4,995,000 near Charlotte, Tryon, Waxhaw, and more.",
  alternates: { canonical: `${siteUrl}/properties` },
  openGraph: {
    title: "Horse Farms & Equestrian Properties for Sale in NC",
    description:
      "Discover exceptional equestrian properties throughout North Carolina. Horse farms, estates, and land for sale.",
    url: `${siteUrl}/properties`,
    type: "website",
  },
};

function PropertiesPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/properties/#webpage`,
        url: `${siteUrl}/properties`,
        name: "Horse Farms & Equestrian Properties for Sale",
        description:
          "Browse horse farms, equestrian estates, and land for horses for sale in North Carolina.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: { "@id": `${siteUrl}/properties/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/properties/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Properties",
            item: `${siteUrl}/properties`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/properties/#listing`,
        name: "Equestrian Properties for Sale",
        numberOfItems: mockProperties.length,
        itemListElement: mockProperties.slice(0, 10).map((property, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "RealEstateListing",
            name: property.title,
            url: `${siteUrl}/properties/${property.id}`,
            description: property.description.slice(0, 200),
            offers: {
              "@type": "Offer",
              price: property.price,
              priceCurrency: "USD",
            },
          },
        })),
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

export default function PropertiesPage() {
  return (
    <>
      <PropertiesPageSchema />
      <PropertiesContent />
    </>
  );
}
