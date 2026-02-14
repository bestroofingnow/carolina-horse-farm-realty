import { Metadata } from "next";
import { getPosts } from "@/lib/wordpress";
import BlogContent from "./BlogContent";

const siteUrl = "https://carolinahorsefarmrealty.com";

export const metadata: Metadata = {
  title: "Horse Farm Living Blog - Tips, Guides & Market Updates",
  description:
    "Expert insights on horse property buying and selling, area guides, NC equestrian market updates, and everything you need to know about equestrian living in the Charlotte Metro area and the Carolinas.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Horse Farm Living Blog | Carolina Horse Farm Realty",
    description:
      "Expert equestrian real estate insights, area guides, and market updates for NC horse country.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
};

// Revalidate every 5 minutes
export const revalidate = 300;

function BlogPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/blog/#webpage`,
        url: `${siteUrl}/blog`,
        name: "Horse Farm Living Blog",
        description:
          "Expert insights on equestrian property buying and selling, area guides, and market updates.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: { "@id": `${siteUrl}/blog/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/blog/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
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

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <BlogPageSchema />
      <BlogContent posts={posts} />
    </>
  );
}
