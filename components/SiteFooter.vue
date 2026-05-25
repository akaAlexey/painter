<script setup lang="ts">
import { product } from '~/data/product'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <BrandLogo />
      <p>
        {{ product.name }} · {{ product.tagline }}. Информация на сайте носит рекламно-информационный характер. Перед покупкой уточняйте наличие, цену, условия поставки и актуальные документы у продавца.
      </p>
    </div>
  </footer>
</template>
