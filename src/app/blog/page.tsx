import { Metadata } from "next";
import { getPosts } from "@/lib/wordpress";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Living the Best Horse Farm Life | Carolina Horse Farm Realty",
  description:
    "Expert insights on horse property buying and selling, area guides, market updates, and everything you need to know about equestrian living in the Charlotte Metro area.",
};

// Revalidate every 5 minutes
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPosts();

  return <BlogContent posts={posts} />;
}
