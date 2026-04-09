import type { Metadata } from "next";
import Link from "next/link";
import LenderCards from "./LenderCards";

export const metadata: Metadata = {
  title: "Preferred Lenders | Dayton Relo",
  description: "Meet Chris's preferred mortgage lenders — VA loan specialists and Dayton-area experts for military buyers, first-time buyers, and relocating families.",
};

export default function LenderPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label mb-4">Chris&apos;s Preferred Lenders</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Meet Our Trusted<br />
            <span className="text-gold">Mortgage Partners</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            These are lenders Chris has personally vetted and worked with in the Dayton market.
            All specialize in VA loans and military relocation — and they know how to close on time.
          </p>
          <p className="text-gray-500 text-sm italic">
            Lenders displayed in random order — no ranking implied.
          </p>
        </div>
      </section>

      {/* Lender Cards — client component handles random order */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <LenderCards />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black mb-3">Not Sure Which Lender Fits Your Situation?</h2>
          <p className="text-gray-300 mb-8">
            Chris can help match you with the right lender — VA, FHA, conventional, or anything in between.
          </p>
          <Link href="/contact" className="btn-gold">Ask Chris</Link>
        </div>
      </section>

      {/* Disclosure */}
      <div className="bg-gray-50 py-6 text-center">
        <p className="text-gray-500 text-xs max-w-2xl mx-auto px-4 leading-relaxed">
          You are always free to work with any lender of your choice. These are referrals only.
          Chris Jurgens does not receive compensation for these referrals. Loan products and terms
          subject to lender qualification and approval.
        </p>
      </div>
    </main>
  );
}
