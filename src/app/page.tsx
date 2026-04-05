import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Dayton Relo | Chris Jurgens – Dayton Ohio Realtor",
  description: "Relocating to Dayton, Ohio? Military PCS, corporate move, or buying local — Chris Jurgens gets you home. Licensed Ohio Realtor · Team Flory · eXp Realty.",
};

const PATHS = [
  {
    icon: "🎖️",
    title: "Military / PCS",
    sub: "WPAFB · VA Loans · BAH",
    desc: "PCS orders to Wright-Patterson? Chris knows the base, the zip codes, and the VA loan process inside and out.",
    href: "/military",
    cta: "Military PCS Guide →",
  },
  {
    icon: "💼",
    title: "Corporate Relocation",
    sub: "Job Move · Relo Package",
    desc: "Relocating for work? Get settled fast with a realtor who understands your timeline, your budget, and your needs.",
    href: "/relocation",
    cta: "Relocation Guide →",
  },
  {
    icon: "🏡",
    title: "Dayton Resident",
    sub: "Buying Local · Investing",
    desc: "Already in Dayton and ready to buy, sell, or invest? Chris brings 15 years of local market expertise.",
    href: "/contact",
    cta: "Start the Conversation →",
  },
];

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "$7M+", label: "Revenue Generated" },
  { value: "9 Yrs", label: "Army Veteran" },
  { value: "100%", label: "Hands-On Approach" },
];

const NEIGHBORHOODS = [
  { name: "Beavercreek", tag: "Top-rated schools · WPAFB close" },
  { name: "Centerville",  tag: "Family-friendly · Quiet suburbs" },
  { name: "Kettering",   tag: "Established · Affordable" },
  { name: "Springboro",  tag: "Growing · Great schools" },
  { name: "Fairborn",    tag: "Near WPAFB · Budget-friendly" },
  { name: "Oakwood",     tag: "Luxury · Walkable" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-gold/20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="section-label mb-4">Dayton, Ohio Real Estate</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Let&apos;s Get You<br />
              <span className="text-gold">Home.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Military PCS. Corporate relocation. Buying local. Whatever brings you to Dayton — Chris Jurgens is the agent who treats your move like a business decision.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="tel:+19372413484" className="btn-gold">Call (937) 241-3484</a>
              <Link href="/contact" className="btn-outline">Send a Message</Link>
            </div>
          </div>

          {/* Headshot */}
          <div className="relative flex-shrink-0">
            <div className="w-64 h-80 rounded-2xl overflow-hidden border-4 border-gold shadow-2xl shadow-gold/20">
              <Image
                src="/headshot.jpg"
                alt="Chris Jurgens – Dayton Realtor"
                width={256}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gold text-charcoal text-xs font-black px-4 py-2 rounded-lg shadow-lg">
              Team Flory · eXp Realty
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────── */}
      <section className="bg-gold">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-charcoal text-2xl font-black">{value}</p>
              <p className="text-charcoal/70 text-xs font-semibold uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who I help ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Who I Work With</p>
          <h2 className="text-3xl md:text-4xl font-black">Which path describes you?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATHS.map(({ icon, title, sub, desc, href, cta }) => (
            <Link key={href} href={href} className="group card hover:border-gold hover:shadow-md transition-all duration-200">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-lg font-black mb-1 group-hover:text-gold transition-colors">{title}</h3>
              <p className="text-gold text-xs font-bold mb-3">{sub}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
              <span className="text-gold text-sm font-bold">{cta}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Neighborhoods ───────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Explore the Area</p>
            <h2 className="text-3xl md:text-4xl font-black">Dayton Area Neighborhoods</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">From WPAFB-close suburbs to top-rated school districts — Chris knows every pocket of the Dayton market.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {NEIGHBORHOODS.map(({ name, tag }) => (
              <Link key={name} href="/neighborhoods" className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-gold hover:shadow-md transition-all duration-200">
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

      {/* ── About strip ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 flex flex-col md:flex-row items-center gap-12">
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
      </section>

      {/* ── Lead form ───────────────────────────────────────── */}
      <section className="bg-charcoal py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Ready to Start?</p>
            <h2 className="text-3xl font-black text-white">Get in Touch</h2>
            <p className="text-gray-400 mt-2">No pressure. Just a conversation about your move.</p>
          </div>
          <LeadForm source="homepage" dark />
        </div>
      </section>
    </>
  );
}
