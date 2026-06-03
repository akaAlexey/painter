<script setup lang="ts">
import { faqs } from '~/data/product'
</script>

<template>
  <section id="faq" class="section faq" aria-labelledby="faq-title">
    <div class="container faq-grid">
      <div class="section-head reveal-up">
        <p class="eyebrow">Вопросы</p>
        <h2 id="faq-title">Короткие ответы перед заявкой</h2>
        <p>
          FAQ закрывает основные вопросы: цвет, расход, высыхание, подготовку поверхности и применение снаружи.
        </p>
      </div>

      <div class="faq-list reveal-up reveal-delay-1">
        <details v-for="(item, index) in faqs" :key="item.question" :open="index === 0" class="faq-item glass-card">
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
