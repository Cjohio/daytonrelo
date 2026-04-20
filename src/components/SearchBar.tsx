"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CITIES = [
  "All Areas", "Beavercreek", "Centerville", "Fairborn", "Huber Heights",
  "Kettering", "Miamisburg", "Oakwood", "Springboro", "Trotwood", "Xenia",
];

const PRICE_RANGES = [
  { label: "Any Price",      min: 0,       max: 0        },
  { label: "Under $200k",    min: 0,       max: 200000   },
  { label: "$200k–$300k",    min: 200000,  max: 300000   },
  { label: "$300k–$400k",    min: 300000,  max: 400000   },
  { label: "$400k–$500k",    min: 400000,  max: 500000   },
  { label: "$500k–$600k",    min: 500000,  max: 600000   },
  { label: "$600k–$700k",    min: 600000,  max: 700000   },
  { label: "$700k–$800k",    min: 700000,  max: 800000   },
  { label: "$800k–$1M",      min: 800000,  max: 1000000  },
  { label: "$1M–$1.5M",      min: 1000000, max: 1500000  },
  { label: "$1.5M–$2M",      min: 1500000, max: 2000000  },
  { label: "$2M–$3M",        min: 2000000, max: 3000000  },
  { label: "$3M+",           min: 3000000, max: 0        },
];

function priceRangeLabel(min: number, max: number): string {
  for (const r of PRICE_RANGES) {
    if (r.min === min && r.max === max) return r.label;
  }
  return "Any Price";
}

interface Props {
  compact?:            boolean;
  initialCity?:        string;
  initialMinPrice?:    number;
  initialMaxPrice?:    number;
  initialBeds?:        number;
  initialListingType?: "buy" | "rent";
}

export default function SearchBar({
  compact            = false,
  initialCity        = "",
  initialMinPrice    = 0,
  initialMaxPrice    = 0,
  initialBeds        = 0,
  initialListingType = "buy",
}: Props) {
  const router = useRouter();
  const [listingType, setListingType] = useState<"buy" | "rent">(initialListingType);
  const [city,        setCity]        = useState(initialCity || "All Areas");
  const [priceRange,  setPriceRange]  = useState(priceRangeLabel(initialMinPrice, initialMaxPrice));
  const [beds,        setBeds]        = useState(initialBeds > 0 ? `${initialBeds}+` : "Any");
  const [keyword,     setKeyword]     = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", listingType);
    if (city !== "All Areas") params.set("city", city);
    const range = PRICE_RANGES.find(r => r.label === priceRange);
    if (range?.min) params.set("minPrice", String(range.min));
    if (range?.max) params.set("maxPrice", String(range.max));
    if (beds !== "Any") params.set("beds", beds.replace("+", ""));
    if (keyword) params.set("q", keyword);
    router.push(`/listings?${params.toString()}`);
  }

  if (compact) {
    return (
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="City, zip, or address…"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          className="flex-1 rounded-lg px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <button type="submit" className="btn-gold py-2.5 px-5 text-sm">
          Search
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4"
    >
      {/* For Sale / For Rent toggle */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        <button
          type="button"
          onClick={() => setListingType("buy")}
          className={`text-sm font-bold px-5 py-2 rounded-lg transition-colors ${
            listingType === "buy"
              ? "bg-charcoal text-gold shadow-sm"
              : "text-gray-500 hover:text-charcoal"
          }`}
        >
          For Sale
        </button>
        <button
          type="button"
          onClick={() => setListingType("rent")}
          className={`text-sm font-bold px-5 py-2 rounded-lg transition-colors ${
            listingType === "rent"
              ? "bg-charcoal text-gold shadow-sm"
              : "text-gray-500 hover:text-charcoal"
          }`}
        >
          For Rent
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Location */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Area</label>
          <select
            value={city}
            onChange={e => setCity(e.target.value)}
            className="rounded-lg px-3 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold font-medium"
          >
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Price</label>
          <select
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
            className="rounded-lg px-3 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold font-medium"
          >
            {PRICE_RANGES.map(r => <option key={r.label}>{r.label}</option>)}
          </select>
        </div>

        {/* Beds */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Beds</label>
          <select
            value={beds}
            onChange={e => setBeds(e.target.value)}
            className="rounded-lg px-3 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold font-medium"
          >
            {["Any", "1+", "2+", "3+", "4+", "5+"].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>

        {/* Keyword */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Keyword</label>
          <input
            type="text"
            placeholder="Neighborhood, school, zip…"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="rounded-lg px-3 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      <button type="submit" className="btn-gold w-full justify-center text-base py-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search Dayton Homes
      </button>
    </form>
  );
}
