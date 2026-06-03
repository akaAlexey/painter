<script setup lang="ts">
import { useCases } from '~/data/product'
</script>

<template>
  <section class="section use-cases" aria-labelledby="use-cases-title">
    <div class="container use-cases-grid">
      <div class="use-cases-art use-cases-art--clean reveal-up" aria-hidden="true">
        <div class="surface-card surface-card-a">Стены</div>
        <div class="surface-card surface-card-b">Потолки</div>
        <div class="surface-card surface-card-c">Фасады</div>
      </div>

      <div class="use-cases-content reveal-up reveal-delay-1">
        <p class="eyebrow">Применение</p>
        <h2 id="use-cases-title">Для разных задач ремонта</h2>
        <p>
          ELASTIC PRO удобно использовать для стен, потолков, фасадных поверхностей и объектов, где важны белое матовое покрытие, понятный расход и устойчивость к мытью.
        </p>

        <div class="chips" aria-label="Список зон применения">
          <span v-for="item in useCases" :key="item">{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
