"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  User,
  ChevronRight,
  Search,
} from "lucide-react";
import { BlogPost } from "@/types";

// Blog categories
const categories = [
  { id: "all", label: "All Posts" },
  { id: "buying-guide", label: "Buying Guide" },
  { id: "property-care", label: "Property Care" },
  { id: "property-features", label: "Property Features" },
  { id: "market-insights", label: "Market Insights" },
  { id: "selling-tips", label: "Selling Tips" },
  { id: "area-guides", label: "Area Guides" },
];

// Format date helper
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get category slug from name
function getCategorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// Get category label helper
function getCategoryLabel(categoryId: string): string {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.label : categoryId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
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

// Featured Post Card Component
function FeaturedPostCard({ post }: { post: BlogPost }) {
  const categorySlug = getCategorySlug(post.category);
  const hasImage = post.featuredImage && !post.featuredImage.includes("/images/blog/");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-lg border border-forest-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Featured Image */}
        <div className="relative aspect-[4/3] md:aspect-auto bg-gradient-to-br from-forest-100 to-forest-200">
          {hasImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-20 h-20 text-forest-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/10 transition-colors duration-300" />
          <div className="absolute top-4 left-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyles(
                categorySlug
              )}`}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-3">
            <span className="text-gold-600 text-sm font-semibold uppercase tracking-wider">
              Featured Post
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-forest-900 mb-4 group-hover:text-gold-700 transition-colors">
            {post.title}
          </h2>
          <p className="text-forest-600 leading-relaxed mb-6">{post.excerpt}</p>

          {/* Author and Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                <User className="w-5 h-5 text-forest-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-forest-900">
                  {post.author.name}
                </p>
                <p className="text-xs text-forest-500">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-forest-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Read More */}
          <div className="mt-6 flex items-center gap-2 text-gold-600 font-medium group-hover:text-gold-700">
            <span>Read Article</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// Blog Post Card Component
function BlogPostCard({ post }: { post: BlogPost }) {
  const categorySlug = getCategorySlug(post.category);
  const hasImage = post.featuredImage && !post.featuredImage.includes("/images/blog/");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md border border-forest-100 hover:shadow-lg transition-all duration-300"
    >
      {/* Featured Image */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-forest-100 to-forest-200">
        {hasImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-forest-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/10 transition-colors duration-300" />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryStyles(
              categorySlug
            )}`}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-forest-900 mb-2 line-clamp-2 group-hover:text-gold-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-forest-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author and Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-forest-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center">
              <User className="w-4 h-4 text-forest-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-forest-800">
                {post.author.name}
              </p>
              <p className="text-xs text-forest-500">
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-forest-500 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime} min</span>
          </div>
        </div>

        {/* Read More */}
        <div className="mt-4 flex items-center gap-1 text-gold-600 text-sm font-medium group-hover:text-gold-700">
          <span>Read More</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

interface BlogContentProps {
  posts: BlogPost[];
}

// Main Blog Content Component
export default function BlogContent({ posts }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((post) => {
        const postCategorySlug = getCategorySlug(post.category);
        return postCategorySlug === activeCategory;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [posts, activeCategory, searchQuery]);

  // Get featured post (latest post)
  const featuredPost = posts[0];

  // Get remaining posts for the grid
  const gridPosts =
    activeCategory === "all" && !searchQuery.trim()
      ? filteredPosts.slice(1)
      : filteredPosts;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative bg-forest-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream-50 mb-4">
            Equestrian Living Blog
          </h1>
          <p className="text-lg md:text-xl text-cream-200 max-w-3xl mx-auto">
            Expert insights on horse property buying and selling, area guides,
            market updates, and everything you need to know about equestrian
            living in the Charlotte Metro area.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-10">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-forest-200 rounded-full text-forest-800 placeholder-forest-400 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-forest-700 text-white shadow-md"
                    : "bg-white text-forest-700 border border-forest-200 hover:border-forest-400 hover:bg-forest-50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {activeCategory === "all" && !searchQuery.trim() && featuredPost && (
          <div className="mb-12">
            <FeaturedPostCard post={featuredPost} />
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-forest-600">
            Showing{" "}
            <span className="font-semibold text-forest-900">
              {gridPosts.length}
            </span>{" "}
            {gridPosts.length === 1 ? "article" : "articles"}
            {activeCategory !== "all" && (
              <span>
                {" "}
                in{" "}
                <span className="font-semibold">
                  {getCategoryLabel(activeCategory)}
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-forest-100 p-12 text-center">
            <BookOpen className="w-16 h-16 text-forest-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-forest-900 mb-2">
              No Articles Found
            </h3>
            <p className="text-forest-600 mb-6">
              No articles match your current filters. Try adjusting your search
              or category selection.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-forest-700 hover:bg-forest-600 text-cream-50 font-medium rounded-md transition-colors"
            >
              View All Articles
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-br from-forest-800 to-forest-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stay Updated on Equestrian Living
          </h2>
          <p className="text-cream-200 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest horse property listings,
            market insights, and expert tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
