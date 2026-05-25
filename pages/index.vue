<script setup lang="ts">
import { product, seoKeywords } from '~/data/product'

const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://example.ru').replace(/\/$/, '')
const baseURL = String(config.app.baseURL || config.public.baseURL || '/')
const normalizedBase = baseURL === '/' ? '' : baseURL.replace(/\/$/, '')
const asset = (path: string) => `${normalizedBase}${path.startsWith('/') ? path : `/${path}`}`
const assetUrl = (path: string) => `${siteUrl}${asset(path)}`

const title = `${product.name} — эластичная матовая краска VIDTECHNOLOGY`
const description = 'ELASTIC PRO — белая матовая эластичная краска для внутренних и наружных работ. Расход 1 л на 7 м² в два слоя, можно колеровать, цена 1200 ₽/л.'

useSeoMeta({
  title,
  description,
  keywords: seoKeywords.join(', '),
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: `${siteUrl}/`,
  ogImage: assetUrl(product.productImage),
  ogImageAlt: 'Банка краски ELASTIC PRO VIDTECHNOLOGY',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: assetUrl(product.productImage),
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/` },
    { rel: 'preload', as: 'image', href: asset(product.productImage), fetchpriority: 'high' }
  ]
})
</script>

<template>
  <div>
    <SeoJsonLd :site-url="siteUrl" :asset-url="assetUrl" />
    <SiteHeader />
    <main>
      <HeroSection :asset="asset" />
      <ContactLead />
      <PaintCalculator />
      <ColorVisualizer :asset="asset" />
      <AdvantagesGrid />
      <UseCases />
      <ApplicationSteps :asset="asset" />
      <OrderProcess />
      <FaqBlock />
      <DocumentsBlock :asset="asset" />
    </main>
    <SiteFooter />
    <StickyCta />
    <OfferModal />
  </div>
</template>
