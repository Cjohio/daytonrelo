'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Calendar, MapPin, ExternalLink, Music, PartyPopper, Trophy, Palette, Users, UtensilsCrossed } from 'lucide-react';

interface DaytonEvent {
  id: string;
  title: string;
  date: string;
  month: string;
  day: string;
  venue: string;
  category: 'music' | 'festival' | 'sports' | 'arts' | 'family' | 'food';
  is_free: boolean;
  price: string | null;
  description: string;
  url: string;
  sort_order: number;
}

const CATEGORIES = [
  { key: 'all',      label: 'All Events',    icon: <Calendar className="w-4 h-4" /> },
  { key: 'music',    label: 'Music',         icon: <Music className="w-4 h-4" /> },
  { key: 'festival', label: 'Festivals',     icon: <PartyPopper className="w-4 h-4" /> },
  { key: 'sports',   label: 'Sports',        icon: <Trophy className="w-4 h-4" /> },
  { key: 'arts',     label: 'Arts',          icon: <Palette className="w-4 h-4" /> },
  { key: 'family',   label: 'Family',        icon: <Users className="w-4 h-4" /> },
  { key: 'food',     label: 'Food & Drink',  icon: <UtensilsCrossed className="w-4 h-4" /> },
];

const CAT_COLORS: Record<string, string> = {
  music:    'bg-purple-100 text-purple-700 border-purple-200',
  festival: 'bg-amber-100 text-amber-700 border-amber-200',
  sports:   'bg-emerald-100 text-emerald-700 border-emerald-200',
  arts:     'bg-pink-100 text-pink-700 border-pink-200',
  family:   'bg-blue-100 text-blue-700 border-blue-200',
  food:     'bg-red-100 text-red-700 border-red-200',
};

const CAT_DOT: Record<string, string> = {
  music:    'bg-purple-500',
  festival: 'bg-amber-500',
  sports:   'bg-emerald-500',
  arts:     'bg-pink-500',
  family:   'bg-blue-500',
  food:     'bg-red-500',
};

const MONTH_ORDER: Record<string, number> = {
  JAN:1,FEB:2,MAR:3,APR:4,MAY:5,JUN:6,
  JUL:7,AUG:8,SEP:9,OCT:10,NOV:11,DEC:12,MON:13,
};
const MONTH_NAMES: Record<string, string> = {
  JAN:'January',FEB:'February',MAR:'March',APR:'April',MAY:'May',JUN:'June',
  JUL:'July',AUG:'August',SEP:'September',OCT:'October',NOV:'November',DEC:'December',
  MON:'Year-Round',
};

export default function EventsPage() {
  const [events, setEvents] = useState<DaytonEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [freeOnly, setFreeOnly] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setEvents(data as DaytonEvent[]);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return events.filter(e => {
      if (activeCategory !== 'all' && e.category !== activeCategory) return false;
      if (freeOnly && !e.is_free) return false;
      return true;
    });
  }, [events, activeCategory, freeOnly]);

  // Group by month
  const grouped = useMemo(() => {
    const groups: Record<string, DaytonEvent[]> = {};
    filtered.forEach(e => {
      if (!groups[e.month]) groups[e.month] = [];
      groups[e.month].push(e);
    });
    return Object.entries(groups).sort(([a], [b]) => (MONTH_ORDER[a] ?? 99) - (MONTH_ORDER[b] ?? 99));
  }, [filtered]);

  const freeCount = events.filter(e => e.is_free).length;

  return (
    <main className="min-h-screen bg-cream">

      {/* Hero */}
      <section className="bg-charcoal text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-sm font-bold uppercase tracking-widest mb-3">Dayton Area</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Events & Entertainment</h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-6">
            Concerts, festivals, sports, and community events across the Dayton area — updated regularly so you always know what&apos;s coming up.
          </p>
          {!loading && (
            <div className="flex gap-6 text-sm">
              <div><span className="text-gold font-black text-2xl">{events.length}</span><span className="text-gray-400 ml-2">Events</span></div>
              <div><span className="text-gold font-black text-2xl">{freeCount}</span><span className="text-gray-400 ml-2">Free</span></div>
              <div><span className="text-gold font-black text-2xl">{new Set(events.map(e => e.month)).size}</span><span className="text-gray-400 ml-2">Months</span></div>
            </div>
          )}
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
          {CATEGORIES.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === key
                  ? 'bg-gold text-charcoal shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {icon}{label}
            </button>
          ))}
          <button
            onClick={() => setFreeOnly(v => !v)}
            className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
              freeOnly
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            {freeOnly ? '✓ ' : ''}Free Only
          </button>
          {!loading && (
            <span className="text-xs text-gray-400 hidden sm:block">
              {filtered.length} event{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Events list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <div className="text-center py-24 text-gray-400">Loading events…</div>
        ) : grouped.length === 0 ? (
          <div className="text-center py-24 text-gray-400">No events match your filters.</div>
        ) : (
          <div className="space-y-12">
            {grouped.map(([month, monthEvents]) => (
              <section key={month}>
                {/* Month header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 bg-gold rounded-full" />
                  <h2 className="text-xl font-black text-charcoal">{MONTH_NAMES[month] ?? month}</h2>
                  <span className="text-sm text-gray-400">{monthEvents.length} event{monthEvents.length !== 1 ? 's' : ''}</span>
                </div>

                {/* 2-col grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {monthEvents.map(event => (
                    <article
                      key={event.id}
                      className="bg-white rounded-2xl border border-gray-200 p-5 flex gap-4 hover:shadow-md transition-shadow"
                    >
                      {/* Date badge */}
                      <div className={`w-12 h-14 rounded-xl flex-shrink-0 flex flex-col items-center justify-center ${CAT_DOT[event.category] ?? 'bg-gray-400'}`}>
                        <span className="text-white text-xs font-black tracking-widest">{event.month}</span>
                        <span className="text-white text-xl font-black leading-none">{event.day}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-black text-charcoal text-sm leading-snug">{event.title}</h3>
                          {event.is_free
                            ? <span className="flex-shrink-0 text-xs font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">FREE</span>
                            : event.price && <span className="flex-shrink-0 text-xs text-gray-500 font-semibold">{event.price}</span>
                          }
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${CAT_COLORS[event.category]}`}>
                            {event.category}
                          </span>
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-gold font-bold hover:underline"
                          >
                            Details <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-charcoal rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Planning Your Move to Dayton?</h2>
          <p className="text-gray-300 mb-6">Chris knows this city inside out — reach out for a personal intro to the neighborhoods and communities that match your lifestyle.</p>
          <Link href="/contact" className="btn-gold inline-block px-8 py-3 text-sm font-bold">
            Get in Touch with Chris
          </Link>
        </div>
      </div>
    </main>
  );
}
