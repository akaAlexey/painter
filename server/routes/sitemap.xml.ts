export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl || 'https://example.ru').replace(/\/$/, '')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/privacy-policy', priority: '0.6', changefreq: 'monthly' },
    { path: '/consent-processing', priority: '0.6', changefreq: 'monthly' }
  ]

  const urls = pages.map((page) => `  <url>\n    <loc>${siteUrl}${page.path}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
})
