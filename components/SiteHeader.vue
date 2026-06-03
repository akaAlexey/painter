<script setup lang="ts">
const links = [
  { href: '#contacts', label: 'Заявка' },
  { href: '#calculator', label: 'Расход' },
  { href: '#interior', label: 'Интерьер' },
  { href: '#faq', label: 'FAQ' },
  { href: '#documents', label: 'Документы' }
]
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <BrandLogo />
      <nav class="main-nav" aria-label="Основная навигация">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>
      <CopyPhoneButton class-name="header-copy" />
    </div>
  </header>
</template>
