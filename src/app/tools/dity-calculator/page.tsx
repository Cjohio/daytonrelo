'use client';

import { useState } from 'react';

const WEIGHT_ALLOWANCES = {
  'E-1': 5000, 'E-2': 5000, 'E-3': 5000,
  'E-4': 7000, 'E-5': 8500, 'E-6': 10000,
  'E-7': 11000, 'E-8': 12000, 'E-9': 12000,
  'O-1': 11000, 'O-2': 11000, 'O-3': 11000,
  'O-4': 13500, 'O-5': 13500, 'O-6': 14500,
  'O-7': 14500, 'O-8': 14500, 'O-9': 14500, 'O-10': 14500,
};

const GRADES = ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9',
                'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10'];

export default function DITYCalculator() {
  const [grade, setGrade] = useState('E-5');
  const [dependents, setDependents] = useState(2);
  const [distance, setDistance] = useState(500);
  const [weight, setWeight] = useState(8000);

  // Determine government rate per lb based on distance
  let govRatePerLb = 0;
  if (distance < 600) govRatePerLb = 0.76;
  else if (distance < 1000) govRatePerLb = 0.85;
  else if (distance < 1500) govRatePerLb = 0.97;
  else govRatePerLb = 1.07;

  // PPM is 95% of government cost
  const govCost = weight * govRatePerLb;
  const ppmIncentive = govCost * 0.95;
  const federalTax = ppmIncentive * 0.22;
  const netAfterTax = ppmIncentive - federalTax;
  const weightAllowance = WEIGHT_ALLOWANCES[grade] || 10000;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">DITY/PPM Calculator</h1>
          <p className="text-lg text-gold">Personally Procured Move Incentive Estimate</p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Pay Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Number of Dependents
              </label>
              <input
                type="number"
                min="0"
                value={dependents}
                onChange={(e) => setDependents(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Distance (miles)
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Weight (lbs)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
          </div>

          {/* Weight Allowance Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-sm text-charcoal">
            <p className="font-semibold mb-2">Your Weight Allowance</p>
            <p>
              Pay Grade {grade}: <strong>{weightAllowance.toLocaleString()} lbs</strong>
              {weight > weightAllowance && (
                <span className="text-red-600 ml-2">
                  (Warning: {(weight - weightAllowance).toLocaleString()} lbs over allowance)
                </span>
              )}
            </p>
            <p className="text-xs text-charcoal/60 mt-2">
              Officers get +500 lbs pro-gear allowance
            </p>
          </div>

          {/* Results */}
          <div className="bg-charcoal rounded-lg p-8 mb-8">
            <p className="text-sm text-gold font-semibold mb-2">ESTIMATED PPM INCENTIVE</p>
            <p className="text-5xl font-bold text-gold mb-8">
              ${ppmIncentive.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>

            <div className="space-y-3 border-t border-gold/30 pt-6">
              <div className="flex justify-between text-cream">
                <span>Government Move Cost (100%)</span>
                <span className="font-semibold">${govCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-cream">
                <span>PPM Payment (95%)</span>
                <span className="font-semibold">${ppmIncentive.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-cream/70 text-sm pt-3 border-t border-gold/30">
                <span>Est. Federal Tax (22%)</span>
                <span>-${federalTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-gold text-lg font-bold pt-3 border-t border-gold/30">
                <span>Net After Tax</span>
                <span>${netAfterTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border-2 border-gold rounded-lg p-6 mb-8">
            <div className="space-y-4 text-sm text-charcoal">
              <div>
                <p className="font-semibold text-gold">Distance Tier</p>
                <p>
                  {distance} miles = <strong>${govRatePerLb}/lb</strong> government rate
                </p>
              </div>
              <div>
                <p className="font-semibold text-gold">PPM Payment Calculation</p>
                <p>
                  {weight.toLocaleString()} lbs × ${govRatePerLb}/lb × 95% = ${ppmIncentive.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gold">Withholding</p>
                <p>
                  Federal tax (~22%) is withheld. You may owe more or get a refund at tax time.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gold/10 border border-gold rounded-lg p-6">
            <p className="font-semibold text-charcoal mb-3">Tips for Your Move</p>
            <ul className="space-y-2 text-sm text-charcoal list-disc list-inside">
              <li>Get an official weighing ticket from a certified scale</li>
              <li>Weigh truck empty, then loaded (subtract for net weight)</li>
              <li>Keep all receipts and documentation for TMO</li>
              <li>File claim with your Transportation Management Office</li>
              <li>Payment can take 30-60 days after approval</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-charcoal/60 text-center mt-8">
            Rates are approximate. Contact your TMO for official entitlements. PPM incentive is taxable income.
          </p>
        </div>
      </section>
    </div>
  );
}
