"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MLSListing } from "@/lib/trestle";

function formatPrice(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function getPhoto(listing: MLSListing): string {
  const photo = listing.Media?.find(m => m.Order === 0)?.MediaURL;
  return photo ?? `https://placehold.co/800x500/1A1A1A/C9A84C?text=${encodeURIComponent(listing.City)}`;
}

interface Props {
  listing:   MLSListing;
  showSave?: boolean;
}

export default function PropertyCard({ listing, showSave = true }: Props) {
  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    try {
      const s: string[] = JSON.parse(localStorage.getItem("dr_saved") ?? "[]");
      setSaved(s.includes(listing.ListingKey));
    } catch {}
  }, [listing.ListingKey]);

  function toggleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const s: string[] = JSON.parse(localStorage.getItem("dr_saved") ?? "[]");
      const next = saved
        ? s.filter(k => k !== listing.ListingKey)
        : [...s, listing.ListingKey];
      localStorage.setItem("dr_saved", JSON.stringify(next));
      setSaved(!saved);
    } catch {}
  }

  const address = `${listing.StreetNumber} ${listing.StreetName}, ${listing.City}, ${listing.StateOrProvince}`;
  const hasOpenHouse = Boolean(listing.OpenHouseDate);

  return (
    <Link
      href={`/listings/${listing.ListingKey}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/40 transition-all duration-200 overflow-hidden"
    >
      {/* Photo */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {imgError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-gray-800 to-gray-900 flex flex-col items-center justify-center gap-2">
            <svg className="w-10 h-10 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-gold/70 text-sm font-bold">{listing.City}, OH</span>
          </div>
        ) : (
          <Image
            src={getPhoto(listing)}
            alt={address}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 400px"
            onError={() => setImgError(true)}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {hasOpenHouse && (
            <span className="bg-gold text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
              Open House
            </span>
          )}
          {listing.StandardStatus === "Pending" && (
            <span className="bg-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
              Pending
            </span>
          )}
        </div>

        {/* Save button */}
        {showSave && (
          <button
            onClick={toggleSave}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow transition-colors ${
              saved ? "bg-gold text-white" : "bg-white/90 text-gray-400 hover:text-gold"
            }`}
            aria-label={saved ? "Remove from saved" : "Save home"}
          >
            <svg className="w-5 h-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-xl font-black text-charcoal mb-1 group-hover:text-gold transition-colors">
          {formatPrice(listing.ListPrice)}
        </p>
        <p className="text-sm text-gray-600 font-medium truncate mb-3">{address}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {listing.BedroomsTotal} bd
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {listing.BathroomsTotalInteger} ba
          </span>
          <span>{listing.LivingArea.toLocaleString()} sqft</span>
          {listing.GarageSpaces ? <span>{listing.GarageSpaces}-car garage</span> : null}
        </div>

        {/* Open house info */}
        {hasOpenHouse && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-gold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Open {listing.OpenHouseDate} · {listing.OpenHouseStartTime}–{listing.OpenHouseEndTime}
          </div>
        )}
      </div>
    </Link>
  );
}
