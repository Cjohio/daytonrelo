"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Home } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import type { MLSListing } from "@/lib/trestle";

interface Props {
  initialListings: MLSListing[];
}

const SORT_OPTIONS = [
  { label: "Newest",         key: "newest" },
  { label: "Price: Low–High", key: "price_asc" },
  { label: "Price: High–Low", key: "price_desc" },
  { label: "Sq Ft",          key: "sqft" },
];

const STATUS_TABS = ["All", "Active", "Pending", "Open House"];

export default function ListingsClient({ initialListings }: Props) {
  const searchParams = useSearchParams();
  const [sort,         setSort]         = useState("newest");
  const [statusTab,    setStatusTab]    = useState("All");
  const [showFilters,  setShowFilters]  = useState(false);
  const [minBeds,      setMinBeds]      = useState<number>(0);
  const [minBaths,     setMinBaths]     = useState<number>(0);
  const [minPrice,     setMinPrice]     = useState<number>(0);
  const [maxPrice,     setMaxPrice]     = useState<number>(0);

  const cityParam = searchParams.get("city") ?? "";

  const filtered = useMemo(() => {
    let list = initialListings;

    if (cityParam)          list = list.filter(l => l.City.toLowerCase() === cityParam.toLowerCase());
    if (statusTab === "Open House") list = list.filter(l => l.OpenHouseDate);
    else if (statusTab !== "All")   list = list.filter(l => l.StandardStatus === statusTab);
    if (minBeds)            list = list.filter(l => l.BedroomsTotal >= minBeds);
    if (minBaths)           list = list.filter(l => l.BathroomsTotalInteger >= minBaths);
    if (minPrice)           list = list.filter(l => l.ListPrice >= minPrice);
    if (maxPrice)           list = list.filter(l => l.ListPrice <= maxPrice);

    return [...list].sort((a, b) => {
      if (sort === "price_asc")  return a.ListPrice - b.ListPrice;
      if (sort === "price_desc") return b.ListPrice - a.ListPrice;
      if (sort === "sqft")       return b.LivingArea - a.LivingArea;
      return new Date(b.ModificationTimestamp).getTime() - new Date(a.ModificationTimestamp).getTime();
    });
  }, [initialListings, cityParam, statusTab, sort, minBeds, minBaths, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Search bar */}
      <div className="mb-6">
        <SearchBar compact={false} initialCity={cityParam} />
      </div>

      {/* Controls row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        {/* Status tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 flex-wrap">
          {STATUS_TABS.map(t => (
            <button
              key={t}
              onClick={() => setStatusTab(t)}
              className={`text-xs font-bold px-3 py-2 rounded-lg transition-colors ${
                statusTab === t
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-gray-500 hover:text-charcoal"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-2 sm:ml-auto items-center">
          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${
              showFilters ? "border-gold text-gold bg-gold/5" : "border-gray-200 text-gray-600 hover:border-gold hover:text-gold"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="text-sm font-semibold px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="bg-cream rounded-2xl p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Min Beds</label>
            <select
              value={minBeds}
              onChange={e => setMinBeds(Number(e.target.value))}
              className="w-full rounded-lg px-3 py-2 text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value={0}>Any</option>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Min Baths</label>
            <select
              value={minBaths}
              onChange={e => setMinBaths(Number(e.target.value))}
              className="w-full rounded-lg px-3 py-2 text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value={0}>Any</option>
              {[1,2,3,4].map(n => <option key={n} value={n}>{n}+</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Min Price</label>
            <select
              value={minPrice}
              onChange={e => setMinPrice(Number(e.target.value))}
              className="w-full rounded-lg px-3 py-2 text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value={0}>No min</option>
              <option value={100000}>$100k</option>
              <option value={200000}>$200k</option>
              <option value={300000}>$300k</option>
              <option value={400000}>$400k</option>
              <option value={500000}>$500k</option>
              <option value={600000}>$600k</option>
              <option value={700000}>$700k</option>
              <option value={800000}>$800k</option>
              <option value={1000000}>$1M</option>
              <option value={1500000}>$1.5M</option>
              <option value={2000000}>$2M</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Max Price</label>
            <select
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full rounded-lg px-3 py-2 text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value={0}>No max</option>
              <option value={200000}>$200k</option>
              <option value={300000}>$300k</option>
              <option value={400000}>$400k</option>
              <option value={500000}>$500k</option>
              <option value={600000}>$600k</option>
              <option value={700000}>$700k</option>
              <option value={800000}>$800k</option>
              <option value={1000000}>$1M</option>
              <option value={1500000}>$1.5M</option>
              <option value={2000000}>$2M</option>
              <option value={2500000}>$2.5M</option>
              <option value={3000000}>$3M</option>
            </select>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-5">
        <span className="font-black text-charcoal">{filtered.length}</span> homes found
        {cityParam && <> in <span className="font-bold text-charcoal">{cityParam}</span></>}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(listing => (
            <PropertyCard key={listing.ListingKey} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-cream rounded-2xl">
          <div className="flex justify-center mb-3"><Home className="w-12 h-12 text-charcoal" /></div>
          <h3 className="text-lg font-black mb-2">No listings match your filters</h3>
          <p className="text-gray-500 text-sm mb-4">Try adjusting your search criteria, or contact Chris for off-market options.</p>
          <a href="tel:+19372413484" className="btn-gold">Call Chris Directly</a>
        </div>
      )}
    </div>
  );
}
