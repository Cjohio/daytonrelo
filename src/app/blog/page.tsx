import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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
      {/* Hero */}
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

      {/* Post list */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.hero && (
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={post.hero}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}
              {!post.hero && <div className="h-1 bg-gold" />}
              <div className="p-7">
                {/* Category + meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-sm">{formatDate(post.date)}</span>
                  <span className="text-gray-400 text-sm">· {post.readTime}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-black text-charcoal mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-gold font-bold hover:text-gold-dark transition-colors"
                >
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

      {/* CTA */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl mb-4">🏡</div>
          <h2 className="text-2xl font-black mb-3">Questions About the Dayton Market?</h2>
          <p className="text-gray-300 mb-8">
            Chris is a U.S. Army Iraq War veteran and licensed Ohio Realtor. Reach out directly
            for personalized guidance on buying in the Dayton and WPAFB area.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+19372413484" className="btn-gold">Call Chris Now</a>
            <Link href="/contact" className="btn-outline">Send a Message</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
