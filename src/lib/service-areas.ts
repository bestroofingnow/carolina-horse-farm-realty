export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  description: string;
  highlights: string[];
  nearbyAttractions: string[];
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "charlotte",
    name: "Charlotte",
    county: "Mecklenburg County",
    description:
      "As the largest city in North Carolina, Charlotte offers a unique blend of urban amenities and rural equestrian living just minutes from the city center. The greater Charlotte metro area features established horse communities in south Charlotte, Steele Creek, and the surrounding countryside. With easy access to world-class veterinary care, feed suppliers, and farrier services, Charlotte-area horse properties provide the convenience of city living with the space and freedom horses need.",
    highlights: [
      "Close to veterinary specialists and equine hospitals",
      "Major feed and tack suppliers nearby",
      "Active local riding clubs and show circuits",
      "Easy airport access for horse transport",
    ],
    nearbyAttractions: [
      "Charlotte Douglas International Airport",
      "U.S. National Whitewater Center",
      "Charlotte Motor Speedway",
    ],
  },
  {
    slug: "columbus",
    name: "Columbus",
    county: "Polk County",
    description:
      "Columbus is the county seat of Polk County and a premier equestrian destination in the Carolina foothills. Located just minutes from the Tryon International Equestrian Center (TIEC), Columbus has become a magnet for serious riders and horse farm investors. The rolling terrain, mild climate, and proximity to FETA trail systems make it one of the most desirable locations for equestrian properties in the Southeast. Properties here range from intimate hobby farms to world-class competition facilities.",
    highlights: [
      "Minutes from Tryon International Equestrian Center",
      "FETA trail system access",
      "Mild year-round climate ideal for horses",
      "Strong equestrian property appreciation",
    ],
    nearbyAttractions: [
      "Tryon International Equestrian Center",
      "Green Creek Hounds",
      "Pearson's Falls",
    ],
  },
  {
    slug: "forest-city",
    name: "Forest City",
    county: "Rutherford County",
    description:
      "Forest City offers affordable equestrian properties with easy access to the Tryon International Equestrian Center, typically just 15-20 minutes away. The area features gently rolling hills, fertile pastureland, and a lower cost of living compared to areas closer to TIEC. Horse farm buyers looking for more acreage and value will find exceptional opportunities in the Forest City area, with properties ranging from starter farms to large equestrian estates with established facilities.",
    highlights: [
      "Affordable acreage compared to Tryon area",
      "15-20 minutes to TIEC",
      "Gentle rolling terrain ideal for pastures",
      "Lower property taxes in Rutherford County",
    ],
    nearbyAttractions: [
      "Chimney Rock State Park",
      "Lake Lure",
      "Tryon International Equestrian Center",
    ],
  },
  {
    slug: "matthews",
    name: "Matthews",
    county: "Mecklenburg County",
    description:
      "Historic Matthews blends small-town charm with proximity to Charlotte, making it an attractive option for equestrian buyers who want the best of both worlds. The area features established neighborhoods with horse-friendly zoning, mature trees, and properties large enough for small barn setups and pastures. Matthews is ideal for hobby equestrians and families who want to keep horses at home while remaining close to schools, shopping, and city employment.",
    highlights: [
      "Horse-friendly zoning in many areas",
      "Close to Charlotte amenities",
      "Historic small-town character",
      "Established equestrian neighborhoods",
    ],
    nearbyAttractions: [
      "Stumptown Park",
      "Four Mile Creek Greenway",
      "Matthews Heritage Museum",
    ],
  },
  {
    slug: "mill-spring",
    name: "Mill Spring",
    county: "Polk County",
    description:
      "Mill Spring is ground zero for competitive equestrian sport in the Carolinas, home to the Tryon International Equestrian Center — one of the premier equestrian venues in North America. Properties in Mill Spring attract serious competitors, trainers, and equestrian investors from around the world. The area features stunning mountain views, access to extensive trail networks, and a tight-knit equestrian community. From covered arenas to cross-country courses, Mill Spring properties are built for the serious horseperson.",
    highlights: [
      "Home of Tryon International Equestrian Center",
      "World-class competition venue access",
      "Mountain views and extensive trail systems",
      "Strong rental and boarding income potential",
    ],
    nearbyAttractions: [
      "Tryon International Equestrian Center",
      "Green River Game Lands",
      "DuPont State Recreational Forest",
    ],
  },
  {
    slug: "mooresville",
    name: "Mooresville",
    county: "Iredell County",
    description:
      "Known as 'Race City USA,' Mooresville and the surrounding Lake Norman area offer scenic equestrian properties with excellent pastureland and beautiful lake views. The region features a mix of established horse farms and newer developments with equestrian amenities. Mooresville properties are popular with riders who enjoy trail riding through the rolling Piedmont landscape and want convenient access to the I-77 corridor for Charlotte commuting.",
    highlights: [
      "Lake Norman area scenic beauty",
      "Rolling Piedmont pastureland",
      "Convenient I-77 corridor access",
      "Active local equestrian community",
    ],
    nearbyAttractions: [
      "Lake Norman",
      "Duke Energy State Park",
      "NASCAR Hall of Fame (Charlotte)",
    ],
  },
  {
    slug: "mint-hill",
    name: "Mint Hill",
    county: "Mecklenburg County",
    description:
      "Mint Hill retains a rural character while sitting just 20 minutes from Uptown Charlotte, making it a hidden gem for equestrian buyers. The area features larger lot sizes, horse-friendly zoning, and a community that values its agricultural heritage. Properties in Mint Hill offer the space needed for horses — pastures, barns, and riding areas — without sacrificing access to city conveniences. It is an ideal location for families looking to raise horses while staying connected to Charlotte.",
    highlights: [
      "Rural character near Charlotte",
      "Larger lot sizes with horse-friendly zoning",
      "Strong sense of agricultural community",
      "20 minutes to Uptown Charlotte",
    ],
    nearbyAttractions: [
      "Reedy Creek Nature Preserve",
      "Mint Hill Veterans Memorial",
      "Stevens Creek Nature Preserve",
    ],
  },
  {
    slug: "rutherfordton",
    name: "Rutherfordton",
    county: "Rutherford County",
    description:
      "Rutherfordton sits in the heart of North Carolina horse country, offering premier equestrian properties with breathtaking mountain views and expansive acreage. The area is home to some of the most impressive equestrian facilities in the region, including multi-stall barns, covered arenas, and properties with direct trail access. Proximity to the Tryon International Equestrian Center makes Rutherfordton a smart choice for competitive riders and horse farm investors alike.",
    highlights: [
      "Heart of NC horse country",
      "Mountain views and expansive acreage",
      "Premier equestrian facilities",
      "Close to TIEC competition venue",
    ],
    nearbyAttractions: [
      "Tryon International Equestrian Center",
      "KidSenses Children's Interactive Museum",
      "Thermal Belt Rail Trail",
    ],
  },
  {
    slug: "tryon",
    name: "Tryon",
    county: "Polk County",
    description:
      "Tryon is a world-renowned equestrian destination with a rich history dating back to the early 1900s when it became a haven for horse enthusiasts. The town's historic Hunting Country is home to some of the most prestigious equestrian estates in the Southeast. With FETA trail access, proximity to the Tryon International Equestrian Center, and an active community of riders, trainers, and breeders, Tryon represents the pinnacle of equestrian lifestyle in the Carolinas.",
    highlights: [
      "World-renowned equestrian destination",
      "Historic Hunting Country estates",
      "FETA trail system throughout the area",
      "Active riding, training, and breeding community",
    ],
    nearbyAttractions: [
      "Tryon International Equestrian Center",
      "FENCE (Foothills Equestrian Nature Center)",
      "Tryon Fine Arts Center",
    ],
  },
  {
    slug: "waxhaw",
    name: "Waxhaw",
    county: "Union County",
    description:
      "Waxhaw is one of the premier equestrian communities in the Charlotte metro area, known for its rolling hills, established horse farms, and dedicated equestrian neighborhoods like Valley Farm. The area features excellent pastureland, proximity to Cane Creek Park with its riding trails, and a strong local horse community. Waxhaw properties range from turnkey horse farms with full equestrian facilities to beautiful acreage ready for custom barn and arena construction.",
    highlights: [
      "Premier Charlotte-area equestrian community",
      "Established horse farm neighborhoods",
      "Access to Cane Creek Park riding trails",
      "Strong local horse community and events",
    ],
    nearbyAttractions: [
      "Cane Creek Park (1,100 acres with trails)",
      "Museum of the Waxhaws",
      "Jesse Helms Center",
    ],
  },
];

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export function getAllServiceAreaSlugs(): string[] {
  return serviceAreas.map((area) => area.slug);
}
