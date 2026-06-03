<script setup lang="ts">
import { advantages } from '~/data/product'
</script>

<template>
  <section id="advantages" class="section advantages" aria-labelledby="advantages-title">
    <div class="container">
      <div class="section-head reveal-up">
        <p class="eyebrow">Преимущества</p>
        <h2 id="advantages-title">Один состав для аккуратной отделки внутри и снаружи</h2>
        <p>
          Подходит для стен, потолков, фасадов и подготовленных ремонтных поверхностей. Белый матовый цвет выглядит спокойно и аккуратно в жилом интерьере.
        </p>
      </div>

      <div class="advantage-grid">
        <article v-for="item in advantages" :key="item.title" class="advantage-card glass-card reveal-up">
          <span class="advantage-value">{{ item.value }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
