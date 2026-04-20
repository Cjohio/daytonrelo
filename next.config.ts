import type { NextConfig } from "next";

// VULN-09: Security headers for all responses
// Prevents clickjacking, MIME sniffing, XSS, and restricts resource origins.
const securityHeaders = [
  {
    // Prevent site from being embedded in iframes (clickjacking)
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    // Stop browsers from MIME-sniffing the content type
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Full referrer on same-origin, strip on cross-origin
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Only send HTTPS for 1 year, include subdomains
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    // Disable access to device sensors (camera, mic, geolocation) unless needed
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    // Content Security Policy — restrict where scripts, styles, and media can load from
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + inline scripts (needed for Next.js hydration) + Supabase
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co",
      // Styles: self + inline styles (Next.js CSS-in-JS)
      "style-src 'self' 'unsafe-inline'",
      // Images: self + data URIs + YouTube thumbnails + CloudFront + placeholder
      "img-src 'self' data: blob: https:",
      // Fonts: self only
      "font-src 'self'",
      // API calls: Supabase + YouTube embed + Zapier webhooks (for lead forms)
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.youtube.com https://hooks.zapier.com",
      // iframes: YouTube embeds only
      "frame-src https://www.youtube.com https://youtube.com",
      // Everything else: self only
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    remotePatterns: [
      // Allow any HTTPS source — Trestle/CoreLogic photos come from various CDN domains
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
