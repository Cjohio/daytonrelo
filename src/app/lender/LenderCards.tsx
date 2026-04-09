"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Globe } from "lucide-react";
import { LENDERS } from "./page";

type Lender = typeof LENDERS[0];

function SpecialtyPill({ label }: { label: string }) {
  return (
    <span className="inline-block bg-gold/10 text-gold-dark text-xs font-bold px-2.5 py-1 rounded-md">
      {label}
    </span>
  );
}

function LenderCard({ lender }: { lender: Lender }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Top gold accent */}
      <div className="h-1 bg-gold" />

      <div className="p-6">
        {/* Photo + name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            {lender.photo ? (
              <Image
                src={lender.photo}
                alt={lender.name}
                width={72}
                height={72}
                className="w-18 h-18 rounded-full border-2 border-gold object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-charcoal border-2 border-gold flex items-center justify-center">
                <User className="w-8 h-8 text-gold" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-charcoal mb-0.5">{lender.name}</h2>
            <p className="text-gray-500 text-sm">{lender.title}</p>
            <p className="text-gray-600 text-sm font-semibold">{lender.company}</p>
            <p className="text-gray-400 text-xs mt-0.5">{lender.nmls}</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-gold-dark text-sm italic mb-3">&ldquo;{lender.tagline}&rdquo;</p>

        {/* Short bio */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{lender.shortBio}</p>

        {/* Specialty pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {lender.specialties.map(s => <SpecialtyPill key={s} label={s} />)}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-5" />

        {/* Action buttons */}
        <div className="flex gap-3">
          <Link
            href={`/lender/${lender.id}`}
            className="flex-1 text-center bg-gold text-white font-bold text-sm py-2.5 px-4 rounded-lg hover:bg-gold-dark transition-colors"
          >
            View Profile
          </Link>
          <a
            href={lender.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center border-2 border-gold text-gold font-bold text-sm py-2.5 px-4 rounded-lg hover:bg-gold hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4" /> Website
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LenderCards({ lenders }: { lenders: Lender[] }) {
  // Shuffle once on mount — new random order every page load
  const [shuffled] = useState<Lender[]>(() =>
    [...lenders].sort(() => Math.random() - 0.5)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {shuffled.map(lender => (
        <LenderCard key={lender.id} lender={lender} />
      ))}
    </div>
  );
}
