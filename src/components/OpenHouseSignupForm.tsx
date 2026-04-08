"use client";
import { useState } from "react";

const AREAS = [
  "Beavercreek", "Centerville", "Fairborn", "Huber Heights",
  "Kettering", "Miamisburg", "Oakwood", "Springboro", "Xenia",
];

export default function OpenHouseSignupForm() {
  const [email,    setEmail]    = useState("");
  const [areas,    setAreas]    = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [status,   setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle");

  function toggleArea(area: string) {
    setAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const webhookURL = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;
      if (webhookURL) {
        await fetch(webhookURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "open_house_alert",
            email,
            areas: areas.length ? areas : ["All Areas"],
            maxPrice: maxPrice || "No limit",
            submittedAt: new Date().toISOString(),
          }),
        });
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-black mb-2">You&apos;re on the list!</h3>
        <p className="text-gray-500 text-sm">We&apos;ll email you the moment new open houses are scheduled in your area.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-black mb-1">Get Open House Alerts</h3>
      <p className="text-gray-500 text-sm mb-5">We&apos;ll email you as soon as new open houses are scheduled in Dayton.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Your Email *</label>
          <input
            required
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-2">Target Areas</label>
          <div className="flex flex-wrap gap-2">
            {AREAS.map(area => (
              <button
                key={area}
                type="button"
                onClick={() => toggleArea(area)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  areas.includes(area)
                    ? "bg-gold text-white border-gold"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gold"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Max Price</label>
          <select
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="w-full rounded-lg px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="">No limit</option>
            <option value="200000">Under $200k</option>
            <option value="300000">Under $300k</option>
            <option value="400000">Under $400k</option>
            <option value="500000">Under $500k</option>
            <option value="700000">Under $700k</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-gold w-full justify-center"
        >
          {status === "sending" ? "Signing up…" : "🔔 Alert Me"}
        </button>
        {status === "error" && (
          <p className="text-red-500 text-xs text-center">Something went wrong. Try again or call Chris directly.</p>
        )}
      </form>
    </div>
  );
}
