import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/mission-control", "/auth", "/profile", "/api"],
    },
    sitemap: "https://daytonrelo.com/sitemap.xml",
  };
}
