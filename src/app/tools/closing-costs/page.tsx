'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ClosingCosts() {
  const [price, setPrice] = useState(300000);
  const [downPercent, setDownPercent] = useState(10);
  const [loanType, setLoanType] = useState('conventional');
  const [vaFirstUse, setVaFirstUse] = useState(true);

  const downPayment = price * (downPercent / 100);
  const loan = price - downPayment;

  // Calculate line items
  const origination = loan * 0.01;
  const appraisal = 550;
  const titleLender = loan * 0.003;
  const titleOwner = price * 0.004;
  const titleSearchSettlement = 650;
  const recordingFees = 175;
  const homeInspection = 425;

  let vaFundingFee = 0;
  let fhaMIP = 0;
  let pmiNote = '';

  if (loanType === 'va') {
    if (vaFirstUse) {
      if (downPercent === 0) vaFundingFee = loan * 0.0215;
      else if (downPercent < 10) vaFundingFee = loan * 0.015;
      else vaFundingFee = loan * 0.0125;
    } else {
      if (downPercent === 0) vaFundingFee = loan * 0.036;
      else if (downPercent < 10) vaFundingFee = loan * 0.015;
      else vaFundingFee = loan * 0.0125;
    }
  }

  if (loanType === 'fha') {
    fhaMIP = loan * 0.0175;
  }

  if (loanType === 'conventional' && downPercent < 20) {
    const monthlyPMI = loan * 0.005 / 12;
    pmiNote = `~$${monthlyPMI.toFixed(2)}/mo until 20% equity`;
  }

  const homeownersInsurance = (price * 0.004) / 12; // One month prepaid
  const prepaidInterest = (loan * 0.07 / 365) * 15;
  const propertyTaxEscrow = (price * 0.018 / 12) * 2.5;
  const insuranceEscrow = homeownersInsurance * 2;

  const lineItems = [
    { label: 'Loan Origination', amount: origination, note: '1% of loan amount' },
    { label: 'Appraisal', amount: appraisal, note: 'Third-party appraisal' },
    { label: 'Title Insurance (Lender)', amount: titleLender, note: '0.3% of loan' },
    { label: 'Title Insurance (Owner)', amount: titleOwner, note: '0.4% of purchase price' },
    { label: 'Title Search & Settlement', amount: titleSearchSettlement, note: 'Search and closing fees' },
    { label: 'Recording Fees', amount: recordingFees, note: 'County recording' },
    { label: 'Home Inspection', amount: homeInspection, note: 'Professional inspection' },
    ...(loanType === 'va' && vaFundingFee > 0
      ? [{ label: 'VA Funding Fee', amount: vaFundingFee, note: `${vaFirstUse ? '1st use' : 'Subsequent'} use` }]
      : []),
    ...(loanType === 'fha' && fhaMIP > 0
      ? [{ label: 'FHA Upfront MIP', amount: fhaMIP, note: 'Usually rolled into loan' }]
      : []),
    { label: 'Homeowner\'s Insurance (1 mo)', amount: homeownersInsurance, note: 'One month prepaid' },
    { label: 'Prepaid Interest', amount: prepaidInterest, note: '~15 days at 7% APR' },
    { label: 'Property Tax Escrow', amount: propertyTaxEscrow, note: '2.5 months at 1.8%/yr' },
    { label: 'Insurance Escrow', amount: insuranceEscrow, note: '2 months of insurance' },
  ];

  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Closing Costs Estimator</h1>
          <p className="text-lg text-gold">See what to expect at closing</p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Purchase Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
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
                Loan Type
              </label>
              <select
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
              >
                <option value="conventional">Conventional</option>
                <option value="va">VA</option>
                <option value="fha">FHA</option>
              </select>
            </div>
            {loanType === 'va' && (
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  VA Benefit Use
                </label>
                <select
                  value={vaFirstUse ? 'first' : 'subsequent'}
                  onChange={(e) => setVaFirstUse(e.target.value === 'first')}
                  className="w-full px-4 py-2 border border-gold rounded bg-white text-charcoal"
                >
                  <option value="first">First Use</option>
                  <option value="subsequent">Subsequent Use</option>
                </select>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-gold/10 border-2 border-gold rounded-lg p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gold font-semibold mb-1">PURCHASE PRICE</p>
                <p className="text-lg font-bold text-charcoal">
                  ${price.toLocaleString('en-US')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gold font-semibold mb-1">DOWN PAYMENT</p>
                <p className="text-lg font-bold text-charcoal">
                  ${downPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gold font-semibold mb-1">LOAN AMOUNT</p>
                <p className="text-lg font-bold text-charcoal">
                  ${loan.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          {/* Total at Top */}
          <div className="bg-charcoal rounded-lg p-6 mb-8">
            <p className="text-sm text-gold font-semibold mb-2">ESTIMATED CLOSING COSTS</p>
            <p className="text-5xl font-bold text-gold">
              ${total.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>

          {/* Line Items */}
          <div className="space-y-3">
            {lineItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start bg-white rounded border border-gold/20 p-4">
                <div className="flex-1">
                  <p className="font-semibold text-charcoal">{item.label}</p>
                  <p className="text-xs text-charcoal/60">{item.note}</p>
                </div>
                <p className="font-bold text-gold ml-4">
                  ${item.amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>

          {pmiNote && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-charcoal">
              <strong>PMI Note:</strong> {pmiNote}
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
            These are estimates. Actual closing costs vary by property, lender, and location. Consult with a loan officer for accurate final numbers.
          </p>
        </div>
      </section>
    </div>
  );
}
