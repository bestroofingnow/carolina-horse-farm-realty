import HomeContent from "./HomeContent";

const siteUrl = "https://carolinahorsefarmrealty.com";

function HomePageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Carolina Horse Farm Realty | Equestrian Properties in NC & SC",
        description:
          "Specializing in horse farms, equestrian estates, and land for horses in North & South Carolina. Expert equestrian real estate agents serving Charlotte, Tryon, Waxhaw, and the greater Carolinas.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".hero-description"],
        },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service`,
        serviceType: "Equestrian Real Estate",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: [
          { "@type": "State", name: "North Carolina" },
          { "@type": "State", name: "South Carolina" },
        ],
        description:
          "Expert buying and selling services for horse farms, equestrian estates, training facilities, and land for horses throughout North & South Carolina.",
        offers: {
          "@type": "AggregateOffer",
          lowPrice: 289900,
          highPrice: 4995000,
          priceCurrency: "USD",
          offerCount: 12,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Equestrian Properties for Sale",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Horse Farms",
              description: "Working horse farms with barns, arenas, and pastureland",
            },
            {
              "@type": "OfferCatalog",
              name: "Equestrian Estates",
              description: "Luxury equestrian properties with premium facilities",
            },
            {
              "@type": "OfferCatalog",
              name: "Land for Horses",
              description: "Vacant land with existing barns or suitable for equestrian development",
            },
          ],
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

export default function HomePage() {
  return (
    <>
      <HomePageSchema />
      <HomeContent />
    </>
  );
}
