// TODO: Replace mock data with WordPress/GraphQL data
// See: https://www.wpgraphql.com/

"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
} from "lucide-react";
import { BlogPost } from "@/types";

// Blog categories
const categories = [
  { id: "all", label: "All Posts" },
  { id: "buying-guide", label: "Buying Guide" },
  { id: "selling-tips", label: "Selling Tips" },
  { id: "area-guides", label: "Area Guides" },
  { id: "market-updates", label: "Market Updates" },
];

// Mock blog posts data
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "essential-guide-to-buying-horse-property",
    title: "The Essential Guide to Buying Your First Horse Property",
    excerpt:
      "Everything you need to know before purchasing an equestrian property, from evaluating barn facilities to understanding zoning requirements.",
    content: `
      <p>Purchasing your first horse property is an exciting milestone for any equestrian. Unlike traditional real estate, buying a horse property requires careful consideration of specialized features that will directly impact your horses' well-being and your riding experience.</p>

      <h2>Understanding Your Needs</h2>
      <p>Before you begin your search, take time to assess your specific requirements. Consider the number of horses you plan to keep, your riding discipline, and any future expansion plans. A competitive dressage rider will have different facility needs than a family with pleasure horses.</p>

      <h2>Evaluating the Land</h2>
      <p>The quality and layout of the land are crucial factors. Look for well-drained pastures with good grass coverage and appropriate fencing. The topography should allow for safe turnout and, ideally, include flat areas suitable for arena installation if one isn't already present.</p>
      <p>Pay attention to water sources - whether municipal, well, or natural springs. Adequate water access is essential for both the home and barn facilities.</p>

      <h2>Barn and Facility Assessment</h2>
      <p>When evaluating barn facilities, consider:</p>
      <ul>
        <li>Stall size and configuration (12x12 is standard, but larger is better)</li>
        <li>Ventilation and natural lighting</li>
        <li>Hay and feed storage capacity</li>
        <li>Tack room size and climate control</li>
        <li>Wash stall availability and drainage</li>
        <li>Aisle width and traffic flow</li>
      </ul>

      <h2>Arena Considerations</h2>
      <p>If riding arenas are important to you, evaluate the footing quality, drainage, and dimensions. Indoor arenas are particularly valuable in regions with inclement weather. Consider lighting for evening riding sessions.</p>

      <h2>Zoning and Legal Considerations</h2>
      <p>Verify that the property is properly zoned for equestrian use. Some areas have restrictions on the number of horses per acre or require specific permits. Understanding local regulations before purchase can prevent costly surprises down the road.</p>

      <h2>Working with the Right Professionals</h2>
      <p>Partner with a real estate agent who specializes in equestrian properties. Their expertise in evaluating horse facilities can be invaluable. Additionally, consider having the property inspected by someone familiar with barn construction and equine needs.</p>

      <h2>Conclusion</h2>
      <p>Buying a horse property is a significant investment that combines real estate with your passion for horses. Take your time, do your research, and work with professionals who understand the unique requirements of equestrian living. The right property will provide years of enjoyment for both you and your horses.</p>
    `,
    featuredImage: "/images/blog/buying-guide.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "buying-guide",
    tags: ["buying", "first-time-buyers", "equestrian"],
    publishedAt: "2024-12-15",
    readTime: 8,
  },
  {
    id: "2",
    slug: "preparing-horse-farm-for-sale",
    title: "10 Tips for Preparing Your Horse Farm for Sale",
    excerpt:
      "Maximize your property's value with these expert tips on staging barns, improving curb appeal, and highlighting equestrian features.",
    content: `
      <p>Selling a horse property requires a different approach than selling a traditional home. Potential buyers are evaluating not just the residence, but the entire equestrian facility. Here are our top tips for presenting your property at its best.</p>

      <h2>1. Clean and Organize the Barn</h2>
      <p>First impressions matter. Remove clutter, organize tack rooms, and ensure all stalls are clean and well-bedded. A well-maintained barn signals that the entire property has been cared for properly.</p>

      <h2>2. Repair Fencing</h2>
      <p>Walk your fence lines and repair any broken boards, sagging wire, or damaged posts. Safe, attractive fencing is a top priority for horse buyers.</p>

      <h2>3. Improve Pasture Condition</h2>
      <p>Overseed bare patches, address drainage issues, and consider soil testing to optimize pasture health. Lush, well-maintained pastures are extremely appealing to potential buyers.</p>

      <h2>4. Service All Equipment</h2>
      <p>Ensure automatic waterers, lighting, fans, and any other barn equipment are in good working order. Consider having documentation available showing regular maintenance.</p>

      <h2>5. Enhance Curb Appeal</h2>
      <p>The approach to your property sets the tone. Maintain the driveway, trim landscaping, and ensure entrance gates are in good condition and operating smoothly.</p>

      <h2>6. Stage the Arena</h2>
      <p>Groom and level arena footing. Remove any debris and consider adding fresh footing if needed. Well-maintained arenas showcase the property's potential.</p>

      <h2>7. Document Improvements</h2>
      <p>Create a list of recent improvements and upgrades to the equestrian facilities. Include costs and dates to demonstrate the investment you've made in the property.</p>

      <h2>8. Address Safety Issues</h2>
      <p>Walk through with a critical eye for potential safety hazards. Repair any issues that could concern buyers or their insurance companies.</p>

      <h2>9. Professional Photography</h2>
      <p>Invest in professional photography that highlights both the home and equestrian facilities. Aerial drone footage can be particularly effective for showcasing larger properties.</p>

      <h2>10. Price Appropriately</h2>
      <p>Work with an agent who understands the equestrian market to price your property competitively. The value of specialized facilities should be accurately reflected in the listing price.</p>
    `,
    featuredImage: "/images/blog/selling-tips.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "selling-tips",
    tags: ["selling", "staging", "property-value"],
    publishedAt: "2024-12-10",
    readTime: 6,
  },
  {
    id: "3",
    slug: "waxhaw-equestrian-community-guide",
    title: "Waxhaw: A Premier Destination for Equestrian Living",
    excerpt:
      "Discover why Waxhaw has become one of the most sought-after equestrian communities in the Charlotte Metro area.",
    content: `
      <p>Nestled in Union County, just 25 miles south of Charlotte, Waxhaw has emerged as one of the premier destinations for equestrian enthusiasts in the Southeast. This charming community offers the perfect blend of rural character and modern convenience.</p>

      <h2>Rich Equestrian Heritage</h2>
      <p>Waxhaw has a long history of equestrian activity, with horse farms dotting the rolling countryside for generations. Today, the area is home to a thriving community of riders representing various disciplines, from hunter/jumper to dressage to western pleasure.</p>

      <h2>Property Availability</h2>
      <p>The Waxhaw area offers a diverse range of horse properties, from modest hobby farms on 5-10 acres to expansive show facilities on 50+ acres. Property prices vary widely based on acreage, facilities, and proximity to downtown Waxhaw.</p>

      <h2>Amenities and Services</h2>
      <p>Equestrians in Waxhaw have access to excellent support services, including:</p>
      <ul>
        <li>Multiple equine veterinary practices</li>
        <li>Farriers and equine dental specialists</li>
        <li>Feed and tack stores</li>
        <li>Professional trainers across disciplines</li>
        <li>Boarding facilities for those not ready to own</li>
      </ul>

      <h2>Trail Riding Opportunities</h2>
      <p>The area offers numerous trail riding opportunities, with access to the Cane Creek Park trail system and various private trail networks. Many neighborhoods are designed with equestrian access in mind.</p>

      <h2>Community Events</h2>
      <p>Throughout the year, Waxhaw hosts various equestrian events, including local shows, clinics, and community rides. The annual Waxhaw Rodeo is a beloved tradition that celebrates the area's western heritage.</p>

      <h2>Conclusion</h2>
      <p>Whether you're looking for your first horse property or upgrading to a world-class facility, Waxhaw offers exceptional options for equestrian living. Contact us to explore available properties in this sought-after community.</p>
    `,
    featuredImage: "/images/blog/waxhaw-guide.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "area-guides",
    tags: ["waxhaw", "community", "equestrian-living"],
    publishedAt: "2024-12-05",
    readTime: 7,
  },
  {
    id: "4",
    slug: "charlotte-horse-property-market-q4-2024",
    title: "Charlotte Horse Property Market Update: Q4 2024",
    excerpt:
      "Analysis of the current equestrian real estate market in the Charlotte Metro area, including trends, pricing, and inventory insights.",
    content: `
      <p>The Charlotte Metro equestrian real estate market continues to show strength as we close out 2024. Here's our comprehensive analysis of current market conditions and what buyers and sellers can expect.</p>

      <h2>Market Overview</h2>
      <p>Demand for quality horse properties remains robust, with well-priced listings often receiving multiple offers. However, the market has become more balanced compared to the seller-dominant conditions of recent years.</p>

      <h2>Price Trends</h2>
      <p>Average prices for horse properties have stabilized, with modest appreciation of 3-5% year-over-year. Premium properties with exceptional facilities continue to command top dollar, while properties needing significant updates may sit longer on the market.</p>

      <h2>Inventory Analysis</h2>
      <p>Current inventory levels remain below historical averages, though we've seen a slight increase in listings compared to the same period last year. Buyers should still expect competition for desirable properties.</p>

      <h2>Buyer Preferences</h2>
      <p>Today's buyers are prioritizing:</p>
      <ul>
        <li>Move-in ready facilities with quality construction</li>
        <li>Indoor arenas for year-round riding</li>
        <li>Updated homes with modern amenities</li>
        <li>Acreage of 15+ acres for optimal horse keeping</li>
        <li>Proximity to Charlotte while maintaining rural character</li>
      </ul>

      <h2>Looking Ahead</h2>
      <p>We anticipate continued steady demand in 2025, supported by the Charlotte area's growing population and strong appeal to equestrians relocating from other regions. Interest rates remain a factor, but the specialized nature of the equestrian market somewhat insulates it from broader market fluctuations.</p>

      <h2>Recommendations</h2>
      <p>For sellers: Focus on presenting your property at its best and pricing competitively from the start. Quality marketing, including professional photography, remains essential.</p>
      <p>For buyers: Be prepared to act decisively when you find the right property. Getting pre-approved and working with an agent who specializes in equestrian properties will give you an advantage.</p>
    `,
    featuredImage: "/images/blog/market-update.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "market-updates",
    tags: ["market-analysis", "charlotte", "trends"],
    publishedAt: "2024-12-01",
    readTime: 5,
  },
  {
    id: "5",
    slug: "evaluating-barn-facilities",
    title: "How to Evaluate Barn Facilities When Buying a Horse Property",
    excerpt:
      "A comprehensive checklist for assessing barn quality, stall configurations, ventilation, and essential equestrian infrastructure.",
    content: `
      <p>The barn is often the heart of any horse property. Whether you're a first-time buyer or upgrading to a larger facility, knowing how to properly evaluate barn quality is essential. Here's your comprehensive guide.</p>

      <h2>Structural Integrity</h2>
      <p>Begin with the basics: foundation, framing, and roofing. Look for signs of settling, water damage, or wood rot. Metal buildings should be checked for rust and proper maintenance.</p>

      <h2>Stall Configuration</h2>
      <p>Evaluate stall sizes against your horses' needs. Standard is 12x12, but larger horses may need 14x14 or larger. Consider the stall flooring - rubber mats over compacted base are ideal.</p>

      <h2>Ventilation</h2>
      <p>Good ventilation is critical for horse health. Look for ridge vents, cupolas, or mechanical ventilation. Dutch doors and windows should provide cross-ventilation in warmer months.</p>

      <h2>Aisle Width and Layout</h2>
      <p>Center aisles should be at least 12 feet wide for safe horse handling. Consider traffic flow and how easily you can move horses, hay, and equipment.</p>

      <h2>Storage</h2>
      <p>Adequate hay and feed storage is essential. Look for dedicated spaces that are dry and properly ventilated. Equipment storage should be separate from horse areas.</p>

      <h2>Electrical and Plumbing</h2>
      <p>Check that electrical systems are up to code and designed for barn environments. Hot and cold water access at wash stalls and frost-free hydrants in pastures are valuable features.</p>

      <h2>Safety Features</h2>
      <p>Look for fire extinguishers, proper lighting, and safe hardware. Gates and latches should be horse-safe with no sharp edges or projection points.</p>
    `,
    featuredImage: "/images/blog/barn-evaluation.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "buying-guide",
    tags: ["barn", "facilities", "inspection"],
    publishedAt: "2024-11-25",
    readTime: 10,
  },
  {
    id: "6",
    slug: "mooresville-lake-norman-horse-properties",
    title: "Mooresville & Lake Norman: Waterfront Horse Properties",
    excerpt:
      "Explore the unique opportunities for equestrian living near Lake Norman, where horse farms meet lakefront luxury.",
    content: `
      <p>The Mooresville and Lake Norman area offers a unique opportunity for equestrians who want the best of both worlds: exceptional horse properties with proximity to one of North Carolina's most popular lakes.</p>

      <h2>The Appeal of Lake Norman Living</h2>
      <p>Lake Norman, the largest man-made lake in North Carolina, provides endless recreational opportunities. Horse property owners in the area enjoy not only riding but also boating, fishing, and lakefront dining.</p>

      <h2>Property Characteristics</h2>
      <p>Horse properties in the Mooresville area range from 10-acre hobby farms to large estates exceeding 50 acres. Some rare properties offer both horse facilities and lake access or views.</p>

      <h2>Climate and Riding Season</h2>
      <p>The moderate climate allows for nearly year-round outdoor riding. Summers can be warm but are tempered by lake breezes, while winters are typically mild with occasional cold snaps.</p>

      <h2>Equestrian Community</h2>
      <p>A strong equestrian community has developed in the Mooresville area, with active clubs, regular shows, and group trail riding opportunities. The mix of disciplines creates a diverse and welcoming horse community.</p>

      <h2>Investment Potential</h2>
      <p>Lake Norman-area properties have shown strong appreciation over time. The combination of equestrian facilities and lake proximity makes these properties particularly desirable to a wide range of buyers.</p>
    `,
    featuredImage: "/images/blog/mooresville-guide.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "area-guides",
    tags: ["mooresville", "lake-norman", "waterfront"],
    publishedAt: "2024-11-20",
    readTime: 6,
  },
  {
    id: "7",
    slug: "pasture-management-tips-sellers",
    title: "Pasture Management Tips for Sellers: Show Your Land at Its Best",
    excerpt:
      "Learn how proper pasture maintenance can significantly impact buyer perception and your property's market value.",
    content: `
      <p>When selling a horse property, the condition of your pastures speaks volumes about how well the entire property has been maintained. Here's how to ensure your land makes the best impression on potential buyers.</p>

      <h2>Assess Current Conditions</h2>
      <p>Walk your pastures with a critical eye. Note bare spots, weed infestations, drainage issues, and fence conditions. Creating an improvement plan several months before listing will yield the best results.</p>

      <h2>Soil Testing and Fertilization</h2>
      <p>A soil test can reveal nutrient deficiencies that, when corrected, will dramatically improve pasture appearance. Proper fertilization encourages thick grass growth that buyers love to see.</p>

      <h2>Overseeding</h2>
      <p>Overseed thin areas with appropriate grass varieties for your region. Fall is typically the best time for overseeding in the Charlotte area, followed by early spring.</p>

      <h2>Weed Control</h2>
      <p>Address problematic weeds, particularly any toxic plants that could harm horses. A clean, well-maintained pasture suggests the same attention to detail throughout the property.</p>

      <h2>Rotation and Rest</h2>
      <p>If possible, implement rotational grazing to allow pastures to recover. Consider temporarily reducing horse numbers or dry lot feeding to give pastures time to improve before listing.</p>

      <h2>The Payoff</h2>
      <p>Investment in pasture improvement typically returns multiple times its cost in property value and reduced time on market. Buyers immediately recognize quality land management.</p>
    `,
    featuredImage: "/images/blog/pasture-management.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "selling-tips",
    tags: ["pasture", "land-management", "selling"],
    publishedAt: "2024-11-15",
    readTime: 5,
  },
  {
    id: "8",
    slug: "understanding-equestrian-zoning",
    title: "Understanding Equestrian Zoning Laws in North Carolina",
    excerpt:
      "Navigate the complexities of zoning regulations, including minimum acreage requirements and permitted agricultural uses.",
    content: `
      <p>Understanding zoning regulations is crucial when buying or selling horse property in North Carolina. Here's what you need to know about the legal framework governing equestrian land use.</p>

      <h2>County Variations</h2>
      <p>Zoning regulations vary significantly by county. What's permitted in Union County may differ from Mecklenburg or Iredell. Always verify local regulations before making assumptions.</p>

      <h2>Agricultural Zoning</h2>
      <p>Most horse properties fall under agricultural zoning classifications. These typically allow for horse keeping, breeding, and related activities. Some require minimum acreages for commercial operations.</p>

      <h2>Horses Per Acre</h2>
      <p>Many jurisdictions specify the maximum number of horses permitted per acre. Common requirements range from 1 horse per 2 acres to 2 horses per acre, depending on the zone and property characteristics.</p>

      <h2>Boarding and Training</h2>
      <p>Operating a boarding or training business may require additional permits or specific zoning. Commercial equestrian operations often face more stringent requirements than private horse keeping.</p>

      <h2>Setback Requirements</h2>
      <p>Barns and other agricultural structures typically must meet specific setback requirements from property lines and roads. Understanding these before purchasing prevents costly surprises.</p>

      <h2>Working with Professionals</h2>
      <p>Consult with local planning departments and work with a real estate agent familiar with equestrian zoning. This due diligence protects your investment and future plans.</p>
    `,
    featuredImage: "/images/blog/zoning-laws.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "buying-guide",
    tags: ["zoning", "regulations", "legal"],
    publishedAt: "2024-11-10",
    readTime: 9,
  },
];

// Format date helper
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get category label helper
function getCategoryLabel(categoryId: string): string {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.label : categoryId;
}

// Get category color classes
function getCategoryStyles(categoryId: string): string {
  switch (categoryId) {
    case "buying-guide":
      return "bg-forest-100 text-forest-700";
    case "selling-tips":
      return "bg-saddle-100 text-saddle-700";
    case "area-guides":
      return "bg-gold-100 text-gold-700";
    case "market-updates":
      return "bg-cream-200 text-forest-700";
    default:
      return "bg-forest-100 text-forest-700";
  }
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
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
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
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm border border-forest-100 hover:shadow-md transition-all"
    >
      <div className="relative aspect-[16/9] bg-gradient-to-br from-forest-100 to-forest-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-forest-300" />
        </div>
      </div>
      <div className="p-4">
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${getCategoryStyles(
            post.category
          )}`}
        >
          {getCategoryLabel(post.category)}
        </span>
        <h4 className="text-sm font-semibold text-forest-900 line-clamp-2 group-hover:text-saddle-700 transition-colors">
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

// Main Blog Detail Page
export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the post by slug
  const post = mockBlogPosts.find((p) => p.slug === slug);

  // Get related posts (same category, excluding current)
  const relatedPosts = post
    ? mockBlogPosts
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 3)
    : [];

  // If no matching related posts, get recent posts
  const displayRelatedPosts =
    relatedPosts.length > 0
      ? relatedPosts
      : mockBlogPosts.filter((p) => p.id !== post?.id).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center px-4">
          <BookOpen className="w-16 h-16 text-forest-200 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-forest-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-forest-600 mb-6">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link href="/blog" className="btn-primary inline-flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-24 h-24 text-forest-300" />
          </div>
          <div className="absolute top-6 left-6">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${getCategoryStyles(
                post.category
              )}`}
            >
              {getCategoryLabel(post.category)}
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
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-forest-900 mb-6">
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRelatedPosts.map((relatedPost) => (
              <RelatedPostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>

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
