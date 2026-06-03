<script setup lang="ts">
const props = defineProps<{ asset: (path: string) => string }>()
</script>

<template>
  <section id="interior" class="section interior-showcase" aria-labelledby="interior-title">
    <div class="container interior-grid">
      <div class="section-head reveal-up">
        <p class="eyebrow">В интерьере</p>
        <h2 id="interior-title">Белое матовое покрытие для аккуратного ремонта</h2>
        <p>
          ELASTIC PRO подходит для стен и потолков внутри помещений. Белый матовый цвет выглядит спокойно, не перегружает интерьер и помогает сохранить ощущение чистоты.
        </p>
        <div class="interior-points" aria-label="Преимущества покрытия в интерьере">
          <span>белый матовый цвет</span>
          <span>для стен и потолков</span>
          <span>моющаяся поверхность</span>
        </div>
      </div>

      <figure class="interior-photo-card glass-card reveal-up reveal-delay-1">
        <img
          :src="props.asset('/img/interior-kitchen.jpg')"
          width="1280"
          height="575"
          alt="Белые стены и потолок в жилом интерьере"
          loading="lazy"
        >
        <figcaption>
          Реальный пример светлого интерьера с белыми стенами и потолком
        </figcaption>
      </figure>
    </div>
  </section>
</template>
