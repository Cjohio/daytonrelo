import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { User, Phone, MessageCircle, Mail, Globe, CheckCircle } from "lucide-react";
import { LENDERS } from "../data";

export function generateStaticParams() {
  return LENDERS.map(l => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const lender = LENDERS.find(l => l.id === params.id);
  if (!lender) return {};
  return {
    title: `${lender.name} | Preferred Lender | Dayton Relo`,
    description: lender.shortBio,
  };
}

export default function LenderDetailPage({ params }: { params: { id: string } }) {
  const lender = LENDERS.find(l => l.id === params.id);
  if (!lender) notFound();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Photo */}
          <div className="w-28 h-28 rounded-full bg-charcoal border-3 border-gold flex items-center justify-center mx-auto mb-6 border-2">
            {lender.photo ? (
              <img src={lender.photo} alt={lender.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-gold" />
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-2">{lender.name}</h1>
          <p className="text-gray-300 mb-1">{lender.title} · {lender.company}</p>
          <p className="text-gray-500 text-sm mb-4">{lender.nmls}</p>
          <p className="text-gold italic text-lg mb-8">&ldquo;{lender.tagline}&rdquo;</p>

          {/* Contact buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`tel:${lender.phone}`} className="btn-gold flex items-center gap-2"><Phone className="w-4 h-4" /> Call</a>
            <a href={`sms:${lender.phone}`} className="btn-gold flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Text</a>
            <a href={`mailto:${lender.email}`} className="btn-outline flex items-center gap-2"><Mail className="w-4 h-4" /> Email</a>
            <a href={lender.website} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2"><Globe className="w-4 h-4" /> Website</a>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

          {/* Specialties */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-6 border-l-4 border-gold pl-4">Specialties</h2>
            <div className="flex flex-wrap gap-3">
              {lender.specialties.map(s => (
                <span key={s} className="bg-gold/10 text-gold-dark font-bold text-sm px-4 py-2 rounded-lg">{s}</span>
              ))}
            </div>
          </section>

          {/* Full Bio */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-6 border-l-4 border-gold pl-4">About {lender.name}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{lender.fullBio}</p>
          </section>

          {/* Why section */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-6 border-l-4 border-gold pl-4">Why {lender.name}?</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {lender.why.map(({ icon: IconComponent, title, body }) => (
                <div key={title} className="bg-cream rounded-xl p-5 border border-gray-100">
                  <div className="mb-3"><IconComponent className="w-8 h-8 text-charcoal" /></div>
                  <h3 className="font-bold text-charcoal mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Loan types */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-6 border-l-4 border-gold pl-4">Loan Products Offered</h2>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              {lender.loanTypes.map(({ label, note }) => (
                <div key={label} className="flex items-start gap-4 p-4 bg-white">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-charcoal text-sm">{label}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-charcoal text-white rounded-2xl p-8 text-center border border-gold/30">
            <h2 className="text-2xl font-black text-gold mb-3">Ready to Get Pre-Approved?</h2>
            <p className="text-gray-300 mb-6">
              Reach out to {lender.name} directly, or connect through Chris for a warm introduction.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={`tel:${lender.phone}`} className="btn-gold flex items-center gap-2"><Phone className="w-4 h-4" /> Call {lender.name}</a>
              <Link href="/contact" className="btn-outline">Connect Through Chris</Link>
            </div>
          </section>

          {/* Back link */}
          <div className="text-center">
            <Link href="/lender" className="text-gold font-semibold hover:text-gold-dark transition-colors">
              ← View All Preferred Lenders
            </Link>
          </div>

          <p className="text-gray-400 text-xs text-center border-t border-gray-100 pt-8">
            You are always free to work with any lender of your choice. This is a referral only.
            Chris Jurgens does not receive compensation for this referral.
          </p>
        </div>
      </div>
    </main>
  );
}
