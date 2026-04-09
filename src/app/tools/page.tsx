'use client';

import Link from 'next/link';
import { DollarSign, Award, Home, Beer, Package } from 'lucide-react';

const categories = [
  {
    name: 'Finance & Buying',
    icon: DollarSign,
    tools: [
      { name: 'Mortgage Calculator', href: '/tools/mortgage-calculator', desc: 'What can you afford? Monthly payment breakdown.' },
      { name: 'BAH Calculator', href: '/tools/bah-calculator', desc: 'Estimate your buying power from BAH.' },
      { name: 'Closing Cost Estimator', href: '/tools/closing-costs', desc: 'See what you\'ll pay at closing.' },
      { name: 'Rent vs. Buy Calculator', href: '/tools/rent-vs-buy', desc: 'Compare total cost over time.' },
      { name: 'Cost of Living Comparison', href: '/tools/cost-of-living', desc: 'How does Dayton compare to your current city?' },
    ],
  },
  {
    name: 'Military & PCS',
    icon: Award,
    tools: [
      { name: 'DITY / PPM Calculator', href: '/tools/dity-calculator', desc: 'Estimate your PPM incentive pay.' },
      { name: 'TLE Calculator', href: '/tools/tle-calculator', desc: 'Temporary lodging expense limits.' },
      { name: 'Coming Soon: PCS Timeline', href: '#', desc: 'Track your move milestones.' },
      { name: 'Coming Soon: On-Base vs. Off-Base', href: '#', desc: 'Military housing comparison guide.' },
      { name: 'Coming Soon: First 30 Days', href: '#', desc: 'Essential checklist for new arrivals.' },
    ],
  },
  {
    name: 'Neighborhoods',
    icon: Home,
    tools: [
      { name: 'Coming Soon: Compare Neighborhoods', href: '#', desc: 'Demographics, walkability, amenities.' },
      { name: 'Coming Soon: Neighborhood Quiz', href: '#', desc: 'Find your ideal Dayton neighborhood.' },
      { name: 'Coming Soon: School Guide', href: '#', desc: 'Schools by district and rating.' },
      { name: 'Coming Soon: Commute Finder', href: '#', desc: 'Drive times to Wright-Patt and beyond.' },
      { name: 'Coming Soon: Employer Map', href: '#', desc: 'Major employers in the Dayton area.' },
    ],
  },
  {
    name: 'Explore Dayton',
    icon: Beer,
    tools: [
      { name: 'Coming Soon: Parks & Recreation', href: '#', desc: 'Trails, parks, and outdoor activities.' },
      { name: 'Coming Soon: Local Breweries', href: '#', desc: 'Dayton\'s craft beer scene.' },
      { name: 'Coming Soon: Golf Courses', href: '#', desc: 'Public and private golf in Dayton.' },
      { name: 'Coming Soon: Things To Do', href: '#', desc: 'Museums, events, and entertainment.' },
      { name: 'Coming Soon: Day Trips', href: '#', desc: 'Weekend getaways from Dayton.' },
    ],
  },
  {
    name: 'Relocation',
    icon: Package,
    tools: [
      { name: 'Coming Soon: Relo Package Guide', href: '#', desc: 'Maximize your military relocation allowance.' },
      { name: 'Coming Soon: Temp Housing Guide', href: '#', desc: 'Extended stay and housing options.' },
      { name: 'Coming Soon: Local Services', href: '#', desc: 'Movers, utilities, and essential services.' },
      { name: 'Preferred Lender', href: '/lender', desc: 'Connect with our trusted lending partner.' },
    ],
  },
];

export const metadata = {
  title: 'Relocation Tools & Calculators',
  description: 'Free tools for military PCS, home buying, and relocating to Dayton, Ohio',
};

export default function ToolsHub() {
  const availableTools = categories.map((cat) => ({
    ...cat,
    tools: cat.tools.filter((tool) => tool.href !== '#'),
  }));

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Relocation Tools & Calculators</h1>
          <p className="text-lg text-gold max-w-2xl">
            Free tools to help you plan your move to Dayton. Military PCS? Buying your first home? We've got you covered.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-16">
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              const availableInCategory = category.tools.filter((t) => t.href !== '#');
              const hasAvailable = availableInCategory.length > 0;

              return (
                <div key={category.name}>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-charcoal mb-2">
                      <CategoryIcon className="w-8 h-8 inline mr-3" />
                      {category.name}
                    </h2>
                  </div>

                  {hasAvailable ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className={`block p-6 rounded-lg transition-all ${
                            tool.href === '#'
                              ? 'bg-gray-100 text-charcoal/50 cursor-not-allowed'
                              : 'bg-white border-2 border-transparent hover:border-gold shadow-sm hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          <h3 className="font-bold text-charcoal mb-2">{tool.name}</h3>
                          <p className="text-sm text-charcoal/70">{tool.desc}</p>
                          {tool.href !== '#' && (
                            <p className="text-xs text-gold font-semibold mt-4">→ Open Tool</p>
                          )}
                          {tool.href === '#' && (
                            <p className="text-xs text-charcoal/50 mt-4">Coming Soon</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="p-6 rounded-lg bg-gray-100 text-charcoal/50"
                        >
                          <h3 className="font-bold text-charcoal/50 mb-2">{tool.name}</h3>
                          <p className="text-sm text-charcoal/50">{tool.desc}</p>
                          <p className="text-xs text-charcoal/40 mt-4">Coming Soon</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-charcoal text-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-lg text-gold mb-8 max-w-2xl mx-auto">
            Chat with Chris today about your relocation and we'll help you find the right tools and resources for your move.
          </p>
          <Link href="/contact" className="btn-gold inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
