'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MortgageCalculator() {
  const [activeTab, setActiveTab] = useState('afford');

  // Afford tab state
  const [affordIncome, setAffordIncome] = useState(75000);
  const [affordDebts, setAffordDebts] = useState(500);
  const [affordDown, setAffordDown] = useState(50000);
  const [affordRate, setAffordRate] = useState(6.75);
  const [affordTerm, setAffordTerm] = useState(30);

  // Payment tab state
  const [payHome, setPayHome] = useState(300000);
  const [payDownType, setPayDownType] = useState('percent');
  const [payDownValue, setPayDownValue] = useState(10);
  const [payRate, setPayRate] = useState(6.75);
  const [payTerm, setPayTerm] = useState(30);

  // Calculations
  const calculateMonthlyPayment = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  // Afford calculator
  const monthlyIncome = affordIncome / 12;
  const maxPayment28 = monthlyIncome * 0.28;
  const maxPayment36 = (monthlyIncome * 0.36) - affordDebts;
  const maxPaymentAllowed = Math.min(maxPayment28, maxPayment36);

  const propertyTaxMonthly = 0; // Will calculate after home price
  const insuranceMonthly = 100;
  const paymentForPI = maxPaymentAllowed - propertyTaxMonthly - insuranceMonthly;

  // Estimate max home price (iterative)
  let maxHomePrice = 300000;
  for (let i = 0; i < 5; i++) {
    const loanNeeded = maxHomePrice - affordDown;
    const monthlyPI = calculateMonthlyPayment(loanNeeded, affordRate, affordTerm);
    const pmi = loanNeeded < maxHomePrice * 0.8 ? (loanNeeded * 0.005) / 12 : 0;
    const tax = (maxHomePrice * 0.014) / 12;
    const totalPayment = monthlyPI + tax + insuranceMonthly + pmi;

    if (totalPayment > maxPaymentAllowed) {
      maxHomePrice -= 5000;
    } else {
      break;
    }
  }

  const loanForAfford = maxHomePrice - affordDown;
  const monthlyPIAfford = calculateMonthlyPayment(loanForAfford, affordRate, affordTerm);
  const pmiAfford = loanForAfford < maxHomePrice * 0.8 ? (loanForAfford * 0.005) / 12 : 0;
  const taxAfford = (maxHomePrice * 0.014) / 12;
  const totalMonthlyAfford = monthlyPIAfford + taxAfford + insuranceMonthly + pmiAfford;
  const housingDTI = (totalMonthlyAfford / monthlyIncome) * 100;

  // Payment calculator
  const downPaymentAmount = payDownType === 'percent'
    ? payHome * (payDownValue / 100)
    : payDownValue;
  const loanForPay = payHome - downPaymentAmount;
  const monthlyPIPay = calculateMonthlyPayment(loanForPay, payRate, payTerm);
  const pmiPay = downPaymentAmount < payHome * 0.2 ? (loanForPay * 0.005) / 12 : 0;
  const taxPay = (payHome * 0.014) / 12;
  const totalMonthlyPay = monthlyPIPay + taxPay + insuranceMonthly + pmiPay;
  const totalPaid = totalMonthlyPay * payTerm * 12;
  const totalInterest = (monthlyPIPay * payTerm * 12) - loanForPay;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Mortgage Calculator</h1>
          <p className="text-lg text-gold">Find your financial comfort zone</p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gold">
            <button
              onClick={() => setActiveTab('afford')}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === 'afford'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-charcoal hover:text-gold'
              }`}
            >
              What Can I Afford?
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`pb-3 font-semibold transition-colors ${
                activeTab === 'payment'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-charcoal hover:text-gold'
              }`}
            >
              Payment Calculator
            </button>
          </div>

          {/* Afford Tab */}
          {activeTab === 'afford' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Annual Income
                  </label>
                  <input
                    type="number"
                    value={affordIncome}
                    onChange={(e) => setAffordIncome(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Monthly Debts
                  </label>
                  <input
                    type="number"
                    value={affordDebts}
                    onChange={(e) => setAffordDebts(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Down Payment
                  </label>
                  <input
                    type="number"
                    value={affordDown}
                    onChange={(e) => setAffordDown(Number(e.target.value))}
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
                    value={affordRate}
                    onChange={(e) => setAffordRate(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Loan Term
                  </label>
                  <select
                    value={affordTerm}
                    onChange={(e) => setAffordTerm(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
                  >
                    <option value={15}>15 years</option>
                    <option value={30}>30 years</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gold/10 border-2 border-gold rounded-lg p-6 mt-8">
                <div className="text-center mb-8">
                  <p className="text-sm text-gold font-semibold mb-2">MAX HOME PRICE</p>
                  <p className="text-4xl font-bold text-charcoal">
                    ${maxHomePrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gold">
                  <div>
                    <p className="text-xs text-gold font-semibold mb-1">Loan Amount</p>
                    <p className="text-lg font-semibold text-charcoal">
                      ${loanForAfford.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gold font-semibold mb-1">Housing DTI</p>
                    <p className="text-lg font-semibold text-charcoal">{housingDTI.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-charcoal">Principal & Interest</span>
                    <span className="font-semibold text-charcoal">
                      ${monthlyPIAfford.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal">Property Tax (~1.4%/yr)</span>
                    <span className="font-semibold text-charcoal">${taxAfford.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal">Homeowner's Insurance</span>
                    <span className="font-semibold text-charcoal">${insuranceMonthly.toFixed(2)}</span>
                  </div>
                  {pmiAfford > 0 && (
                    <div className="flex justify-between">
                      <span className="text-charcoal">PMI</span>
                      <span className="font-semibold text-charcoal">${pmiAfford.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg border-t border-gold pt-3">
                    <span className="font-bold text-charcoal">Total Monthly Payment</span>
                    <span className="font-bold text-gold">
                      ${totalMonthlyAfford.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Home Price
                  </label>
                  <input
                    type="number"
                    value={payHome}
                    onChange={(e) => setPayHome(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Down Payment
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={payDownValue}
                      onChange={(e) => setPayDownValue(Number(e.target.value))}
                      className="flex-1 px-4 py-2 border border-gold rounded bg-white text-charcoal"
                    />
                    <select
                      value={payDownType}
                      onChange={(e) => setPayDownType(e.target.value)}
                      className="px-3 py-2 border border-gold rounded bg-white text-charcoal"
                    >
                      <option value="percent">%</option>
                      <option value="dollar">$</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={payRate}
                    onChange={(e) => setPayRate(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Loan Term
                  </label>
                  <select
                    value={payTerm}
                    onChange={(e) => setPayTerm(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
                  >
                    <option value={15}>15 years</option>
                    <option value={30}>30 years</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gold/10 border-2 border-gold rounded-lg p-6 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gold">
                  <div>
                    <p className="text-xs text-gold font-semibold mb-1">DOWN PAYMENT</p>
                    <p className="text-2xl font-bold text-charcoal">
                      ${downPaymentAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gold font-semibold mb-1">LOAN AMOUNT</p>
                    <p className="text-2xl font-bold text-charcoal">
                      ${loanForPay.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gold">
                  <div className="flex justify-between">
                    <span className="text-charcoal">Principal & Interest</span>
                    <span className="font-semibold text-charcoal">
                      ${monthlyPIPay.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal">Property Tax (~1.4%/yr)</span>
                    <span className="font-semibold text-charcoal">${taxPay.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal">Homeowner's Insurance</span>
                    <span className="font-semibold text-charcoal">${insuranceMonthly.toFixed(2)}</span>
                  </div>
                  {pmiPay > 0 && (
                    <div className="flex justify-between">
                      <span className="text-charcoal">PMI</span>
                      <span className="font-semibold text-charcoal">${pmiPay.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg border-t border-gold pt-3">
                    <span className="font-bold text-charcoal">Total Monthly Payment</span>
                    <span className="font-bold text-gold text-xl">
                      ${totalMonthlyPay.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gold font-semibold mb-1">TOTAL PAID</p>
                    <p className="text-xl font-bold text-charcoal">
                      ${totalPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gold font-semibold mb-1">TOTAL INTEREST</p>
                    <p className="text-xl font-bold text-charcoal">
                      ${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link href="/lender" className="btn-gold inline-block">
              Meet Our Preferred Lender
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-charcoal/60 text-center mt-6">
            Estimates use Ohio avg property tax (~1.4%) and $100/mo insurance. Consult with a loan officer for final approval.
          </p>
        </div>
      </section>
    </div>
  );
}
