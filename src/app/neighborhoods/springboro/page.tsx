import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: "Springboro Homes for Sale | Springboro OH Real Estate | Dayton Relo",
  description: "Find homes for sale in Springboro, OH. #1 rated schools in Ohio, fastest-growing suburb with new amenities. Real estate by Chris Jurgens, licensed Ohio realtor.",
  keywords: [
    "Springboro OH homes for sale",
    "Springboro Ohio real estate",
    "Springboro schools",
    "Springboro realtor",
    "best schools Dayton Ohio",
    "new construction Springboro",
  ],
  alternates: { canonical: "https://daytonrelo.com/neighborhoods/springboro" },
  openGraph: {
    title: "Springboro Homes for Sale | Springboro OH Real Estate",
    description: "Find homes for sale in Springboro, OH. #1 rated schools in Ohio, fastest-growing community with new amenities and restaurants.",
    url: "https://daytonrelo.com/neighborhoods/springboro",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  name: "Chris Jurgens - Dayton Relo",
  description: "Real estate agent specializing in Springboro, OH homes with top-rated schools",
  url: "https://daytonrelo.com",
  telephone: "+19372413484",
  areaServed: {
    "@type": "City",
    name: "Springboro",
    addressRegion: "OH",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "OH",
  },
  geo: {
    "@type": "Place",
    name: "Springboro, Ohio",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.5597,
      longitude: -84.2239,
    },
  },
};

export default function SpringboroPage() {
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
            Dayton Area · Springboro, OH
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Springboro Homes for Sale
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
            One of Ohio's fastest-growing communities with the state's #1-ranked school district. Modern new homes, growing dining and retail scene, and a vibrant family-centered community. Perfect for those prioritizing education and growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/listings?city=Springboro"
              className="inline-block bg-gold text-charcoal font-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Search Springboro Homes →
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
            <p className="text-2xl font-black text-gold">$385K</p>
            <p className="text-xs text-gray-500">Median Price</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">25 mi</p>
            <p className="text-xs text-gray-500">to WPAFB Gate 12A</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">10/10</p>
            <p className="text-xs text-gray-500">School Rating</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">1998</p>
            <p className="text-xs text-gray-500">Median Year Built</p>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-charcoal mb-4">
            Living in Springboro, Ohio
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Springboro is the hottest suburb in the Dayton region and for good reason: Springboro Community City Schools consistently rank #1 in Ohio and are among the best in the nation. This is the destination for families who have made education the absolute priority and are willing to drive 25 miles to WPAFB or accept a longer commute to downtown Dayton. The school district's reputation for academic excellence, competitive programs, and college preparation is unmatched in the area.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Beyond schools, Springboro is one of Ohio's fastest-growing communities. This is where you see new development, new restaurants, new retail, and a sense of forward momentum. The median year built (1998) reflects newer housing stock compared to Dayton's older suburbs. Homes here are modern, many with contemporary finishes and updated layouts. The community has invested heavily in amenities—parks, trails, recreation facilities—and the downtown area has become a destination with restaurants, shops, and gathering spaces.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The tradeoff is distance and price. At $385K median, Springboro is among the priciest in the region, and at 25 miles from WPAFB, it's the furthest commute. This is the choice for families not tethered to base, or for those with flexible work arrangements. If you're relocating to Dayton specifically for quality of schools and you're willing to stay long-term, Springboro rewards that commitment with genuine pride of place and strong home values.
          </p>

          {/* Pros/cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">
                Why Buyers Choose Springboro
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> #1-ranked schools in Ohio (nationally top-rated)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Fastest-growing, most vibrant community</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Newer homes (1998+) with modern finishes</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Growing restaurant, retail, and entertainment scene</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Strong sense of pride and community investment</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">Things to Know</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Longest commute to WPAFB (25 miles)</li>
                <li>• Highest median price ($385K) in region</li>
                <li>• Very competitive market—limited inventory</li>
                <li>• Rapid growth means traffic and development</li>
                <li>• Not ideal if proximity to base is critical</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to search listings */}
      <section className="bg-charcoal py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white mb-3">
            Ready to See Springboro Homes?
          </h2>
          <p className="text-gray-300 mb-6">
            Browse active MLS listings or connect with Chris directly for a personal tour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/listings?city=Springboro"
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
