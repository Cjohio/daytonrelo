/**
 * Trestle MLS API integration
 * Credentials: set TRESTLE_CLIENT_ID and TRESTLE_CLIENT_SECRET in .env.local
 * Dayton Area Board of Realtors (DABR) MLS feed via Trestle (Cotality)
 * Docs: https://api.trestle.io
 */

const TRESTLE_TOKEN_URL = process.env.TRESTLE_TOKEN_URL ?? "https://api-prod.corelogic.com/trestle/oidc/connect/token";
const TRESTLE_BASE_URL  = process.env.TRESTLE_BASE_URL  ?? "https://api-prod.corelogic.com/trestle";

export interface MLSListing {
  ListingKey:         string;
  ListPrice:          number;
  StreetNumber:       string;
  StreetName:         string;
  City:               string;
  StateOrProvince:    string;
  PostalCode:         string;
  BedroomsTotal:      number;
  BathroomsTotalInteger: number;
  LivingArea:         number;
  LotSizeAcres?:      number;
  YearBuilt?:         number;
  PropertyType:       string;
  PropertySubType:    string;
  StandardStatus:     string;
  ListingContractDate: string;
  ModificationTimestamp: string;
  Media?:             { MediaURL: string; Order: number }[];
  PublicRemarks?:     string;
  OpenHouseKey?:      string;
  OpenHouseDate?:     string;
  OpenHouseStartTime?: string;
  OpenHouseEndTime?:  string;
  WaterBodyName?:     string;
  GarageSpaces?:      number;
  PoolPrivateYN?:     boolean;
  Latitude?:          number;
  Longitude?:         number;
}

export interface SearchParams {
  city?:         string;
  cities?:       string[];
  minPrice?:     number;
  maxPrice?:     number;
  beds?:         number;
  baths?:        number;
  minSqft?:      number;
  maxSqft?:      number;
  status?:       "Active" | "Pending" | "Closed";
  listingType?:  "buy" | "rent";
  limit?:        number;
  offset?:       number;
  openHouse?:    boolean;
}

const DEFAULT_DAYTON_CITIES = [
  "Dayton", "Beavercreek", "Fairborn", "Kettering",
  "Centerville", "Miamisburg", "Springboro", "Oakwood",
  "Huber Heights", "Trotwood", "Vandalia", "Englewood",
  "Xenia", "Yellow Springs", "Bellbrook", "Sugarcreek Township",
];

// ─── Token cache ──────────────────────────────────────────────────────────────
let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const clientId     = process.env.TRESTLE_CLIENT_ID;
  const clientSecret = process.env.TRESTLE_CLIENT_SECRET;

  console.log("[Trestle] clientId present:", !!clientId, "| clientSecret present:", !!clientSecret);

  if (!clientId || !clientSecret) {
    console.error("[Trestle] Missing credentials — TRESTLE_CLIENT_ID or TRESTLE_CLIENT_SECRET not set");
    throw new Error("Trestle credentials not configured. Set TRESTLE_CLIENT_ID and TRESTLE_CLIENT_SECRET in .env.local");
  }

  console.log("[Trestle] Token URL:", TRESTLE_TOKEN_URL);
  const res = await fetch(TRESTLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "client_credentials",
      client_id:     clientId,
      client_secret: clientSecret,
      scope:         "api",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[Trestle] Auth failed:", res.status, body);
    throw new Error(`Trestle auth failed: ${res.status} ${body}`);
  }
  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  console.log("[Trestle] Auth token obtained successfully, expires in", data.expires_in, "s");
  return cachedToken!;
}

// ─── Build OData $filter string ───────────────────────────────────────────────
function buildFilter(params: SearchParams): string {
  const filters: string[] = [];
  filters.push(`StandardStatus eq '${params.status ?? "Active"}'`);
  filters.push(`MlsStatus ne 'Withdrawn'`);

  // City filter — single city, explicit array, or default Dayton metro
  if (params.city) {
    filters.push(`City eq '${params.city}'`);
  } else {
    const cities = params.cities ?? DEFAULT_DAYTON_CITIES;
    const cityFilter = cities.map(c => `City eq '${c}'`).join(" or ");
    filters.push(`(${cityFilter})`);
  }

  if (params.minPrice) filters.push(`ListPrice ge ${params.minPrice}`);
  if (params.maxPrice) filters.push(`ListPrice le ${params.maxPrice}`);
  if (params.beds)     filters.push(`BedroomsTotal ge ${params.beds}`);
  if (params.baths)    filters.push(`BathroomsTotalInteger ge ${params.baths}`);
  if (params.minSqft)  filters.push(`LivingArea ge ${params.minSqft}`);
  if (params.maxSqft)  filters.push(`LivingArea le ${params.maxSqft}`);
  if (params.openHouse) filters.push(`OpenHouseDate ne null`);

  // Listing type: residential for-rent vs for-sale
  // PropertyType is an OData enum — use eq with valid enum values only
  if (params.listingType === "rent") {
    filters.push(`PropertyType eq 'ResidentialLease'`);
  } else {
    // For-sale: standard residential properties only
    filters.push(`PropertyType eq 'Residential'`);
  }

  return filters.join(" and ");
}

// ─── Main search function ─────────────────────────────────────────────────────
export async function searchListings(params: SearchParams = {}): Promise<MLSListing[]> {
  const token = await getAccessToken();
  const filter = buildFilter(params);
  const top    = params.limit  ?? 24;
  const skip   = params.offset ?? 0;

  const url = new URL(`${TRESTLE_BASE_URL}/odata/Property`);
  url.searchParams.set("$filter",  filter);
  url.searchParams.set("$top",     String(top));
  url.searchParams.set("$skip",    String(skip));
  url.searchParams.set("$orderby", "ModificationTimestamp desc");
  url.searchParams.set("$expand",  "Media");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store", // responses can exceed Next.js 2MB cache limit; rely on page-level ISR
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[Trestle] Search failed:", res.status, body.slice(0, 300));
    throw new Error(`Trestle search failed: ${res.status} ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const results = data.value ?? [];
  console.log("[Trestle] Search returned", results.length, "listings | filter:", filter.slice(0, 120));
  return results;
}

export async function getListingByKey(key: string): Promise<MLSListing | null> {
  const token = await getAccessToken();
  const url = `${TRESTLE_BASE_URL}/odata/Property('${key}')?$expand=Media`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export async function getOpenHouses(daysAhead = 14): Promise<MLSListing[]> {
  const today = new Date().toISOString().split("T")[0];
  const future = new Date(Date.now() + daysAhead * 86400000).toISOString().split("T")[0];
  return searchListings({
    openHouse: true,
    status: "Active",
    limit: 50,
  });
}

// ─── Mock data (used when Trestle credentials are not yet configured) ─────────
export const MOCK_LISTINGS: MLSListing[] = [
  {
    ListingKey: "mock-001",
    ListPrice: 329000,
    StreetNumber: "4821",
    StreetName: "Birchwood Ln",
    City: "Beavercreek",
    StateOrProvince: "OH",
    PostalCode: "45440",
    BedroomsTotal: 4,
    BathroomsTotalInteger: 3,
    LivingArea: 2240,
    YearBuilt: 2005,
    PropertyType: "Residential",
    PropertySubType: "Single Family Residence",
    StandardStatus: "Active",
    ListingContractDate: "2026-03-15",
    ModificationTimestamp: "2026-04-01T10:00:00Z",
    GarageSpaces: 2,
    PublicRemarks: "Spacious 4-bed home in top-rated Beavercreek schools, 12 min from Gate 12A WPAFB. Updated kitchen, finished basement, large backyard.",
    Media: [{ MediaURL: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=500&fit=crop&auto=format", Order: 0 }],
    Latitude: 39.7081,
    Longitude: -84.0607,
  },
  {
    ListingKey: "mock-002",
    ListPrice: 219500,
    StreetNumber: "3107",
    StreetName: "Maple Ridge Dr",
    City: "Fairborn",
    StateOrProvince: "OH",
    PostalCode: "45324",
    BedroomsTotal: 3,
    BathroomsTotalInteger: 2,
    LivingArea: 1580,
    YearBuilt: 1998,
    PropertyType: "Residential",
    PropertySubType: "Single Family Residence",
    StandardStatus: "Active",
    ListingContractDate: "2026-03-22",
    ModificationTimestamp: "2026-04-01T10:00:00Z",
    GarageSpaces: 2,
    PublicRemarks: "Perfect for WPAFB personnel — 8 min from Gate 12A. Move-in ready, new roof 2023, BAH-friendly price point.",
    Media: [{ MediaURL: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop&auto=format", Order: 0 }],
    OpenHouseDate: "2026-04-12",
    OpenHouseStartTime: "1:00 PM",
    OpenHouseEndTime: "3:00 PM",
    Latitude: 39.8298,
    Longitude: -84.0393,
  },
  {
    ListingKey: "mock-003",
    ListPrice: 445000,
    StreetNumber: "118",
    StreetName: "Oak Hill Ct",
    City: "Centerville",
    StateOrProvince: "OH",
    PostalCode: "45459",
    BedroomsTotal: 5,
    BathroomsTotalInteger: 4,
    LivingArea: 3100,
    YearBuilt: 2012,
    PropertyType: "Residential",
    PropertySubType: "Single Family Residence",
    StandardStatus: "Active",
    ListingContractDate: "2026-03-28",
    ModificationTimestamp: "2026-04-01T10:00:00Z",
    GarageSpaces: 3,
    PoolPrivateYN: true,
    PublicRemarks: "Executive-level home in Centerville's most sought-after community. 5 beds, 4 baths, 3-car garage, in-ground pool.",
    Media: [{ MediaURL: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop&auto=format", Order: 0 }],
    Latitude: 39.6337,
    Longitude: -84.1316,
  },
  {
    ListingKey: "mock-004",
    ListPrice: 285000,
    StreetNumber: "2255",
    StreetName: "Valley View Rd",
    City: "Kettering",
    StateOrProvince: "OH",
    PostalCode: "45429",
    BedroomsTotal: 3,
    BathroomsTotalInteger: 2,
    LivingArea: 1890,
    YearBuilt: 1978,
    PropertyType: "Residential",
    PropertySubType: "Single Family Residence",
    StandardStatus: "Active",
    ListingContractDate: "2026-04-01",
    ModificationTimestamp: "2026-04-02T10:00:00Z",
    GarageSpaces: 2,
    PublicRemarks: "Established Kettering neighborhood. Fully renovated kitchen and baths, hardwood floors, newer HVAC.",
    Media: [{ MediaURL: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=500&fit=crop&auto=format", Order: 0 }],
    OpenHouseDate: "2026-04-13",
    OpenHouseStartTime: "12:00 PM",
    OpenHouseEndTime: "2:00 PM",
    Latitude: 39.6887,
    Longitude: -84.1688,
  },
  {
    ListingKey: "mock-005",
    ListPrice: 379000,
    StreetNumber: "9034",
    StreetName: "Springhaven Blvd",
    City: "Springboro",
    StateOrProvince: "OH",
    PostalCode: "45066",
    BedroomsTotal: 4,
    BathroomsTotalInteger: 3,
    LivingArea: 2650,
    YearBuilt: 2018,
    PropertyType: "Residential",
    PropertySubType: "Single Family Residence",
    StandardStatus: "Active",
    ListingContractDate: "2026-04-03",
    ModificationTimestamp: "2026-04-03T10:00:00Z",
    GarageSpaces: 2,
    PublicRemarks: "Like-new 2018 build in Springboro school district. Open floor plan, quartz counters, primary suite with soaker tub.",
    Media: [{ MediaURL: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop&auto=format", Order: 0 }],
    Latitude: 39.5581,
    Longitude: -84.2338,
  },
  {
    ListingKey: "mock-006",
    ListPrice: 525000,
    StreetNumber: "47",
    StreetName: "Park Blvd",
    City: "Oakwood",
    StateOrProvince: "OH",
    PostalCode: "45419",
    BedroomsTotal: 4,
    BathroomsTotalInteger: 3,
    LivingArea: 2980,
    YearBuilt: 1955,
    PropertyType: "Residential",
    PropertySubType: "Single Family Residence",
    StandardStatus: "Active",
    ListingContractDate: "2026-04-02",
    ModificationTimestamp: "2026-04-02T10:00:00Z",
    GarageSpaces: 2,
    PublicRemarks: "Classic Oakwood Tudor on one of the most coveted streets. Fully renovated interior with period details preserved. Walkable to everything.",
    Media: [{ MediaURL: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=500&fit=crop&auto=format", Order: 0 }],
    Latitude: 39.7215,
    Longitude: -84.1741,
  },
];
