<script setup lang="ts">
import { product } from '~/data/product'

const props = withDefaults(defineProps<{
  className?: string
  prefix?: string
}>(), {
  className: 'btn btn-secondary',
  prefix: ''
})

const copied = ref(false)

async function copyPhone() {
  try {
    const text = product.phoneFormatted
    if (process.client && navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else if (process.client) {
      const input = document.createElement('input')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 1800)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <button :class="props.className" type="button" @click="copyPhone">
    <span>{{ copied ? 'Номер скопирован' : `${props.prefix}${product.phoneFormatted} · скопировать` }}</span>
  </button>
</template>
