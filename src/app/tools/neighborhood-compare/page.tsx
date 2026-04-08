'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Neighborhood {
  name: string;
  medPrice: number;
  medRent: number;
  schools: string;
  schoolGpa: number;
  wpafbMins: number;
  downtown: number;
  colIndex: number;
  walkable: boolean;
  va: boolean;
  note: string;
}

const NEIGHBORHOODS: Neighborhood[] = [
  { name: 'Beavercreek', medPrice: 265000, medRent: 1700, schools: 'A', schoolGpa: 4.0, wpafbMins: 10, downtown: 20, colIndex: 115, walkable: false, va: true, note: 'Top-rated schools, upscale retail, strong military community. Most popular with officers and mid-career buyers.' },
  { name: 'Kettering', medPrice: 259000, medRent: 1400, schools: 'A-', schoolGpa: 3.7, wpafbMins: 28, downtown: 15, colIndex: 108, walkable: false, va: true, note: 'Beautiful older homes, excellent schools, well-established community. Great for families willing to commute.' },
  { name: 'Oakwood', medPrice: 340000, medRent: 1600, schools: 'A+', schoolGpa: 4.3, wpafbMins: 35, downtown: 12, colIndex: 128, walkable: true, va: true, note: 'Most prestigious suburb. Small-town feel, walkable village center, Ohio\'s best schools. Premium price reflects this.' },
  { name: 'Centerville', medPrice: 285000, medRent: 1650, schools: 'A', schoolGpa: 4.0, wpafbMins: 32, downtown: 22, colIndex: 118, walkable: false, va: true, note: 'Newer construction, great schools, family-friendly. Growing area with strong resale values.' },
  { name: 'Springboro', medPrice: 315000, medRent: 1700, schools: 'A+', schoolGpa: 4.3, wpafbMins: 40, downtown: 28, colIndex: 122, walkable: false, va: true, note: 'Elite schools, newer builds, suburban quiet. Longer commute to WPAFB but ideal for families prioritizing education.' },
  { name: 'Fairborn', medPrice: 180000, medRent: 1300, schools: 'B-', schoolGpa: 2.7, wpafbMins: 3, downtown: 25, colIndex: 88, walkable: false, va: true, note: 'Best value near WPAFB. 3 minutes to main gate — unbeatable for active duty. Improving rapidly.' },
  { name: 'Huber Heights', medPrice: 210000, medRent: 1400, schools: 'B-', schoolGpa: 2.7, wpafbMins: 13, downtown: 18, colIndex: 92, walkable: false, va: true, note: 'Good value, solid community. Growing commercial base. Good mid-point between price and commute.' },
  { name: 'Miamisburg', medPrice: 220000, medRent: 1350, schools: 'B+', schoolGpa: 3.3, wpafbMins: 35, downtown: 18, colIndex: 96, walkable: false, va: true, note: 'Charming historic downtown, good schools, strong value. Great for corporate relocators.' },
  { name: 'Riverside', medPrice: 175000, medRent: 1250, schools: 'B', schoolGpa: 3.0, wpafbMins: 5, downtown: 15, colIndex: 85, walkable: false, va: true, note: 'Most affordable WPAFB-adjacent neighborhood. Improving area with great commute.' },
  { name: 'Xenia', medPrice: 168000, medRent: 1100, schools: 'B-', schoolGpa: 2.7, wpafbMins: 20, downtown: 30, colIndex: 82, walkable: true, va: true, note: 'Most affordable option. Small-town feel, walkable downtown. 20 min to WPAFB, 30 to downtown.' },
  { name: 'Trotwood', medPrice: 115000, medRent: 950, schools: 'C', schoolGpa: 2.0, wpafbMins: 25, downtown: 12, colIndex: 72, walkable: false, va: true, note: 'Lowest prices in metro. Investment opportunity market. Not recommended for relocation buyers without local knowledge.' },
];

function gpaLabel(n: number) {
  if (n >= 4.3) return 'A+';
  if (n >= 4.0) return 'A';
  if (n >= 3.7) return 'A-';
  if (n >= 3.3) return 'B+';
  if (n >= 3.0) return 'B';
  if (n >= 2.7) return 'B-';
  return 'C';
}

function formatPrice(n: number) {
  return '$' + (n / 1000).toFixed(0) + 'K';
}

function isWinner(val: number, others: number[], higherBetter: boolean): boolean {
  return higherBetter ? others.every((o) => val >= o) : others.every((o) => val <= o);
}

export default function NeighborhoodComparePage() {
  const [selA, setSelA] = useState<string | null>(null);
  const [selB, setSelB] = useState<string | null>(null);
  const [selC, setSelC] = useState<string | null>(null);
  const [picking, setPicking] = useState<'A' | 'B' | 'C' | null>('A');

  const nbA = NEIGHBORHOODS.find((n) => n.name === selA);
  const nbB = NEIGHBORHOODS.find((n) => n.name === selB);
  const nbC = NEIGHBORHOODS.find((n) => n.name === selC);

  function pick(name: string) {
    if (picking === 'A') {
      setSelA(name);
      setPicking('B');
    } else if (picking === 'B') {
      setSelB(name);
      setPicking('C');
    } else if (picking === 'C') {
      setSelC(name);
      setPicking(null);
    }
  }

  function reset() {
    setSelA(null);
    setSelB(null);
    setSelC(null);
    setPicking('A');
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-3">Compare Neighborhoods</h1>
          <p className="text-lg text-gray-600">
            Choose up to 3 neighborhoods to see side-by-side comparisons of schools, commute times, prices, and more.
          </p>
        </div>

        {/* Selection Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {(['A', 'B', 'C'] as const).map((slot) => {
            const sel = slot === 'A' ? selA : slot === 'B' ? selB : selC;
            const setter = slot === 'A' ? setSelA : slot === 'B' ? setSelB : setSelC;
            const isActive = picking === slot;
            const slotColors = {
              A: '#1A3A5C',
              B: '#1A1A1A',
              C: '#2D5A1B',
            };

            return (
              <button
                key={slot}
                onClick={() => {
                  setter(null);
                  setPicking(slot);
                }}
                className={`border-2 rounded-lg p-6 text-center transition-colors ${
                  sel
                    ? `border-solid bg-charcoal text-white`
                    : isActive
                      ? `border-gold border-solid`
                      : `border-dashed border-gray-300`
                }`}
              >
                <div
                  className="inline-block w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center mb-3"
                  style={{ backgroundColor: slotColors[slot] }}
                >
                  {slot}
                </div>
                <p className="font-bold text-sm">{sel || 'Pick Area'}</p>
              </button>
            );
          })}
        </div>

        {picking && (
          <p className="text-center text-gold font-semibold mb-8">
            Tap a neighborhood to fill Slot {picking}
          </p>
        )}

        {/* Neighborhood Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
          {NEIGHBORHOODS.map((nb) => {
            const slotKey = nb.name === selA ? 'A' : nb.name === selB ? 'B' : nb.name === selC ? 'C' : null;
            const slotColors = {
              A: '#1A3A5C',
              B: '#1A1A1A',
              C: '#2D5A1B',
            };

            return (
              <button
                key={nb.name}
                onClick={() => pick(nb.name)}
                disabled={!picking && !slotKey}
                className={`p-3 rounded-full font-semibold text-sm transition-colors ${
                  slotKey
                    ? 'text-white'
                    : picking
                      ? 'border border-gray-300 text-charcoal hover:border-gold'
                      : 'border border-gray-300 text-charcoal opacity-50 cursor-not-allowed'
                }`}
                style={
                  slotKey
                    ? {
                        backgroundColor: slotColors[slotKey as 'A' | 'B' | 'C'],
                      }
                    : undefined
                }
              >
                {slotKey ? `${slotKey} · ` : ''}
                {nb.name}
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        {nbA && nbB && nbC && (
          <>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-8">
              {/* Header */}
              <div className="bg-gray-50 border-b grid grid-cols-5 gap-4 p-4 font-bold">
                <div className="text-charcoal text-sm">Metric</div>
                <div className="text-center text-charcoal">{nbA.name}</div>
                <div className="text-center text-gold">{nbB.name}</div>
                <div className="text-center text-charcoal">{nbC.name}</div>
              </div>

              {/* Metrics */}
              {[
                { label: 'Median Price', a: nbA.medPrice, b: nbB.medPrice, c: nbC.medPrice, format: formatPrice, higherBetter: false },
                { label: 'Avg Rent/mo', a: nbA.medRent, b: nbB.medRent, c: nbC.medRent, format: (n: number) => '$' + n.toLocaleString(), higherBetter: false },
                { label: 'School Rating', a: nbA.schoolGpa, b: nbB.schoolGpa, c: nbC.schoolGpa, format: gpaLabel, higherBetter: true },
                { label: '↔ WPAFB', a: nbA.wpafbMins, b: nbB.wpafbMins, c: nbC.wpafbMins, format: (n: number) => n + ' min', higherBetter: false },
                { label: '↔ Downtown', a: nbA.downtown, b: nbB.downtown, c: nbC.downtown, format: (n: number) => n + ' min', higherBetter: false },
                { label: 'Cost of Living', a: nbA.colIndex, b: nbB.colIndex, c: nbC.colIndex, format: (n: number) => n.toString(), higherBetter: false },
              ].map(({ label, a, b, c, format, higherBetter }) => {
                const aw = isWinner(a, [b, c], higherBetter);
                const bw = isWinner(b, [a, c], higherBetter);
                const cw = isWinner(c, [a, b], higherBetter);

                return (
                  <div key={label} className="grid grid-cols-5 gap-4 p-4 border-t border-gray-200">
                    <div className="text-charcoal text-sm font-semibold">{label}</div>
                    <div className={`text-center font-bold ${aw ? 'text-gold' : 'text-gray-600'}`}>{format(a as number)}</div>
                    <div className={`text-center font-bold ${bw ? 'text-gold' : 'text-gray-600'}`}>{format(b as number)}</div>
                    <div className={`text-center font-bold ${cw ? 'text-gold' : 'text-gray-600'}`}>{format(c as number)}</div>
                  </div>
                );
              })}

              {/* Notes */}
              <div className="grid grid-cols-4 gap-4 p-4 border-t border-gray-200 bg-charcoal">
                <div />
                <div className="text-xs text-gray-400 leading-relaxed">{nbA.note}</div>
                <div className="text-xs text-gold leading-relaxed">{nbB.note}</div>
                <div className="text-xs text-green-300 leading-relaxed">{nbC.note}</div>
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full mb-8 py-3 px-4 bg-charcoal text-gold font-semibold rounded-lg hover:bg-opacity-90 transition"
            >
              Compare Different Neighborhoods
            </button>
          </>
        )}

        {/* CTA */}
        <div className="bg-charcoal rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gold mb-3">Want to visit these neighborhoods?</h2>
          <p className="text-gray-400 mb-6">
            Chris can schedule tours of any area and give you his honest take on each one.
          </p>
          <Link href="/contact" className="btn-gold inline-block">
            Contact Chris
          </Link>
        </div>
      </div>
    </main>
  );
}
