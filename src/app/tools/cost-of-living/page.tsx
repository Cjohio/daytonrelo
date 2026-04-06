'use client';

import { useState } from 'react';
import Link from 'next/link';

const CITIES = {
  'San Francisco, CA': { housing: 520, col: 190, homePrice: 1250000, rent: 2800 },
  'New York, NY': { housing: 450, col: 185, homePrice: 800000, rent: 3200 },
  'Los Angeles, CA': { housing: 400, col: 175, homePrice: 750000, rent: 2400 },
  'Seattle, WA': { housing: 350, col: 160, homePrice: 650000, rent: 2100 },
  'Boston, MA': { housing: 360, col: 165, homePrice: 650000, rent: 2600 },
  'Washington, DC': { housing: 280, col: 150, homePrice: 550000, rent: 2200 },
  'Chicago, IL': { housing: 165, col: 120, homePrice: 320000, rent: 1800 },
  'Austin, TX': { housing: 200, col: 130, homePrice: 400000, rent: 1700 },
  'Denver, CO': { housing: 280, col: 145, homePrice: 530000, rent: 1900 },
  'Atlanta, GA': { housing: 175, col: 115, homePrice: 340000, rent: 1600 },
  'Dallas, TX': { housing: 170, col: 115, homePrice: 330000, rent: 1500 },
  'Phoenix, AZ': { housing: 200, col: 120, homePrice: 380000, rent: 1600 },
  'Miami, FL': { housing: 280, col: 140, homePrice: 530000, rent: 2100 },
  'Portland, OR': { housing: 285, col: 148, homePrice: 510000, rent: 1800 },
  'Minneapolis, MN': { housing: 175, col: 118, homePrice: 330000, rent: 1400 },
  'Nashville, TN': { housing: 220, col: 128, homePrice: 420000, rent: 1700 },
  'Charlotte, NC': { housing: 185, col: 118, homePrice: 350000, rent: 1500 },
  'Columbus, OH': { housing: 130, col: 105, homePrice: 250000, rent: 1200 },
  'Cincinnati, OH': { housing: 120, col: 102, homePrice: 230000, rent: 1100 },
  'Cleveland, OH': { housing: 95, col: 97, homePrice: 185000, rent: 950 },
  'Pittsburgh, PA': { housing: 115, col: 100, homePrice: 225000, rent: 1100 },
  'Indianapolis, IN': { housing: 115, col: 100, homePrice: 225000, rent: 1100 },
  'Kansas City, MO': { housing: 120, col: 100, homePrice: 235000, rent: 1100 },
  'Detroit, MI': { housing: 95, col: 97, homePrice: 185000, rent: 950 },
  'San Diego, CA': { housing: 360, col: 160, homePrice: 680000, rent: 2300 },
};

const DAYTON = { housing: 100, col: 100, homePrice: 245000, rent: 1050 };

const cityNames = Object.keys(CITIES).sort();

export default function CostOfLiving() {
  const [selectedCity, setSelectedCity] = useState('Chicago, IL');

  const city = CITIES[selectedCity];
  const homePriceSavings = city.homePrice - DAYTON.homePrice;
  const monthlySavings = city.rent - DAYTON.rent;
  const annualRentSavings = monthlySavings * 12;

  // Buying power equivalency
  const budgetEquivalency = Math.round(100000 * (DAYTON.housing / city.housing));

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cost of Living Comparison</h1>
          <p className="text-lg text-gold">See how Dayton stacks up</p>
        </div>
      </section>

      {/* Selector */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <label className="block text-sm font-semibold text-charcoal mb-3">
              Compare Dayton to:
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gold rounded bg-white text-charcoal font-semibold"
            >
              {cityNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Comparison Cards */}
          <div className="space-y-6 mb-8">
            {/* Home Price */}
            <div className="bg-white border-2 border-gold rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gold font-semibold mb-1">MEDIAN HOME PRICE</p>
                  <h3 className="text-2xl font-bold text-charcoal">{selectedCity}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-charcoal/60">Dayton, OH</p>
                  <p className="text-sm text-charcoal/60">${DAYTON.homePrice.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-4 mb-4 pb-4 border-b border-gold/20">
                <p className="text-4xl font-bold text-gold">
                  ${city.homePrice.toLocaleString()}
                </p>
                <p className="text-sm text-charcoal/60">
                  vs ${DAYTON.homePrice.toLocaleString()}
                </p>
              </div>
              {homePriceSavings > 0 ? (
                <p className="text-lg font-semibold text-red-600">
                  +${homePriceSavings.toLocaleString()} more expensive in {selectedCity.split(',')[0]}
                </p>
              ) : (
                <p className="text-lg font-semibold text-green-600">
                  Save ${Math.abs(homePriceSavings).toLocaleString()} by choosing Dayton
                </p>
              )}
            </div>

            {/* Rent */}
            <div className="bg-white border-2 border-gold rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gold font-semibold mb-1">AVG 1-BEDROOM RENT</p>
                  <h3 className="text-2xl font-bold text-charcoal">{selectedCity}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-charcoal/60">Dayton, OH</p>
                  <p className="text-sm text-charcoal/60">${DAYTON.rent}/mo</p>
                </div>
              </div>
              <div className="flex items-baseline gap-4 mb-4 pb-4 border-b border-gold/20">
                <p className="text-4xl font-bold text-gold">
                  ${city.rent}/mo
                </p>
                <p className="text-sm text-charcoal/60">
                  vs ${DAYTON.rent}/mo
                </p>
              </div>
              {monthlySavings > 0 ? (
                <div>
                  <p className="text-lg font-semibold text-red-600 mb-2">
                    +${monthlySavings}/mo more expensive
                  </p>
                  <p className="text-sm text-charcoal/60">
                    That's ${annualRentSavings.toLocaleString()} extra per year
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold text-green-600 mb-2">
                    Save ${Math.abs(monthlySavings)}/mo by renting in Dayton
                  </p>
                  <p className="text-sm text-charcoal/60">
                    That's ${Math.abs(annualRentSavings).toLocaleString()} per year
                  </p>
                </div>
              )}
            </div>

            {/* Overall COL */}
            <div className="bg-white border-2 border-gold rounded-lg p-6">
              <p className="text-xs text-gold font-semibold mb-2">OVERALL COST OF LIVING INDEX</p>
              <div className="flex gap-8 items-center">
                <div>
                  <p className="text-sm text-charcoal/60 mb-1">{selectedCity}</p>
                  <p className="text-3xl font-bold text-gold">{city.col}</p>
                </div>
                <p className="text-charcoal font-semibold">vs</p>
                <div>
                  <p className="text-sm text-charcoal/60 mb-1">Dayton, OH (base)</p>
                  <p className="text-3xl font-bold text-charcoal">{DAYTON.col}</p>
                </div>
              </div>
              <p className="text-sm text-charcoal/60 mt-4">
                Dayton is {Math.round(((city.col - DAYTON.col) / DAYTON.col) * 100)}% {city.col > DAYTON.col ? 'more' : 'less'} expensive overall
              </p>
            </div>

            {/* Buying Power */}
            <div className="bg-gold/10 border-2 border-gold rounded-lg p-6">
              <p className="text-sm font-semibold text-charcoal mb-4">BUYING POWER EQUIVALENCY</p>
              <p className="text-lg text-charcoal mb-4">
                Your <strong>${budgetEquivalency.toLocaleString()}</strong> budget in {selectedCity.split(',')[0]} = <strong>$100,000</strong> in Dayton
              </p>
              <p className="text-xs text-charcoal/60">
                This means the same house that costs $100,000 in Dayton would cost approximately ${budgetEquivalency.toLocaleString()} in {selectedCity.split(',')[0]}.
              </p>
            </div>
          </div>

          {/* Takeaway */}
          <div className="bg-charcoal rounded-lg p-8 text-cream mb-8">
            <p className="text-sm text-gold font-semibold mb-3">THE DAYTON ADVANTAGE</p>
            <p className="text-lg mb-4">
              {homePriceSavings > 0
                ? `Moving from ${selectedCity.split(',')[0]} to Dayton could save you $${homePriceSavings.toLocaleString()} on a home purchase.`
                : `Dayton offers significantly lower housing costs than ${selectedCity.split(',')[0]}.`}
            </p>
            {monthlySavings > 0 && (
              <p className="text-base text-cream/80">
                If you rent, you'd save ${Math.abs(monthlySavings)}/month compared to ${selectedCity.split(',')[0]}.
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings" className="btn-gold text-center">
              Search Homes in Dayton
            </Link>
            <Link href="/contact" className="btn-outline text-center">
              Talk to Chris
            </Link>
          </div>

          {/* Note */}
          <p className="text-xs text-charcoal/60 text-center mt-8">
            Data reflects approximate 2024 market data. Actual prices vary by neighborhood and property type.
          </p>
        </div>
      </section>
    </div>
  );
}
