import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://daytonrelo.com'
  const lastModified = new Date()

  // Static pages with priority
  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/listings`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${baseUrl}/military`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/relocation`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/open-houses`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/neighborhoods`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/community`, priority: 0.7, changeFrequency: 'daily' },
    { url: `${baseUrl}/tools`, priority: 0.8, changeFrequency: 'monthly' },
    // Tools
    { url: `${baseUrl}/tools/mortgage-calculator`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/bah-calculator`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/closing-costs`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/rent-vs-buy`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/cost-of-living`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/pcs-timeline`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/on-base-vs-off`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/dity-calculator`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/tle-calculator`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/first-30-days`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/neighborhood-compare`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/neighborhood-quiz`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/schools`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/commute-finder`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/employer-map`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/relo-package`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/temp-housing`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/local-services`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/lender`, priority: 0.6, changeFrequency: 'monthly' },
    // Explore
    { url: `${baseUrl}/explore`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/explore/parks`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/explore/breweries`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/explore/golf`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/explore/things-to-do`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${baseUrl}/explore/day-trips`, priority: 0.6, changeFrequency: 'monthly' },
  ]

  return staticPages.map(page => ({
    url: page.url,
    lastModified,
    changeFrequency: page.changeFrequency as any,
    priority: page.priority,
  }))
}
