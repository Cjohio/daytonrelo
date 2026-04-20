"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Search, Heart } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { type MLSListing } from "@/lib/trestle";

export default function SavedHomes() {
  const [savedKeys,    setSavedKeys]    = useState<string[]>([]);
  const [savedListings, setSavedListings] = useState<MLSListing[]>([]);
  const [loaded,       setLoaded]       = useState(false);

  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(localStorage.getItem("dr_saved") ?? "[]");
      setSavedKeys(stored);
      // Fetch each saved listing from the API
      Promise.all(
        stored.map(key =>
          fetch(`/api/listing/${encodeURIComponent(key)}`)
            .then(r => r.ok ? r.json() as Promise<MLSListing> : null)
            .catch(() => null)
        )
      ).then(results => {
        setSavedListings(results.filter((l): l is MLSListing => l !== null));
      });
    } catch {
      setSavedKeys([]);
    }
    setLoaded(true);
  }, []);

  function clearAll() {
    localStorage.removeItem("dr_saved");
    setSavedKeys([]);
    setSavedListings([]);
  }

  if (!loaded) return null;

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-end justify-between">
          <div>
            <p className="section-label mb-2">Your List</p>
            <h1 className="text-3xl md:text-4xl font-black text-white">Saved Homes</h1>
            <p className="text-gray-400 mt-1">
              {savedListings.length > 0
                ? `${savedListings.length} home${savedListings.length !== 1 ? "s" : ""} saved`
                : "No saved homes yet"}
            </p>
          </div>
          {savedListings.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-gray-500 hover:text-red-400 transition-colors font-semibold"
            >
              Clear All
            </button>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {savedListings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
              {savedListings.map(listing => (
                <PropertyCard key={listing.ListingKey} listing={listing} />
              ))}
            </div>

            {/* Schedule showings CTA */}
            <div className="bg-charcoal rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Ready to See Them?</p>
                <h2 className="text-2xl font-black text-white mb-2">Schedule Showings</h2>
                <p className="text-gray-400 leading-relaxed">
                  You&apos;ve got a list — now let&apos;s get you inside these homes. Chris can arrange back-to-back showings on your schedule, even on short notice.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
                <a href="tel:+19372413484" className="btn-gold justify-center text-base flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (937) 241-3484
                </a>
                <Link href="/contact" className="btn-outline text-white border-white/30 hover:bg-white hover:text-charcoal justify-center">
                  Send My List to Chris
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-cream flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black mb-3">No saved homes yet</h2>
            <p className="text-gray-500 max-w-sm mb-8">
              Tap the heart icon on any listing to save it here. Browse the MLS and start building your list.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/listings" className="btn-gold">Browse Listings</Link>
              <Link href="/open-houses" className="btn-outline">View Open Houses</Link>
            </div>

            {/* Tips */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-2xl">
              {[
                { icon: Search, title: "Search by area", desc: "Filter by city, price, beds, and more to find your perfect match." },
                { icon: Heart,  title: "Save your favorites", desc: "Heart listings you love. No account needed — saved right in your browser." },
                { icon: Phone, title: "Call Chris",    desc: "Ready to see them in person? Chris will arrange showings on your schedule." },
              ].map(({ icon: IconComponent, title, desc }) => (
                <div key={title} className="bg-cream rounded-2xl p-5 text-center">
                  <div className="flex justify-center mb-2"><IconComponent className="w-8 h-8 text-charcoal" /></div>
                  <p className="font-black text-sm mb-1">{title}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
