<script setup lang="ts">
import { faqs, product, seoKeywords } from '~/data/product'

const props = defineProps<{ siteUrl: string; assetUrl: (path: string) => string }>()

const pageUrl = computed(() => props.siteUrl.replace(/\/$/, '') + '/')
const productSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${product.name} ${product.category}`,
  brand: {
    '@type': 'Brand',
    name: product.brand
  },
  description: product.description,
  image: [props.assetUrl(product.productImage), props.assetUrl(product.heroImage)],
  color: product.color,
  material: 'водно-дисперсионная эластичная латексная краска',
  category: 'Paint',
  offers: {
    '@type': 'Offer',
    priceCurrency: product.currency,
    price: String(product.pricePerLiter),
    availability: 'https://schema.org/InStock',
    url: pageUrl.value
  }
}))

const organizationSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: product.brand,
  url: pageUrl.value,
  email: product.email,
  telephone: product.phone,
  logo: props.assetUrl('/img/logo-source.png')
}))

const webPageSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${product.name} — эластичная краска ${product.brand}`,
  url: pageUrl.value,
  inLanguage: 'ru-RU',
  keywords: seoKeywords.join(', '),
  about: productSchema.value
}))

const faqSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(productSchema.value)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema.value)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(webPageSchema.value)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqSchema.value)
    }
  ]
})
</script>

<template>
  <span class="sr-only">SEO structured data loaded</span>
</template>
