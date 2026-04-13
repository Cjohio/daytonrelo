'use client';

import { useState } from 'react';
import { Phone, Globe, Star, Truck, Wrench, Wind, Sparkles, Zap, Shield } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  phone: string;
  website: string;
  neighborhood: string;
  description: string;
  featured: boolean;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Movers:     <Truck className="w-5 h-5" />,
  Plumbing:   <Wrench className="w-5 h-5" />,
  HVAC:       <Wind className="w-5 h-5" />,
  Cleaning:   <Sparkles className="w-5 h-5" />,
  Electrical: <Zap className="w-5 h-5" />,
  Insurance:  <Shield className="w-5 h-5" />,
};

const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Two Men and a Truck – Dayton',
    category: 'Movers',
    phone: '(937) 291-7161',
    website: 'https://www.twomenandatruck.com',
    neighborhood: 'Citywide',
    description:
      "Chris's go-to for PCS moves and corporate relocations. Full-service packing, loading, and delivery with a trained crew that handles military timelines without breaking a sweat. They also offer storage options if your new home isn't ready yet.",
    featured: true,
  },
  {
    id: '2',
    name: 'Dayton Moving & Storage',
    category: 'Movers',
    phone: '(937) 254-3636',
    website: 'https://daytonmoving.com',
    neighborhood: 'Citywide',
    description:
      'Family-owned and operated for over 30 years, with deep roots in the Dayton community. They specialize in military and corporate relocations and understand the unique pressures of a PCS move. Clients consistently praise their care with valuables and their no-surprise pricing.',
    featured: true,
  },
  {
    id: '3',
    name: 'Roto-Rooter Dayton',
    category: 'Plumbing',
    phone: '(937) 222-3030',
    website: 'https://www.rotorooter.com',
    neighborhood: 'Citywide',
    description:
      '24/7 plumbing and drain service — a must-have number saved in your phone when you move into a new home. They handle everything from clogged drains to full pipe replacements, with licensed plumbers who arrive on time and give upfront estimates before starting any work.',
    featured: false,
  },
  {
    id: '4',
    name: 'ARS / Rescue Rooter Dayton',
    category: 'HVAC',
    phone: '(937) 401-5050',
    website: 'https://www.ars.com',
    neighborhood: 'Citywide',
    description:
      "Heating, cooling, and plumbing under one roof — ideal for new homeowners who want one trusted contractor for the whole house. They offer maintenance plans that are great for military families who want worry-free coverage during a deployment or extended absence. Chris recommends them for first-year homeowner peace of mind.",
    featured: false,
  },
  {
    id: '5',
    name: 'Merry Maids Dayton',
    category: 'Cleaning',
    phone: '(937) 277-9993',
    website: 'https://www.merrymaids.com',
    neighborhood: 'Citywide',
    description:
      'Bonded, insured, and background-checked cleaning professionals. Excellent for move-in and move-out deep cleans, and they offer recurring weekly or bi-weekly service once you\'re settled. Many of Chris\'s clients use them to turn a new house into a home-ready space before the first box is unpacked.',
    featured: false,
  },
  {
    id: '6',
    name: 'Mr. Electric of Dayton',
    category: 'Electrical',
    phone: '(937) 401-0037',
    website: 'https://www.mrelectric.com',
    neighborhood: 'Citywide',
    description:
      'Licensed and insured electricians for everything from panel upgrades and outlet installs to full home rewiring and EV charger installation. Great for buyers who just closed and need immediate work done. Their technicians are on time, clean up after themselves, and explain the work clearly.',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Movers', 'Plumbing', 'HVAC', 'Cleaning', 'Electrical'];

export default function LocalServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredServices =
    activeCategory === 'All' ? SERVICES : SERVICES.filter(s => s.category === activeCategory);

  return (
    <main className="min-h-screen bg-cream">

      {/* Hero */}
      <section className="bg-charcoal text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-sm font-bold uppercase tracking-widest mb-3">Chris-Curated</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Local Services Directory</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Every business here has been personally vetted by Chris or comes highly recommended by clients. No referral fees — just honest picks for new Dayton residents.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-semibold text-gray-500 mr-2 hidden sm:block">Filter by:</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-charcoal shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat !== 'All' && CATEGORY_ICONS[cat]}
              {cat}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400 hidden sm:block">
            {filteredServices.length} {filteredServices.length === 1 ? 'business' : 'businesses'}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Chris's Note */}
        <div className="bg-yellow-50 border border-gold/40 rounded-xl p-5 mb-10 flex gap-4 items-start">
          <Star className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <p className="text-charcoal text-sm leading-relaxed">
            <strong className="text-charcoal">From Chris:</strong> Every business on this list has been personally vetted or comes highly recommended by clients. When you&apos;re new to Dayton, the last thing you need is to roll the dice on a contractor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border transition-shadow hover:shadow-md ${
                service.featured ? 'border-gold' : 'border-gray-200'
              }`}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${service.featured ? 'bg-gold/10 text-gold' : 'bg-gray-100 text-gray-500'}`}>
                    {CATEGORY_ICONS[service.category] ?? <Wrench className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-lg leading-tight">{service.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{service.neighborhood} · {service.category}</p>
                  </div>
                </div>
                {service.featured && (
                  <span className="flex items-center gap-1 bg-gold/10 text-gold text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                    <Star className="w-3 h-3" /> Chris Pick
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{service.description}</p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                <a
                  href={`tel:${service.phone}`}
                  className="flex items-center gap-2 text-sm font-semibold text-charcoal bg-gray-100 hover:bg-gold hover:text-charcoal px-4 py-2 rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {service.phone}
                </a>
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-charcoal bg-gray-100 hover:bg-gold hover:text-charcoal px-4 py-2 rounded-lg transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-charcoal rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Know a great local business?</h2>
          <p className="text-gray-300 mb-6">Chris is always looking to expand this list with providers his clients can trust.</p>
          <a
            href="/contact"
            className="btn-gold inline-block px-8 py-3 text-sm font-bold"
          >
            Submit a Recommendation
          </a>
        </div>
      </div>
    </main>
  );
}
