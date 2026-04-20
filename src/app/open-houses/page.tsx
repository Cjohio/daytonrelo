import type { Metadata } from "next";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import OpenHouseSignupForm from "@/components/OpenHouseSignupForm";
import { getOpenHouses, searchListings, MOCK_LISTINGS } from "@/lib/trestle";
import { Zap, MapPin, DollarSign, Award, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: "Open Houses in Dayton, Ohio | Dayton Relo",
  description: "Find upcoming open houses in Dayton, Beavercreek, Centerville, Fairborn and more. Sign up for real-time email alerts when new open houses are scheduled.",
};

export const revalidate = 300;

const BENEFITS = [
  {
    icon: Zap,
    title: "Instant Alerts",
    desc: "Get notified the same day a new open house is added to the MLS — before most people even know about it.",
  },
  {
    icon: MapPin,
    title: "Area-Specific",
    desc: "Choose your target neighborhoods. Only get alerts for homes in the areas that matter to you.",
  },
  {
    icon: DollarSign,
    title: "Price-Filtered",
    desc: "Set a max price so you only hear about homes within your budget. No noise.",
  },
  {
    icon: Award,
    title: "Military-First",
    desc: "Chris highlights open houses near WPAFB with VA loan-eligible properties for PCS families.",
  },
];

export default async function OpenHousesPage() {
  let allListings = MOCK_LISTINGS;
  try {
    const results = await searchListings({ limit: 50 });
    if (results.length > 0) allListings = results;
  } catch {
    // Credentials not set or API unavailable — fall back to mock data
  }
  const OPEN_HOUSES   = allListings.filter(l => l.OpenHouseDate);
  const ALL_UPCOMING  = allListings;

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label mb-3">Dayton Area</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Open Houses &amp; <span className="text-gold">Showing Alerts</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse upcoming open houses across the Dayton area — or sign up to get email alerts the moment a new one is scheduled in your target neighborhoods.
          </p>
        </div>
      </section>

      {/* Upcoming Open Houses + Signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left: listings */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-black mb-6">
              Upcoming Open Houses
              <span className="ml-2 text-base font-normal text-gray-400">({OPEN_HOUSES.length} scheduled)</span>
            </h2>

            {OPEN_HOUSES.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {OPEN_HOUSES.map(listing => (
                  <PropertyCard key={listing.ListingKey} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-cream rounded-2xl p-8 text-center mb-8">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-charcoal" />
                <h3 className="font-black mb-2">No open houses this weekend</h3>
                <p className="text-gray-500 text-sm">Sign up for alerts and we&apos;ll notify you as soon as one is scheduled in your area.</p>
              </div>
            )}

            {/* Also show recently listed */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-black mb-2">Recently Listed — Schedule a Private Showing</h2>
              <p className="text-gray-500 text-sm mb-5">Don&apos;t wait for an open house. Chris can schedule a private tour on your timeline.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {ALL_UPCOMING.slice(0, 4).map(listing => (
                  <PropertyCard key={listing.ListingKey} listing={listing} />
                ))}
              </div>
              <div className="text-center mt-6">
                <Link href="/listings" className="btn-outline">View All Listings →</Link>
              </div>
            </div>
          </div>

          {/* Right: signup */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-20 flex flex-col gap-6">
              <OpenHouseSignupForm />

              {/* Benefits */}
              <div className="card">
                <h3 className="text-base font-black mb-4">Why sign up?</h3>
                <div className="flex flex-col gap-4">
                  {BENEFITS.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-3">
                      <Icon className="w-6 h-6 flex-shrink-0 text-gold" />
                      <div>
                        <p className="text-sm font-black mb-0.5">{title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chris card */}
              <div className="bg-charcoal rounded-2xl p-5 text-white">
                <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">Skip the Line</p>
                <p className="font-black mb-1">Want a private showing?</p>
                <p className="text-gray-400 text-sm mb-4">Call or text Chris directly. He&apos;ll get you in before the open house crowds.</p>
                <a href="tel:+19372413484" className="btn-gold w-full justify-center text-sm">
                  (937) 241-3484
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
