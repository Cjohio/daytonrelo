"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";

const NAV = [
  { label: "Search Homes", href: "/listings" },
  {
    label: "Tools",
    href: "/tools",
    dropdown: {
      columns: [
        {
          title: "Finance",
          items: [
            { label: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
            { label: "BAH Calculator", href: "/tools/bah-calculator" },
            { label: "Closing Costs", href: "/tools/closing-costs" },
            { label: "Rent vs. Buy", href: "/tools/rent-vs-buy" },
            { label: "Cost of Living", href: "/tools/cost-of-living" },
          ],
        },
        {
          title: "Military & PCS",
          items: [
            { label: "Military Home Buying Benefits", href: "/military-benefits" },
            { label: "PCS Timeline", href: "/tools/pcs-timeline" },
            { label: "On-Base vs Off-Base", href: "/tools/on-base-vs-off" },
            { label: "DITY Calculator", href: "/tools/dity-calculator" },
            { label: "TLE Calculator", href: "/tools/tle-calculator" },
            { label: "First 30 Days", href: "/tools/first-30-days" },
          ],
        },
        {
          title: "Neighborhoods",
          items: [
            { label: "Compare Neighborhoods", href: "/tools/neighborhood-compare" },
            { label: "Neighborhood Quiz", href: "/tools/neighborhood-quiz" },
            { label: "School Guide", href: "/tools/schools" },
            { label: "Commute Finder", href: "/tools/commute-finder" },
          ],
        },
      ],
    },
  },
  { label: "Explore Dayton", href: "/explore",
    dropdown: {
      columns: [
        {
          items: [
            { label: "Neighborhoods", href: "/neighborhoods" },
            { label: "Parks & Recreation", href: "/explore/parks" },
            { label: "Local Restaurants", href: "/explore/restaurants" },
            { label: "Local Breweries", href: "/explore/breweries" },
            { label: "Golf Courses", href: "/explore/golf" },
            { label: "Things To Do", href: "/explore/things-to-do" },
            { label: "Day Trips", href: "/explore/day-trips" },
          ],
        },
      ],
    },
  },
  { label: "Military PCS", href: "/military" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-charcoal border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Dayton Relo"
            width={140}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(({ label, href, dropdown }) => (
            <div
              key={href}
              className="relative"
              onMouseEnter={() => dropdown && setDesktopDropdown(label)}
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <Link
                href={href}
                className={`text-sm font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                  path === href
                    ? "text-gold bg-white/10"
                    : "text-gray-300 hover:text-gold hover:bg-white/5"
                }`}
              >
                {label}
                {dropdown && (
                  <svg className={`w-4 h-4 transition-transform ${desktopDropdown === label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
              </Link>

              {/* Desktop dropdown */}
              {dropdown && desktopDropdown === label && (
                <div className="absolute left-0 mt-0 w-max bg-charcoal border border-white/10 rounded-xl shadow-xl py-6 px-8 z-50">
                  {/* Arrow indicator */}
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-charcoal border-t border-l border-white/10 rotate-45" />

                  <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${dropdown.columns.length}, minmax(200px, auto))` }}>
                    {dropdown.columns.map((col, idx) => (
                      <div key={idx}>
                        {'title' in col && col.title && (
                          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{col.title}</p>
                        )}
                        <div className="flex flex-col gap-2">
                          {col.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="text-sm text-gray-300 hover:text-gold transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/saved" className="flex items-center gap-1.5 text-sm font-semibold text-gray-300 hover:text-gold transition-colors px-2 py-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Saved
          </Link>
          <AuthButton />
          <a href="tel:+19372413484" className="btn-gold text-sm py-2 px-4">
            (937) 241-3484
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-gold transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-charcoal border-t border-white/10 px-4 py-4 flex flex-col gap-1 max-h-96 overflow-y-auto">
          {NAV.map(({ label, href, dropdown }) => (
            <div key={href}>
              <button
                onClick={() => {
                  if (dropdown) {
                    setMobileDropdown(mobileDropdown === label ? null : label);
                  } else {
                    setOpen(false);
                  }
                }}
                className={`w-full text-left text-sm font-semibold px-3 py-2.5 rounded-lg flex items-center justify-between ${
                  path === href
                    ? "text-gold bg-white/10"
                    : "text-gray-300 hover:text-gold"
                }`}
              >
                {label}
                {dropdown && (
                  <svg className={`w-4 h-4 transition-transform ${mobileDropdown === label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
              </button>

              {/* Mobile dropdown */}
              {dropdown && mobileDropdown === label && (
                <div className="pl-4 py-2 flex flex-col gap-2">
                  {dropdown.columns.map((col, idx) => (
                    <div key={idx}>
                      {'title' in col && col.title && (
                        <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2 pl-3">{col.title}</p>
                      )}
                      {col.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="text-sm text-gray-300 hover:text-gold px-3 py-1.5 rounded-lg block transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-white/10 mt-1">
            <Link href="/saved" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-gray-300 px-3 py-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Saved Homes
            </Link>
            <AuthButton />
            <a href="tel:+19372413484" className="btn-gold text-sm text-center">
              Call (937) 241-3484
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
