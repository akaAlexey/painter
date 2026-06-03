<script setup lang="ts">
import { product } from '~/data/product'

const steps = [
  {
    title: 'Подготовить основание',
    text: 'Основание должно быть сухим, чистым и прочным. Непрочные слои старых покрытий лучше удалить, трещины и сколы выровнять.'
  },
  {
    title: 'Загрунтовать',
    text: 'Перед окраской используется грунт глубокого проникновения: так покрытие ложится ровнее и лучше сцепляется с основанием.'
  },
  {
    title: 'Нанести первый слой',
    text: 'Краску перемешивают и наносят кистью, валиком или распылителем при температуре воздуха и поверхности от +5 °С до +30 °С.'
  },
  {
    title: 'Повторить слой',
    text: 'Второй слой наносится после высыхания первого. Полное высыхание при нормальных условиях - около 4 часов.'
  }
]
</script>

<template>
  <section class="section steps" aria-labelledby="steps-title">
    <div class="container steps-grid">
      <div class="steps-copy reveal-up">
        <p class="eyebrow">Нанесение</p>
        <h2 id="steps-title">Сценарий ремонта без лишней сложности</h2>
        <p>
          Краска наносится привычными инструментами. Главное - подготовить основание, загрунтовать поверхность и соблюдать условия нанесения.
        </p>
        <ul class="tool-list" aria-label="Инструменты нанесения">
          <li v-for="tool in product.tools" :key="tool">{{ tool }}</li>
        </ul>
      </div>

      <div class="steps-card glass-card reveal-up reveal-delay-1">
        <div class="steps-product-band" aria-label="ELASTIC PRO">
          <span>ELASTIC PRO</span>
          <strong>4 шага до ровного покрытия</strong>
        </div>
        <ol>
          <li v-for="step in steps" :key="step.title">
            <strong>{{ step.title }}</strong>
            <span>{{ step.text }}</span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
