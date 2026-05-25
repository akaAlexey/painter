<script setup lang="ts">
import { product } from '~/data/product'

const props = defineProps<{ asset: (path: string) => string }>()

const hue = ref(34)
const saturation = ref(44)
const lightness = ref(74)
const room = ref<'bedroom' | 'warm' | 'graphite'>('warm')
const selectedName = ref('Теплый беж')
const { setColor } = useLeadActions()

const wallColor = computed(() => `hsl(${hue.value} ${saturation.value}% ${lightness.value}%)`)
const shadowColor = computed(() => `hsl(${hue.value} ${Math.max(10, saturation.value - 16)}% ${Math.max(28, lightness.value - 18)}%)`)
const colorLabel = computed(() => `${selectedName.value} · ${hue.value}°/${saturation.value}%/${lightness.value}%`)

const presets = [
  { label: 'Молочный', hue: 42, saturation: 26, lightness: 86 },
  { label: 'Теплый беж', hue: 34, saturation: 44, lightness: 74 },
  { label: 'Серо-голубой', hue: 211, saturation: 32, lightness: 68 },
  { label: 'Оливковый', hue: 88, saturation: 25, lightness: 60 },
  { label: 'Пудровый', hue: 356, saturation: 34, lightness: 78 },
  { label: 'Графит', hue: 220, saturation: 12, lightness: 48 }
]

function applyPreset(preset: typeof presets[number]) {
  hue.value = preset.hue
  saturation.value = preset.saturation
  lightness.value = preset.lightness
  selectedName.value = preset.label
}

function applyMood(mood: typeof room.value) {
  room.value = mood
  if (mood === 'bedroom') applyPreset(presets[2])
  if (mood === 'warm') applyPreset(presets[1])
  if (mood === 'graphite') applyPreset(presets[5])
}

function sendColorToLead() {
  setColor({ label: selectedName.value, color: wallColor.value })
}
</script>

<template>
  <section id="visualizer" class="section visualizer" aria-labelledby="visualizer-title">
    <div class="container visualizer-grid">
      <div class="section-head visualizer-copy reveal-up">
        <p class="eyebrow">Колеровка</p>
        <h2 id="visualizer-title">Покажите клиенту возможный оттенок</h2>
        <p>
          ELASTIC PRO выпускается как белая матовая база. Подберите направление цвета и передайте оттенок в заявку одним кликом.
        </p>
        <p class="notice">
          Визуализация ориентировочная: итоговый результат зависит от выбранной колеровочной пасты, освещения и подготовки основания.
        </p>
      </div>

      <div class="visualizer-panel glass-card reveal-up reveal-delay-1">
        <div class="room-tabs" role="tablist" aria-label="Выбор настроения комнаты">
          <button :class="{ active: room === 'bedroom' }" type="button" @click="applyMood('bedroom')">Спокойный</button>
          <button :class="{ active: room === 'warm' }" type="button" @click="applyMood('warm')">Теплый</button>
          <button :class="{ active: room === 'graphite' }" type="button" @click="applyMood('graphite')">Графит</button>
        </div>

        <div class="room-stage realistic-room room-stage--sales" :class="`room-${room}`" :style="{ '--wall': wallColor, '--wall-shadow': shadowColor }">
          <div class="room-back-wall" />
          <div class="room-side-wall" />
          <div class="room-floor" :style="{ backgroundImage: `url(${props.asset(product.room.floor)})` }" />
          <img class="scene-outlet scene-outlet-left" :src="props.asset('/img/outlet.png')" width="96" height="96" alt="Розетка на стене" loading="lazy">
          <img class="scene-outlet scene-outlet-right" :src="props.asset('/img/outlet.png')" width="96" height="96" alt="Розетка на стене" loading="lazy">
          <img class="scene-bed" :src="props.asset(product.room.bed)" width="1450" height="780" alt="Кровать в комнате с окрашенной стеной" loading="lazy">
          <img class="scene-bucket" :src="props.asset(product.productImage)" width="485" height="514" alt="Банка краски ELASTIC PRO" loading="lazy">
        </div>

        <div class="preset-row preset-row-primary" aria-label="Готовые оттенки">
          <button
            v-for="preset in presets"
            :key="preset.label"
            :class="{ active: selectedName === preset.label }"
            type="button"
            @click="applyPreset(preset)"
          >
            {{ preset.label }}
          </button>
        </div>

        <details class="advanced-controls">
          <summary>Тонкая настройка цвета</summary>
          <div class="controls">
            <div class="range-row hue-row">
              <label for="hue">Оттенок</label>
              <input id="hue" v-model.number="hue" type="range" min="0" max="360" @input="selectedName = 'Свой оттенок'">
              <span>{{ hue }}°</span>
            </div>
            <div class="range-row">
              <label for="saturation">Насыщенность</label>
              <input id="saturation" v-model.number="saturation" type="range" min="8" max="90" @input="selectedName = 'Свой оттенок'">
              <span>{{ saturation }}%</span>
            </div>
            <div class="range-row">
              <label for="lightness">Светлота</label>
              <input id="lightness" v-model.number="lightness" type="range" min="40" max="88" @input="selectedName = 'Свой оттенок'">
              <span>{{ lightness }}%</span>
            </div>
          </div>
        </details>

        <div class="color-result color-result-v5">
          <span class="color-chip" :style="{ background: wallColor }" />
          <span>Выбранный оттенок: {{ colorLabel }}</span>
          <button class="btn btn-secondary color-cta" type="button" @click="sendColorToLead">Передать оттенок в заявку</button>
        </div>
      </div>
    </div>
  </section>
</template>
