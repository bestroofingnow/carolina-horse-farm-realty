export interface Property {
  id: string;
  mlsNumber: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  acreage: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  description: string;
  images: string[];
  features: string[];
  equestrianAmenities: EquestrianAmenities;
  listingAgent: Agent;
  status: 'active' | 'pending' | 'sold';
  listDate: string;
  propertyType: 'farm' | 'ranch' | 'estate' | 'land';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EquestrianAmenities {
  stalls: number;
  hasIndoorArena: boolean;
  hasOutdoorArena: boolean;
  pastures: number;
  pastureAcreage: number;
  hasTackRoom: boolean;
  hasFeedRoom: boolean;
  hasWashRack: boolean;
  hasRoundPen: boolean;
  fencingType: string[];
  waterSource: string[];
  barnSquareFeet?: number;
  additionalStructures: string[];
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  photo: string;
  bio: string;
  specialties: string[];
  licenseNumber: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  photo: string;
  bio: string;
  specialties: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyInterest?: string;
  message: string;
  preferredContact: 'email' | 'phone';
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minAcreage?: number;
  maxAcreage?: number;
  minStalls?: number;
  city?: string;
  hasIndoorArena?: boolean;
  hasOutdoorArena?: boolean;
  propertyType?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  propertyType: string;
  photo?: string;
  rating: number;
}
