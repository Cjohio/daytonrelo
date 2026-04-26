// ─────────────────────────────────────────────────────────────────────────────
//  LocalServicesClient — interactive filter UI for /tools/local-services.
//  Receives prefetched data from the server component above.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useState, useMemo } from 'react';
import {
  Phone, Globe, Star,
  Truck, Wrench, Wind, Sparkles, Zap, Shield, Hammer,
  Bed, PaintBucket, Trees, ToolCase,
} from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  category: string;
  phone: string;
  website: string;
  neighborhood: string;
  description: string;
  featured: boolean;
}

// Map lowercase Supabase category keys → display config (label + icon)
const CATEGORY_META: Record<string, { label: string; icon: React.ReactNode }> = {
  mover:       { label: 'Movers',     icon: <Truck className="w-5 h-5" /> },
  plumber:     { label: 'Plumbing',   icon: <Wrench className="w-5 h-5" /> },
  hvac:        { label: 'HVAC',       icon: <Wind className="w-5 h-5" /> },
  cleaner:     { label: 'Cleaning',   icon: <Sparkles className="w-5 h-5" /> },
  electrician: { label: 'Electric',   icon: <Zap className="w-5 h-5" /> },
  handyman:    { label: 'Handyman',   icon: <ToolCase className="w-5 h-5" /> },
  contractor:  { label: 'Contractor', icon: <Hammer className="w-5 h-5" /> },
  painter:     { label: 'Painter',    icon: <PaintBucket className="w-5 h-5" /> },
  landscaper:  { label: 'Landscaping', icon: <Trees className="w-5 h-5" /> },
  furniture:   { label: 'Furniture',  icon: <Bed className="w-5 h-5" /> },
  insurance:   { label: 'Insurance',  icon: <Shield className="w-5 h-5" /> },
};

function labelFor(key: string): string {
  return CATEGORY_META[key]?.label ?? key.charAt(0).toUpperCase() + key.slice(1);
}

function iconFor(key: string): React.ReactNode {
  return CATEGORY_META[key]?.icon ?? <Wrench className="w-5 h-5" />;
}

export default function LocalServicesClient({ services }: { services: Service[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Derive the list of filter pills from what's actually in the data.
  const categories = useMemo(() => {
    const present = Array.from(new Set(services.map((s) => s.category)));
    // Stable order: known categories first (per CATEGORY_META key order), then
    // anything unknown alphabetically.
    const knownOrder = Object.keys(CATEGORY_META);
    present.sort((a, b) => {
      const ai = knownOrder.indexOf(a);
      const bi = knownOrder.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    });
    return ['all', ...present];
  }, [services]);

  const filteredServices = useMemo(() => {
    return activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);
  }, [activeCategory, services]);

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-sm font-bold uppercase tracking-widest mb-3">
            Chris-Curated
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Local Services Directory</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Every business here has been personally vetted by Chris or comes highly recommended by
            clients. No referral fees — just honest picks for new Dayton residents.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-semibold text-gray-500 mr-2 hidden sm:block">
            Filter by:
          </span>
          {categories.map((key) => {
            const isActive = activeCategory === key;
            const display = key === 'all' ? 'All' : labelFor(key);
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gold text-charcoal shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {key !== 'all' && iconFor(key)}
                {display}
              </button>
            );
          })}
          <span className="ml-auto text-sm text-gray-400 hidden sm:block">
            {filteredServices.length}{' '}
            {filteredServices.length === 1 ? 'business' : 'businesses'}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Chris's Note */}
        <div className="bg-yellow-50 border border-gold/40 rounded-xl p-5 mb-10 flex gap-4 items-start">
          <Star className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <p className="text-charcoal text-sm leading-relaxed">
            <strong className="text-charcoal">From Chris:</strong> Every business on this list has
            been personally vetted or comes highly recommended by clients. When you&apos;re new to
            Dayton, the last thing you need is to roll the dice on a contractor.
          </p>
        </div>

        {filteredServices.length === 0 ? (
          <div className="card bg-white border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No businesses in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border transition-shadow hover:shadow-md ${
                  service.featured ? 'border-gold' : 'border-gray-200'
                }`}
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2.5 rounded-xl flex-shrink-0 ${
                        service.featured ? 'bg-gold/10 text-gold' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {iconFor(service.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal text-lg leading-tight">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {service.neighborhood}
                        {service.neighborhood && service.category ? ' · ' : ''}
                        {labelFor(service.category)}
                      </p>
                    </div>
                  </div>
                  {service.featured && (
                    <span className="flex items-center gap-1 bg-gold/10 text-gold text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                      <Star className="w-3 h-3" /> Chris Pick
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                  {service.phone && (
                    <a
                      href={`tel:${service.phone}`}
                      className="flex items-center gap-2 text-sm font-semibold text-charcoal bg-gray-100 hover:bg-gold hover:text-charcoal px-4 py-2 rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {service.phone}
                    </a>
                  )}
                  {service.website && (
                    <a
                      href={service.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-charcoal bg-gray-100 hover:bg-gold hover:text-charcoal px-4 py-2 rounded-lg transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-charcoal rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Know a great local business?</h2>
          <p className="text-gray-300 mb-6">
            Chris is always looking to expand this list with providers his clients can trust.
          </p>
          <a href="/contact" className="btn-gold inline-block px-8 py-3 text-sm font-bold">
            Submit a Recommendation
          </a>
        </div>
      </div>
    </main>
  );
}
