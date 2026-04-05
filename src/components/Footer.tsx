import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gold font-black text-lg">DAYTON</span>
            <span className="font-black text-lg">RELO</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your Dayton area real estate specialist. Military PCS, corporate relocation, and local buyers — handled with strategy and care.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Quick Links</p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Military PCS Guide", href: "/military" },
              { label: "Corporate Relocation", href: "/relocation" },
              { label: "Neighborhood Guides", href: "/neighborhoods" },
              { label: "About Chris", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-gray-400 text-sm hover:text-gold transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Get In Touch</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <a href="tel:+19372413484" className="hover:text-gold transition-colors">(937) 241-3484</a>
            <a href="mailto:Chris@cjohio.com" className="hover:text-gold transition-colors">Chris@cjohio.com</a>
            <a href="https://instagram.com/daytonrelo" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">@daytonrelo</a>
            <p className="text-gray-500 mt-2">Team Flory · eXp Realty</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Chris Jurgens · Licensed Ohio Realtor · All rights reserved.
      </div>
    </footer>
  );
}
