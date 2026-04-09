import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home } from 'lucide-react';

export const metadata: Metadata = {
  title: "Blog | Dayton Relo",
  description: "Real estate insights, VA loan guides, and Dayton market updates for military buyers, veterans, and relocating families moving to the WPAFB area.",
  keywords: ["Dayton Ohio real estate blog", "VA loan guide Ohio", "WPAFB housing market", "Dayton home buying tips", "military relocation Dayton"],
};

export const POSTS = [
  {
    slug: "va-loan-guide-dayton-ohio",
    title: "VA Loan Guide for WPAFB: Everything You Need to Know Before Your PCS",
    excerpt: "A complete breakdown of the VA home loan benefit for service members PCSing to Wright-Patterson AFB — from Certificate of Eligibility to closing day. Covers funding fees, entitlement, and the Dayton-area market.",
    date: "2025-04-01",
    readTime: "9 min read",
    category: "VA Loans",
    categoryColor: "bg-gold/10 text-gold-dark",
    hero: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=500&fit=crop&auto=format",
  },
  {
    slug: "bah-rates-wpafb-dayton-2025",
    title: "2025 BAH Rates for WPAFB: What You Can Afford in Dayton",
    excerpt: "Complete 2025 BAH rate guide for Wright-Patterson AFB by pay grade — from E-4 to O-6. See exactly what homes you can afford in Fairborn, Beavercreek, Centerville, and beyond with your housing allowance.",
    date: "2025-04-15",
    readTime: "8 min read",
    category: "Military PCS",
    categoryColor: "bg-green-50 text-green-700",
    hero: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&h=500&fit=crop&auto=format",
  },
  {
    slug: "beavercreek-vs-fairborn-wpafb",
    title: "Beavercreek vs Fairborn: Which Is Right for WPAFB Military Families?",
    excerpt: "The two most popular cities near WPAFB — compared honestly. Schools, commute, price, lifestyle, and who should choose which. If you have orders to Wright-Patterson, read this before deciding where to live.",
    date: "2025-04-22",
    readTime: "9 min read",
    category: "Neighborhoods",
    categoryColor: "bg-purple-50 text-purple-700",
    hero: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&h=500&fit=crop&auto=format",
  },
  {
    slug: "va-loan-limits-ohio-2025",
    title: "VA Loan Limits in Ohio 2025: What WPAFB Buyers Need to Know",
    excerpt: "Ohio has no VA loan limit for full entitlement users — meaning you can buy any price home with 0% down. Here is how it works, what the funding fee costs, and the myths that are costing military buyers money.",
    date: "2025-05-01",
    readTime: "7 min read",
    category: "VA Loans",
    categoryColor: "bg-gold/10 text-gold-dark",
    hero: "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=900&h=500&fit=crop&auto=format",
  },
  {
    slug: "best-neighborhoods-military-families-dayton",
    title: "Best Neighborhoods Near WPAFB for Military Families: 2025 Guide",
    excerpt: "We rank all 6 top neighborhoods near Wright-Patterson AFB — Fairborn, Beavercreek, Centerville, Kettering, Springboro, and Oakwood — by schools, commute, price, and lifestyle. Honest pros and cons included.",
    date: "2025-05-08",
    readTime: "10 min read",
    category: "Neighborhoods",
    categoryColor: "bg-purple-50 text-purple-700",
    hero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=500&fit=crop&auto=format",
  },
  {
    slug: "pcs-checklist-wpafb-dayton",
    title: "PCS Checklist: Moving to Wright-Patterson AFB (Month-by-Month Guide)",
    excerpt: "The complete month-by-month PCS checklist for military families moving to WPAFB. From getting pre-approved 4 months out to enrolling in schools on arrival week — so nothing falls through the cracks.",
    date: "2025-05-15",
    readTime: "10 min read",
    category: "Military PCS",
    categoryColor: "bg-green-50 text-green-700",
    hero: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=500&fit=crop&auto=format",
  },
  {
    slug: "cost-of-living-dayton-ohio-military",
    title: "Cost of Living: Dayton Ohio vs DC, San Diego & Colorado Springs",
    excerpt: "How does the Dayton area compare financially for military families? We break down housing, groceries, taxes, and BAH purchasing power against three major military metros. The numbers will surprise you.",
    date: "2025-05-22",
    readTime: "7 min read",
    category: "Finance",
    categoryColor: "bg-blue-50 text-blue-700",
    hero: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&h=500&fit=crop&auto=format",
  },
  {
    slug: "first-time-homebuyer-military-dayton",
    title: "First-Time Homebuyer Guide for Military Families in Dayton, Ohio",
    excerpt: "Buying your first home on a PCS move is uniquely challenging — and uniquely rewarding. This guide walks military first-time buyers near WPAFB through every step, from VA eligibility to closing day.",
    date: "2025-06-01",
    readTime: "10 min read",
    category: "Home Buying",
    categoryColor: "bg-orange-50 text-orange-700",
    hero: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=900&h=500&fit=crop&auto=format",
  },
  {
    slug: "schools-near-wpafb-dayton",
    title: "Schools Near Wright-Patterson AFB: Complete Guide for Military Families",
    excerpt: "Which school districts near WPAFB are best for military kids? We rank Springboro, Beavercreek, Centerville, Kettering, and Fairborn — with honest data and enrollment tips military families actually need.",
    date: "2025-06-08",
    readTime: "8 min read",
    category: "Schools",
    categoryColor: "bg-teal-50 text-teal-700",
    hero: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=500&fit=crop&auto=format",
  },
  {
    slug: "spring-market-dayton-2025",
    title: "Spring 2025 Market Update: Dayton Inventory Up — What It Means for Buyers",
    excerpt: "Dayton's spring housing market is showing more inventory than this time last year. We break down what that means for buyers, how interest rates are affecting affordability, and which neighborhoods are moving fastest.",
    date: "2025-03-28",
    readTime: "6 min read",
    category: "Market Update",
    categoryColor: "bg-blue-50 text-blue-700",
    hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=500&fit=crop&auto=format",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-4">Dayton Relo Blog</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Real Estate Insights<br />
            <span className="text-gold">for Dayton Buyers</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            VA loan guides, market updates, and local expertise for military families,
            veterans, and anyone relocating to the Dayton and WPAFB area.
          </p>
        </div>
      </section>

      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {POSTS.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {post.hero && (
                <div className="relative h-52 w-full overflow-hidden">
                  <Image src={post.hero} alt={post.title} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 800px" />
                </div>
              )}
              {!post.hero && <div className="h-1 bg-gold" />}
              <div className="p-7">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${post.categoryColor}`}>{post.category}</span>
                  <span className="text-gray-400 text-sm">{formatDate(post.date)}</span>
                  <span className="text-gray-400 text-sm">· {post.readTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-charcoal mb-3 leading-snug">{post.title}</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-5">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-gold font-bold hover:text-gold-dark transition-colors">
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <section className="bg-charcoal text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-4"><Home className="w-10 h-10 text-gold" /></div>
          <h2 className="text-2xl font-black mb-3">Questions About the Dayton Market?</h2>
          <p className="text-gray-300 mb-8">Chris is a U.S. Army Iraq War veteran and licensed Ohio Realtor. Reach out directly for personalized guidance on buying in the Dayton and WPAFB area.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+19372413484" className="btn-gold">Call Chris Now</a>
            <Link href="/contact" className="btn-outline">Send a Message</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
