// https://nuxt.com/docs/api/configuration/nuxt-config
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://example.ru'

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  experimental: { appManifest: false },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL.replace(/\/$/, '')}/favicon.svg` },
        { rel: 'manifest', href: `${baseURL.replace(/\/$/, '')}/site.webmanifest` }
      ],
      meta: [
        { name: 'theme-color', content: '#07111f' },
        { name: 'color-scheme', content: 'dark light' }
      ]
    }
  },
  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: Number(process.env.SMTP_PORT || 465),
    smtpSecure: process.env.SMTP_SECURE !== 'false',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    mailFrom: process.env.MAIL_FROM || process.env.SMTP_USER || '',
    leadRecipientEmail: process.env.LEAD_RECIPIENT_EMAIL || 'Vidtechnology@mail.ru',
    public: {
      siteUrl,
      baseURL
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt']
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/api/**': { cors: false }
  },
  typescript: {
    strict: true,
    typeCheck: false
  }
})
