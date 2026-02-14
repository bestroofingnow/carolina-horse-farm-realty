import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { faqs } from "@/lib/faqs";

const siteUrl = "https://carolinahorsefarmrealty.com";

export const metadata: Metadata = {
  title: "Contact Us - Horse Farm Real Estate Specialists",
  description:
    "Contact Carolina Horse Farm Realty for expert help buying or selling equestrian properties in NC & SC. Call (704) 929-3289. Office hours Mon-Fri 8AM-6PM. Brokered by eXp Realty.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact Carolina Horse Farm Realty",
    description:
      "Get in touch with our equestrian property specialists. Call (704) 929-3289 or send us a message.",
    url: `${siteUrl}/contact`,
    type: "website",
  },
};

function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteUrl}/contact/#webpage`,
        url: `${siteUrl}/contact`,
        name: "Contact Carolina Horse Farm Realty",
        description: "Contact us for expert equestrian real estate services in NC & SC.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: { "@id": `${siteUrl}/contact/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/contact/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/contact/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
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

export default function ContactPage() {
  return (
    <>
      <ContactPageSchema />
      <ContactContent />
    </>
  );
}
