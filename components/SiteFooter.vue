<script setup lang="ts">
import { product } from '~/data/product'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner footer-inner--legal">
      <div class="footer-branding">
        <BrandLogo />
        <p>
          {{ product.name }} · {{ product.tagline }}. Информация на сайте носит рекламно-информационный характер. Перед покупкой уточняйте наличие, цену, условия поставки и актуальные документы у продавца.
        </p>
      </div>
      <nav class="footer-links" aria-label="Юридическая информация">
        <NuxtLink to="/privacy-policy">Политика конфиденциальности</NuxtLink>
        <NuxtLink to="/consent-processing">Согласие на обработку данных</NuxtLink>
        <a href="#documents">Документы</a>
        <a href="#contacts">Оставить заявку</a>
      </nav>
    </div>
  </footer>
</template>
