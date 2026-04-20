import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ListingsClient from "./ListingsClient";
import { searchListings, MOCK_LISTINGS } from "@/lib/trestle";

export const metadata: Metadata = {
  title: "Search Dayton Homes for Sale | Dayton Relo",
  description: "Browse all Dayton Ohio MLS listings — Beavercreek, Centerville, Fairborn, Kettering, Springboro, Oakwood and more. Updated daily from DABR MLS.",
};

// Don't cache — URL params change per request
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    city?:        string;
    minPrice?:    string;
    maxPrice?:    string;
    beds?:        string;
    baths?:       string;
    type?:        string;
  }>;
}

export default async function ListingsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const city        = sp.city     || undefined;
  const minPrice    = sp.minPrice ? Number(sp.minPrice) : undefined;
  const maxPrice    = sp.maxPrice ? Number(sp.maxPrice) : undefined;
  const beds        = sp.beds     ? Number(sp.beds)     : undefined;
  const baths       = sp.baths    ? Number(sp.baths)    : undefined;
  const listingType = (sp.type === "rent" ? "rent" : "buy") as "buy" | "rent";

  let listings = MOCK_LISTINGS;
  try {
    const results = await searchListings({
      city, minPrice, maxPrice, beds, baths, listingType, limit: 100,
    });
    if (results.length > 0) listings = results;
  } catch (err) {
    console.error("[Listings] Trestle API error — using mock fallback:", err);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-2">Dayton Area MLS</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Homes for Sale in Dayton, OH</h1>
          <p className="text-gray-400">Live listings from the Dayton Area Board of Realtors MLS · Updated every 15 minutes</p>
        </div>
      </section>

      {/* Listings with client-side filters */}
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center text-gray-400">Loading listings…</div>}>
        <ListingsClient
          initialListings={listings}
          initialCity={city ?? ""}
          initialMinPrice={minPrice ?? 0}
          initialMaxPrice={maxPrice ?? 0}
          initialBeds={beds ?? 0}
          initialListingType={listingType}
        />
      </Suspense>

      {/* CTA Strip */}
      <section className="bg-charcoal py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Don&apos;t see exactly what you&apos;re looking for?</h2>
          <p className="text-gray-400 mb-6">Chris has access to off-market deals and coming-soon listings. Tell him what you need.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:+19372413484" className="btn-gold">(937) 241-3484</a>
            <Link href="/contact" className="btn-outline text-white border-white/30 hover:bg-white hover:text-charcoal">Send a Message</Link>
          </div>
        </div>
      </section>
    </>
  );
}
