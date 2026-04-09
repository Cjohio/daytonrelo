import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: "Centerville Homes for Sale | Centerville OH Real Estate | Dayton Relo",
  description: "Find homes for sale in Centerville, OH. Top-rated schools, safe neighborhoods, premium family suburb south of Dayton. Real estate guidance from Chris Jurgens, licensed Ohio realtor.",
  keywords: [
    "Centerville OH homes for sale",
    "Centerville Ohio real estate",
    "Centerville schools Ohio",
    "Centerville realtor",
    "Centerville OH realtor",
    "luxury homes Dayton area",
  ],
  alternates: { canonical: "https://daytonrelo.com/neighborhoods/centerville" },
  openGraph: {
    title: "Centerville Homes for Sale | Centerville OH Real Estate",
    description: "Find homes for sale in Centerville, OH. Top-rated schools, safe neighborhoods, premium family suburb south of Dayton.",
    url: "https://daytonrelo.com/neighborhoods/centerville",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  name: "Chris Jurgens - Dayton Relo",
  description: "Real estate agent specializing in Centerville, OH homes",
  url: "https://daytonrelo.com",
  telephone: "+19372413484",
  areaServed: {
    "@type": "City",
    name: "Centerville",
    addressRegion: "OH",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "OH",
  },
  geo: {
    "@type": "Place",
    name: "Centerville, Ohio",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.6408,
      longitude: -84.1469,
    },
  },
};

export default function CentervillePage() {
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
            Dayton Area · Centerville, OH
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Centerville Homes for Sale
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
            A premium family-oriented suburb south of Dayton offering consistently top-rated schools, low crime, and upscale amenities. Ideal for families willing to trade a longer commute for exceptional school quality and community prestige.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/listings?city=Centerville"
              className="inline-block bg-gold text-charcoal font-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Search Centerville Homes →
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
            <p className="text-2xl font-black text-gold">$370K</p>
            <p className="text-xs text-gray-500">Median Price</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">18 mi</p>
            <p className="text-xs text-gray-500">to WPAFB Gate 12A</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">9/10</p>
            <p className="text-xs text-gray-500">School Rating</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">1985</p>
            <p className="text-xs text-gray-500">Median Year Built</p>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-charcoal mb-4">
            Living in Centerville, Ohio
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Centerville is where families go when schools are the top priority. This is a wealthy, well-maintained suburb south of Dayton that consistently ranks in the top school districts across Ohio and the nation. Centerville City Schools have a reputation for rigorous academics, strong test scores, excellent college prep programs, and high graduation rates. If you're an officer with school-age children or a civilian professional prioritizing education, Centerville is worth the investment and commute.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The community itself reflects its emphasis on families and schools. Parks are well-funded and maintained, neighborhoods are clean and safe, and the median year built (1985) means homes are relatively newer compared to inner suburbs. You'll find a mix of traditional and contemporary architecture, larger lots, and properties that have been well-maintained by owners who care. Centerville has a strong sense of community identity and civic pride.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The tradeoff is distance and price. At 18 miles from WPAFB (via I-675), the commute is 20–25 minutes in normal traffic, longer during rush hours. The median price of $370K is higher than most other area suburbs, but it's justified by school reputation and home quality. This is where you go if you believe excellent schools offset the commute, or if your military assignment is not base-dependent. For families stationed at WPAFB who plan to stay in Dayton long-term, Centerville is often the gold standard.
          </p>

          {/* Pros/cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">
                Why Buyers Choose Centerville
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Top-rated school district in Ohio and nation</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Safe, well-maintained neighborhoods</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Newer homes (1985+) with quality construction</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Strong community spirit and civic engagement</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Excellent parks, recreation, and amenities</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">Things to Know</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Longer commute to WPAFB (18 miles / 20–25 min)</li>
                <li>• Higher median price ($370K)</li>
                <li>• Very competitive market—bidding wars common</li>
                <li>• Lower inventory—families stay a long time</li>
                <li>• Not ideal if you prioritize proximity to base</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to search listings */}
      <section className="bg-charcoal py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white mb-3">
            Ready to See Centerville Homes?
          </h2>
          <p className="text-gray-300 mb-6">
            Browse active MLS listings or connect with Chris directly for a personal tour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/listings?city=Centerville"
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
