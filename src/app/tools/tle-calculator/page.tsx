'use client';

import { useState } from 'react';

export default function TLECalculator() {
  const [withDependents, setWithDependents] = useState(true);
  const [payGrade, setPayGrade] = useState('E-4');
  const [daysOldStation, setDaysOldStation] = useState(5);
  const [daysNewStation, setDaysNewStation] = useState(5);

  // Determine daily rates
  let rate1to5 = 0;
  let rate6to10 = 0;

  if (!withDependents) {
    rate1to5 = 130;
    rate6to10 = 97.50;
  } else {
    // With dependents: E-1 to O-3 vs O-4+
    const isOfficer = payGrade.startsWith('O');
    const gradeNum = parseInt(payGrade.substring(1));

    if (isOfficer && gradeNum >= 4) {
      rate1to5 = 200;
      rate6to10 = 150;
    } else {
      rate1to5 = 180;
      rate6to10 = 135;
    }
  }

  // Calculate costs
  const calculateTLE = (days) => {
    let cost = 0;
    for (let i = 1; i <= days; i++) {
      cost += i <= 5 ? rate1to5 : rate6to10;
    }
    return cost;
  };

  const oldStationCost = calculateTLE(daysOldStation);
  const newStationCost = calculateTLE(daysNewStation);
  const totalTLE = oldStationCost + newStationCost;

  const officeGrades = ['O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7'];
  const isHighRankOfficer = officeGrades.includes(payGrade) && parseInt(payGrade.substring(1)) >= 4;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">TLE Calculator</h1>
          <p className="text-lg text-gold">Temporary Lodging Expense (CONUS PCS)</p>
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
                value={payGrade}
                onChange={(e) => setPayGrade(e.target.value)}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              >
                {['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9',
                  'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7'].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Dependents
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setWithDependents(true)}
                  className={`flex-1 px-4 py-2 rounded font-semibold transition-colors ${
                    withDependents
                      ? 'bg-gold text-charcoal'
                      : 'border-2 border-gold text-gold hover:bg-gold/10'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setWithDependents(false)}
                  className={`flex-1 px-4 py-2 rounded font-semibold transition-colors ${
                    !withDependents
                      ? 'bg-gold text-charcoal'
                      : 'border-2 border-gold text-gold hover:bg-gold/10'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Days at Old Station (max 10)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={daysOldStation}
                onChange={(e) => setDaysOldStation(Math.min(10, Number(e.target.value)))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Days at New Station (max 10)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={daysNewStation}
                onChange={(e) => setDaysNewStation(Math.min(10, Number(e.target.value)))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
          </div>

          {/* Daily Rates */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm font-semibold text-charcoal mb-3">Your Daily Rates</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-charcoal">
              <div>
                <p className="text-xs text-blue-600 font-semibold">Days 1-5</p>
                <p className="text-lg font-bold">${rate1to5}/day</p>
              </div>
              <div>
                <p className="text-xs text-blue-600 font-semibold">Days 6-10</p>
                <p className="text-lg font-bold">${rate6to10}/day</p>
              </div>
            </div>
            <p className="text-xs text-charcoal/60 mt-3">
              {withDependents
                ? isHighRankOfficer
                  ? 'O-4+ with dependents'
                  : 'E-1 to O-3 with dependents'
                : 'Without dependents'}
            </p>
          </div>

          {/* Results */}
          <div className="bg-gold/10 border-2 border-gold rounded-lg p-6 sm:p-8 mb-8">
            <div className="text-center mb-8">
              <p className="text-sm text-gold font-semibold mb-2">TOTAL TLE REIMBURSEMENT</p>
              <p className="text-5xl font-bold text-charcoal">
                ${totalTLE.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-gold">
              <div>
                <p className="text-xs text-gold font-semibold mb-2">OLD STATION</p>
                <div className="space-y-2">
                  <p className="text-sm text-charcoal">{daysOldStation} days</p>
                  <p className="text-2xl font-bold text-gold">
                    ${oldStationCost.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gold font-semibold mb-2">NEW STATION</p>
                <div className="space-y-2">
                  <p className="text-sm text-charcoal">{daysNewStation} days</p>
                  <p className="text-2xl font-bold text-gold">
                    ${newStationCost.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm text-charcoal">
              <p>
                <strong>Total Days:</strong> {daysOldStation + daysNewStation} / 20
              </p>
              <p className="text-xs text-charcoal/60">
                TLE is limited to 10 days per location for a maximum of 20 days total.
              </p>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-4">
            <p className="font-semibold text-charcoal">Important TLE Rules</p>
            <ul className="space-y-2 text-sm text-charcoal list-disc list-inside">
              <li>Maximum 10 days at old duty station, 10 days at new duty station</li>
              <li>Shown rates are daily maximum allowances (actual reimbursement based on receipts)</li>
              <li>Must keep all hotel/lodging receipts for reimbursement claim</li>
              <li>Can use alternative lodging (friends/family) but must itemize expenses</li>
              <li>Meals included in some TLE calculations—verify with your finance office</li>
              <li>TLE is limited to 30 days if married with dependents at separate location</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-charcoal/60 text-center mt-8">
            These are 2025 rates and approximate limits. Verify current rates with your finance office. TLE is capped—keep all receipts.
          </p>
        </div>
      </section>
    </div>
  );
}
