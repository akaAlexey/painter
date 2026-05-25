<script setup lang="ts">
import { product } from '~/data/product'

type Combo = {
  total: number
  price: number
  cans: Record<number, number>
}

const area = ref(63)
const coats = ref(2)
const { setCalculation } = useLeadActions()

const requiredLiters = computed(() => {
  const normalizedArea = Number.isFinite(area.value) && area.value > 0 ? area.value : 0
  const normalizedCoats = Number.isFinite(coats.value) && coats.value > 0 ? coats.value : 2
  return normalizedArea / product.coveragePerLiterTwoCoats * (normalizedCoats / 2)
})

function formatNumber(value: number) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(value)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: product.currency, maximumFractionDigits: 0 }).format(value)
}

function findBestCombo(required: number): Combo {
  const limit = Math.ceil(required / 9) + 3
  let best: Combo | null = null

  for (let nine = 0; nine <= limit; nine += 1) {
    for (let five = 0; five <= limit * 2; five += 1) {
      for (let one = 0; one <= 8; one += 1) {
        const cans = { 1: one, 5: five, 9: nine }
        const total = cans[1] + cans[5] * 5 + cans[9] * 9
        if (total < required) continue
        const count = cans[1] + cans[5] + cans[9]
        const candidate = { total, price: total * product.pricePerLiter, cans }
        if (!best) {
          best = candidate
          continue
        }
        const bestCount = best.cans[1] + best.cans[5] + best.cans[9]
        const candidateOverage = candidate.total - required
        const bestOverage = best.total - required
        if (candidateOverage < bestOverage || (candidateOverage === bestOverage && count < bestCount)) {
          best = candidate
        }
      }
    }
  }

  if (best) return best
  return { total: 1, price: product.pricePerLiter, cans: { 1: 1, 5: 0, 9: 0 } }
}

const combo = computed(() => findBestCombo(requiredLiters.value))
const cansText = computed(() => {
  return Object.entries(combo.value.cans)
    .filter(([, count]) => count > 0)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([volume, count]) => `${count} × ${volume} л`)
    .join(' + ')
})

const reserveLiters = computed(() => Math.max(0, combo.value.total - requiredLiters.value))
const coverageText = computed(() => `${product.coveragePerLiterTwoCoats} м² в два слоя`)

function sendCalculationToLead() {
  setCalculation({
    area: area.value,
    coats: coats.value,
    requiredLiters: requiredLiters.value,
    totalLiters: combo.value.total,
    cansText: cansText.value,
    priceText: formatCurrency(combo.value.price)
  })
}
</script>

<template>
  <section id="calculator" class="section calculator" aria-labelledby="calculator-title">
    <div class="container calculator-grid">
      <div class="section-head reveal-up">
        <p class="eyebrow">Калькулятор расхода</p>
        <h2 id="calculator-title">Сразу видно, сколько литров покупать</h2>
        <p>
          Укажите площадь и число слоев. Калькулятор подберет фасовку 1, 5 и 9 литров, а затем одним кликом перенесет расчет в заявку.
        </p>
      </div>

      <div class="calculator-card glass-card reveal-up reveal-delay-1">
        <div class="calc-formula">
          <span>Расход</span>
          <strong>1 л / {{ coverageText }}</strong>
        </div>

        <div class="calc-inputs">
          <label>
            <span>Площадь поверхности, м²</span>
            <input v-model.number="area" type="number" min="1" max="10000" inputmode="decimal">
          </label>
          <label>
            <span>Количество слоев</span>
            <select v-model.number="coats">
              <option :value="1">1 слой</option>
              <option :value="2">2 слоя</option>
              <option :value="3">3 слоя</option>
            </select>
          </label>
        </div>

        <div class="calc-results calc-results-v5">
          <article class="calc-main-result">
            <span>К покупке</span>
            <strong>{{ cansText || '1 × 1 л' }}</strong>
            <small>{{ formatNumber(combo.total) }} л · {{ formatCurrency(combo.price) }}</small>
          </article>
          <article>
            <span>Минимум по расходу</span>
            <strong>{{ formatNumber(requiredLiters) }} л</strong>
          </article>
          <article>
            <span>Запас в наборе</span>
            <strong>{{ formatNumber(reserveLiters) }} л</strong>
          </article>
        </div>

        <button class="btn btn-primary calc-cta liquid-btn" type="button" @click="sendCalculationToLead">
          <span>Перенести расчет в заявку</span>
        </button>
      </div>
    </div>
  </section>
</template>
