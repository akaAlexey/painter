<script setup lang="ts">
import { product } from '~/data/product'

const props = defineProps<{ asset: (path: string) => string }>()
const { openOfferModal } = useSalesUiActions()

const offerBadges = [
  'Расчет объема за 1 сообщение',
  'Белая матовая краска',
  'Фасовка 1 · 5 · 9 л'
]

const heroCans = [
  { class: 'can-main', width: 320, height: 340, alt: 'Большая банка краски ELASTIC PRO' },
  { class: 'can-mid can-mid-a', width: 220, height: 230, alt: 'Средняя банка краски ELASTIC PRO' },
  { class: 'can-mid can-mid-b', width: 220, height: 230, alt: 'Средняя банка краски ELASTIC PRO' },
  { class: 'can-mini can-mini-1', width: 138, height: 148, alt: 'Банка краски ELASTIC PRO 1 литр' },
  { class: 'can-mini can-mini-2', width: 138, height: 148, alt: 'Банка краски ELASTIC PRO 1 литр' },
  { class: 'can-mini can-mini-3', width: 138, height: 148, alt: 'Банка краски ELASTIC PRO 1 литр' },
  { class: 'can-mini can-mini-4', width: 138, height: 148, alt: 'Банка краски ELASTIC PRO 1 литр' },
  { class: 'can-mini can-mini-5', width: 138, height: 148, alt: 'Банка краски ELASTIC PRO 1 литр' }
]
</script>

<template>
  <section class="hero section" aria-labelledby="hero-title">
    <div class="container hero-grid hero-grid--sales">
      <div class="hero-content reveal-up">
        <p class="eyebrow">{{ product.brand }} · премиальная краска</p>
        <h1 id="hero-title" class="kinetic-title" aria-label="Краска ELASTIC PRO для внутренних и наружных работ">
          <span>ELASTIC</span>
          <span>PRO</span>
          <em>для стен, потолков и фасадов</em>
        </h1>
        <p class="hero-lead hero-lead--sales">
          Белая матовая эластичная краска для внутренних и наружных работ. Подходит для частных заказов и объектов: можно быстро рассчитать объем, выбрать фасовку 1 / 5 / 9 л и сразу отправить заявку.
        </p>

        <div class="hero-actions" aria-label="Основные действия">
          <button class="btn btn-primary liquid-btn" type="button" @click="openOfferModal('hero')"><span>Получить предложение</span></button>
          <a class="btn btn-secondary" href="#calculator">Рассчитать объем</a>
        </div>

        <div class="hero-offers" aria-label="Преимущества покупки">
          <span v-for="item in offerBadges" :key="item">{{ item }}</span>
        </div>

        <dl class="hero-stats" aria-label="Ключевые характеристики">
          <div>
            <dt>Расход</dt>
            <dd>1 л / 7 м²</dd>
          </div>
          <div>
            <dt>Фасовка</dt>
            <dd>1 · 5 · 9 л</dd>
          </div>
          <div>
            <dt>Цена</dt>
            <dd>1 200 ₽/л</dd>
          </div>
        </dl>
      </div>

      <div class="hero-showcase hero-showcase--clean glass-card reveal-up reveal-delay-1" aria-label="Линейка банок ELASTIC PRO">
        <div class="hero-packshot">
          <img
            v-for="can in heroCans"
            :key="can.class"
            :class="['packshot-can', can.class]"
            :src="props.asset(product.productImage)"
            :width="can.width"
            :height="can.height"
            :alt="can.alt"
            loading="eager"
          >
        </div>

        <div class="hero-product-label glass-card hero-product-label--sales hero-product-label--hero">
          <div>
            <span>{{ product.name }}</span>
            <strong>1 × 9 л · 2 × 5 л · 5 × 1 л · белый матовый цвет</strong>
          </div>
          <button class="btn btn-primary" type="button" @click="openOfferModal('hero-label')">Купить / оставить заявку</button>
        </div>
      </div>
    </div>
  </section>
</template>
