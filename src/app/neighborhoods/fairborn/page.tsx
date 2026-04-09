import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fairborn Homes for Sale | Fairborn OH Real Estate | Dayton Relo",
  description: "Find homes for sale in Fairborn, OH—closest to Wright-Patterson AFB (3 miles). Most affordable option for military families, VA loans welcome. Real estate by Chris Jurgens.",
  keywords: [
    "Fairborn OH homes for sale",
    "Fairborn Ohio real estate",
    "homes near Wright Patterson AFB",
    "Fairborn realtor",
    "VA loan Fairborn Ohio",
    "military housing Fairborn",
  ],
  alternates: { canonical: "https://daytonrelo.com/neighborhoods/fairborn" },
  openGraph: {
    title: "Fairborn Homes for Sale | Fairborn OH Real Estate",
    description: "Find homes for sale in Fairborn, OH—closest to Wright-Patterson AFB. Most affordable option for military families and VA loan buyers.",
    url: "https://daytonrelo.com/neighborhoods/fairborn",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  name: "Chris Jurgens - Dayton Relo",
  description: "Real estate agent specializing in Fairborn, OH homes near Wright-Patterson Air Force Base",
  url: "https://daytonrelo.com",
  telephone: "+19372413484",
  areaServed: {
    "@type": "City",
    name: "Fairborn",
    addressRegion: "OH",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "OH",
  },
  geo: {
    "@type": "Place",
    name: "Fairborn, Ohio",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.8369,
      longitude: -84.0055,
    },
  },
};

export default function FairbornPage() {
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
            Dayton Area · Fairborn, OH
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Fairborn Homes for Sale
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
            The closest city to Wright-Patterson Air Force Base—literally at the gates. Fairborn offers the most affordable housing option for military families, junior enlisted, and VA loan buyers looking to maximize their purchasing power near base.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/listings?city=Fairborn"
              className="inline-block bg-gold text-charcoal font-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Search Fairborn Homes →
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
            <p className="text-2xl font-black text-gold">$210K</p>
            <p className="text-xs text-gray-500">Median Price</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">3 mi</p>
            <p className="text-xs text-gray-500">to WPAFB Gate 12A</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">6/10</p>
            <p className="text-xs text-gray-500">School Rating</p>
          </div>
          <div>
            <p className="text-2xl font-black text-gold">1970</p>
            <p className="text-xs text-gray-500">Median Year Built</p>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-charcoal mb-4">
            Living in Fairborn, Ohio
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Fairborn is the gateway to Wright-Patterson Air Force Base. This is where you live if your primary concern is proximity to the gate—you can be at work in minutes, not miles. The city literally borders the base, making it the most practical choice for shift workers, those pulling early alert duties, or anyone prioritizing minimal commute time. Fairborn is the hub for junior enlisted, first-time homebuyers, and military families on tighter budgets.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The housing stock is older than Beavercreek or Centerville—median year built is 1970—but it's solid, well-maintained, and affordable. You're buying vintage Ohio mid-century homes with character, large lots, and room to grow. VA loan buyers especially appreciate Fairborn because your VA purchasing power goes further here: a $210K median price means more homes in your reach, better negotiating position, and faster equity build. The city has been investing in revitalization, with downtown improvements and continued growth.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Schools here are adequate but not exceptional (6/10 rating). Fairborn City Schools are solid for families not dependent on a top-tier district, but some parents choose to stay in Beavercreek or Centerville specifically for school quality. That said, if you're military and moving every 3-4 years, school district often matters less. The real draw in Fairborn is affordability, convenience, and value—you get more house for less money, and your commute is non-existent.
          </p>

          {/* Pros/cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">
                Why Buyers Choose Fairborn
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Closest city to WPAFB—3-minute commute</li>
                <li>✓ Most affordable median price ($210K)</li>
                <li>✓ Best VA loan purchasing power in the area</li>
                <li>✓ Larger homes on bigger lots vs. nearby suburbs</li>
                <li>✓ Quick inventory turnover—active market</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-black text-charcoal mb-3">Things to Know</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• School district is average (6/10), not top-tier</li>
                <li>• Older homes require more frequent maintenance</li>
                <li>• Less upscale feel than Beavercreek or Centerville</li>
                <li>• Some properties show their age—inspections critical</li>
                <li>• Less resale premium due to school reputation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to search listings */}
      <section className="bg-charcoal py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white mb-3">
            Ready to See Fairborn Homes?
          </h2>
          <p className="text-gray-300 mb-6">
            Browse active MLS listings or connect with Chris directly for a personal tour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/listings?city=Fairborn"
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
