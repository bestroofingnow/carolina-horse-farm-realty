import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getRelatedPosts, getPosts } from "@/lib/wordpress";
import BlogPostContent from "./BlogPostContent";

const siteUrl = "https://carolinahorsefarmrealty.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for known posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

// Revalidate every 5 minutes
export const revalidate = 300;

// Allow dynamic routes for posts not pre-generated at build time
export const dynamicParams = true;

async function BlogPostSchema({ slug }: { slug: string }) {
  const post = await getPost(slug);
  if (!post) return null;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/blog/${slug}/#article`,
        headline: post.title,
        description: post.excerpt,
        url: `${siteUrl}/blog/${slug}`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        image: post.featuredImage || undefined,
        author: {
          "@type": "Person",
          name: post.author.name,
          url: `${siteUrl}/about`,
        },
        publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntityOfPage: `${siteUrl}/blog/${slug}`,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".post-excerpt"],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/blog/${slug}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${slug}` },
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);

  return (
    <>
      <BlogPostSchema slug={slug} />
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}
