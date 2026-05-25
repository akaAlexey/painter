export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl || 'https://example.ru').replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`
})
