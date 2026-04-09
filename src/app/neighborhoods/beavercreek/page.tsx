import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: "Beavercreek Homes for Sale | Beavercreek OH Real Estate | Dayton Relo",
  description: "Find homes for sale in Beavercreek, OH near WPAFB. Top-rated schools, officer-friendly suburb. Expert real estate guidance from Chris Jurgens, licensed Ohio realtor.",
  keywords: [
    "Beavercreek OH homes for sale",
    "Beavercreek Ohio real estate",
    "homes near WPAFB",
    "Beavercreek schools",
    "Beavercreek realtor",
    "real estate Beavercreek Ohio",
  ],
  alternates: { canonical: "https://daytonrelo.com/neighborhoods/beavercreek" },
  openGraph: {
    title: "Beavercreek Homes for Sale | Beavercreek OH Real Estate",
    description: "Find homes for sale in Beavercreek, OH near WPAFB. Top-rated schools, officer-friendly suburb. Expert real estate guidance from Chris Jurgens.",
    url: "https://daytonrelo.com/neighborhoods/beavercreek",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  name: "Chris Jurgens - Dayton Relo",
  description: "Real estate agent specializing in Beavercreek, OH homes near Wright-Patterson Air Force Base",
  url: "https://daytonrelo.com",
  telephone: "+19372413484",
  areaServed: {
    "@type": "City",
    name: "Beavercreek",
    addressRegion: "OH",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "OH",
  },
  geo: {
    "@type": "Place",
    name: "Beavercreek, Ohio",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.7465,
      longitude: -84.0293,
    },
  },
};

export default function BeavercreekPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">
            Dayton Area · Beavercreek, OH
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Beavercreek Homes for Sale
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
            The closest suburb to Wright-Patterson Air Force Base with some of Ohio's top-rated schools and a thriving community of military families and professionals. Beavercreek offers the perfect balance of proximity to base, strong schools, and quality neighborhoods.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/listings?city=Beavercreek"
              className="inline-block bg-gold text-charcoal font-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Search Beavercreek Homes →
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-gold text-gold font-black px-6 py-3 rounded-lg hover:bg-gold/10 transition"
            >
              Talk to Chris
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats row */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-2xl font-black text-gold">$340K</p>
            <p className="text-xs text-gray-500">Median Price</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">8 mi</p>
            <p className="text-xs text-gray-500">to WPAFB Gate 12A</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">9/10</p>
            <p className="text-xs text-gray-500">School Rating</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">1992</p>
            <p className="text-xs text-gray-500">Median Year Built</p>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-charcoal mb-4">
            Living in Beavercreek, Ohio
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Beavercreek is widely known as the premier suburb for military families stationed at Wright-Patterson Air Force Base. Located just 8 miles north of the base, it's home to thousands of active-duty and retired service members, officers, and senior NCOs who value the combination of proximity, safety, and educational excellence. The community has a strong military character without being solely focused on base personnel—professionals, families, and retirees of all backgrounds thrive here.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Beavercreek City Schools consistently rank among the top in Ohio and nationally. This is the primary draw for families willing to pay a higher median price point. The district includes well-regarded elementary schools, a strong middle school program, and a high school known for academics, athletics, and arts. Parents here take school choice seriously, and resale values remain strong because of educational reputation alone.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The community itself is well-maintained and planned. You'll find tree-lined streets, parks with excellent facilities, and a mix of ranch and colonial-style homes mostly built from the 1980s forward. The town center has shopping, dining, and services clustered conveniently. Commute to downtown Dayton is reasonable; commute to WPAFB is minimal. For military families looking for stability, reputation, and a ready-made community of peers, Beavercreek is often the first choice.
          </p>

          {/* Pros/cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">
                Why Buyers Choose Beavercreek
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Closest suburb to WPAFB—8-minute base commute</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Top-10 school district in Ohio (Beavercreek City Schools)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Strong resale value and stable pricing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Large military community—ready-made social network</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Safe neighborhoods, low crime rates</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">Things to Know</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Higher median price ($340K) vs. other suburbs</li>
                <li>• Limited inventory—homes sell quickly</li>
                <li>• Competitive market in desirable neighborhoods</li>
                <li>• Not the cheapest option if affordability is key</li>
                <li>• Strong seller's market most of the year</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to search listings */}
      <section className="bg-charcoal py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white mb-3">
            Ready to See Beavercreek Homes?
          </h2>
          <p className="text-gray-300 mb-6">
            Browse active MLS listings or connect with Chris directly for a personal tour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/listings?city=Beavercreek"
              className="inline-block bg-gold text-charcoal font-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              View Active Listings →
            </Link>
            <a
              href="tel:+19372413484"
              className="inline-block border-2 border-gray-500 text-white font-black px-6 py-3 rounded-lg hover:border-gold transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> (937) 241-3484
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
