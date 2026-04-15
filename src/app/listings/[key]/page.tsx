import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Home, Calendar, Bed, Bath, Ruler, Car, ShieldCheck } from "lucide-react";
import { MOCK_LISTINGS } from "@/lib/trestle";
import LeadForm from "@/components/LeadForm";

interface Props { params: Promise<{ key: string }> }

function getListing(key: string) {
  return MOCK_LISTINGS.find(l => l.ListingKey === key) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params;
  const listing = getListing(key);
  if (!listing) return { title: "Listing Not Found | Dayton Relo" };
  return {
    title: `${listing.StreetNumber} ${listing.StreetName}, ${listing.City} | Dayton Relo`,
    description: listing.PublicRemarks ?? `${listing.BedroomsTotal} bed, ${listing.BathroomsTotalInteger} bath home in ${listing.City}, OH for $${listing.ListPrice.toLocaleString()}.`,
  };
}

function formatPrice(n: number) {
  return "$" + n.toLocaleString("en-US");
}

export default async function ListingDetailPage({ params }: Props) {
  const { key } = await params;
  const listing = getListing(key);

  if (!listing) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-4"><Home className="w-16 h-16 text-charcoal" /></div>
        <h1 className="text-2xl font-black mb-3">Listing Not Found</h1>
        <p className="text-gray-500 mb-6">This listing may have sold or been removed from the MLS.</p>
        <Link href="/listings" className="btn-gold">Back to Listings</Link>
      </div>
    );
  }

  const photo = listing.Media?.[0]?.MediaURL
    ?? `https://placehold.co/1200x600/1A1A1A/C9A84C?text=${encodeURIComponent(listing.City)}`;
  const address = `${listing.StreetNumber} ${listing.StreetName}, ${listing.City}, ${listing.StateOrProvince} ${listing.PostalCode}`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-gold">Listings</Link>
          <span>/</span>
          <span className="text-charcoal font-medium truncate">{listing.StreetNumber} {listing.StreetName}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: Photo + details */}
          <div className="flex-1 min-w-0">
            {/* Photo */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-6 bg-gray-100">
              <Image
                src={photo}
                alt={address}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />
              {listing.OpenHouseDate && (
                <div className="absolute top-4 left-4 bg-gold text-white text-sm font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Open House: {listing.OpenHouseDate} · {listing.OpenHouseStartTime}–{listing.OpenHouseEndTime}
                </div>
              )}
              {listing.StandardStatus === "Pending" && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-black px-4 py-2 rounded-full shadow-lg">
                  Under Contract
                </div>
              )}
            </div>

            {/* Price + address */}
            <div className="mb-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-3xl md:text-4xl font-black">{formatPrice(listing.ListPrice)}</p>
                  <p className="text-gray-600 font-medium mt-1">{address}</p>
                </div>
                <span className={`text-xs font-black px-3 py-1.5 rounded-full ${
                  listing.StandardStatus === "Active"  ? "bg-green-100 text-green-700" :
                  listing.StandardStatus === "Pending" ? "bg-orange-100 text-orange-700" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {listing.StandardStatus}
                </span>
              </div>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Bed, label: "Bedrooms",  value: listing.BedroomsTotal },
                { icon: Bath, label: "Bathrooms", value: listing.BathroomsTotalInteger },
                { icon: Ruler, label: "Sq Ft",     value: listing.LivingArea.toLocaleString() },
                { icon: Car, label: "Garage",    value: listing.GarageSpaces ? `${listing.GarageSpaces}-car` : "—" },
              ].map(({ icon: IconComponent, label, value }) => (
                <div key={label} className="bg-cream rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-1"><IconComponent className="w-6 h-6 text-charcoal" /></div>
                  <p className="text-lg font-black">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>

            {/* Additional details */}
            <div className="card mb-6">
              <h2 className="text-lg font-black mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Year Built",    value: listing.YearBuilt ?? "—" },
                  { label: "Property Type", value: listing.PropertySubType },
                  { label: "Lot Size",      value: listing.LotSizeAcres ? `${listing.LotSizeAcres} acres` : "—" },
                  { label: "Pool",          value: listing.PoolPrivateYN ? "Yes" : "No" },
                  { label: "ZIP Code",      value: listing.PostalCode },
                  { label: "MLS #",         value: listing.ListingKey.replace("mock-", "DY-") },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Remarks */}
            {listing.PublicRemarks && (
              <div className="card">
                <h2 className="text-lg font-black mb-3">About This Home</h2>
                <p className="text-gray-600 leading-relaxed">{listing.PublicRemarks}</p>
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col gap-4">

            {/* Schedule a showing */}
            <div className="card border-gold border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-black text-sm">Schedule a Showing</p>
                  <p className="text-xs text-gray-500">Chris responds within the hour</p>
                </div>
              </div>
              <LeadForm
                source={`showing-${listing.ListingKey}`}
                title=""
                subtitle=""
                mode="showing"
              />
            </div>

            {/* Call Chris */}
            <div className="bg-charcoal rounded-2xl p-5 text-white text-center">
              <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">Prefer to Call?</p>
              <p className="text-lg font-black mb-1">Chris Jurgens</p>
              <p className="text-gray-400 text-sm mb-4">Licensed Ohio Realtor · Army Vet</p>
              <a href="tel:+19372413484" className="btn-gold w-full justify-center">
                (937) 241-3484
              </a>
            </div>

            {/* Pre-Approval CTA */}
            <div className="rounded-2xl border-2 border-gold/40 bg-yellow-50 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-black text-charcoal text-sm">Get Pre-Approved Today</p>
                  <p className="text-xs text-gray-500">Know your budget before you fall in love</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Chris works with a hand-picked group of local VA and conventional lenders who know the Dayton market. Getting pre-approved puts you ahead of other buyers and shows sellers you&apos;re serious.
              </p>
              <Link
                href="/lender"
                className="btn-gold w-full justify-center text-sm"
              >
                View Recommended Lenders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
