import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "About Chris Jurgens | Dayton Ohio Realtor",
  description: "Meet Chris Jurgens — Dayton Ohio Realtor, U.S. Army Iraq War veteran, and 7-figure entrepreneur with 15 years of real estate experience. Team Flory · eXp Realty.",
};

const PILLARS = [
  { icon: "🏡", label: "15 Years Real Estate Experience" },
  { icon: "🎖️", label: "U.S. Army · Iraq War Veteran · 9 Years" },
  { icon: "📈", label: "7-Figure Entrepreneur & Sales Strategist" },
  { icon: "🔨", label: "Construction & Operations Background" },
];

const MENTORS = ["Gary Vaynerchuk", "Daymond John", "Matt Higgins"];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="section-label mb-4">About Chris</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              The Agent in<br />
              <span className="text-gold">Your Corner.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Chris Jurgens is a Dayton-based Realtor who brings a rare mix of real-world experience, business strategy, and relentless work ethic to every client he serves.
            </p>
          </div>
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

      {/* Pillars */}
      <section className="bg-gold py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {PILLARS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <span className="text-charcoal text-xs font-bold leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bio */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            A U.S. Army Iraq War veteran with 9 years of service, Chris built his foundation on discipline, leadership, and getting the job done right the first time. Before real estate, he spent years in high-level sales, operations, and marketing roles — including consulting for businesses and generating over seven figures in revenue as an entrepreneur.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            He&apos;s been trained by some of the top names in business and marketing — including{" "}
            {MENTORS.map((m, i) => (
              <span key={m}><strong>{m}</strong>{i < MENTORS.length - 1 ? (i === MENTORS.length - 2 ? ", and " : ", ") : ""}</span>
            ))}
            {" "}— and applies those same modern strategies to help his clients win in today&apos;s market.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            Chris specializes in the Dayton market and surrounding areas, including Centerville, Beavercreek, Springboro, and Kettering. He works with buyers, sellers, and investors, with a strong focus on delivering results through aggressive marketing, sharp negotiation, and a hands-on approach that most agents simply don&apos;t offer.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            With a background in construction and operations, he doesn&apos;t just unlock doors and point out features. He helps clients spot potential issues before inspections, uncover opportunities others miss, and make smarter decisions with their money. He&apos;s known for finding off-market deals, staying in constant communication, and offering flexible options that put his clients first.
          </p>
        </div>

        {/* CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {[
            { title: "Military PCS", desc: "Veteran helping veterans navigate the WPAFB area.", href: "/military", cta: "Military Guide →" },
            { title: "Corporate Relocation", desc: "Fast, strategic, no runaround.", href: "/relocation", cta: "Relocation Guide →" },
            { title: "Neighborhood Guide", desc: "Know where to look before you land.", href: "/neighborhoods", cta: "Explore →" },
          ].map(({ title, desc, href, cta }) => (
            <Link key={href} href={href} className="card hover:border-gold hover:shadow-md transition-all duration-200 group">
              <h3 className="font-black mb-2 group-hover:text-gold transition-colors">{title}</h3>
              <p className="text-gray-500 text-sm mb-3">{desc}</p>
              <span className="text-gold text-sm font-bold">{cta}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-charcoal py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Work With Chris</p>
            <h2 className="text-3xl font-black text-white">Ready to Get Started?</h2>
            <p className="text-gray-400 mt-2">No pressure. Just a straight conversation about your move.</p>
          </div>
          <LeadForm source="about-page" dark />
        </div>
      </section>
    </>
  );
}
