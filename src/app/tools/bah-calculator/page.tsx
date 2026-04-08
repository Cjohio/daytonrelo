'use client';

import { useState } from 'react';
import Link from 'next/link';

const BAH_RATES = {
  'E-1/E-2/E-3': { withDep: 1323, withoutDep: 987 },
  'E-4': { withDep: 1421, withoutDep: 1047 },
  'E-5': { withDep: 1548, withoutDep: 1167 },
  'E-6': { withDep: 1638, withoutDep: 1281 },
  'E-7': { withDep: 1761, withoutDep: 1392 },
  'E-8': { withDep: 1872, withoutDep: 1506 },
  'E-9': { withDep: 2016, withoutDep: 1653 },
  'W-1': { withDep: 1755, withoutDep: 1374 },
  'W-2': { withDep: 1893, withoutDep: 1512 },
  'W-3': { withDep: 2043, withoutDep: 1656 },
  'W-4': { withDep: 2175, withoutDep: 1782 },
  'W-5': { withDep: 2310, withoutDep: 1899 },
  'O-1E': { withDep: 1875, withoutDep: 1440 },
  'O-2E': { withDep: 2001, withoutDep: 1566 },
  'O-3E': { withDep: 2205, withoutDep: 1776 },
  'O-1': { withDep: 1875, withoutDep: 1440 },
  'O-2': { withDep: 2001, withoutDep: 1566 },
  'O-3': { withDep: 2205, withoutDep: 1776 },
  'O-4': { withDep: 2394, withoutDep: 1986 },
  'O-5': { withDep: 2574, withoutDep: 2157 },
  'O-6': { withDep: 2832, withoutDep: 2376 },
  'O-7': { withDep: 3048, withoutDep: 2577 },
};

const GRADES = {
  Enlisted: ['E-1/E-2/E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9'],
  Warrant: ['W-1', 'W-2', 'W-3', 'W-4', 'W-5'],
  Officer: ['O-1E', 'O-2E', 'O-3E', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7'],
};

export default function BAHCalculator() {
  const [selectedGrade, setSelectedGrade] = useState('E-4');
  const [withDependents, setWithDependents] = useState(true);

  const rate = BAH_RATES[selectedGrade as keyof typeof BAH_RATES];
  const monthlyBAH = withDependents ? rate.withDep : rate.withoutDep;
  const annualBAH = monthlyBAH * 12;
  const estimatedMaxPrice = (annualBAH / 0.28).toFixed(0);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">BAH Calculator</h1>
          <p className="text-lg text-gold">Wright-Patterson AFB, ZIP 45431</p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Dependency Toggle */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-charcoal mb-4">Dependents</p>
            <div className="flex gap-4">
              <button
                onClick={() => setWithDependents(true)}
                className={`px-6 py-2 rounded font-semibold transition-colors ${
                  withDependents
                    ? 'bg-gold text-charcoal'
                    : 'border-2 border-gold text-gold hover:bg-gold/10'
                }`}
              >
                With Dependents
              </button>
              <button
                onClick={() => setWithDependents(false)}
                className={`px-6 py-2 rounded font-semibold transition-colors ${
                  !withDependents
                    ? 'bg-gold text-charcoal'
                    : 'border-2 border-gold text-gold hover:bg-gold/10'
                }`}
              >
                Without Dependents
              </button>
            </div>
          </div>

          {/* Grade Selection */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-charcoal mb-4">Pay Grade</p>

            {Object.entries(GRADES).map((category) => (
              <div key={category[0]} className="mb-6">
                <p className="text-xs font-semibold text-gold uppercase mb-3">{category[0]}</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {category[1].map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                        selectedGrade === grade
                          ? 'bg-gold text-charcoal'
                          : 'border-2 border-gold text-gold hover:bg-gold/10'
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="bg-gold/10 border-2 border-gold rounded-lg p-6 sm:p-8 mt-8">
            <div className="text-center mb-8">
              <p className="text-sm text-gold font-semibold mb-2">MONTHLY BAH</p>
              <p className="text-5xl font-bold text-charcoal">
                ${monthlyBAH.toLocaleString('en-US')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gold">
              <div>
                <p className="text-xs text-gold font-semibold mb-1">Annual BAH</p>
                <p className="text-2xl font-bold text-charcoal">
                  ${annualBAH.toLocaleString('en-US')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gold font-semibold mb-1">
                  Est. Max Home Price
                </p>
                <p className="text-2xl font-bold text-charcoal">
                  ${Number(estimatedMaxPrice).toLocaleString('en-US')}
                </p>
              </div>
            </div>

            <p className="text-xs text-charcoal/60 text-center">
              Estimate based on BAH * 12 ÷ 0.28. Your actual buying power depends on down payment, credit, and other factors.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings" className="btn-gold text-center">
              Search Homes in Your Budget
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-charcoal/60 text-center mt-6">
            2025 DFAS rates for ZIP 45431. Always verify at dfas.mil
          </p>
        </div>
      </section>
    </div>
  );
}
