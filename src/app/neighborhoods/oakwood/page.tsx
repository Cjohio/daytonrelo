import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Oakwood Homes for Sale | Oakwood OH Real Estate | Dayton Relo",
  description: "Find homes for sale in Oakwood, OH. Dayton's most prestigious inner suburb with historic architecture and highly-rated schools. Luxury real estate by Chris Jurgens.",
  keywords: [
    "Oakwood OH homes for sale",
    "Oakwood Ohio real estate",
    "Oakwood Dayton OH",
    "Oakwood realtor",
    "luxury homes Dayton Ohio",
    "historic Oakwood Ohio",
  ],
  alternates: { canonical: "https://daytonrelo.com/neighborhoods/oakwood" },
  openGraph: {
    title: "Oakwood Homes for Sale | Oakwood OH Real Estate",
    description: "Find homes for sale in Oakwood, OH. Dayton's most prestigious inner suburb with historic architecture and excellent schools.",
    url: "https://daytonrelo.com/neighborhoods/oakwood",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  name: "Chris Jurgens - Dayton Relo",
  description: "Real estate agent specializing in Oakwood, OH luxury homes and historic properties",
  url: "https://daytonrelo.com",
  telephone: "+19372413484",
  areaServed: {
    "@type": "City",
    name: "Oakwood",
    addressRegion: "OH",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "OH",
  },
  geo: {
    "@type": "Place",
    name: "Oakwood, Ohio",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.7031,
      longitude: -84.2319,
    },
  },
};

export default function OakwoodPage() {
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
            Dayton Area · Oakwood, OH
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Oakwood Homes for Sale
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
            Dayton's most prestigious inner suburb featuring walkable neighborhoods, historic architecture, and a tight-knit community of professionals and families. Highly-rated schools, low inventory, homes sell fast.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/listings?city=Oakwood"
              className="inline-block bg-gold text-charcoal font-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Search Oakwood Homes →
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
            <p className="text-2xl font-black text-gold">$450K</p>
            <p className="text-xs text-gray-500">Median Price</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">17 mi</p>
            <p className="text-xs text-gray-500">to WPAFB Gate 12A</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">9/10</p>
            <p className="text-xs text-gray-500">School Rating</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">1948</p>
            <p className="text-xs text-gray-500">Median Year Built</p>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-charcoal mb-4">
            Living in Oakwood, Ohio
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Oakwood is Dayton's crown jewel suburb. This is the address that carries prestige, history, and genuine neighborhood character. Located in the eastern part of the city, Oakwood has been the destination for Dayton's most successful professionals, business leaders, and families for over a century. Walking into Oakwood means tree-lined streets with mature oaks and maples, architectural distinction—Tudors, Colonials, period homes with genuine craftsman details—and a palpable sense of place and permanence.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The community is highly walkable, with shops, restaurants, and services clustered near the heart of the village. Oakwood has a village-center feel despite being part of the metro area—you can walk to coffee, dinner, and daily needs. Parks are excellent, civic institutions are strong, and there's a real sense of community identity. Oakwood City Schools rate 9/10, comparable to Beavercreek, but Oakwood's district is famously small and selective, which adds to the prestige and tight community feel.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The primary challenge is inventory. Oakwood is a very desirable address, and homes change hands infrequently. The median price ($450K) is the highest in the region, reflecting both quality and scarcity. When homes do come on the market, they typically sell quickly—sometimes within days. If you find the right property in Oakwood, you're joining one of the Dayton area's most distinguished communities. This is the choice for senior military officers, executives, and established families who value history, architecture, and exclusivity.
          </p>

          {/* Pros/cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">
                Why Buyers Choose Oakwood
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Most prestigious address in Dayton area</li>
                <li>✓ Historic architecture and character (Tudor, Colonial)</li>
                <li>✓ Walkable village center with shops and dining</li>
                <li>✓ Highly-rated schools in small, selective district</li>
                <li>✓ Strong sense of community and belonging</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">Things to Know</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Highest median price ($450K) in region</li>
                <li>• Very limited inventory—long waits common</li>
                <li>• Homes sell fast when available</li>
                <li>• Older architecture may need periodic maintenance</li>
                <li>• Mid-distance commute to WPAFB (17 miles)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to search listings */}
      <section className="bg-charcoal py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white mb-3">
            Ready to See Oakwood Homes?
          </h2>
          <p className="text-gray-300 mb-6">
            Browse active MLS listings or connect with Chris directly for a personal tour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/listings?city=Oakwood"
              className="inline-block bg-gold text-charcoal font-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              View Active Listings →
            </Link>
            <a
              href="tel:+19372413484"
              className="inline-block border-2 border-gray-500 text-white font-black px-6 py-3 rounded-lg hover:border-gold transition"
            >
              📞 (937) 241-3484
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
