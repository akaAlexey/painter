<script setup lang="ts">
const { openOfferModal } = useSalesUiActions()
</script>

<template>
  <div class="sticky-cta" aria-label="Быстрые действия">
    <CopyPhoneButton class-name="sticky-copy-btn" />
    <button type="button" @click="openOfferModal('sticky')">Получить предложение</button>
  </div>
</template>
