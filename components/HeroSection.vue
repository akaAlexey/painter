<script setup lang="ts">
import { product } from '~/data/product'

const props = defineProps<{ asset: (path: string) => string }>()
const titleWords = ['Краска', 'для', 'продажи']
const { openOfferModal } = useSalesUiActions()

const offerBadges = [
  'Расчет объема за 1 сообщение',
  'Белая база под колеровку',
  'Фасовка 1 · 5 · 9 л'
]
</script>

<template>
  <section class="hero section" aria-labelledby="hero-title">
    <div class="motion-field" aria-hidden="true">
      <span class="motion-drop motion-drop-1" />
      <span class="motion-drop motion-drop-2" />
      <span class="motion-line motion-line-1" />
    </div>

    <div class="container hero-grid">
      <div class="hero-content reveal-up">
        <p class="eyebrow">{{ product.brand }} · продажа краски</p>
        <h1 id="hero-title" class="kinetic-title" aria-label="Краска ELASTIC PRO для внутренних и наружных работ">
          <span>ELASTIC</span>
          <span>PRO</span>
          <em>для стен, потолков и фасадов</em>
        </h1>
        <p class="hero-lead hero-lead--sales">
          Белая матовая эластичная краска для внутренних и наружных работ. Подходит для продажи частным клиентам и на объекты: можно рассчитать объем, выбрать фасовку 1 / 5 / 9 л и оставить заявку на покупку за пару кликов.
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

      <div class="hero-card room-card hero-card--framed reveal-up reveal-delay-1" aria-label="Интерьерная сцена ELASTIC PRO">
        <div class="hero-room hero-room--sales room-stage room-stage--sales room-stage--hero" style="--wall: #d7d0c4; --wall-shadow: #b9b09f;">
          <div class="room-back-wall" />
          <div class="room-side-wall" />
          <div class="room-floor" :style="{ backgroundImage: `url(${props.asset(product.room.floor)})` }" />
          <img class="hero-outlet hero-outlet-left" :src="props.asset('/img/outlet.png')" width="96" height="96" alt="Розетка на стене" loading="eager">
          <img class="hero-outlet hero-outlet-right" :src="props.asset('/img/outlet.png')" width="96" height="96" alt="Розетка на стене" loading="eager">
          <img class="hero-bed" :src="props.asset(product.room.bed)" width="1450" height="780" alt="Кровать в комнате" loading="eager" fetchpriority="high">
          <img class="hero-bucket" :src="props.asset(product.productImage)" width="485" height="514" alt="Банка краски ELASTIC PRO" loading="eager">
        </div>
        <div class="hero-product-label glass-card hero-product-label--sales">
          <div>
            <span>{{ product.name }}</span>
            <strong>белая матовая краска · можно колеровать · 1 / 5 / 9 л</strong>
          </div>
          <button class="btn btn-primary" type="button" @click="openOfferModal('hero-label')">Купить / оставить заявку</button>
        </div>
      </div>
    </div>
  </section>
</template>
