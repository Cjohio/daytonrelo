"use client";
import { useState } from "react";

// Time slots shown in the showing request picker
const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM",  "1:30 PM",  "2:00 PM",  "2:30 PM",
  "3:00 PM",  "3:30 PM",  "4:00 PM",  "4:30 PM",
  "5:00 PM",  "5:30 PM",  "6:00 PM",
];

// Minimum date = today
function todayString() {
  return new Date().toISOString().split("T")[0];
}

interface LeadFormProps {
  source?:   string;
  title?:    string;
  subtitle?: string;
  dark?:     boolean;
  /** "lead" = general contact form (timeline dropdown)
   *  "showing" = property tour request (date + time picker) */
  mode?: "lead" | "showing";
}

export default function LeadForm({
  source   = "website",
  title    = "Let's Talk",
  subtitle = "Fill out the form and Chris will be in touch within 24 hours.",
  dark     = false,
  mode     = "lead",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", message: "",
    // lead mode
    timeline: "",
    // showing mode
    preferredDate: "",
    preferredTime: "",
  });

  const isShowing = mode === "showing";

  const bg = dark ? "bg-charcoal text-white" : "bg-white text-charcoal border border-gray-200";
  const inputCls = `w-full rounded-lg px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-gold ${
    dark ? "bg-white/10 border-white/20 text-white placeholder-gray-400" : "bg-gray-50 border-gray-200"
  }`;
  const labelCls = `text-xs font-bold uppercase tracking-wide ${dark ? "text-gray-300" : "text-gray-500"}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);

      // Also fire to Zapier → Lofty CRM if webhook configured
      const webhookURL = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;
      if (webhookURL) {
        fetch(webhookURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, source, submittedAt: new Date().toISOString() }),
        }).catch(() => {});
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
        <h3 className="text-lg font-bold mb-1">
          {isShowing ? "Showing Request Sent!" : "Message Sent!"}
        </h3>
        <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-500"}`}>
          {isShowing
            ? `Chris will confirm your ${form.preferredDate ? `${form.preferredDate} ${form.preferredTime}` : "requested time"} showing shortly. You can also reach him at (937) 241-3484.`
            : "Chris will be in touch within the hour. You can also reach him directly at (937) 241-3484."}
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-6 sm:p-8 ${bg}`}>
      <h3 className={`text-xl font-black mb-1 ${dark ? "text-white" : "text-charcoal"}`}>{title}</h3>
      <p className={`text-sm mb-6 ${dark ? "text-gray-300" : "text-gray-500"}`}>{subtitle}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Name + Phone */}
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

        {/* Email */}
        <div>
          <label className={labelCls}>Email *</label>
          <input required type="email" className={inputCls} placeholder="you@email.com" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>

        {/* Showing mode: date + time picker */}
        {isShowing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Preferred Date</label>
              <input
                type="date"
                className={inputCls}
                min={todayString()}
                value={form.preferredDate}
                onChange={e => setForm(f => ({ ...f, preferredDate: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelCls}>Preferred Time</label>
              <select className={inputCls} value={form.preferredTime}
                onChange={e => setForm(f => ({ ...f, preferredTime: e.target.value }))}>
                <option value="">Select a time</option>
                {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        ) : (
          /* Lead mode: move timeline */
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
        )}

        {/* Message */}
        <div>
          <label className={labelCls}>Message</label>
          <textarea rows={3} className={inputCls}
            placeholder={isShowing
              ? "Any questions about the home or anything Chris should know?"
              : "Tell Chris a little about what you're looking for..."}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
        </div>

        <button type="submit" disabled={status === "sending"} className="btn-gold justify-center w-full">
          {status === "sending"
            ? "Sending…"
            : isShowing ? "Request a Showing" : "Send Message"}
        </button>
        {status === "error" && (
          <p className="text-red-500 text-sm text-center">
            Something went wrong. Please call or text Chris directly at (937) 241-3484.
          </p>
        )}
      </form>
    </div>
  );
}
