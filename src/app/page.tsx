import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Medal, Briefcase, Home, School, Trees, Rocket, Plane, Star, Phone, Camera } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import LeadForm from "@/components/LeadForm";
import OpenHouseSignupForm from "@/components/OpenHouseSignupForm";
import { MOCK_LISTINGS } from "@/lib/trestle";

export const metadata: Metadata = {
  title: "Dayton Relo | Chris Jurgens – Dayton Ohio Realtor",
  description: "Relocating to Dayton, Ohio? Military PCS, corporate move, or buying local — search homes, use free relocation tools, and connect with Chris Jurgens. Licensed Ohio Realtor · Team Flory · eXp Realty.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const SITE_FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "25+ Free Tools",
    desc: "Mortgage calculator, BAH rates, closing cost estimator, PCS timeline, DITY calculator, neighborhood quiz, and more.",
    href: "/tools",
    cta: "Explore Tools",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Neighborhood Guides",
    desc: "Side-by-side comparisons, school ratings, commute times to WPAFB, and insider tips on every pocket of Dayton.",
    href: "/neighborhoods",
    cta: "Compare Neighborhoods",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Open House Alerts",
    desc: "Get notified the moment a new open house is scheduled in your target neighborhoods. Set it once, we handle the rest.",
    href: "/open-houses",
    cta: "Get Alerts",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0110.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Explore Dayton",
    desc: "19 breweries, 13 golf courses, 41 parks, and 73 things to do — everything you need to love your new city from day one.",
    href: "/explore",
    cta: "Explore the City",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Community Board",
    desc: "Ask questions, get answers from people who've made the same move. Chris monitors personally and responds to every thread.",
    href: "/community",
    cta: "Join the Conversation",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Free Mobile App",
    desc: "Take everything with you. Full MLS search, all the tools, and neighborhood guides — on iOS and Android.",
    href: "/contact",
    cta: "Get the App",
  },
];

const PATHS = [
  {
    icon: Medal,
    title: "Military / PCS",
    sub: "WPAFB · VA Loans · BAH",
    desc: "PCS orders to Wright-Patterson? Chris knows the base, the zip codes, and the VA loan process inside and out.",
    href: "/military",
    cta: "Military PCS Guide →",
  },
  {
    icon: Briefcase,
    title: "Corporate Relocation",
    sub: "Job Move · Relo Package",
    desc: "Relocating for work? Get settled fast with a realtor who understands your timeline, your budget, and your needs.",
    href: "/contact",
    cta: "Relocation Guide →",
  },
  {
    icon: Home,
    title: "Dayton Resident",
    sub: "Buying Local · Investing",
    desc: "Already in Dayton and ready to buy, sell, or invest? Chris brings 15 years of local market expertise.",
    href: "/contact",
    cta: "Start the Conversation →",
  },
];

const NEIGHBORHOODS = [
  { name: "Beavercreek", tag: "Top-rated schools · WPAFB close",  icon: School },
  { name: "Centerville",  tag: "Family-friendly · Quiet suburbs",  icon: Trees },
  { name: "Kettering",   tag: "Established · Affordable",          icon: Home },
  { name: "Springboro",  tag: "Growing fast · Great schools",       icon: Rocket },
  { name: "Fairborn",    tag: "Near WPAFB · Budget-friendly",      icon: Plane },
  { name: "Oakwood",     tag: "Luxury · Historic · Walkable",      icon: Star },
];

const STATS = [
  { value: "15+",  label: "Years Experience" },
  { value: "$7M+", label: "Revenue Generated" },
  { value: "9 Yrs", label: "Army Veteran" },
  { value: "100%", label: "Hands-On Approach" },
];

const FEATURED    = MOCK_LISTINGS.slice(0, 6);
const OPEN_HOUSES = MOCK_LISTINGS.filter(l => l.OpenHouseDate);

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — Search First
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,168,76,0.10),transparent)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/30" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-0 text-center">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Dayton Relo"
              width={240}
              height={70}
              className="h-14 md:h-16 w-auto object-contain"
              priority
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3">
            Find Your Next Home in Dayton, Ohio
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Live MLS listings · VA loan specialists · Free relocation tools · Local expert who picks up the phone
          </p>

          {/* Search box — hero focal point */}
          <div className="max-w-4xl mx-auto">
            <SearchBar />
          </div>

          {/* Quick city links */}
          <div className="flex flex-wrap gap-2 justify-center py-8">
            {["Beavercreek", "Centerville", "Kettering", "Fairborn", "Springboro", "Oakwood", "Huber Heights"].map(city => (
              <Link
                key={city}
                href={`/listings?city=${city}`}
                className="text-xs font-semibold text-gray-400 hover:text-gold transition-colors border border-white/10 hover:border-gold/40 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED LISTINGS — Right below the search
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-1">Fresh on the Market</p>
              <h2 className="text-3xl md:text-4xl font-black">Featured Listings</h2>
              <p className="text-gray-500 mt-1 text-sm">Updated directly from the Dayton-area MLS</p>
            </div>
            <Link href="/listings" className="btn-gold text-sm py-2.5 hidden sm:inline-flex">
              View All Listings →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {FEATURED.map(listing => (
              <PropertyCard key={listing.ListingKey} listing={listing} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-6">
            <Link href="/listings" className="btn-gold px-8">Browse All Homes →</Link>
            <Link href="/open-houses" className="btn-outline px-8">Upcoming Open Houses</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHO I HELP — Self-identify your path
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Who I Work With</p>
            <h2 className="text-3xl md:text-4xl font-black">Which path describes you?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATHS.map(({ icon: IconComponent, title, sub, desc, href, cta }) => (
              <Link
                key={href + title}
                href={href}
                className="group bg-charcoal border border-white/10 hover:border-gold rounded-2xl p-7 transition-all duration-200"
              >
                <div className="text-4xl mb-4"><IconComponent className="w-8 h-8 text-white" /></div>
                <h3 className="text-xl font-black text-white mb-1 group-hover:text-gold transition-colors">{title}</h3>
                <p className="text-gold text-xs font-bold mb-3">{sub}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{desc}</p>
                <span className="text-gold text-sm font-bold">{cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          OPEN HOUSE ALERTS — Soft lead capture
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 max-w-lg">
              <p className="section-label mb-3">Never Miss One</p>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Open House Alerts</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Get notified by email the moment a new open house is scheduled in your target areas. Set your filters once — we&apos;ll handle the rest.
              </p>
              {OPEN_HOUSES.length > 0 && (
                <div className="flex flex-col gap-3 mb-6">
                  {OPEN_HOUSES.map(l => (
                    <Link
                      key={l.ListingKey}
                      href={`/listings/${l.ListingKey}`}
                      className="flex items-center gap-3 bg-white rounded-xl p-3 hover:border-gold border border-gray-100 transition-colors shadow-sm"
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
            <div className="flex-1 w-full max-w-md">
              <OpenHouseSignupForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          NEIGHBORHOODS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Explore the Area</p>
            <h2 className="text-3xl md:text-4xl font-black">Shop by Neighborhood</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From WPAFB-close suburbs to top-rated school districts — click any neighborhood to see active listings.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {NEIGHBORHOODS.map(({ name, tag, icon: IconComponent }) => (
              <Link
                key={name}
                href={`/listings?city=${name}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all duration-200"
              >
                <div className="text-3xl mb-3"><IconComponent className="w-8 h-8" /></div>
                <h3 className="font-black text-base group-hover:text-gold transition-colors mb-1">{name}</h3>
                <p className="text-gray-400 text-xs">{tag}</p>
                <p className="text-gold text-xs font-bold mt-3">View listings →</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/neighborhoods" className="btn-outline">Full Neighborhood Guides →</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CHRIS — Trust / Credibility strip
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="relative inline-block">
                <div className="w-52 h-64 md:w-60 md:h-72 rounded-2xl overflow-hidden border-4 border-gold shadow-2xl shadow-gold/20">
                  <Image
                    src="/headshot.jpg"
                    alt="Chris Jurgens – Dayton Realtor"
                    width={240}
                    height={288}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gold text-charcoal text-xs font-black px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  Team Flory · eXp Realty
                </div>
              </div>
            </div>

            <div className="flex-1 text-white">
              <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">Your Agent</p>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Chris Jurgens</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-xl">
                Dayton-based Realtor. U.S. Army Iraq War veteran. 15 years of real estate experience.
                I built this platform because relocating is hard — and most agents don&apos;t
                take it seriously enough. I do.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-gold text-2xl font-black">{value}</p>
                    <p className="text-gray-400 text-xs mt-1 leading-tight">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="tel:+19372413484" className="btn-gold flex items-center gap-2"><Phone className="w-4 h-4" /> Call or Text Chris</a>
                <Link href="/about" className="btn-outline text-white border-white/30 hover:bg-white hover:text-charcoal">My Story →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PLATFORM TOOLS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Everything in One Place</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3">More than a home search.</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Free tools, local knowledge, and a real agent who picks up the phone.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SITE_FEATURES.map(({ icon, title, desc, href, cta }) => (
              <Link
                key={href + title}
                href={href}
                className="group card hover:border-gold hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-white transition-colors flex-shrink-0">
                  {icon}
                </div>
                <h3 className="text-base font-black mb-2 group-hover:text-gold transition-colors">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
                <span className="text-gold text-sm font-bold mt-4 inline-block">{cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          EXPLORE DAYTON
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-charcoal py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label mb-3">Life in Dayton</p>
          <h2 className="text-3xl font-black text-white mb-3">Explore Your New City</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            The guides that answer the question every newcomer asks: "What is there to actually do here?"
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "🍺 Breweries", href: "/explore/breweries" },
              { label: "⛳ Golf Courses", href: "/explore/golf" },
              { label: "🌳 Parks", href: "/explore/parks" },
              { label: "🗺️ Things To Do", href: "/explore/things-to-do" },
              { label: "🚗 Day Trips", href: "/explore/day-trips" },
              { label: "🍽 Restaurants", href: "/explore/restaurants" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="bg-white/5 border border-white/10 text-white font-bold px-6 py-3 rounded-full hover:bg-gold hover:text-charcoal hover:border-gold transition-colors text-sm"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          COMMUNITY BOARD
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-charcoal rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">Community</p>
            <h2 className="text-3xl font-black text-white mb-4">Dayton Relo Community</h2>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-lg">
              Connect with others making the same move. Ask questions, share tips on neighborhoods, schools, WPAFB life, and more. Chris monitors the board and jumps in personally.
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

      {/* ═══════════════════════════════════════════════════════════════════════
          LEAD FORM — Final CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-charcoal py-16 border-t border-white/10">
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
