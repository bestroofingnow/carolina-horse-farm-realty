import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
});

const siteUrl = 'https://carolinahorsefarmrealty.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Carolina Horse Farm Realty | Equestrian Properties in NC & SC',
    template: '%s | Carolina Horse Farm Realty',
  },
  description:
    'Specializing in horse farms, equestrian estates, and land for horses in North & South Carolina. Expert equestrian real estate agents serving Charlotte, Tryon, Waxhaw, and the greater Carolinas. Brokered by eXp Realty.',
  keywords: [
    'horse farm for sale NC',
    'equestrian property North Carolina',
    'horse farm Charlotte NC',
    'equestrian real estate agent',
    'horse property for sale',
    'horse farm Tryon NC',
    'equestrian estate Carolina',
    'buy horse farm NC',
    'horse land for sale',
    'horse barn property NC',
    'Carolina horse farm realty',
    'eXp Realty Land and Ranch',
  ],
  authors: [{ name: 'Lara Murphy', url: siteUrl + '/about' }],
  creator: 'Carolina Horse Farm Realty',
  publisher: 'Carolina Horse Farm Realty',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Carolina Horse Farm Realty',
    title: 'Carolina Horse Farm Realty | Equestrian Properties in NC & SC',
    description:
      'Specializing in horse farms, equestrian estates, and land for horses in North & South Carolina. 15+ years of expert equestrian real estate service.',
    images: [
      {
        url: '/videos/hero-poster.jpg',
        width: 1200,
        height: 630,
        alt: 'Carolina Horse Farm Realty - Equestrian Properties',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carolina Horse Farm Realty | Equestrian Properties in NC & SC',
    description:
      'Specializing in horse farms, equestrian estates, and land for horses in North & South Carolina.',
    images: ['/videos/hero-poster.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
  category: 'Real Estate',
};

// Global JSON-LD: Organization + LocalBusiness + RealEstateAgent
function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['RealEstateAgent', 'LocalBusiness'],
        '@id': `${siteUrl}/#organization`,
        name: 'Carolina Horse Farm Realty',
        alternateName: 'Carolina Horse Farm Realty - eXp Realty Land & Ranch',
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        image: `${siteUrl}/videos/hero-poster.jpg`,
        description:
          'Specializing in horse farms, equestrian estates, and land for horses in North & South Carolina. Brokered by eXp Realty Land & Ranch.',
        telephone: '+1-704-929-3289',
        email: 'info@carolinahorsefarmrealty.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Equestrian Way',
          addressLocality: 'Charlotte',
          addressRegion: 'NC',
          postalCode: '28277',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 35.0527,
          longitude: -80.8432,
        },
        areaServed: [
          { '@type': 'State', name: 'North Carolina' },
          { '@type': 'State', name: 'South Carolina' },
          { '@type': 'City', name: 'Charlotte' },
          { '@type': 'City', name: 'Tryon' },
          { '@type': 'City', name: 'Waxhaw' },
          { '@type': 'City', name: 'Columbus' },
          { '@type': 'City', name: 'Mill Spring' },
          { '@type': 'City', name: 'Mooresville' },
          { '@type': 'City', name: 'Matthews' },
          { '@type': 'City', name: 'Rutherfordton' },
          { '@type': 'City', name: 'Forest City' },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        priceRange: '$289,900 - $4,995,000',
        currenciesAccepted: 'USD',
        paymentAccepted: 'Cash, Check, Financing',
        sameAs: [
          'https://facebook.com',
          'https://instagram.com',
          'https://linkedin.com',
        ],
        parentOrganization: {
          '@type': 'RealEstateAgent',
          name: 'eXp Realty Land & Ranch',
          url: 'https://www.exprealty.com',
        },
        founder: {
          '@type': 'Person',
          '@id': `${siteUrl}/#lara-murphy`,
          name: 'Lara Murphy',
          jobTitle: 'Broker / Owner',
          telephone: '+1-704-929-3289',
          email: 'lara@carolinahorsefarmrealty.com',
          worksFor: { '@id': `${siteUrl}/#organization` },
          knowsAbout: [
            'Equestrian Real Estate',
            'Horse Farms',
            'Equestrian Estates',
            'Horse Property Evaluation',
            'Pasture Management',
            'Barn Construction',
            'Equestrian Zoning',
          ],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '200',
          bestRating: '5',
        },
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 3 },
        foundingDate: '2010',
        slogan: 'Your trusted partner in equestrian real estate',
        knowsAbout: [
          'Horse Farms',
          'Equestrian Properties',
          'Horse Property Evaluation',
          'Equestrian Facilities Assessment',
          'Barn and Arena Construction',
          'Pasture Management',
          'Equestrian Zoning Regulations',
          'Horse Trail Access',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Carolina Horse Farm Realty',
        publisher: { '@id': `${siteUrl}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/properties?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel="preconnect" href="https://blog.carolinahorsefarmrealty.com" />
        <link rel="preconnect" href="https://storage.googleapis.com" />
        <link rel="dns-prefetch" href="https://blog.carolinahorsefarmrealty.com" />
        <link rel="dns-prefetch" href="https://storage.googleapis.com" />
        <OrganizationSchema />
      </head>
      <body className={`${playfair.variable} ${lato.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
