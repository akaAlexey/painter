<script setup lang="ts">
import { product } from '~/data/product'

const props = defineProps<{ asset: (path: string) => string }>()
</script>

<template>
  <section id="documents" class="section documents" aria-labelledby="documents-title">
    <div class="container documents-grid">
      <div class="section-head reveal-up">
        <p class="eyebrow">Доверие</p>
        <h2 id="documents-title">Документы, бренд и техническая база</h2>
        <p>
          Здесь собраны основные материалы по продукту: презентация, экспертное заключение и брендовый знак VIDTECHNOLOGY.
        </p>
      </div>

      <div class="doc-list reveal-up reveal-delay-1">
        <a v-for="doc in product.docs" :key="doc.href" class="doc-card glass-card" :href="props.asset(doc.href)" target="_blank" rel="noreferrer">
          <span>{{ doc.title }}</span>
          <strong>{{ doc.caption }}</strong>
        </a>
      </div>
    </div>
  </section>
</template>
