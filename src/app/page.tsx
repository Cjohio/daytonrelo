import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import LeadForm from "@/components/LeadForm";
import OpenHouseSignupForm from "@/components/OpenHouseSignupForm";
import { MOCK_LISTINGS } from "@/lib/trestle";

export const metadata: Metadata = {
  title: "Dayton Relo | Chris Jurgens – Dayton Ohio Realtor",
  description: "Relocating to Dayton, Ohio? Military PCS, corporate move, or buying local — search homes, get open house alerts, and connect with Chris Jurgens. Licensed Ohio Realtor · Team Flory · eXp Realty.",
};

const STATS = [
  { value: "15+",  label: "Years Experience" },
  { value: "$7M+", label: "Revenue Generated" },
  { value: "9 Yrs", label: "Army Veteran" },
  { value: "100%", label: "Hands-On Approach" },
];

const PATHS = [
  {
    icon: "🎖️",
    title: "Military / PCS",
    sub: "WPAFB · VA Loans · BAH",
    desc: "PCS orders to Wright-Patterson? Chris knows the base, the zip codes, and the VA loan process inside and out.",
    href: "/military",
    cta: "Military PCS Guide →",
    bg: "from-charcoal to-charcoal/80",
  },
  {
    icon: "💼",
    title: "Corporate Relocation",
    sub: "Job Move · Relo Package",
    desc: "Relocating for work? Get settled fast with a realtor who understands your timeline, your budget, and your needs.",
    href: "/relocation",
    cta: "Relocation Guide →",
    bg: "from-charcoal to-charcoal/80",
  },
  {
    icon: "🏡",
    title: "Dayton Resident",
    sub: "Buying Local · Investing",
    desc: "Already in Dayton and ready to buy, sell, or invest? Chris brings 15 years of local market expertise.",
    href: "/contact",
    cta: "Start the Conversation →",
    bg: "from-charcoal to-charcoal/80",
  },
];

const NEIGHBORHOODS = [
  { name: "Beavercreek", tag: "Top-rated schools · WPAFB close",     icon: "🏫" },
  { name: "Centerville",  tag: "Family-friendly · Quiet suburbs",     icon: "🌳" },
  { name: "Kettering",   tag: "Established · Affordable",             icon: "🏘️" },
  { name: "Springboro",  tag: "Growing fast · Great schools",         icon: "🚀" },
  { name: "Fairborn",    tag: "Near WPAFB · Budget-friendly",         icon: "✈️" },
  { name: "Oakwood",     tag: "Luxury · Historic · Walkable",         icon: "⭐" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Live MLS Search",
    desc: "Full Dayton-area IDX listings — updated every 15 minutes directly from the MLS.",
    href: "/listings",
    cta: "Search Homes",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Save Your Favorites",
    desc: "Heart homes you love and revisit your saved list any time — no account needed.",
    href: "/saved",
    cta: "View Saved",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Open House Alerts",
    desc: "Sign up once and get notified every time a new open house pops up in your target area.",
    href: "/open-houses",
    cta: "Get Alerts",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Community Board",
    desc: "Questions about Dayton? Ask the community. PCS tips, neighborhood advice, school reviews.",
    href: "/community",
    cta: "Join the Conversation",
  },
];

// Featured = first 4 mock listings (will be real IDX data once Trestle is live)
const FEATURED = MOCK_LISTINGS.slice(0, 4);
const OPEN_HOUSES = MOCK_LISTINGS.filter(l => l.OpenHouseDate);

export default function HomePage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          HERO — full-width dark section with search bar
      ───────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-charcoal text-white overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-gold/10 pointer-events-none" />
        {/* Gold bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
            {/* Copy */}
            <div className="flex-1 text-center lg:text-left">
              <p className="section-label mb-4 text-gold">Dayton, Ohio Real Estate</p>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                Your Move.<br />
                Your Mission.<br />
                <span className="text-gold">Your Home.</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                Military PCS. Corporate relocation. Buying local. Whatever brings you to Dayton — Chris Jurgens is the agent who treats your move like a business decision.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="tel:+19372413484" className="btn-gold text-base">
                  📞 (937) 241-3484
                </a>
                <Link href="/contact" className="btn-outline text-base">
                  Send a Message
                </Link>
              </div>
            </div>

            {/* Headshot */}
            <div className="relative flex-shrink-0">
              <div className="w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden border-4 border-gold shadow-2xl shadow-gold/20">
                <Image
                  src="/headshot.jpg"
                  alt="Chris Jurgens – Dayton Realtor"
                  width={256}
                  height={320}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gold text-charcoal text-xs font-black px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                Team Flory · eXp Realty
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3 text-center">
              Search Dayton MLS Listings
            </p>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          STATS BAR
      ───────────────────────────────────────────────────────────────────── */}
      <section className="bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-charcoal text-2xl font-black">{value}</p>
              <p className="text-charcoal/70 text-xs font-semibold uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FEATURES GRID
      ───────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <p className="section-label mb-2">Everything You Need</p>
          <h2 className="text-3xl md:text-4xl font-black">Your complete Dayton home search</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon, title, desc, href, cta }) => (
            <Link
              key={href}
              href={href}
              className="group card hover:border-gold hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-white transition-colors">
                {icon}
              </div>
              <h3 className="text-base font-black mb-2 group-hover:text-gold transition-colors">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
              <span className="text-gold text-sm font-bold mt-4">{cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FEATURED LISTINGS
      ───────────────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-2">Fresh on the Market</p>
              <h2 className="text-3xl md:text-4xl font-black">Featured Listings</h2>
            </div>
            <Link href="/listings" className="btn-outline text-sm py-2 hidden sm:inline-flex">
              View All Listings →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {FEATURED.map(listing => (
              <PropertyCard key={listing.ListingKey} listing={listing} />
            ))}
          </div>
          <div className="text-center sm:hidden">
            <Link href="/listings" className="btn-outline">View All Listings →</Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          OPEN HOUSE ALERTS
      ───────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Copy */}
          <div className="flex-1 max-w-lg">
            <p className="section-label mb-3">Never Miss One</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Open House Alerts</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Get notified by email the moment a new open house is scheduled in your target areas. Set your filters once — we'll handle the rest.
            </p>
            {OPEN_HOUSES.length > 0 && (
              <div className="flex flex-col gap-3 mb-6">
                {OPEN_HOUSES.map(l => (
                  <Link
                    key={l.ListingKey}
                    href={`/listings/${l.ListingKey}`}
                    className="flex items-center gap-3 bg-cream rounded-xl p-3 hover:border-gold border border-transparent transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black truncate">{l.StreetNumber} {l.StreetName}</p>
                      <p className="text-xs text-gold font-bold">{l.OpenHouseDate} · {l.OpenHouseStartTime}</p>
                    </div>
                    <p className="text-sm font-black text-charcoal ml-auto">${l.ListPrice.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            )}
            <Link href="/open-houses" className="btn-gold">See All Open Houses →</Link>
          </div>

          {/* Signup card */}
          <div className="flex-1 w-full max-w-md">
            <OpenHouseSignupForm />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          WHO I HELP
      ───────────────────────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Who I Work With</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Which path describes you?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATHS.map(({ icon, title, sub, desc, href, cta }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white/5 border border-white/10 hover:border-gold rounded-2xl p-6 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-black text-white mb-1 group-hover:text-gold transition-colors">{title}</h3>
                <p className="text-gold text-xs font-bold mb-3">{sub}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
                <span className="text-gold text-sm font-bold">{cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          NEIGHBORHOODS
      ───────────────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Explore the Area</p>
            <h2 className="text-3xl md:text-4xl font-black">Dayton Area Neighborhoods</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">From WPAFB-close suburbs to top-rated school districts — Chris knows every pocket of the Dayton market.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {NEIGHBORHOODS.map(({ name, tag, icon }) => (
              <Link
                key={name}
                href={`/listings?city=${name}`}
                className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-gold hover:shadow-md transition-all duration-200"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <h3 className="font-black text-base group-hover:text-gold transition-colors mb-1">{name}</h3>
                <p className="text-gray-400 text-xs">{tag}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/neighborhoods" className="btn-outline">View All Neighborhoods →</Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          COMMUNITY BOARD TEASER
      ───────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-charcoal rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">New</p>
            <h2 className="text-3xl font-black text-white mb-4">Dayton Relo Community</h2>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-lg">
              Connect with others relocating to Dayton. Ask questions, share tips on neighborhoods, schools, WPAFB life, and more. Chris monitors the board and jumps in personally.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/community" className="btn-gold">Join the Community →</Link>
              <Link href="/community" className="btn-outline text-white border-white/30 hover:bg-white hover:text-charcoal">Browse Posts</Link>
            </div>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-3 text-center">
            {[
              { label: "Active Members", value: "847+" },
              { label: "Posts This Week", value: "42" },
              { label: "Questions Answered", value: "1.2k" },
              { label: "Chris Responses", value: "100%" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <p className="text-gold text-xl font-black">{value}</p>
                <p className="text-gray-400 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          ABOUT STRIP
      ───────────────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="section-label mb-3">About Chris</p>
            <h2 className="text-3xl font-black mb-4">The agent who treats your deal like a business decision.</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Chris Jurgens is a Dayton-based Realtor, U.S. Army Iraq War veteran, and 7-figure entrepreneur with 15 years of real estate experience. With a background in construction, operations, and high-level sales, he brings a hands-on approach that most agents simply don&apos;t offer.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              Trained by Gary Vaynerchuk, Daymond John, and Matt Higgins — Chris applies modern business and marketing strategy to help his clients win.
            </p>
            <Link href="/about" className="btn-gold">Meet Chris →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-shrink-0">
            {[
              { icon: "🏡", label: "15 Years Real Estate" },
              { icon: "🎖️", label: "Iraq War Veteran" },
              { icon: "📈", label: "7-Figure Entrepreneur" },
              { icon: "🔨", label: "Construction Background" },
            ].map(({ icon, label }) => (
              <div key={label} className="bg-charcoal text-white rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-xs font-bold text-gray-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          LEAD FORM
      ───────────────────────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="section-label mb-2">Ready to Start?</p>
            <h2 className="text-3xl font-black text-white">Let&apos;s Talk About Your Move</h2>
            <p className="text-gray-400 mt-2">No pressure. No spam. Just a real conversation about your next home.</p>
          </div>
          <LeadForm source="homepage" dark />
        </div>
      </section>
    </>
  );
}

