import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, Clock, HelpCircle, Smartphone, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help center for the Dayton Relo app and website. Contact Chris Jurgens, Licensed Ohio Realtor, for app questions, account help, and real-estate support.",
};

const CONTACT = [
  {
    icon: Mail,
    label: "Email",
    value: "chris@cjohio.com",
    href: "mailto:chris@cjohio.com",
  },
  {
    icon: Phone,
    label: "Call or Text",
    value: "(937) 241-3484",
    href: "tel:+19372413484",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat, 9 AM – 7 PM ET",
    href: null,
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the Dayton Relo app free?",
    a: "Yes. All features are free. There are no subscriptions or in-app purchases.",
  },
  {
    q: "Do I have to create an account?",
    a: "No. You can browse listings, read the neighborhood guides, and use the calculators without signing up. Creating an account lets you save favorites and sync across devices.",
  },
  {
    q: "How current are the home listings?",
    a: "Listings come from the Dayton-area MLS via the Trestle / CoreLogic feed and refresh several times per hour. Price changes and new listings usually appear within minutes.",
  },
  {
    q: "I'm active-duty military. What's specific for me?",
    a: "The Military hub includes a BAH calculator, DITY/PPM move calculator, TLE calculator, PCS timeline, on-base vs. off-base guide, a list of VA-experienced lenders, and commute times to Wright-Patterson AFB for every neighborhood.",
  },
  {
    q: "How do I delete my account?",
    a: "Email chris@cjohio.com from the address tied to your account and your account plus all associated data will be deleted within 72 hours.",
  },
  {
    q: "Why does the AI assistant sometimes get things wrong?",
    a: "DaytonBot is an AI chat assistant (powered by Anthropic's Claude). It is helpful for general questions about the area, but it can make mistakes — especially about specific prices, active listings, or policy details. For anything you plan to act on financially or legally, confirm with Chris directly.",
  },
  {
    q: "I found a bug or have a feature request.",
    a: "Please email chris@cjohio.com with a short description and, if possible, a screenshot. Bug reports are read the same day.",
  },
  {
    q: "The app won't load or I'm getting an error.",
    a: "Try force-closing and reopening the app, and make sure you're on the latest version in the App Store or Google Play. If the issue persists, email chris@cjohio.com with your device model and iOS or Android version.",
  },
  {
    q: "How do I stop SMS notifications?",
    a: "Reply STOP to any text message from Dayton Relo to opt out immediately.",
  },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Help Center</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Dayton Relo <span className="text-gold">Support</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Questions about the app, your account, or moving to the Dayton area?
              You&apos;re in the right place. The fastest way to reach a real human
              is email or phone — Chris replies within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {CONTACT.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <div className="mb-3">
                  <Icon className="w-10 h-10 mx-auto text-charcoal group-hover:text-gold transition-colors" />
                </div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">
                  {label}
                </p>
                <p className="font-black group-hover:text-gold transition-colors">
                  {value}
                </p>
              </>
            );

            if (href) {
              return (
                <a
                  key={label}
                  href={href}
                  className="card text-center hover:border-gold hover:shadow-md transition-all duration-200 group"
                >
                  {inner}
                </a>
              );
            }

            return (
              <div
                key={label}
                className="card text-center group"
              >
                {inner}
              </div>
            );
          })}
        </div>

        {/* About */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-6 h-6 text-gold" />
            <h2 className="text-2xl md:text-3xl font-black">About the App</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Dayton Relo is a free app for people moving to — or already living
            in — the Dayton, Ohio area. It combines live MLS home search,
            neighborhood guides, school ratings, a mortgage calculator, military
            PCS tools, and an AI chat assistant in one place.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The app is built and maintained by Chris Jurgens, a licensed Ohio
            Realtor based in Dayton. Using the app is free and does not
            obligate you to work with Chris for real estate services.
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-gold" />
            <h2 className="text-2xl md:text-3xl font-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="card group cursor-pointer open:shadow-md open:border-gold/40 transition-all"
              >
                <summary className="font-bold text-charcoal list-none flex items-center justify-between">
                  <span>{q}</span>
                  <span className="ml-4 text-gold text-lg font-black group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-gray-600 leading-relaxed mt-3 pt-3 border-t border-gray-100">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card bg-cream border-gold/30 max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-gold" />
            <h3 className="font-black">Real Estate Disclaimer</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Chris Jurgens is a licensed Realtor in the state of Ohio. The
            Dayton Relo app and this website are provided for informational
            purposes. They are not a substitute for professional advice on real
            estate, financial, tax, or legal matters. Mortgage rates, BAH
            amounts, and market figures shown in the app are estimates or
            third-party data and can change.
          </p>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-6 text-sm">
          <Link href="/contact" className="text-gray-500 hover:text-gold font-semibold">
            Full Contact Page
          </Link>
          <Link href="/about" className="text-gray-500 hover:text-gold font-semibold">
            About Chris
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gold font-semibold">
            Home
          </Link>
        </div>
      </section>
    </>
  );
}
