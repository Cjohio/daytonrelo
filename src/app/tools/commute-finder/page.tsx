'use client';

import { useState } from 'react';
import { School, Home, Key, Check } from 'lucide-react';

const EMPLOYERS = [
  { id: 'wpafb', name: 'Wright-Patterson AFB', location: 'Fairborn / Riverside', sector: 'Military / Govt' },
  { id: 'l3harris', name: 'L3Harris Technologies', location: 'Beavercreek / Greenville', sector: 'Defense / Aerospace' },
  { id: 'kettering', name: 'Kettering Health', location: 'Kettering', sector: 'Healthcare' },
  { id: 'premier', name: 'Premier Health', location: 'Downtown Dayton', sector: 'Healthcare' },
  { id: 'caresource', name: 'CareSource', location: 'Downtown Dayton', sector: 'Insurance / IT' },
  { id: 'ud', name: 'University of Dayton', location: 'South Dayton', sector: 'Education' },
  { id: 'wright_state', name: 'Wright State University', location: 'Fairborn', sector: 'Education' },
  { id: 'ncr', name: 'NCR Voyix', location: 'Downtown Dayton', sector: 'Tech / Fintech' },
];

const COMMUTES: Record<string, Record<string, number>> = {
  wpafb: {
    Fairborn: 3,
    Riverside: 5,
    'Huber Heights': 13,
    Beavercreek: 10,
    Xenia: 20,
    Kettering: 28,
    Centerville: 32,
    Oakwood: 35,
    Miamisburg: 35,
    Springboro: 40,
    Trotwood: 25,
  },
  l3harris: {
    Beavercreek: 5,
    Fairborn: 8,
    'Huber Heights': 18,
    Kettering: 20,
    Riverside: 15,
    Xenia: 18,
    Centerville: 22,
    Oakwood: 28,
    Miamisburg: 30,
    Springboro: 38,
    Trotwood: 30,
  },
  kettering: {
    Kettering: 5,
    Oakwood: 10,
    Centerville: 12,
    Miamisburg: 18,
    Beavercreek: 22,
    'Huber Heights': 20,
    Riverside: 18,
    Fairborn: 28,
    Springboro: 22,
    Xenia: 30,
    Trotwood: 25,
  },
  premier: {
    Oakwood: 8,
    Kettering: 10,
    Centerville: 18,
    Miamisburg: 22,
    'Huber Heights': 18,
    Riverside: 15,
    Beavercreek: 25,
    Fairborn: 30,
    Springboro: 25,
    Xenia: 30,
    Trotwood: 18,
  },
  caresource: {
    Oakwood: 10,
    Kettering: 12,
    Riverside: 10,
    'Huber Heights': 15,
    Centerville: 20,
    Miamisburg: 22,
    Beavercreek: 28,
    Fairborn: 30,
    Springboro: 28,
    Xenia: 32,
    Trotwood: 15,
  },
  ud: {
    Kettering: 8,
    Oakwood: 12,
    Centerville: 18,
    Riverside: 15,
    'Huber Heights': 20,
    Miamisburg: 20,
    Beavercreek: 25,
    Fairborn: 30,
    Xenia: 30,
    Springboro: 25,
    Trotwood: 20,
  },
  wright_state: {
    Fairborn: 5,
    Beavercreek: 8,
    'Huber Heights': 20,
    Riverside: 18,
    Xenia: 20,
    Kettering: 30,
    Centerville: 32,
    Oakwood: 35,
    Miamisburg: 38,
    Springboro: 42,
    Trotwood: 30,
  },
  ncr: {
    Oakwood: 8,
    Kettering: 10,
    Riverside: 8,
    'Huber Heights': 15,
    Centerville: 20,
    Beavercreek: 28,
    Fairborn: 32,
    Miamisburg: 22,
    Springboro: 28,
    Xenia: 32,
    Trotwood: 15,
  },
};

const NEIGHBORHOODS = [
  { name: 'Fairborn', schools: 'B-', medRent: '$1,300', medPrice: '$180K' },
  { name: 'Riverside', schools: 'B', medRent: '$1,250', medPrice: '$175K' },
  { name: 'Beavercreek', schools: 'A', medRent: '$1,700', medPrice: '$265K' },
  { name: 'Huber Heights', schools: 'B-', medRent: '$1,400', medPrice: '$210K' },
  { name: 'Kettering', schools: 'A-', medRent: '$1,400', medPrice: '$259K' },
  { name: 'Oakwood', schools: 'A+', medRent: '$1,600', medPrice: '$340K' },
  { name: 'Centerville', schools: 'A', medRent: '$1,650', medPrice: '$285K' },
  { name: 'Miamisburg', schools: 'B+', medRent: '$1,350', medPrice: '$220K' },
  { name: 'Springboro', schools: 'A+', medRent: '$1,700', medPrice: '$315K' },
  { name: 'Xenia', schools: 'B-', medRent: '$1,100', medPrice: '$168K' },
  { name: 'Trotwood', schools: 'C', medRent: '$950', medPrice: '$115K' },
];

function commuteColor(mins: number) {
  if (mins <= 10) return '#2E7D32';
  if (mins <= 20) return '#F9A825';
  if (mins <= 30) return '#E65100';
  return '#C62828';
}

function commuteLabel(mins: number) {
  if (mins <= 10) return 'Excellent';
  if (mins <= 20) return 'Great';
  if (mins <= 30) return 'Good';
  return 'Long';
}

export default function CommuteFinderPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [maxMins, setMaxMins] = useState<number>(25);

  const employer = EMPLOYERS.find((e) => e.id === selected);
  const commuteData = selected ? COMMUTES[selected] : null;

  const results = commuteData
    ? NEIGHBORHOODS.filter((n) => (commuteData[n.name] ?? 99) <= maxMins).sort(
        (a, b) => (commuteData[a.name] ?? 99) - (commuteData[b.name] ?? 99)
      )
    : [];

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-3">Commute Finder</h1>
          <p className="text-lg text-gray-600">
            Pick your employer to see which Dayton neighborhoods give you the shortest commute.
          </p>
        </div>

        {/* Employer Selection */}
        <div className="mb-12">
          <h2 className="section-label mb-6">Select Your Employer</h2>
          <div className="space-y-3">
            {EMPLOYERS.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setSelected(emp.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selected === emp.id
                    ? 'border-gold bg-blue-50'
                    : 'border-gray-200 hover:border-gold'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-charcoal">{emp.name}</h3>
                    <p className="text-sm text-gray-600">
                      {emp.location} · {emp.sector}
                    </p>
                  </div>
                  {selected === emp.id && <Check className="w-5 h-5 text-gold" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Results */}
        {selected && (
          <>
            <div className="mb-12">
              <h2 className="section-label mb-6">Max Commute Time</h2>
              <div className="flex gap-3 flex-wrap">
                {[15, 20, 25, 30, 40].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMaxMins(m)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                      maxMins === m
                        ? 'bg-charcoal text-gold'
                        : 'border border-gray-300 text-charcoal hover:border-gold'
                    }`}
                  >
                    {m} min
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="section-label mb-6">
                {results.length} Neighborhood{results.length !== 1 ? 's' : ''} Within {maxMins} Minutes
              </h2>

              {results.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                  <p className="text-gray-600">No neighborhoods within {maxMins} min. Try increasing the limit.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((n) => {
                    const mins = commuteData![n.name] ?? 99;
                    const col = commuteColor(mins);

                    return (
                      <div key={n.name} className="card bg-white border border-gray-200 p-4 flex gap-4">
                        <div
                          className="min-w-fit rounded-lg p-3 text-center"
                          style={{ backgroundColor: col + '20' }}
                        >
                          <div
                            className="text-2xl font-bold"
                            style={{ color: col }}
                          >
                            {mins}
                          </div>
                          <div
                            className="text-xs font-semibold"
                            style={{ color: col }}
                          >
                            min
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-charcoal">{n.name}</h3>
                            <span
                              className="text-xs font-bold px-2 py-1 rounded"
                              style={{ backgroundColor: col + '15', color: col }}
                            >
                              {commuteLabel(mins)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <p className="flex items-center gap-1"><School className="w-3 h-3" /> Schools: {n.schools}</p>
                            <p className="flex items-center gap-1"><Home className="w-3 h-3" /> Buy: {n.medPrice}</p>
                            <p className="flex items-center gap-1"><Key className="w-3 h-3" /> Rent: {n.medRent}/mo</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="bg-charcoal text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gold mb-3">Want to see homes in these areas?</h2>
              <a href="/listings" className="btn-gold inline-block">
                Browse Listings
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
