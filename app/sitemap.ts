import { MetadataRoute } from 'next'
import { AUCTION_EVENTS } from '@/lib/auction-events'
import { MOCK_ITEMS } from '@/lib/mock-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://auc-proto-production.up.railway.app'
    const locales = ['en', 'pl', 'es', 'uk']

    // Base routes that exist for every locale
    const routes = [
        '',
        '/events',
        '/account',
        '/my-bids',
        '/watchlist',
        '/won',
        '/payment',
        '/success'
    ]

    // Admin routes (optional to include in sitemap, but useful for now)
    const adminRoutes = [
        '/admin/monitor',
        '/admin/auctions',
        '/admin/scanner',
        '/admin/users',
        '/admin/reports'
    ]

    let sitemapEntries: MetadataRoute.Sitemap = []

    locales.forEach(locale => {
        // Add static routes
        routes.forEach(route => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: route === '' ? 1 : 0.8,
            })
        })

        // Add admin routes
        adminRoutes.forEach(route => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.5,
            })
        })

        // Add dynamic Event pages
        AUCTION_EVENTS.forEach(event => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/events/${event.id}`,
                lastModified: new Date(),
                changeFrequency: 'hourly',
                priority: 0.9,
            })
        })

        // Add dynamic Item pages
        MOCK_ITEMS.forEach(item => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/items/${item.id}`,
                lastModified: new Date(),
                changeFrequency: 'hourly',
                priority: 0.9,
            })
        })
    })

    return sitemapEntries
}
