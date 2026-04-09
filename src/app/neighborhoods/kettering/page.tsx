import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: "Kettering Homes for Sale | Kettering OH Real Estate | Dayton Relo",
  description: "Find homes for sale in Kettering, OH. Established suburb with solid value, strong community, and mid-century character. Real estate by Chris Jurgens, licensed Ohio realtor.",
  keywords: [
    "Kettering OH homes for sale",
    "Kettering Ohio real estate",
    "Kettering realtor",
    "homes for sale Kettering Ohio",
    "affordable homes Dayton area",
  ],
  alternates: { canonical: "https://daytonrelo.com/neighborhoods/kettering" },
  openGraph: {
    title: "Kettering Homes for Sale | Kettering OH Real Estate",
    description: "Find homes for sale in Kettering, OH. Established suburb with solid value, strong community, and mid-century character.",
    url: "https://daytonrelo.com/neighborhoods/kettering",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  name: "Chris Jurgens - Dayton Relo",
  description: "Real estate agent specializing in Kettering, OH homes",
  url: "https://daytonrelo.com",
  telephone: "+19372413484",
  areaServed: {
    "@type": "City",
    name: "Kettering",
    addressRegion: "OH",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "OH",
  },
  geo: {
    "@type": "Place",
    name: "Kettering, Ohio",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.6868,
      longitude: -84.1746,
    },
  },
};

export default function KetteringPage() {
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
            Dayton Area · Kettering, OH
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Kettering Homes for Sale
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
            An established and welcoming suburb just south of Dayton offering solid value, strong neighborhood character, and excellent bang for your dollar. Mid-century homes well-maintained by owners who care about their community.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/listings?city=Kettering"
              className="inline-block bg-gold text-charcoal font-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Search Kettering Homes →
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
            <p className="text-2xl font-black text-gold">$230K</p>
            <p className="text-xs text-gray-500">Median Price</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">15 mi</p>
            <p className="text-xs text-gray-500">to WPAFB Gate 12A</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">7/10</p>
            <p className="text-xs text-gray-500">School Rating</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">1965</p>
            <p className="text-xs text-gray-500">Median Year Built</p>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-charcoal mb-4">
            Living in Kettering, Ohio
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Kettering is the middle ground. It's an established suburb south of Dayton that offers genuine value without pretense. Families and professionals here aren't chasing the top school rating or the shortest commute—they're looking for well-built homes, stable neighborhoods, and reasonable prices. Kettering City Schools rate a solid 7/10, which is respectable and more than adequate for most families, even if not top-tier. The community has a strong civic identity and real neighborliness.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The housing stock is mid-century (median 1965), and this is where you see the character of Dayton's vintage suburbs shine through. Homes have larger lots, mature trees, and genuine craftsmanship in construction. Many have been owned and maintained by the same families for decades, which means less "flipped" inventory and more stable pricing. You're not buying trendy—you're buying solid, proven neighborhoods where things don't change rapidly and property values stay reliable.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            At $230K median, Kettering is more affordable than Beavercreek, Centerville, or Springboro, but prices reflect genuine value, not desperation. The commute to WPAFB is about 15 miles (18–20 minutes), putting it in the middle ground between Fairborn and Centerville. Kettering appeals to buyers who want more space for less money, who value community over school district rankings, and who appreciate vintage Ohio neighborhoods where you can park your family long-term without constant maintenance surprises.
          </p>

          {/* Pros/cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">
                Why Buyers Choose Kettering
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Excellent value ($230K median price)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Larger homes on bigger lots vs. new suburbs</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Well-maintained, stable neighborhoods</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Solid schools (7/10) without premium pricing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Strong community character and engagement</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">Things to Know</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Older homes require periodic maintenance</li>
                <li>• Mid-commute to WPAFB (15 miles)</li>
                <li>• Schools good but not top-ranked in state</li>
                <li>• Less "buzz" or trendy amenities</li>
                <li>• Not the fastest appreciation, but steady</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to search listings */}
      <section className="bg-charcoal py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white mb-3">
            Ready to See Kettering Homes?
          </h2>
          <p className="text-gray-300 mb-6">
            Browse active MLS listings or connect with Chris directly for a personal tour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/listings?city=Kettering"
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
