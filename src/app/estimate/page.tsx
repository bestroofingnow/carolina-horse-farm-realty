import type { Metadata } from "next";
import EstimateContent from "./EstimateContent";

const siteUrl = "https://carolinahorsefarmrealty.com";

export const metadata: Metadata = {
  title: "Free Property Valuation - What Is Your Horse Farm Worth?",
  description:
    "Get a free, no-obligation property valuation for your equestrian property in NC or SC. Our horse farm specialists assess barns, arenas, pastures, and more for an accurate market analysis.",
  alternates: { canonical: `${siteUrl}/estimate` },
  openGraph: {
    title: "Free Equestrian Property Valuation | Carolina Horse Farm Realty",
    description:
      "Find out what your horse farm is worth. Complimentary market analysis from equestrian real estate specialists in the Carolinas.",
    url: `${siteUrl}/estimate`,
    type: "website",
  },
};

function EstimatePageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/estimate/#webpage`,
        url: `${siteUrl}/estimate`,
        name: "Free Equestrian Property Valuation",
        description:
          "Get a complimentary market analysis for your horse farm or equestrian property in North and South Carolina.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: { "@id": `${siteUrl}/estimate/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/estimate/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free Estimate",
            item: `${siteUrl}/estimate`,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/estimate/#service`,
        name: "Equestrian Property Valuation",
        description:
          "Complimentary market analysis for horse farms, equestrian estates, and land in NC and SC. Includes assessment of barns, arenas, pastures, fencing, and equestrian amenities.",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: {
          "@type": "State",
          name: "North Carolina",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free, no-obligation property valuation",
        },
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

export default function EstimatePage() {
  return (
    <>
      <EstimatePageSchema />
      <EstimateContent />
    </>
  );
}
