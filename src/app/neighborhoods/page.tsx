import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: "Dayton Ohio Neighborhood Guide | Chris Jurgens Realtor",
  description: "Explore Dayton, Ohio neighborhoods. Find the best areas for schools, commute, lifestyle, and budget — from Beavercreek and Centerville to Oakwood and Springboro.",
  keywords: ["Dayton Ohio neighborhoods", "best neighborhoods Dayton Ohio", "Beavercreek homes", "Centerville Ohio real estate", "Oakwood Ohio homes", "Springboro Ohio"],
};

const HOODS = [
  {
    name: "Beavercreek",
    highlight: "Top-rated schools · Near WPAFB",
    commute: "8 min to WPAFB · 20 min to downtown",
    priceRange: "$280k – $600k+",
    vibe: "Suburban family favorite with newer developments, top-ranked schools in Greene County, and easy access to WPAFB. Popular with military officers and defense contractors.",
    best: ["Military families", "Defense contractors", "Top school district seekers"],
  },
  {
    name: "Centerville",
    highlight: "Established · Excellent schools",
    commute: "20 min to WPAFB · 15 min to downtown",
    priceRange: "$250k – $550k+",
    vibe: "One of Dayton's most sought-after suburbs. Tree-lined streets, excellent Centerville City School District, and a strong sense of community. Great for executives and growing families.",
    best: ["Executives & professionals", "Families with school-age kids", "Corporate relocators"],
  },
  {
    name: "Kettering",
    highlight: "Affordable · Walkable",
    commute: "12 min to downtown · 18 min to WPAFB",
    priceRange: "$160k – $350k",
    vibe: "A well-established suburb south of Dayton with great value, walkable neighborhoods, and strong community pride. Great for buyers who want more home for their money.",
    best: ["First-time buyers", "Investors", "Buyers on a budget"],
  },
  {
    name: "Springboro",
    highlight: "Fast-growing · Great schools",
    commute: "30 min to downtown · 35 min to WPAFB",
    priceRange: "$300k – $650k+",
    vibe: "One of the fastest-growing communities in the Dayton metro. Newer construction, excellent Springboro Community Schools, and a family-first atmosphere.",
    best: ["Young families", "New construction seekers", "Commuters on I-75"],
  },
  {
    name: "Oakwood",
    highlight: "Luxury · Historic · Walkable",
    commute: "5 min to downtown · 20 min to WPAFB",
    priceRange: "$350k – $900k+",
    vibe: "A small, highly walkable city within Dayton known for beautiful historic homes, top-rated schools, and a tight-knit community. Think tree-lined streets and local coffee shops.",
    best: ["Luxury buyers", "Urban lifestyle seekers", "Professionals downtown"],
  },
  {
    name: "Fairborn",
    highlight: "Budget-friendly · Closest to WPAFB",
    commute: "5 min to WPAFB · 20 min to downtown",
    priceRange: "$130k – $280k",
    vibe: "The closest community to Wright-Patterson AFB. Strong military community, affordable homes, and plenty of inventory. A smart choice for E-1 through E-6 servicemembers.",
    best: ["Junior enlisted members", "Budget-conscious buyers", "First PCS buyers"],
  },
  {
    name: "Miamisburg",
    highlight: "Highway access · Family-friendly",
    commute: "20 min to downtown · 25 min to WPAFB",
    priceRange: "$180k – $380k",
    vibe: "Great highway access to I-75 and SR-725, close to The Greene Town Center, and affordable family neighborhoods. A practical choice for buyers prioritizing commute flexibility.",
    best: ["Commuters", "Families", "Corporate relocators on a budget"],
  },
  {
    name: "Xenia",
    highlight: "Space · Affordable · Rural feel",
    commute: "15 min to WPAFB · 25 min to downtown",
    priceRange: "$130k – $280k",
    vibe: "More land, more house, less money. Xenia sits just east of WPAFB and offers a quieter, more rural lifestyle at a fraction of the cost of Beavercreek or Centerville.",
    best: ["Military families wanting space", "Land seekers", "Budget-conscious buyers"],
  },
];

export default function NeighborhoodsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Dayton Area</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Find Your<br />
              <span className="text-gold">Perfect Neighborhood.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Chris knows every pocket of the Dayton metro — from the zip codes closest to WPAFB to the suburb with the best school district. Use this guide to find your fit.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhood cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOODS.map(({ name, highlight, commute, priceRange, vibe, best }) => {
            const slugs: Record<string, string> = {
              "Beavercreek": "beavercreek",
              "Fairborn": "fairborn",
              "Centerville": "centerville",
              "Kettering": "kettering",
              "Springboro": "springboro",
              "Oakwood": "oakwood",
            };
            const slug = slugs[name];
            const href = slug ? `/neighborhoods/${slug}` : "#";

            const CardContent = (
              <div className="card hover:border-gold hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-black">{name}</h2>
                    <p className="text-gold text-xs font-bold">{highlight}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-semibold">{priceRange}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{vibe}</p>
                <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 flex items-center gap-2"><MapPin className="w-4 h-4" /> {commute}</p>
                  <div className="flex flex-wrap gap-2">
                    {best.map(b => (
                      <span key={b} className="text-xs bg-gold/10 text-gold-dark font-semibold px-2 py-1 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            );

            return slug ? (
              <Link key={name} href={href}>
                {CardContent}
              </Link>
            ) : (
              <div key={name}>
                {CardContent}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Not Sure Where to Start?</p>
            <h2 className="text-3xl font-black text-white">Ask Chris</h2>
            <p className="text-gray-400 mt-2">Tell him your priorities and he&apos;ll point you to the right neighborhood.</p>
          </div>
          <LeadForm source="neighborhoods" title="Neighborhood Question" subtitle="What matters most — schools, commute, budget, or vibe? Let's figure it out." dark />
        </div>
      </section>
    </>
  );
}