/**
 * MLS Grid API Service for Carolina Horse Farm Realty
 *
 * This service provides integration with MLS Grid (www.mlsgrid.com) to fetch
 * real estate listings from Canopy MLS. It follows the RESO (Real Estate Standards
 * Organization) Data Dictionary standard for property data.
 *
 * ============================================================================
 * HOW TO REGISTER WITH MLS GRID
 * ============================================================================
 *
 * MLS Grid is the data aggregator for Canopy MLS (and many other MLSs). To get
 * access to Canopy MLS data via MLS Grid:
 *
 * 1. Visit www.mlsgrid.com/resources to sign up
 * 2. Complete the MLS Grid registration form
 * 3. You'll need to provide:
 *    - Your brokerage information
 *    - MLS membership details (Canopy MLS member ID)
 *    - Technical contact information
 * 4. MLS Grid will provision API credentials after approval
 *
 * ============================================================================
 * CANOPY MLS IDX LICENSING PROCESS
 * ============================================================================
 *
 * Canopy MLS offers two IDX options:
 *
 * OPTION 1: Frameable IDX Search Tool
 * -----------------------------------
 * - Embed Canopy's pre-built search interface on your website
 * - Easier setup, less customization
 * - Contact Canopy MLS for iframe embed code
 * - Good for quick implementation
 *
 * OPTION 2: Data Feed via Web API (This Service)
 * ----------------------------------------------
 * - Full programmatic access to MLS data via MLS Grid
 * - Maximum flexibility and customization
 * - Requires IDX license from Canopy MLS
 * - Must comply with Canopy MLS IDX rules and RESO standards
 *
 * To obtain IDX access:
 * 1. Contact Canopy MLS directly (you must be a member)
 * 2. Request IDX data feed access
 * 3. Sign IDX license agreement
 * 4. Once approved, sign up with MLS Grid at www.mlsgrid.com/resources
 * 5. MLS Grid will provide API credentials
 *
 * ============================================================================
 * REQUIRED ENVIRONMENT VARIABLES
 * ============================================================================
 *
 * Add these to your .env.local file:
 *
 * MLS_GRID_API_URL=https://api.mlsgrid.com/v2
 * MLS_GRID_API_KEY=your_api_key_here
 *
 * The API URL defaults to MLS Grid's production endpoint.
 * The API Key is provided by MLS Grid after registration.
 *
 * ============================================================================
 * RESO DATA DICTIONARY COMPLIANCE
 * ============================================================================
 *
 * This service uses RESO Data Dictionary 1.7+ field names. The RESO standard
 * ensures consistent data across different MLS systems. Key fields include:
 *
 * - ListingKey: Unique identifier for the listing
 * - ListPrice: Current listing price
 * - PropertyType: Type of property (Residential, Land, Farm/Ranch, etc.)
 * - StandardStatus: Listing status (Active, Pending, Closed, etc.)
 * - BedroomsTotal: Total number of bedrooms
 * - BathroomsTotal: Total number of bathrooms
 * - LotSizeAcres: Property size in acres
 *
 * For equestrian properties, we also map custom fields that may be available
 * in the MLS data under "Remarks" or custom equestrian-specific fields.
 *
 * Full RESO Data Dictionary: https://ddwiki.reso.org/
 *
 * ============================================================================
 */

import { Property, PropertyFilters, EquestrianAmenities, Agent } from '@/types';
import { mockProperties, mockAgent } from './mock-data';

// ============================================================================
// MLS Grid Configuration
// ============================================================================

/**
 * MLS Grid API configuration
 * Uses environment variables for API URL and authentication key
 */
const MLS_GRID_CONFIG = {
  apiUrl: process.env.MLS_GRID_API_URL || 'https://api.mlsgrid.com/v2',
  apiKey: process.env.MLS_GRID_API_KEY || '',

  // Default query parameters for Canopy MLS equestrian properties
  defaultParams: {
    // Filter for active listings only
    '$filter': "StandardStatus eq 'Active'",
    // Request specific fields to reduce payload size
    '$select': 'ListingKey,ListingId,ListPrice,PropertyType,PropertySubType,StandardStatus,StreetNumber,StreetName,StreetSuffix,City,StateOrProvince,PostalCode,BedroomsTotal,BathroomsTotalInteger,LotSizeAcres,LivingArea,YearBuilt,PublicRemarks,PrivateRemarks,ListAgentKey,PhotosCount,Latitude,Longitude,ModificationTimestamp',
  },
};

// ============================================================================
// MLS Grid RESO Standard Types
// ============================================================================

/**
 * MLSListing interface following RESO Data Dictionary standard
 * These field names match the official RESO specification for maximum compatibility
 *
 * Reference: https://ddwiki.reso.org/display/DDW17/RESO+Data+Dictionary+1.7
 */
export interface MLSListing {
  // Primary Identifiers
  /** Unique system identifier for the listing (RESO required) */
  ListingKey: string;
  /** MLS-specific listing ID (may differ from ListingKey) */
  ListingId?: string;
  /** Original entry timestamp */
  OriginalEntryTimestamp?: string;
  /** Last modification timestamp */
  ModificationTimestamp?: string;

  // Pricing
  /** Current list price */
  ListPrice: number;
  /** Original list price */
  OriginalListPrice?: number;
  /** Price per square foot */
  PricePerSquareFoot?: number;

  // Property Classification
  /** Primary property type (Residential, Land, Farm, etc.) */
  PropertyType: string;
  /** Property subtype for more specific classification */
  PropertySubType?: string;
  /** Listing status (Active, Pending, Closed, etc.) */
  StandardStatus: string;

  // Location - Address Fields
  /** Street number */
  StreetNumber?: string;
  /** Street name */
  StreetName?: string;
  /** Street suffix (St, Ave, Rd, etc.) */
  StreetSuffix?: string;
  /** Unit number if applicable */
  UnitNumber?: string;
  /** City name */
  City: string;
  /** State or province abbreviation */
  StateOrProvince: string;
  /** Postal/ZIP code */
  PostalCode: string;
  /** County name */
  County?: string;
  /** Country */
  Country?: string;

  // Location - Coordinates
  /** Latitude coordinate */
  Latitude?: number;
  /** Longitude coordinate */
  Longitude?: number;

  // Property Details
  /** Total number of bedrooms */
  BedroomsTotal: number;
  /** Total bathrooms as integer */
  BathroomsTotalInteger?: number;
  /** Total bathrooms as decimal (e.g., 2.5) */
  BathroomsTotalDecimal?: number;
  /** Full bathrooms count */
  BathroomsFull?: number;
  /** Half bathrooms count */
  BathroomsHalf?: number;
  /** Total living area in square feet */
  LivingArea?: number;
  /** Lot size in acres (crucial for horse properties) */
  LotSizeAcres?: number;
  /** Lot size in square feet */
  LotSizeSquareFeet?: number;
  /** Year the structure was built */
  YearBuilt?: number;

  // Descriptions and Remarks
  /** Public marketing remarks */
  PublicRemarks?: string;
  /** Private agent remarks (not displayed publicly) */
  PrivateRemarks?: string;
  /** Directions to property */
  Directions?: string;

  // Media
  /** Count of available photos */
  PhotosCount?: number;
  /** Array of media/photo objects */
  Media?: MLSMedia[];

  // Agent Information
  /** Listing agent's unique key */
  ListAgentKey?: string;
  /** Listing agent's MLS ID */
  ListAgentMlsId?: string;
  /** Listing agent's full name */
  ListAgentFullName?: string;
  /** Listing agent's phone */
  ListAgentDirectPhone?: string;
  /** Listing agent's email */
  ListAgentEmail?: string;

  // Office Information
  /** Listing office key */
  ListOfficeKey?: string;
  /** Listing office name */
  ListOfficeName?: string;
  /** Listing office phone */
  ListOfficePhone?: string;

  // Dates
  /** Date listing was entered */
  ListingContractDate?: string;
  /** Closing date if sold */
  CloseDate?: string;
  /** Days on market */
  DaysOnMarket?: number;

  // Features (arrays of strings per RESO)
  /** Architectural style */
  ArchitecturalStyle?: string[];
  /** Interior features */
  InteriorFeatures?: string[];
  /** Exterior features */
  ExteriorFeatures?: string[];
  /** Appliances included */
  Appliances?: string[];
  /** Heating type */
  Heating?: string[];
  /** Cooling type */
  Cooling?: string[];
  /** Parking features */
  ParkingFeatures?: string[];
  /** Pool features */
  PoolFeatures?: string[];
  /** View description */
  View?: string[];
  /** Water source */
  WaterSource?: string[];
  /** Sewer type */
  Sewer?: string[];
  /** Fencing type */
  Fencing?: string[];
  /** Lot features */
  LotFeatures?: string[];
  /** Community features */
  CommunityFeatures?: string[];

  // ============================================================================
  // Equestrian-Specific Custom Fields
  // ============================================================================
  // These fields may be available as custom MLS fields or extracted from remarks
  // Check with Canopy MLS for exact field names in their system

  /** Number of horse stalls */
  HorseStalls?: number;
  /** Indoor arena presence */
  HorseIndoorArena?: boolean;
  /** Outdoor arena presence */
  HorseOutdoorArena?: boolean;
  /** Number of pastures */
  HorsePastures?: number;
  /** Pasture acreage */
  HorsePastureAcreage?: number;
  /** Has tack room */
  HorseTackRoom?: boolean;
  /** Has feed room */
  HorseFeedRoom?: boolean;
  /** Has wash rack */
  HorseWashRack?: boolean;
  /** Has round pen */
  HorseRoundPen?: boolean;
  /** Fencing types for horses */
  HorseFencing?: string[];
  /** Barn square footage */
  HorseBarnSqFt?: number;
  /** Additional equestrian structures */
  HorseStructures?: string[];
  /** Is the property horse-friendly/allowed */
  HorsesAllowed?: boolean;
  /** Horse amenities as a comma-separated string (common MLS format) */
  HorseAmenities?: string;
}

/**
 * MLS Media object for photos and virtual tours
 */
export interface MLSMedia {
  /** Unique media identifier */
  MediaKey: string;
  /** URL to the media resource */
  MediaURL: string;
  /** Type of media (Photo, VirtualTour, etc.) */
  MediaType?: string;
  /** Display order */
  Order?: number;
  /** Caption/description */
  ShortDescription?: string;
}

/**
 * MLS Grid API Response wrapper
 */
export interface MLSGridResponse<T> {
  /** OData context URL */
  '@odata.context'?: string;
  /** Next page link for pagination */
  '@odata.nextLink'?: string;
  /** Total count of records */
  '@odata.count'?: number;
  /** Array of results */
  value: T[];
}

/**
 * Error response from MLS Grid API
 */
export interface MLSGridError {
  error: {
    code: string;
    message: string;
    details?: Array<{
      code: string;
      message: string;
      target?: string;
    }>;
  };
}

// ============================================================================
// API Helper Functions
// ============================================================================

/**
 * Check if MLS Grid API is configured with valid credentials
 * Returns true only if API key is present in environment
 */
function isMLSGridConfigured(): boolean {
  return Boolean(MLS_GRID_CONFIG.apiKey && MLS_GRID_CONFIG.apiKey.length > 0);
}

/**
 * Build authorization headers for MLS Grid API requests
 * MLS Grid uses Bearer token authentication
 */
function getAuthHeaders(): HeadersInit {
  return {
    'Authorization': `Bearer ${MLS_GRID_CONFIG.apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

/**
 * Build URL with query parameters for MLS Grid API
 * Handles OData-style query parameters ($filter, $select, $orderby, etc.)
 */
function buildAPIUrl(endpoint: string, params?: Record<string, string>): string {
  const url = new URL(endpoint, MLS_GRID_CONFIG.apiUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  return url.toString();
}

/**
 * Generic fetch wrapper for MLS Grid API calls
 * Handles authentication, error handling, and response parsing
 *
 * @param endpoint - API endpoint path
 * @param params - Optional query parameters
 * @returns Parsed response or throws error
 */
async function fetchFromMLSGrid<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  const url = buildAPIUrl(endpoint, params);

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
    // Cache for 5 minutes to reduce API calls
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const errorBody = await response.json() as MLSGridError;
    throw new Error(
      `MLS Grid API Error (${response.status}): ${errorBody.error?.message || response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

// ============================================================================
// Mapper Function: MLS Grid to Property Type
// ============================================================================

/**
 * Maps an MLSListing from MLS Grid format to our internal Property type
 *
 * This function handles the conversion between RESO standard fields and
 * our application's Property interface. It also extracts equestrian-specific
 * data from custom fields or parses it from remarks.
 *
 * @param listing - Raw MLS listing in RESO format
 * @returns Property object formatted for our application
 */
export function mapMLSToProperty(listing: MLSListing): Property {
  // Construct full address from components
  const addressParts = [
    listing.StreetNumber,
    listing.StreetName,
    listing.StreetSuffix,
  ].filter(Boolean);
  const address = addressParts.join(' ') || 'Address Not Available';

  // Map property type from MLS classification to our types
  const propertyTypeMap: Record<string, Property['propertyType']> = {
    'Farm': 'farm',
    'Farm/Ranch': 'farm',
    'Ranch': 'ranch',
    'Residential': 'estate',
    'Single Family': 'estate',
    'Land': 'land',
    'Lots/Land': 'land',
  };

  // Map status from RESO StandardStatus to our status type
  const statusMap: Record<string, Property['status']> = {
    'Active': 'active',
    'Active Under Contract': 'pending',
    'Pending': 'pending',
    'Closed': 'sold',
    'Sold': 'sold',
  };

  // Extract equestrian amenities from custom fields or parse from remarks
  const equestrianAmenities = extractEquestrianAmenities(listing);

  // Combine features from various MLS feature arrays
  const features: string[] = [
    ...(listing.InteriorFeatures || []),
    ...(listing.ExteriorFeatures || []),
    ...(listing.PoolFeatures || []),
    ...(listing.View || []),
  ].slice(0, 10); // Limit to 10 features for display

  // Get primary image URL or use placeholder
  const images = listing.Media?.map(m => m.MediaURL) || ['/images/properties/placeholder.jpg'];

  // Create the Property object
  const property: Property = {
    id: listing.ListingKey,
    mlsNumber: listing.ListingId || listing.ListingKey,
    title: generatePropertyTitle(listing),
    address,
    city: listing.City || 'Unknown',
    state: listing.StateOrProvince || 'NC',
    zipCode: listing.PostalCode || '',
    price: listing.ListPrice || 0,
    acreage: listing.LotSizeAcres || 0,
    bedrooms: listing.BedroomsTotal || 0,
    bathrooms: listing.BathroomsTotalDecimal || listing.BathroomsTotalInteger || 0,
    squareFeet: listing.LivingArea || 0,
    yearBuilt: listing.YearBuilt || 0,
    description: listing.PublicRemarks || 'No description available.',
    images,
    features,
    equestrianAmenities,
    listingAgent: mapListingAgent(listing),
    status: statusMap[listing.StandardStatus] || 'active',
    listDate: listing.ListingContractDate || new Date().toISOString().split('T')[0],
    propertyType: propertyTypeMap[listing.PropertyType] ||
                  propertyTypeMap[listing.PropertySubType || ''] ||
                  'farm',
    coordinates: listing.Latitude && listing.Longitude
      ? { lat: listing.Latitude, lng: listing.Longitude }
      : undefined,
  };

  return property;
}

/**
 * Generate a descriptive title for the listing
 * Creates titles like "12-Stall Equestrian Estate" or "25-Acre Horse Farm"
 */
function generatePropertyTitle(listing: MLSListing): string {
  const parts: string[] = [];

  // Add stall count if available
  if (listing.HorseStalls && listing.HorseStalls > 0) {
    parts.push(`${listing.HorseStalls}-Stall`);
  } else if (listing.LotSizeAcres && listing.LotSizeAcres >= 5) {
    parts.push(`${Math.round(listing.LotSizeAcres)}-Acre`);
  }

  // Add indoor arena mention
  if (listing.HorseIndoorArena) {
    parts.push('Indoor Arena');
  }

  // Determine property descriptor
  if (listing.PropertyType === 'Land' || listing.BedroomsTotal === 0) {
    parts.push('Horse Property');
  } else if (listing.LivingArea && listing.LivingArea > 5000) {
    parts.push('Equestrian Estate');
  } else {
    parts.push('Horse Farm');
  }

  // Add location
  if (listing.City) {
    parts.push(`in ${listing.City}`);
  }

  return parts.join(' ') || `Horse Property in ${listing.City || 'NC'}`;
}

/**
 * Extract equestrian amenities from MLS listing
 * Checks custom equestrian fields first, then parses from remarks if needed
 */
function extractEquestrianAmenities(listing: MLSListing): EquestrianAmenities {
  // Start with values from custom equestrian fields if available
  const amenities: EquestrianAmenities = {
    stalls: listing.HorseStalls || 0,
    hasIndoorArena: listing.HorseIndoorArena || false,
    hasOutdoorArena: listing.HorseOutdoorArena || false,
    pastures: listing.HorsePastures || 0,
    pastureAcreage: listing.HorsePastureAcreage || 0,
    hasTackRoom: listing.HorseTackRoom || false,
    hasFeedRoom: listing.HorseFeedRoom || false,
    hasWashRack: listing.HorseWashRack || false,
    hasRoundPen: listing.HorseRoundPen || false,
    fencingType: listing.HorseFencing || listing.Fencing || [],
    waterSource: listing.WaterSource || [],
    barnSquareFeet: listing.HorseBarnSqFt,
    additionalStructures: listing.HorseStructures || [],
  };

  // If custom fields are empty, try to parse from remarks
  const remarks = (listing.PublicRemarks || '').toLowerCase();
  const horseAmenities = (listing.HorseAmenities || '').toLowerCase();
  const combinedText = `${remarks} ${horseAmenities}`;

  // Parse stalls if not set
  if (amenities.stalls === 0) {
    const stallMatch = combinedText.match(/(\d+)\s*(?:horse\s*)?stalls?/i);
    if (stallMatch) {
      amenities.stalls = parseInt(stallMatch[1], 10);
    }
  }

  // Parse arenas
  if (!amenities.hasIndoorArena) {
    amenities.hasIndoorArena = /indoor\s*(?:riding\s*)?arena/i.test(combinedText);
  }
  if (!amenities.hasOutdoorArena) {
    amenities.hasOutdoorArena = /outdoor\s*(?:riding\s*)?arena/i.test(combinedText) ||
                                /riding\s*ring/i.test(combinedText);
  }

  // Parse other amenities
  if (!amenities.hasTackRoom) {
    amenities.hasTackRoom = /tack\s*room/i.test(combinedText);
  }
  if (!amenities.hasFeedRoom) {
    amenities.hasFeedRoom = /feed\s*room/i.test(combinedText);
  }
  if (!amenities.hasWashRack) {
    amenities.hasWashRack = /wash\s*(?:rack|stall)/i.test(combinedText);
  }
  if (!amenities.hasRoundPen) {
    amenities.hasRoundPen = /round\s*pen/i.test(combinedText);
  }

  // Parse pastures
  if (amenities.pastures === 0) {
    const pastureMatch = combinedText.match(/(\d+)\s*pastures?/i);
    if (pastureMatch) {
      amenities.pastures = parseInt(pastureMatch[1], 10);
    }
  }

  // Extract fencing types from remarks if not set
  if (amenities.fencingType.length === 0) {
    const fenceTypes: string[] = [];
    if (/board\s*fenc/i.test(combinedText)) fenceTypes.push('Board');
    if (/vinyl\s*fenc/i.test(combinedText)) fenceTypes.push('Vinyl');
    if (/electric\s*fenc/i.test(combinedText)) fenceTypes.push('Electric');
    if (/wire\s*fenc/i.test(combinedText)) fenceTypes.push('Wire');
    if (/post\s*(?:and\s*)?rail/i.test(combinedText)) fenceTypes.push('Post & Rail');
    amenities.fencingType = fenceTypes;
  }

  // Extract additional structures
  if (amenities.additionalStructures.length === 0) {
    const structures: string[] = [];
    if (/hay\s*barn/i.test(combinedText)) structures.push('Hay Barn');
    if (/equipment\s*(?:barn|shed)/i.test(combinedText)) structures.push('Equipment Storage');
    if (/run.?in\s*shed/i.test(combinedText)) structures.push('Run-in Shed');
    if (/groom/i.test(combinedText)) structures.push("Groom's Quarters");
    if (/guest\s*(?:house|cottage)/i.test(combinedText)) structures.push('Guest House');
    amenities.additionalStructures = structures;
  }

  return amenities;
}

/**
 * Map listing agent information from MLS data
 * Falls back to default agent if MLS data is incomplete
 */
function mapListingAgent(listing: MLSListing): Agent {
  // If we have agent data from MLS, use it
  if (listing.ListAgentFullName) {
    return {
      id: listing.ListAgentKey || 'mls-agent',
      name: listing.ListAgentFullName,
      title: 'REALTOR',
      phone: listing.ListAgentDirectPhone || '',
      email: listing.ListAgentEmail || '',
      photo: '/images/team/default-agent.jpg',
      bio: '',
      specialties: ['Equestrian Properties'],
      licenseNumber: listing.ListAgentMlsId || '',
    };
  }

  // Fall back to our default agent
  return mockAgent;
}

// ============================================================================
// Main API Functions
// ============================================================================

/**
 * Get all active listings from MLS Grid
 * Falls back to mock data if API is not configured or call fails
 *
 * @returns Array of Property objects
 */
export async function getAllListings(): Promise<Property[]> {
  // Check if MLS Grid is configured
  if (!isMLSGridConfigured()) {
    console.info('[MLS API] MLS Grid not configured, using mock data');
    return mockProperties;
  }

  try {
    // Build filter for equestrian properties in NC
    // Note: Adjust the PropertyType filter based on how Canopy MLS categorizes horse properties
    const params: Record<string, string> = {
      '$filter': "StandardStatus eq 'Active' and StateOrProvince eq 'NC'",
      '$orderby': 'ModificationTimestamp desc',
      '$top': '100', // Limit results
    };

    const response = await fetchFromMLSGrid<MLSGridResponse<MLSListing>>(
      '/Property',
      params
    );

    // Map MLS listings to our Property format
    const properties = response.value.map(mapMLSToProperty);

    console.info(`[MLS API] Fetched ${properties.length} listings from MLS Grid`);
    return properties;

  } catch (error) {
    console.error('[MLS API] Error fetching listings from MLS Grid:', error);
    console.info('[MLS API] Falling back to mock data');
    return mockProperties;
  }
}

/**
 * Get a single listing by ID from MLS Grid
 * Falls back to mock data if API is not configured or listing not found
 *
 * @param id - Listing ID (ListingKey or ListingId)
 * @returns Property object or null if not found
 */
export async function getListingById(id: string): Promise<Property | null> {
  // Check if MLS Grid is configured
  if (!isMLSGridConfigured()) {
    console.info('[MLS API] MLS Grid not configured, using mock data');
    const mockProperty = mockProperties.find(p => p.id === id || p.mlsNumber === id);
    return mockProperty || null;
  }

  try {
    // Try to fetch by ListingKey first
    const response = await fetchFromMLSGrid<MLSGridResponse<MLSListing>>(
      '/Property',
      { '$filter': `ListingKey eq '${id}' or ListingId eq '${id}'` }
    );

    if (response.value.length === 0) {
      console.info(`[MLS API] Listing ${id} not found in MLS Grid`);
      // Fall back to mock data
      const mockProperty = mockProperties.find(p => p.id === id || p.mlsNumber === id);
      return mockProperty || null;
    }

    return mapMLSToProperty(response.value[0]);

  } catch (error) {
    console.error(`[MLS API] Error fetching listing ${id}:`, error);
    // Fall back to mock data
    const mockProperty = mockProperties.find(p => p.id === id || p.mlsNumber === id);
    return mockProperty || null;
  }
}

/**
 * Search listings with filters
 * Supports price range, acreage, stalls, city, arena requirements, and property type
 *
 * @param filters - PropertyFilters object with search criteria
 * @returns Array of Property objects matching filters
 */
export async function searchListings(filters: PropertyFilters): Promise<Property[]> {
  // Check if MLS Grid is configured
  if (!isMLSGridConfigured()) {
    console.info('[MLS API] MLS Grid not configured, searching mock data');
    return searchMockListings(filters);
  }

  try {
    // Build OData filter string from our filters
    const filterParts: string[] = ["StandardStatus eq 'Active'"];

    if (filters.minPrice) {
      filterParts.push(`ListPrice ge ${filters.minPrice}`);
    }
    if (filters.maxPrice) {
      filterParts.push(`ListPrice le ${filters.maxPrice}`);
    }
    if (filters.minAcreage) {
      filterParts.push(`LotSizeAcres ge ${filters.minAcreage}`);
    }
    if (filters.maxAcreage) {
      filterParts.push(`LotSizeAcres le ${filters.maxAcreage}`);
    }
    if (filters.city) {
      filterParts.push(`City eq '${filters.city}'`);
    }
    if (filters.propertyType) {
      // Map our property type to MLS PropertyType
      const typeMap: Record<string, string> = {
        'farm': 'Farm',
        'ranch': 'Ranch',
        'estate': 'Residential',
        'land': 'Land',
      };
      const mlsType = typeMap[filters.propertyType];
      if (mlsType) {
        filterParts.push(`PropertyType eq '${mlsType}'`);
      }
    }

    // Note: Stall counts and arena filters may need custom field names
    // These are typically not standard RESO fields
    // You may need to adjust based on Canopy MLS's custom field names

    const params: Record<string, string> = {
      '$filter': filterParts.join(' and '),
      '$orderby': 'ModificationTimestamp desc',
      '$top': '100',
    };

    const response = await fetchFromMLSGrid<MLSGridResponse<MLSListing>>(
      '/Property',
      params
    );

    let properties = response.value.map(mapMLSToProperty);

    // Apply post-fetch filters for equestrian-specific criteria
    // (since these may not be filterable in the API query)
    if (filters.minStalls) {
      properties = properties.filter(p => p.equestrianAmenities.stalls >= (filters.minStalls || 0));
    }
    if (filters.hasIndoorArena) {
      properties = properties.filter(p => p.equestrianAmenities.hasIndoorArena);
    }
    if (filters.hasOutdoorArena) {
      properties = properties.filter(p => p.equestrianAmenities.hasOutdoorArena);
    }

    console.info(`[MLS API] Search returned ${properties.length} listings`);
    return properties;

  } catch (error) {
    console.error('[MLS API] Error searching listings:', error);
    console.info('[MLS API] Falling back to mock data search');
    return searchMockListings(filters);
  }
}

/**
 * Search mock listings with filters (used when API is unavailable)
 */
function searchMockListings(filters: PropertyFilters): Property[] {
  return mockProperties.filter(property => {
    // Price filters
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;

    // Acreage filters
    if (filters.minAcreage && property.acreage < filters.minAcreage) return false;
    if (filters.maxAcreage && property.acreage > filters.maxAcreage) return false;

    // Stall filter
    if (filters.minStalls && property.equestrianAmenities.stalls < filters.minStalls) return false;

    // City filter (case-insensitive)
    if (filters.city && property.city.toLowerCase() !== filters.city.toLowerCase()) return false;

    // Arena filters
    if (filters.hasIndoorArena && !property.equestrianAmenities.hasIndoorArena) return false;
    if (filters.hasOutdoorArena && !property.equestrianAmenities.hasOutdoorArena) return false;

    // Property type filter
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false;

    return true;
  });
}

/**
 * Get featured listings for homepage display
 * Returns listings with the best equestrian amenities or highest prices
 *
 * @param limit - Maximum number of listings to return (default: 6)
 * @returns Array of featured Property objects
 */
export async function getFeaturedListings(limit: number = 6): Promise<Property[]> {
  // Check if MLS Grid is configured
  if (!isMLSGridConfigured()) {
    console.info('[MLS API] MLS Grid not configured, using mock featured listings');
    return getFeaturedMockListings(limit);
  }

  try {
    // Fetch recent listings with high prices (likely to have good amenities)
    const params: Record<string, string> = {
      '$filter': "StandardStatus eq 'Active' and StateOrProvince eq 'NC'",
      '$orderby': 'ListPrice desc',
      '$top': String(limit * 2), // Fetch extra to filter
    };

    const response = await fetchFromMLSGrid<MLSGridResponse<MLSListing>>(
      '/Property',
      params
    );

    const properties = response.value.map(mapMLSToProperty);

    // Sort by equestrian score (properties with more amenities rank higher)
    const scored = properties.map(p => ({
      property: p,
      score: calculateEquestrianScore(p),
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map(s => s.property);

  } catch (error) {
    console.error('[MLS API] Error fetching featured listings:', error);
    return getFeaturedMockListings(limit);
  }
}

/**
 * Calculate an "equestrian score" for sorting featured listings
 * Higher scores = more desirable equestrian properties
 */
function calculateEquestrianScore(property: Property): number {
  let score = 0;
  const ea = property.equestrianAmenities;

  // Stalls (2 points per stall, max 50)
  score += Math.min(ea.stalls * 2, 50);

  // Arenas (25 points each)
  if (ea.hasIndoorArena) score += 25;
  if (ea.hasOutdoorArena) score += 20;

  // Other amenities (5 points each)
  if (ea.hasTackRoom) score += 5;
  if (ea.hasFeedRoom) score += 5;
  if (ea.hasWashRack) score += 5;
  if (ea.hasRoundPen) score += 5;

  // Pastures (3 points per pasture, max 30)
  score += Math.min(ea.pastures * 3, 30);

  // Acreage bonus (1 point per acre, max 50)
  score += Math.min(property.acreage, 50);

  // Quality fencing bonus
  if (ea.fencingType.length >= 2) score += 10;

  // Additional structures (3 points each)
  score += ea.additionalStructures.length * 3;

  return score;
}

/**
 * Get featured listings from mock data
 */
function getFeaturedMockListings(limit: number): Property[] {
  // Sort mock properties by equestrian score
  const scored = mockProperties.map(p => ({
    property: p,
    score: calculateEquestrianScore(p),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(s => s.property);
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get unique cities from all listings
 * Useful for populating city filter dropdowns
 */
export async function getAvailableCities(): Promise<string[]> {
  const listings = await getAllListings();
  const cities = [...new Set(listings.map(l => l.city))];
  return cities.sort();
}

/**
 * Get price range of all listings
 * Useful for setting min/max on price sliders
 */
export async function getPriceRange(): Promise<{ min: number; max: number }> {
  const listings = await getAllListings();
  const prices = listings.map(l => l.price).filter(p => p > 0);

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Get acreage range of all listings
 * Useful for setting min/max on acreage sliders
 */
export async function getAcreageRange(): Promise<{ min: number; max: number }> {
  const listings = await getAllListings();
  const acreages = listings.map(l => l.acreage).filter(a => a > 0);

  return {
    min: Math.min(...acreages),
    max: Math.max(...acreages),
  };
}

// ============================================================================
// Development Utilities
// ============================================================================

/**
 * Test the MLS Grid API connection
 * Useful for verifying configuration during development
 *
 * @returns Connection status and any error messages
 */
export async function testMLSGridConnection(): Promise<{
  configured: boolean;
  connected: boolean;
  message: string;
  listingsCount?: number;
}> {
  if (!isMLSGridConfigured()) {
    return {
      configured: false,
      connected: false,
      message: 'MLS Grid API key not configured. Set MLS_GRID_API_KEY in your environment.',
    };
  }

  try {
    const response = await fetchFromMLSGrid<MLSGridResponse<MLSListing>>(
      '/Property',
      { '$top': '1' }
    );

    return {
      configured: true,
      connected: true,
      message: 'Successfully connected to MLS Grid API',
      listingsCount: response['@odata.count'],
    };
  } catch (error) {
    return {
      configured: true,
      connected: false,
      message: `Failed to connect to MLS Grid: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Export configuration status for debugging
 */
export function getMLSGridStatus(): {
  isConfigured: boolean;
  apiUrl: string;
  hasApiKey: boolean;
} {
  return {
    isConfigured: isMLSGridConfigured(),
    apiUrl: MLS_GRID_CONFIG.apiUrl,
    hasApiKey: Boolean(MLS_GRID_CONFIG.apiKey),
  };
}
