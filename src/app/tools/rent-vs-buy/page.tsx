'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RentVsBuy() {
  const [homePrice, setHomePrice] = useState(265000);
  const [downPercent, setDownPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(6.75);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(1500);
  const [yearsToStay, setYearsToStay] = useState(5);
  const [propertyTaxRate, setPropertyTaxRate] = useState(2.0);
  const [monthlyHOA, setMonthlyHOA] = useState(0);

  // Calculate buying scenario
  const downPayment = homePrice * (downPercent / 100);
  const loanAmount = homePrice - downPayment;

  const calculateMonthlyPayment = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const monthlyPI = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = 100;
  const monthlyMaintenance = (homePrice * 0.01) / 12;
  const monthlyBuyCost = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + monthlyHOA;

  // Calculate equity and appreciation
  let principalPaid = 0;
  let appreciation = 0;
  for (let month = 1; month <= yearsToStay * 12; month++) {
    const remainingBalance = loanAmount * (Math.pow(1 + (interestRate / 100 / 12), loanTerm * 12 - month) - 1) /
                            (Math.pow(1 + (interestRate / 100 / 12), loanTerm * 12) - 1);
    if (month === yearsToStay * 12) {
      principalPaid = loanAmount - remainingBalance;
    }
  }
  appreciation = homePrice * (Math.pow(1.03, yearsToStay) - 1);
  const equityGained = principalPaid + appreciation;

  const closingCosts = homePrice * 0.03;
  const totalBuyCosts = monthlyBuyCost * yearsToStay * 12 + closingCosts;
  const netBuyCost = totalBuyCosts - equityGained;

  // Calculate renting scenario
  let rentCost = 0;
  for (let year = 0; year < yearsToStay; year++) {
    const yearlyRent = monthlyRent * 12 * Math.pow(1.03, year);
    rentCost += yearlyRent;
  }

  const buyWins = netBuyCost < rentCost;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Rent vs. Buy Calculator</h1>
          <p className="text-lg text-gold">See which makes sense for your timeline</p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Home Price
              </label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Down Payment (%)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={downPercent}
                onChange={(e) => setDownPercent(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Loan Term
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              >
                <option value={15}>15 years</option>
                <option value={30}>30 years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Monthly Rent
              </label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Years to Stay
              </label>
              <input
                type="number"
                min="1"
                max="15"
                value={yearsToStay}
                onChange={(e) => setYearsToStay(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Property Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Monthly HOA (if any)
              </label>
              <input
                type="number"
                value={monthlyHOA}
                onChange={(e) => setMonthlyHOA(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              />
            </div>
          </div>

          {/* Monthly Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-gold rounded-lg p-6">
              <p className="text-sm text-gold font-semibold mb-2">MONTHLY OWNERSHIP COST</p>
              <p className="text-3xl font-bold text-charcoal">
                ${monthlyBuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
              <div className="mt-4 space-y-2 text-xs text-charcoal/70">
                <p>Principal & Interest: ${monthlyPI.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                <p>Property Tax: ${monthlyPropertyTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                <p>Insurance: ${monthlyInsurance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                <p>Maintenance: ${monthlyMaintenance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                {monthlyHOA > 0 && <p>HOA: ${monthlyHOA.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>}
              </div>
            </div>

            <div className="bg-white border-2 border-gold rounded-lg p-6">
              <p className="text-sm text-gold font-semibold mb-2">MONTHLY RENT</p>
              <p className="text-3xl font-bold text-charcoal">
                ${monthlyRent.toLocaleString('en-US')}
              </p>
              <p className="text-xs text-charcoal/70 mt-4">
                Assumes 3% annual increase
              </p>
            </div>
          </div>

          {/* Verdict */}
          <div className={`rounded-lg p-8 mb-8 ${
            buyWins
              ? 'bg-green-50 border-2 border-green-400'
              : 'bg-blue-50 border-2 border-blue-400'
          }`}>
            <p className="text-sm font-semibold mb-2" style={{ color: buyWins ? '#16a34a' : '#2563eb' }}>
              {buyWins ? 'BUYING WINS' : 'RENTING WINS'}
            </p>
            <p className="text-2xl font-bold text-charcoal mb-4">
              {buyWins
                ? `Save $${(rentCost - netBuyCost).toLocaleString('en-US', { maximumFractionDigits: 0 })} by buying`
                : `Save $${(netBuyCost - rentCost).toLocaleString('en-US', { maximumFractionDigits: 0 })} by renting`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-charcoal">
              <div>
                <p className="font-semibold">Total Cost to Buy</p>
                <p className="text-lg font-bold text-gold">
                  ${netBuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <p className="font-semibold">Total Cost to Rent</p>
                <p className="text-lg font-bold text-gold">
                  ${rentCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <p className="font-semibold">Equity After {yearsToStay} Yrs</p>
                <p className="text-lg font-bold text-gold">
                  ${equityGained.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings" className="btn-gold text-center">
              Search Homes
            </Link>
            <Link href="/lender" className="btn-outline text-center">
              Talk to Our Lender
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-charcoal/60 text-center mt-6">
            This is a simplified comparison. Actual costs vary by market, credit, and personal circumstances.
          </p>
        </div>
      </section>
    </div>
  );
}
