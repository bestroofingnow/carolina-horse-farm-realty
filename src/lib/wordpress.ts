/**
 * WordPress GraphQL Service for Carolina Horse Farm Realty
 *
 * This service provides integration with WordPress via WPGraphQL plugin.
 * It gracefully falls back to mock data when WordPress is not configured.
 *
 * ============================================================================
 * SETUP INSTRUCTIONS
 * ============================================================================
 *
 * 1. WORDPRESS SETUP:
 *    - Install WordPress (https://wordpress.org)
 *    - Install and activate the WPGraphQL plugin:
 *      https://wordpress.org/plugins/wp-graphql/
 *    - Optionally install WPGraphQL for ACF if using Advanced Custom Fields
 *
 * 2. ENVIRONMENT CONFIGURATION:
 *    Create a .env.local file in your project root with:
 *
 *    WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
 *
 *    Note: The WPGraphQL endpoint is typically at /graphql
 *
 * 3. CORS CONFIGURATION:
 *    Add to your WordPress theme's functions.php or use a CORS plugin:
 *
 *    add_action('graphql_init', function() {
 *      add_filter('graphql_response_headers_to_send', function($headers) {
 *        return array_merge($headers, [
 *          'Access-Control-Allow-Origin' => 'https://your-frontend-domain.com',
 *          'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS',
 *          'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
 *          'Access-Control-Allow-Credentials' => 'true',
 *        ]);
 *      });
 *    });
 *
 *    For development, you can use '*' for Access-Control-Allow-Origin,
 *    but always restrict it in production.
 *
 * 4. WPGRAPHQL SETTINGS:
 *    In WordPress Admin -> GraphQL -> Settings:
 *    - Enable "Public Introspection" for development
 *    - Configure "Show in GraphQL" for desired post types
 *    - Test queries at /wp-admin/admin.php?page=graphiql-ide
 *
 * ============================================================================
 */

import { BlogPost } from "@/types";

// ============================================================================
// CONFIGURATION
// ============================================================================

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

/**
 * Check if WordPress is configured
 */
export const isWordPressConfigured = (): boolean => {
  return Boolean(WORDPRESS_API_URL);
};

// ============================================================================
// TYPESCRIPT TYPES FOR WORDPRESS/WPGRAPHQL
// ============================================================================

/**
 * WordPress Featured Image from WPGraphQL
 */
export interface WPFeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails?: {
      width: number;
      height: number;
    };
  };
}

/**
 * WordPress Author from WPGraphQL
 */
export interface WPAuthor {
  node: {
    id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    avatar?: {
      url: string;
    };
    description?: string;
  };
}

/**
 * WordPress Category from WPGraphQL
 */
export interface WPCategory {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  parent?: {
    node: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

/**
 * WordPress Post from WPGraphQL
 */
export interface WPPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  modified: string;
  excerpt: string;
  content: string;
  featuredImage?: WPFeaturedImage;
  author: WPAuthor;
  categories: {
    edges: Array<{
      node: WPCategory;
    }>;
  };
  tags?: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        slug: string;
      };
    }>;
  };
}

/**
 * GraphQL Response wrapper types
 */
interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

interface PostsQueryResponse {
  posts: {
    edges: Array<{
      node: WPPost;
    }>;
  };
}

interface PostBySlugQueryResponse {
  post: WPPost | null;
}

interface CategoriesQueryResponse {
  categories: {
    edges: Array<{
      node: WPCategory;
    }>;
  };
}

// ============================================================================
// GRAPHQL QUERIES
// ============================================================================

/**
 * Query to get all blog posts with essential fields
 */
const GET_ALL_POSTS = `
  query GetAllPosts($first: Int = 100) {
    posts(first: $first, where: { status: PUBLISH }) {
      edges {
        node {
          id
          databaseId
          title
          slug
          date
          modified
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          author {
            node {
              id
              name
              firstName
              lastName
              avatar {
                url
              }
            }
          }
          categories {
            edges {
              node {
                id
                databaseId
                name
                slug
              }
            }
          }
          tags {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Query to get a single post by slug with full content
 */
const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      date
      modified
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      author {
        node {
          id
          name
          firstName
          lastName
          avatar {
            url
          }
          description
        }
      }
      categories {
        edges {
          node {
            id
            databaseId
            name
            slug
            description
          }
        }
      }
      tags {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

/**
 * Query to get all blog categories
 */
const GET_ALL_CATEGORIES = `
  query GetAllCategories {
    categories(first: 100) {
      edges {
        node {
          id
          databaseId
          name
          slug
          description
          count
          parent {
            node {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

// ============================================================================
// GRAPHQL FETCH FUNCTION
// ============================================================================

/**
 * Makes a GraphQL request to WordPress/WPGraphQL
 *
 * @param query - The GraphQL query string
 * @param variables - Optional variables for the query
 * @returns The GraphQL response data
 * @throws Error if WordPress is not configured or request fails
 */
async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!WORDPRESS_API_URL) {
    throw new Error(
      "WordPress API URL not configured. Set WORDPRESS_API_URL environment variable."
    );
  }

  try {
    const response = await fetch(WORDPRESS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      // Enable caching with revalidation for Next.js
      next: {
        revalidate: 60, // Revalidate every 60 seconds
      },
    });

    if (!response.ok) {
      throw new Error(
        `WordPress API request failed: ${response.status} ${response.statusText}`
      );
    }

    const json: GraphQLResponse<T> = await response.json();

    if (json.errors) {
      const errorMessages = json.errors.map((e) => e.message).join(", ");
      throw new Error(`GraphQL errors: ${errorMessages}`);
    }

    if (!json.data) {
      throw new Error("No data returned from WordPress GraphQL API");
    }

    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch from WordPress: ${error.message}`);
    }
    throw new Error("Unknown error occurred while fetching from WordPress");
  }
}

// ============================================================================
// MOCK DATA FOR DEVELOPMENT/DEMO
// ============================================================================

/**
 * Mock blog posts for development when WordPress is not configured
 */
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "essential-guide-to-buying-horse-property",
    title: "The Essential Guide to Buying Horse Property in North Carolina",
    excerpt:
      "Discover everything you need to know before purchasing your dream equestrian property in the Carolinas, from land considerations to barn requirements.",
    content: `
      <p>Buying a horse property is a significant investment that requires careful consideration of numerous factors. Whether you're a first-time horse owner or an experienced equestrian looking to expand, this guide will help you navigate the process.</p>

      <h2>Location Considerations</h2>
      <p>North Carolina offers diverse landscapes perfect for equestrian properties. From the rolling hills of the Piedmont to the scenic mountains in the west, each region has unique advantages.</p>

      <h2>Land Requirements</h2>
      <p>A general rule is to have at least 2 acres per horse for adequate grazing and exercise. However, this can vary based on your horses' needs and local climate.</p>

      <h2>Essential Facilities</h2>
      <p>Consider these must-haves: adequate barn space, quality fencing, water sources, and proper drainage. Optional but valuable additions include indoor arenas, round pens, and tack rooms.</p>

      <h2>Zoning and Regulations</h2>
      <p>Always verify local zoning laws permit horse keeping. Some areas have restrictions on the number of horses or require special permits for commercial equestrian activities.</p>
    `,
    featuredImage: "/images/blog/horse-property-guide.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "Buying Guide",
    tags: ["Buying Tips", "Horse Property", "North Carolina"],
    publishedAt: "2024-11-15T10:00:00Z",
    readTime: 8,
  },
  {
    id: "2",
    slug: "barn-maintenance-seasonal-checklist",
    title: "Seasonal Barn Maintenance: Your Complete Checklist",
    excerpt:
      "Keep your equestrian facilities in top condition year-round with our comprehensive seasonal maintenance guide.",
    content: `
      <p>Regular barn maintenance is essential for the safety and health of your horses, as well as protecting your property investment.</p>

      <h2>Spring Checklist</h2>
      <ul>
        <li>Inspect and repair fencing after winter weather</li>
        <li>Check and clean gutters and drainage systems</li>
        <li>Service your tractor and farm equipment</li>
        <li>Test and repair water systems</li>
      </ul>

      <h2>Summer Checklist</h2>
      <ul>
        <li>Ensure proper ventilation in barns</li>
        <li>Install or check fly control systems</li>
        <li>Maintain pastures and control weeds</li>
        <li>Check shade structures and trees</li>
      </ul>

      <h2>Fall Checklist</h2>
      <ul>
        <li>Prepare for winter with heater inspections</li>
        <li>Stock up on bedding and hay</li>
        <li>Seal gaps and weatherproof structures</li>
        <li>Service snow removal equipment</li>
      </ul>

      <h2>Winter Checklist</h2>
      <ul>
        <li>Prevent water freezing in troughs</li>
        <li>Monitor for ice and snow accumulation</li>
        <li>Ensure adequate lighting for shorter days</li>
        <li>Check heating systems regularly</li>
      </ul>
    `,
    featuredImage: "/images/blog/barn-maintenance.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "Property Care",
    tags: ["Maintenance", "Barn Care", "Seasonal Tips"],
    publishedAt: "2024-11-01T10:00:00Z",
    readTime: 6,
  },
  {
    id: "3",
    slug: "choosing-right-fencing-horse-property",
    title: "Choosing the Right Fencing for Your Horse Property",
    excerpt:
      "From board fencing to electric, explore the pros and cons of different fencing options for equestrian properties.",
    content: `
      <p>Proper fencing is one of the most critical aspects of any horse property. The right choice depends on your budget, aesthetics, and the temperament of your horses.</p>

      <h2>Board Fencing</h2>
      <p>Traditional and attractive, board fencing is highly visible to horses and provides a solid barrier. It requires regular maintenance but adds significant curb appeal to your property.</p>

      <h2>Vinyl/PVC Fencing</h2>
      <p>Low maintenance and durable, vinyl fencing mimics the look of traditional board fencing without the need for painting or treating. It's more expensive initially but saves on long-term maintenance costs.</p>

      <h2>Electric Fencing</h2>
      <p>Cost-effective and easily reconfigured, electric fencing is excellent for rotational grazing. It's often used as a secondary barrier with other fencing types.</p>

      <h2>Wire Fencing</h2>
      <p>High-tensile wire and no-climb mesh options offer durability at lower costs. Proper installation is crucial to prevent injury.</p>

      <h2>Making Your Choice</h2>
      <p>Consider combining fencing types for optimal results. Many properties use board fencing near the house and road for aesthetics, with electric or wire fencing in back pastures.</p>
    `,
    featuredImage: "/images/blog/horse-fencing.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "Property Features",
    tags: ["Fencing", "Property Features", "Horse Safety"],
    publishedAt: "2024-10-15T10:00:00Z",
    readTime: 5,
  },
  {
    id: "4",
    slug: "understanding-equestrian-property-values",
    title: "Understanding Equestrian Property Values in Today's Market",
    excerpt:
      "Learn what factors influence horse property values and how to assess fair market pricing in the Carolinas.",
    content: `
      <p>Equestrian properties are unique in the real estate market, with values influenced by factors beyond typical residential considerations.</p>

      <h2>Key Value Factors</h2>
      <p>Location remains paramount, but equestrian properties are also valued based on land quality, existing infrastructure, and access to trails or show facilities.</p>

      <h2>Land Quality</h2>
      <p>Soil type, drainage, and pasture condition significantly impact value. Properties with well-maintained, productive pastures command premium prices.</p>

      <h2>Infrastructure</h2>
      <p>Quality barns, arenas, and fencing add substantial value. An indoor arena alone can add hundreds of thousands to a property's worth.</p>

      <h2>Market Trends</h2>
      <p>The equestrian property market in the Carolinas remains strong, driven by the region's favorable climate, lower costs compared to Northeast markets, and proximity to major show circuits.</p>
    `,
    featuredImage: "/images/blog/property-values.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "Market Insights",
    tags: ["Property Values", "Market Analysis", "Investment"],
    publishedAt: "2024-10-01T10:00:00Z",
    readTime: 7,
  },
  {
    id: "5",
    slug: "indoor-arena-considerations",
    title: "Indoor Arena Considerations: Is It Worth the Investment?",
    excerpt:
      "Explore the benefits and costs of adding an indoor riding arena to your equestrian property.",
    content: `
      <p>An indoor arena is often considered the crown jewel of equestrian facilities. But is it the right investment for your property?</p>

      <h2>Benefits of Indoor Arenas</h2>
      <p>Year-round riding regardless of weather, increased property value, potential for revenue generation through boarding or lessons, and protected training environment.</p>

      <h2>Cost Considerations</h2>
      <p>Expect to invest $100,000 to $500,000+ depending on size, features, and local construction costs. Ongoing maintenance, utilities, and footing replacement add to lifetime costs.</p>

      <h2>Size Requirements</h2>
      <p>Standard dressage arena: 66' x 198'. Smaller arenas work for general riding but limit discipline options. Consider future needs when planning.</p>

      <h2>Making the Decision</h2>
      <p>Evaluate your riding frequency, discipline, climate, and whether you plan to offer commercial services. For serious riders in variable climates, an indoor arena often proves invaluable.</p>
    `,
    featuredImage: "/images/blog/indoor-arena.jpg",
    author: {
      name: "Lara Murphy",
      avatar: "/images/team/lara-murphy.jpg",
    },
    category: "Property Features",
    tags: ["Indoor Arena", "Property Features", "Investment"],
    publishedAt: "2024-09-15T10:00:00Z",
    readTime: 6,
  },
];

/**
 * Mock categories for development
 */
const mockCategories: WPCategory[] = [
  {
    id: "cat-1",
    databaseId: 1,
    name: "Buying Guide",
    slug: "buying-guide",
    description: "Tips and guides for purchasing horse property",
    count: 1,
  },
  {
    id: "cat-2",
    databaseId: 2,
    name: "Property Care",
    slug: "property-care",
    description: "Maintenance and care tips for equestrian properties",
    count: 1,
  },
  {
    id: "cat-3",
    databaseId: 3,
    name: "Property Features",
    slug: "property-features",
    description: "Deep dives into equestrian property features and amenities",
    count: 2,
  },
  {
    id: "cat-4",
    databaseId: 4,
    name: "Market Insights",
    slug: "market-insights",
    description: "Market analysis and trends in equestrian real estate",
    count: 1,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate estimated read time from content
 */
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Transform WordPress post to application BlogPost format
 */
function transformWPPostToBlogPost(wpPost: WPPost): BlogPost {
  const primaryCategory =
    wpPost.categories.edges[0]?.node.name || "Uncategorized";
  const tags =
    wpPost.tags?.edges.map((edge) => edge.node.name) || [];

  return {
    id: wpPost.databaseId.toString(),
    slug: wpPost.slug,
    title: wpPost.title,
    excerpt: wpPost.excerpt.replace(/<[^>]*>/g, "").trim(),
    content: wpPost.content || "",
    featuredImage: wpPost.featuredImage?.node.sourceUrl || "/images/blog/default.jpg",
    author: {
      name: wpPost.author.node.name,
      avatar: wpPost.author.node.avatar?.url || "/images/default-avatar.jpg",
    },
    category: primaryCategory,
    tags: tags,
    publishedAt: wpPost.date,
    readTime: calculateReadTime(wpPost.content || wpPost.excerpt),
  };
}

/**
 * Get all blog posts from WordPress or fallback to mock data
 *
 * @returns Array of BlogPost objects
 */
export async function getPosts(): Promise<BlogPost[]> {
  // If WordPress is not configured, return mock data
  if (!isWordPressConfigured()) {
    console.log(
      "[WordPress] API URL not configured, using mock data for posts"
    );
    return mockBlogPosts;
  }

  try {
    const data = await fetchGraphQL<PostsQueryResponse>(GET_ALL_POSTS);
    const posts = data.posts.edges.map((edge) =>
      transformWPPostToBlogPost(edge.node)
    );
    return posts;
  } catch (error) {
    console.error("[WordPress] Failed to fetch posts:", error);
    console.log("[WordPress] Falling back to mock data");
    return mockBlogPosts;
  }
}

/**
 * Get a single blog post by slug from WordPress or fallback to mock data
 *
 * @param slug - The post slug to fetch
 * @returns BlogPost object or null if not found
 */
export async function getPost(slug: string): Promise<BlogPost | null> {
  // If WordPress is not configured, search mock data
  if (!isWordPressConfigured()) {
    console.log(
      `[WordPress] API URL not configured, using mock data for post: ${slug}`
    );
    return mockBlogPosts.find((post) => post.slug === slug) || null;
  }

  try {
    console.log(`[WordPress] Fetching post by slug: "${slug}"`);
    const data = await fetchGraphQL<PostBySlugQueryResponse>(GET_POST_BY_SLUG, {
      slug,
    });

    if (!data.post) {
      console.warn(`[WordPress] No post found for slug: "${slug}"`);
      // Try to find in mock data as final fallback
      const mockPost = mockBlogPosts.find((post) => post.slug === slug);
      if (mockPost) {
        console.log(`[WordPress] Found post "${slug}" in mock data`);
        return mockPost;
      }
      return null;
    }

    console.log(`[WordPress] Successfully fetched post: "${data.post.title}"`);
    return transformWPPostToBlogPost(data.post);
  } catch (error) {
    console.error(`[WordPress] Failed to fetch post "${slug}":`, error);
    console.log("[WordPress] Falling back to mock data");
    return mockBlogPosts.find((post) => post.slug === slug) || null;
  }
}

/**
 * Get all blog categories from WordPress or fallback to mock data
 *
 * @returns Array of WPCategory objects
 */
export async function getCategories(): Promise<WPCategory[]> {
  // If WordPress is not configured, return mock data
  if (!isWordPressConfigured()) {
    console.log(
      "[WordPress] API URL not configured, using mock data for categories"
    );
    return mockCategories;
  }

  try {
    const data = await fetchGraphQL<CategoriesQueryResponse>(GET_ALL_CATEGORIES);
    return data.categories.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("[WordPress] Failed to fetch categories:", error);
    console.log("[WordPress] Falling back to mock data");
    return mockCategories;
  }
}

/**
 * Get posts by category slug
 *
 * @param categorySlug - The category slug to filter by
 * @returns Array of BlogPost objects in that category
 */
export async function getPostsByCategory(
  categorySlug: string
): Promise<BlogPost[]> {
  const allPosts = await getPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
  );
}

/**
 * Search posts by query string
 *
 * @param query - Search query string
 * @returns Array of matching BlogPost objects
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getPosts();
  const searchLower = query.toLowerCase();

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
  );
}

/**
 * Get related posts based on category and tags
 *
 * @param currentPost - The current post to find related posts for
 * @param limit - Maximum number of related posts to return
 * @returns Array of related BlogPost objects
 */
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getPosts();

  // Filter out the current post and score remaining posts
  const scoredPosts = allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      let score = 0;

      // Same category gets highest score
      if (post.category === currentPost.category) {
        score += 10;
      }

      // Shared tags increase score
      const sharedTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      );
      score += sharedTags.length * 3;

      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map((item) => item.post);
}
