"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Home",          href: "/" },
  { label: "Military PCS",  href: "/military" },
  { label: "Relocation",    href: "/relocation" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "About",         href: "/about" },
  { label: "Contact",       href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-gold font-black text-xl tracking-tight">DAYTON</span>
          <span className="text-charcoal font-black text-xl tracking-tight">RELO</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors ${
                path === href ? "text-gold" : "text-gray-600 hover:text-gold"
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="tel:+19372413484"
            className="btn-gold text-sm py-2 px-4"
          >
            (937) 241-3484
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gold"
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
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold ${path === href ? "text-gold" : "text-gray-700"}`}
            >
              {label}
            </Link>
          ))}
          <a href="tel:+19372413484" className="btn-gold text-sm text-center">
            Call (937) 241-3484
          </a>
        </div>
      )}
    </header>
  );
}
