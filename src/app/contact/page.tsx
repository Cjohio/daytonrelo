import type { Metadata } from "next";
import { Phone, Mail, Camera } from "lucide-react";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact Chris Jurgens | Dayton Ohio Realtor",
  description: "Get in touch with Chris Jurgens, Dayton Ohio Realtor. Call, text, email, or fill out the form — Chris responds within 24 hours.",
};

const METHODS = [
  { icon: Phone, label: "Call or Text", value: "(937) 241-3484", href: "tel:+19372413484" },
  { icon: Mail, label: "Email", value: "Chris@cjohio.com", href: "mailto:Chris@cjohio.com" },
  { icon: Camera, label: "Instagram", value: "@daytonrelo", href: "https://instagram.com/daytonrelo" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl">
            <p className="section-label mb-4">Let&apos;s Connect</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Let&apos;s Get You<br />
              <span className="text-gold">Home.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you have PCS orders, a job offer, or you&apos;re just starting to explore — reach out. Chris responds within 24 hours and there&apos;s zero pressure.
            </p>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {METHODS.map(({ icon: IconComponent, label, value, href }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="card text-center hover:border-gold hover:shadow-md transition-all duration-200 group">
              <div className="mb-3"><IconComponent className="w-10 h-10 mx-auto text-charcoal group-hover:text-gold transition-colors" /></div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">{label}</p>
              <p className="font-black group-hover:text-gold transition-colors">{value}</p>
            </a>
          ))}
        </div>

        {/* Form + info side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <LeadForm source="contact-page" title="Send a Message" subtitle="Fill this out and Chris will be in touch within 24 hours." />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="card">
              <h3 className="font-black mb-2 flex items-center gap-2"><Medal className="w-5 h-5" /> Military PCS?</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Share your report date and orders. Chris will build a housing plan around your timeline.
              </p>
              <a href="/military" className="text-gold text-sm font-bold hover:underline">Military PCS Guide →</a>
            </div>
            <div className="card">
              <h3 className="font-black mb-2 flex items-center gap-2"><Briefcase className="w-5 h-5" /> Corporate Relo?</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Chris works with relocation packages and tight timelines. Tell him your move date.
              </p>
              <a href="/relocation" className="text-gold text-sm font-bold hover:underline">Relocation Guide →</a>
            </div>
            <div className="card">
              <h3 className="font-black mb-2 flex items-center gap-2"><Home className="w-5 h-5" /> Not sure where to start?</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Browse the neighborhood guide to figure out which areas match your lifestyle and budget.
              </p>
              <a href="/neighborhoods" className="text-gold text-sm font-bold hover:underline">Neighborhood Guide →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Medal, Briefcase, Home } from "lucide-react";
