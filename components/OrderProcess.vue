<script setup lang="ts">
import { orderSteps } from '~/data/product'
</script>

<template>
  <section class="section order-process" aria-labelledby="order-title">
    <div class="container order-grid">
      <div class="section-head reveal-up">
        <p class="eyebrow">Как заказать</p>
        <h2 id="order-title">Покупатель не остается один на один с выбором</h2>
        <p>
          Сайт собирает базовые данные, а продавец уже уточняет объект, основание, объем, запас и способ получения краски.
        </p>
      </div>

      <div class="order-cards reveal-up reveal-delay-1">
        <article v-for="(step, index) in orderSteps" :key="step.title" class="order-card glass-card">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
