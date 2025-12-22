"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Linkedin,
  Link2,
  Check,
} from "lucide-react";
import { BlogPost } from "@/types";

// Get category slug from name
function getCategorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// Get category color classes
function getCategoryStyles(categoryId: string): string {
  switch (categoryId) {
    case "buying-guide":
      return "bg-forest-100 text-forest-700";
    case "selling-tips":
      return "bg-gold-100 text-gold-700";
    case "area-guides":
      return "bg-gold-100 text-gold-700";
    case "market-updates":
    case "market-insights":
      return "bg-cream-200 text-forest-700";
    case "property-care":
      return "bg-forest-100 text-forest-700";
    case "property-features":
      return "bg-gold-100 text-gold-700";
    default:
      return "bg-forest-100 text-forest-700";
  }
}

// Format date helper
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Share Buttons Component
function ShareButtons({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-forest-600">Share:</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`,
              "_blank",
              "width=600,height=400"
            )
          }
          className="w-9 h-9 rounded-full bg-forest-100 hover:bg-forest-200 flex items-center justify-center text-forest-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </button>
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl
              )}&text=${encodeURIComponent(shareTitle)}`,
              "_blank",
              "width=600,height=400"
            )
          }
          className="w-9 h-9 rounded-full bg-forest-100 hover:bg-forest-200 flex items-center justify-center text-forest-600 transition-colors"
          aria-label="Share on X"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          onClick={() =>
            window.open(
              `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                shareUrl
              )}&title=${encodeURIComponent(shareTitle)}`,
              "_blank",
              "width=600,height=400"
            )
          }
          className="w-9 h-9 rounded-full bg-forest-100 hover:bg-forest-200 flex items-center justify-center text-forest-600 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>
        <button
          onClick={handleCopyLink}
          className="w-9 h-9 rounded-full bg-forest-100 hover:bg-forest-200 flex items-center justify-center text-forest-600 transition-colors"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Link2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

// Related Post Card Component
function RelatedPostCard({ post }: { post: BlogPost }) {
  const categorySlug = getCategorySlug(post.category);
  const hasImage = post.featuredImage && !post.featuredImage.includes("/images/blog/");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm border border-forest-100 hover:shadow-md transition-all"
    >
      <div className="relative aspect-[16/9] bg-gradient-to-br from-forest-100 to-forest-200">
        {hasImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-forest-300" />
          </div>
        )}
      </div>
      <div className="p-4">
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${getCategoryStyles(
            categorySlug
          )}`}
        >
          {post.category}
        </span>
        <h4 className="text-sm font-semibold text-forest-900 line-clamp-2 group-hover:text-gold-700 transition-colors">
          {post.title}
        </h4>
        <div className="flex items-center gap-2 mt-2 text-xs text-forest-500">
          <Clock className="w-3 h-3" />
          <span>{post.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const categorySlug = getCategorySlug(post.category);
  const hasImage = post.featuredImage && !post.featuredImage.includes("/images/blog/");

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-forest-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-forest-600 hover:text-forest-900 transition-colors"
            >
              Home
            </Link>
            <span className="text-forest-300">/</span>
            <Link
              href="/blog"
              className="text-forest-600 hover:text-forest-900 transition-colors"
            >
              Blog
            </Link>
            <span className="text-forest-300">/</span>
            <span className="text-forest-900 font-medium truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Featured Image */}
        <div className="relative aspect-[16/9] bg-gradient-to-br from-forest-100 to-forest-200 rounded-2xl overflow-hidden mb-8">
          {hasImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-forest-300" />
            </div>
          )}
          <div className="absolute top-6 left-6">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${getCategoryStyles(
                categorySlug
              )}`}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-forest-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author and Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-forest-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center">
                <User className="w-6 h-6 text-forest-400" />
              </div>
              <div>
                <p className="font-semibold text-forest-900">
                  {post.author.name}
                </p>
                <div className="flex items-center gap-3 text-sm text-forest-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <ShareButtons post={post} />
          </div>
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg prose-forest max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            lineHeight: 1.8,
          }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-forest-100 text-forest-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share and Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-b border-forest-200">
          <ShareButtons post={post} />
          <Link
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 border-2 border-forest-200 rounded-lg text-forest-700 font-medium hover:border-forest-400 hover:bg-forest-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-forest-900 mb-6">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-br from-forest-800 to-forest-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Horse Property?
          </h2>
          <p className="text-cream-200 mb-8 max-w-2xl mx-auto">
            Let our team of equestrian real estate experts help you find the
            perfect property in the Charlotte Metro area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-forest-800 font-medium rounded-lg hover:bg-cream-100 transition-colors"
            >
              Browse Properties
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
