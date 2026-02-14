import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/wordpress';
import { mockProperties } from '@/lib/mock-data';
import { serviceAreas } from '@/lib/service-areas';

const siteUrl = 'https://carolinahorsefarmrealty.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/estimate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/areas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Property detail pages
  const propertyPages: MetadataRoute.Sitemap = mockProperties.map((property) => ({
    url: `${siteUrl}/properties/${property.id}`,
    lastModified: new Date(property.listDate),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Service area pages
  const areaPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${siteUrl}/areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog post pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    blogPages = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    // If WordPress is unavailable, skip blog pages
  }

  return [...staticPages, ...propertyPages, ...areaPages, ...blogPages];
}
