<script setup lang="ts">
const config = useRuntimeConfig()
const baseURL = String(config.app?.baseURL || config.public.baseURL || '/')
const normalizedBase = baseURL === '/' ? '' : baseURL.replace(/\/$/, '')
const logoSrc = `${normalizedBase}/img/logo-source.png`
</script>

<template>
  <NuxtLink class="brand-logo brand-logo--image" to="/" aria-label="VIDTECHNOLOGY ELASTIC PRO">
    <img class="brand-image" :src="logoSrc" alt="VIDTECHNOLOGY" width="160" height="72">
    <span class="brand-copy">
      <span class="brand-name">VIDTECHNOLOGY</span>
      <span class="brand-product">ELASTIC PRO</span>
    </span>
  </NuxtLink>
</template>
