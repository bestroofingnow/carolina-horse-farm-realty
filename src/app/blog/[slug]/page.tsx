import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getRelatedPosts, getPosts } from "@/lib/wordpress";
import BlogPostContent from "./BlogPostContent";

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
      title: "Article Not Found | Carolina Horse Farm Realty",
    };
  }

  return {
    title: `${post.title} | Carolina Horse Farm Realty`,
    description: post.excerpt,
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}
