"use client";
import { useState } from "react";

interface LeadFormProps {
  source?: string;
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function LeadForm({
  source = "website",
  title = "Let's Talk",
  subtitle = "Fill out the form and Chris will be in touch within 24 hours.",
  dark = false,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", timeline: "" });

  const bg = dark ? "bg-charcoal text-white" : "bg-white text-charcoal border border-gray-200";
  const inputCls = `w-full rounded-lg px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-gold ${
    dark ? "bg-white/10 border-white/20 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200"
  }`;
  const labelCls = `text-xs font-bold uppercase tracking-wide ${dark ? "text-gray-300" : "text-gray-500"}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const webhookURL = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;
      if (webhookURL) {
        await fetch(webhookURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, source, submittedAt: new Date().toISOString() }),
        });
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={`rounded-2xl p-8 text-center ${bg}`}>
        <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-1">Message Received!</h3>
        <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-500"}`}>Chris will be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-6 sm:p-8 ${bg}`}>
      <h3 className={`text-xl font-black mb-1 ${dark ? "text-white" : "text-charcoal"}`}>{title}</h3>
      <p className={`text-sm mb-6 ${dark ? "text-gray-300" : "text-gray-500"}`}>{subtitle}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Name *</label>
            <input required className={inputCls} placeholder="Your name" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Phone *</label>
            <input required type="tel" className={inputCls} placeholder="(937) 555-0000" value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input required type="email" className={inputCls} placeholder="you@email.com" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <label className={labelCls}>Timeline</label>
          <select className={inputCls} value={form.timeline}
            onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}>
            <option value="">When are you looking to move?</option>
            <option>I already live here</option>
            <option>0 – 3 months</option>
            <option>3 – 6 months</option>
            <option>6 – 12 months</option>
            <option>Just exploring</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Message</label>
          <textarea rows={3} className={inputCls} placeholder="Tell Chris a little about what you're looking for..."
            value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
        </div>
        <button type="submit" disabled={status === "sending"} className="btn-gold justify-center w-full">
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
        {status === "error" && <p className="text-red-500 text-sm text-center">Something went wrong. Please call or text directly.</p>}
      </form>
    </div>
  );
}
