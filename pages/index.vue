<!--
  pages/index.vue
  Самодостаточная главная страница для Nuxt 3.

  Положите файлы в public/img:
  - vidtechnology-logo-transparent.webp
  - paint-bucket-black.webp
  - paint-pouring.webp

  Опционально задайте в .env:
  NUXT_PUBLIC_SITE_URL=https://ваш-домен.ru
  NUXT_PUBLIC_LEAD_ENDPOINT=https://ваш-api.ru/leads

  Если leadEndpoint не задан, форма откроет почтовый клиент с готовым письмом.
-->

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

type PaintVolume = 1 | 5 | 9
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

const config = useRuntimeConfig()
const baseURL = String(config.app.baseURL || config.public.baseURL || '/')
const normalizedBase = baseURL === '/' ? '' : baseURL.replace(/\/$/, '')
const asset = (path: string) => `${normalizedBase}${path.startsWith('/') ? path : `/${path}`}`

const configuredSiteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')
const siteUrl = configuredSiteUrl || undefined

const product = {
  brand: 'VIDTECHNOLOGY',
  name: 'ELASTIC PRO',
  category: 'Эластичная матовая краска',
  tagline: 'Белая матовая краска для идеальных стен и фасадов',
  phone: '+79851385850',
  phoneFormatted: '+7 (985) 138-58-50',
  email: 'Vidtechnology@mail.ru',
  coverage: 7,
  crackResistance: 'до 1 мм',
  volumes: [1, 5, 9] as PaintVolume[],
  logo: '/img/vidtechnology-logo-transparent.webp',
  productImage: '/img/paint-bucket-black.webp',
  applicationImage: '/img/paint-pouring.webp'
}

const title = 'ELASTIC PRO — эластичная матовая краска VIDTECHNOLOGY'
const description =
  'Белая эластичная матовая краска для стен, потолков и фасадов. Расход до 7 м² с 1 литра в два слоя, фасовки 1, 5 и 9 литров.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: siteUrl ? `${siteUrl}/` : undefined,
  ogImage: siteUrl ? `${siteUrl}${asset(product.productImage)}` : undefined,
  ogImageAlt: 'Черная банка эластичной краски ELASTIC PRO',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: siteUrl ? `${siteUrl}${asset(product.productImage)}` : undefined,
  robots: 'index, follow, max-image-preview:large'
})

useHead({
  htmlAttrs: { lang: 'ru' },
  link: [
    ...(siteUrl ? [{ rel: 'canonical', href: `${siteUrl}/` }] : []),
    {
      rel: 'preload',
      as: 'image',
      href: asset(product.productImage),
      fetchpriority: 'high'
    }
  ],
  meta: [
    { name: 'theme-color', content: '#070b10' },
    { name: 'color-scheme', content: 'dark' }
  ]
})

const navItems = [
  { label: 'Преимущества', id: 'advantages' },
  { label: 'Применение', id: 'application' },
  { label: 'Расчет', id: 'calculator' },
  { label: 'Как заказать', id: 'order' },
  { label: 'Вопросы', id: 'faq' },
  { label: 'Документы', id: 'documents' }
]

const heroMetrics = [
  { value: '7 м²', label: 'с 1 литра в два слоя' },
  { value: '1 мм', label: 'устойчивость к микротрещинам' },
  { value: '1 / 5 / 9 л', label: 'доступные фасовки' }
]

const quickFeatures = [
  {
    mark: '01',
    title: 'Быстро сохнет',
    text: 'Один слой — около 1 часа, полное высыхание — около 4 часов.'
  },
  {
    mark: '02',
    title: 'Моющаяся',
    text: 'Покрытие выдерживает регулярный уход и влажную уборку.'
  },
  {
    mark: '03',
    title: 'Внутри и снаружи',
    text: 'Подходит для стен, потолков, фасадов и подготовленных оснований.'
  },
  {
    mark: '04',
    title: 'Комфортная в работе',
    text: 'Наносится валиком, кистью или распылителем.'
  }
]

const useCases = [
  'Стены и потолки',
  'Спальня и гостиная',
  'Детская комната',
  'Кухня и коридор',
  'Санузел после подготовки',
  'Фасадные поверхности',
  'Беседки и террасы',
  'Ремонтные зоны со стыками',
  'Подготовленные основания',
  'Поверхности под мытье'
]

const advantages = [
  {
    index: '01',
    title: 'Трещиностойкая',
    text: 'Эластичное покрытие помогает скрывать небольшие дефекты и снижает риск проявления микротрещин.'
  },
  {
    index: '02',
    title: 'Расход понятен заранее',
    text: 'Один литр рассчитан примерно на 7 м² при нанесении в два слоя.'
  },
  {
    index: '03',
    title: 'Глубокий белый мат',
    text: 'Формирует спокойную ровную поверхность без лишнего блеска.'
  },
  {
    index: '04',
    title: 'Быстро сохнет',
    text: 'Следующий слой можно наносить примерно через 2 часа.'
  },
  {
    index: '05',
    title: 'Для ремонта внутри и снаружи',
    text: 'Подходит для минеральных, бетонных, оштукатуренных и других пористых оснований.'
  },
  {
    index: '06',
    title: 'Поверхность легко очищать',
    text: 'Готовое покрытие устойчиво к мытью с применением подходящих моющих средств.'
  }
]

const orderSteps = [
  {
    number: '01',
    title: 'Оставьте заявку',
    text: 'Укажите площадь, задачу ремонта и удобный способ связи.'
  },
  {
    number: '02',
    title: 'Получите расчет',
    text: 'Мы подберем объем, фасовки и ориентировочную стоимость.'
  },
  {
    number: '03',
    title: 'Согласуйте получение',
    text: 'Подтвердите заказ и выберите удобный способ доставки или самовывоза.'
  }
]

const documents = [
  {
    type: 'PPTX',
    title: 'Презентация ELASTIC PRO',
    text: 'Описание продукта, расход, нанесение и хранение.',
    href: '/docs/presentation-elastic-pro.pptx'
  },
  {
    type: 'PDF',
    title: 'Экспертное заключение',
    text: 'Публичная копия санитарно-эпидемиологической экспертизы.',
    href: '/docs/expert-conclusion-elastic-pro.pdf'
  },
  {
    type: 'PDF',
    title: 'Логотип VIDTECHNOLOGY',
    text: 'Исходный брендовый знак производителя.',
    href: '/docs/brand-logo.pdf'
  }
]

const faqs = [
  {
    question: 'Какого цвета ELASTIC PRO?',
    answer: 'Краска продается в белом матовом цвете.'
  },
  {
    question: 'Сколько краски нужно на 63 м²?',
    answer:
      'При расходе 1 литр на 7 м² в два слоя понадобится около 9 литров. Для пористого основания или сложной геометрии лучше добавить запас.'
  },
  {
    question: 'Подходит ли краска для фасада?',
    answer:
      'Да. Продукт предназначен для внутренних и наружных работ по правильно подготовленным минеральным, бетонным, оштукатуренным и другим пористым поверхностям.'
  },
  {
    question: 'Сколько сохнет покрытие?',
    answer:
      'При температуре около +20 °C один слой высыхает примерно за 1 час, повторное нанесение возможно ориентировочно через 2 часа, полное высыхание занимает около 4 часов.'
  },
  {
    question: 'Нужно ли грунтовать поверхность?',
    answer:
      'Да. Основание должно быть сухим, чистым и прочным. Перед окрашиванием рекомендуется использовать подходящий грунт глубокого проникновения.'
  },
  {
    question: 'Можно ли мыть окрашенную поверхность?',
    answer:
      'После полного формирования покрытия поверхность можно очищать с применением подходящих моющих средств.'
  }
]

const mobileMenuOpen = ref(false)
const leadModalOpen = ref(false)
const activeFaq = ref<number | null>(0)

const scrollToSection = (id: string) => {
  if (!import.meta.client) return
  mobileMenuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const openLeadModal = () => {
  leadModalOpen.value = true
}

const closeLeadModal = () => {
  leadModalOpen.value = false
}

watch([mobileMenuOpen, leadModalOpen], ([menuOpen, modalOpen]) => {
  if (!import.meta.client) return
  document.body.style.overflow = menuOpen || modalOpen ? 'hidden' : ''
})

const handleEscape = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return
  mobileMenuOpen.value = false
  leadModalOpen.value = false
}

/* ---------- Калькулятор ---------- */

const calculator = reactive({
  area: 63,
  coats: 2,
  reserve: 10,
  surface: 'smooth'
})

const surfaceFactors: Record<string, number> = {
  smooth: 1,
  porous: 1.12,
  textured: 1.18
}

const packagePrices: Record<PaintVolume, number> = {
  1: 1200,
  5: 5700,
  9: 9900
}

const rawLiters = computed(() => {
  const area = Math.max(0, Number(calculator.area) || 0)
  const coats = Math.max(1, Number(calculator.coats) || 1)
  const surfaceFactor = surfaceFactors[calculator.surface] || 1
  const reserveFactor = 1 + Math.max(0, Number(calculator.reserve) || 0) / 100

  return (area / product.coverage) * (coats / 2) * surfaceFactor * reserveFactor
})

const recommendedLiters = computed(() => Math.ceil(rawLiters.value))

const packagePlan = computed(() => {
  const need = recommendedLiters.value

  if (need <= 0) {
    return {
      total: 0,
      cost: 0,
      count: 0,
      items: [] as Array<{ volume: PaintVolume; count: number }>
    }
  }

  let best:
    | {
        total: number
        cost: number
        count: number
        excess: number
        items: Array<{ volume: PaintVolume; count: number }>
      }
    | undefined

  const maxNine = Math.ceil(need / 9) + 1
  const maxFive = Math.ceil(need / 5) + 2
  const maxOne = need + 5

  for (let n9 = 0; n9 <= maxNine; n9++) {
    for (let n5 = 0; n5 <= maxFive; n5++) {
      for (let n1 = 0; n1 <= maxOne; n1++) {
        const total = n9 * 9 + n5 * 5 + n1

        if (total < need || total === 0) continue

        const count = n9 + n5 + n1
        const excess = total - need
        const cost = n9 * packagePrices[9] + n5 * packagePrices[5] + n1 * packagePrices[1]

        const candidate = {
          total,
          cost,
          count,
          excess,
          items: [
            ...(n9 ? [{ volume: 9 as PaintVolume, count: n9 }] : []),
            ...(n5 ? [{ volume: 5 as PaintVolume, count: n5 }] : []),
            ...(n1 ? [{ volume: 1 as PaintVolume, count: n1 }] : [])
          ]
        }

        if (
          !best ||
          candidate.excess < best.excess ||
          (candidate.excess === best.excess && candidate.count < best.count) ||
          (candidate.excess === best.excess &&
            candidate.count === best.count &&
            candidate.cost < best.cost)
        ) {
          best = candidate
        }
      }
    }
  }

  return (
    best || {
      total: need,
      cost: need * packagePrices[1],
      count: need,
      items: [{ volume: 1 as PaintVolume, count: need }]
    }
  )
})

const packageLabel = computed(() => {
  if (!packagePlan.value.items.length) return '—'

  return packagePlan.value.items
    .map((item) => `${item.count} × ${item.volume} л`)
    .join(' + ')
})

const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(value)

/* ---------- Форма ---------- */

const lead = reactive({
  name: '',
  phone: '',
  comment: '',
  consent: false
})

const submitState = ref<SubmitState>('idle')
const submitMessage = ref('')

const resetLead = () => {
  lead.name = ''
  lead.phone = ''
  lead.comment = ''
  lead.consent = false
}

const submitLead = async () => {
  submitMessage.value = ''

  if (!lead.phone.trim()) {
    submitState.value = 'error'
    submitMessage.value = 'Укажите номер телефона.'
    return
  }

  if (!lead.consent) {
    submitState.value = 'error'
    submitMessage.value = 'Подтвердите согласие на обработку персональных данных.'
    return
  }

  submitState.value = 'loading'

  const payload = {
    name: lead.name.trim(),
    phone: lead.phone.trim(),
    comment: lead.comment.trim(),
    calculator: {
      area: calculator.area,
      coats: calculator.coats,
      reserve: calculator.reserve,
      surface: calculator.surface,
      recommendedLiters: recommendedLiters.value,
      packagePlan: packageLabel.value,
      estimatedCost: packagePlan.value.cost
    },
    source: 'elastic-pro-landing'
  }

  try {
    const endpoint = String(config.public.leadEndpoint || '').trim()

    if (endpoint) {
      await $fetch(endpoint, {
        method: 'POST',
        body: payload
      })

      submitState.value = 'success'
      submitMessage.value = 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.'
      resetLead()
      return
    }

    if (import.meta.client) {
      const subject = encodeURIComponent('Заявка с сайта ELASTIC PRO')
      const body = encodeURIComponent(
        [
          `Имя: ${payload.name || 'не указано'}`,
          `Телефон: ${payload.phone}`,
          `Комментарий: ${payload.comment || 'не указан'}`,
          '',
          `Площадь: ${payload.calculator.area} м²`,
          `Слоев: ${payload.calculator.coats}`,
          `Рекомендуемый объем: ${payload.calculator.recommendedLiters} л`,
          `Фасовки: ${payload.calculator.packagePlan}`,
          `Ориентировочная стоимость: ${formatPrice(payload.calculator.estimatedCost)}`
        ].join('\n')
      )

      window.location.href = `mailto:${product.email}?subject=${subject}&body=${body}`
      submitState.value = 'success'
      submitMessage.value = 'Открыт почтовый клиент с готовой заявкой.'
    }
  } catch {
    submitState.value = 'error'
    submitMessage.value = 'Не удалось отправить заявку. Позвоните нам или попробуйте еще раз.'
  }
}

/* ---------- Анимации появления ---------- */

let revealObserver: IntersectionObserver | undefined

onMounted(() => {
  window.addEventListener('keydown', handleEscape)

  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.12 }
  )

  elements.forEach((element) => revealObserver?.observe(element))
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  revealObserver?.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="ep-site">
    <header class="site-header">
      <div class="container header-inner">
        <NuxtLink class="brand" to="/" aria-label="ELASTIC PRO — главная">
          <img
            class="brand__logo"
            :src="asset(product.logo)"
            width="196"
            height="76"
            alt="VIDTECHNOLOGY"
          >
        </NuxtLink>

        <nav class="desktop-nav" aria-label="Основная навигация">
          <button
            v-for="item in navItems"
            :key="item.id"
            class="desktop-nav__link"
            type="button"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </button>
        </nav>

        <div class="header-contact">
          <a class="header-contact__phone" :href="`tel:${product.phone}`">
            {{ product.phoneFormatted }}
          </a>
          <span>Ежедневно 09:00–20:00</span>
        </div>

        <button class="button button--small header-cta" type="button" @click="openLeadModal">
          Получить консультацию
        </button>

        <button
          class="menu-button"
          type="button"
          :aria-expanded="mobileMenuOpen"
          aria-label="Открыть меню"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span />
          <span />
        </button>
      </div>
    </header>

    <Transition name="menu">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu__head">
          <img :src="asset(product.logo)" width="170" height="66" alt="VIDTECHNOLOGY">
          <button type="button" aria-label="Закрыть меню" @click="mobileMenuOpen = false">×</button>
        </div>

        <nav aria-label="Мобильная навигация">
          <button
            v-for="item in navItems"
            :key="item.id"
            type="button"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </button>
        </nav>

        <a class="mobile-menu__phone" :href="`tel:${product.phone}`">
          {{ product.phoneFormatted }}
        </a>

        <button class="button" type="button" @click="openLeadModal">
          Получить консультацию
        </button>
      </div>
    </Transition>

    <main>
      <section class="hero">
        <div class="hero__glow hero__glow--one" />
        <div class="hero__glow hero__glow--two" />

        <div class="container hero__grid">
          <div class="hero__content" data-reveal>
            <p class="eyebrow">{{ product.category }}</p>

            <h1 class="hero__title">
              <span>ELASTIC</span>
              <strong>PRO</strong>
            </h1>

            <p class="hero__subtitle">{{ product.tagline }}</p>

            <div class="hero-metrics">
              <div v-for="metric in heroMetrics" :key="metric.value" class="hero-metric">
                <strong>{{ metric.value }}</strong>
                <span>{{ metric.label }}</span>
              </div>
            </div>

            <div class="hero__actions">
              <button class="button" type="button" @click="scrollToSection('calculator')">
                Рассчитать количество
              </button>
              <button class="button button--ghost" type="button" @click="openLeadModal">
                Получить консультацию
              </button>
            </div>
          </div>

          <div class="hero-product" data-reveal>
            <div class="hero-product__halo" />
            <div class="hero-product__label">Новое оформление</div>

            <img
              :src="asset(product.productImage)"
              width="1170"
              height="1157"
              alt="Черная банка эластичной краски ELASTIC PRO"
              fetchpriority="high"
            >

            <div class="hero-product__floor" />
          </div>
        </div>

        <div class="container quick-features" data-reveal>
          <article v-for="item in quickFeatures" :key="item.title" class="quick-feature">
            <span class="quick-feature__mark">{{ item.mark }}</span>
            <div>
              <h2>{{ item.title }}</h2>
              <p>{{ item.text }}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="calculator" class="section calculator-section">
        <div class="container">
          <div class="section-heading section-heading--split" data-reveal>
            <div>
              <p class="eyebrow">Точный расчет</p>
              <h2>Сколько краски потребуется</h2>
            </div>
            <p>
              Укажите площадь и параметры поверхности. Калькулятор подберет объем,
              сочетание фасовок и ориентировочную стоимость.
            </p>
          </div>

          <div class="calculator-layout">
            <div class="calculator-panel" data-reveal>
              <div class="field field--wide">
                <label for="area">Площадь поверхности</label>
                <div class="input-with-unit">
                  <input
                    id="area"
                    v-model.number="calculator.area"
                    type="number"
                    min="1"
                    inputmode="decimal"
                  >
                  <span>м²</span>
                </div>
              </div>

              <div class="field">
                <label for="coats">Количество слоев</label>
                <select id="coats" v-model.number="calculator.coats">
                  <option :value="1">1 слой</option>
                  <option :value="2">2 слоя</option>
                  <option :value="3">3 слоя</option>
                </select>
              </div>

              <div class="field">
                <label for="reserve">Запас</label>
                <select id="reserve" v-model.number="calculator.reserve">
                  <option :value="0">Без запаса</option>
                  <option :value="10">10%</option>
                  <option :value="15">15%</option>
                </select>
              </div>

              <div class="field field--wide">
                <label for="surface">Тип поверхности</label>
                <select id="surface" v-model="calculator.surface">
                  <option value="smooth">Ровная подготовленная</option>
                  <option value="porous">Пористая</option>
                  <option value="textured">Фактурная или сложная</option>
                </select>
              </div>

              <p class="calculator-panel__note">
                Расчет ориентировочный. Фактический расход зависит от впитываемости,
                рельефа основания и инструмента.
              </p>
            </div>

            <div class="calculator-result" data-reveal>
              <p>Рекомендуемый объем</p>
              <strong>{{ recommendedLiters }} <small>литров</small></strong>

              <dl>
                <div>
                  <dt>Подходящая фасовка</dt>
                  <dd>{{ packageLabel }}</dd>
                </div>
                <div>
                  <dt>Общий объем покупки</dt>
                  <dd>{{ packagePlan.total }} л</dd>
                </div>
                <div>
                  <dt>Ориентировочная стоимость</dt>
                  <dd class="price">{{ formatPrice(packagePlan.cost) }}</dd>
                </div>
              </dl>

              <button class="button button--full" type="button" @click="openLeadModal">
                Отправить расчет
              </button>
            </div>

            <figure class="calculator-photo" data-reveal>
              <img
                :src="asset(product.applicationImage)"
                width="721"
                height="1280"
                loading="lazy"
                alt="Белая краска ELASTIC PRO переливается из черной банки"
              >
              <figcaption>
                <span>Плотная однородная консистенция</span>
                <strong>Белый глубокий мат</strong>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="application" class="section application-section">
        <div class="container application-grid">
          <div data-reveal>
            <div class="section-heading">
              <p class="eyebrow">Где применяется</p>
              <h2>Один материал — разные задачи</h2>
            </div>

            <div class="use-grid">
              <div v-for="(item, index) in useCases" :key="item" class="use-card">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <strong>{{ item }}</strong>
              </div>
            </div>
          </div>

          <aside class="material-note" data-reveal>
            <p class="eyebrow">Материал в работе</p>
            <h3>Плотная, пластичная, укрывистая</h3>
            <p>
              Краска готова к нанесению после тщательного перемешивания. Для первого
              слоя способ разбавления следует выбирать по технической документации и
              состоянию основания.
            </p>

            <ul>
              <li>Кисть с синтетическим ворсом</li>
              <li>Валик для водно-дисперсионных красок</li>
              <li>Подходящий распылитель</li>
            </ul>

            <button class="text-link" type="button" @click="scrollToSection('documents')">
              Смотреть документы
              <span>↗</span>
            </button>
          </aside>
        </div>
      </section>

      <section id="advantages" class="section advantages-section">
        <div class="container">
          <div class="section-heading section-heading--split" data-reveal>
            <div>
              <p class="eyebrow">Преимущества</p>
              <h2>Практичные свойства без лишних обещаний</h2>
            </div>
            <p>
              Характеристики сформулированы так, чтобы покупатель сразу понимал,
              что именно получает и в каких условиях материал работает лучше всего.
            </p>
          </div>

          <div class="advantages-grid">
            <article
              v-for="item in advantages"
              :key="item.index"
              class="advantage-card"
              data-reveal
            >
              <span>{{ item.index }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="order" class="section order-section">
        <div class="container order-layout">
          <div class="order-intro" data-reveal>
            <p class="eyebrow">Как мы работаем</p>
            <h2>От расчета до получения заказа</h2>
            <p>
              Сначала уточним задачу и основание, затем предложим подходящую комбинацию
              фасовок. Без давления и навязанных объемов.
            </p>
            <button class="button" type="button" @click="openLeadModal">
              Обсудить задачу
            </button>
          </div>

          <div class="order-steps">
            <article v-for="step in orderSteps" :key="step.number" data-reveal>
              <span>{{ step.number }}</span>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="documents" class="section documents-section">
        <div class="container">
          <div class="section-heading section-heading--split" data-reveal>
            <div>
              <p class="eyebrow">Документы</p>
              <h2>Материалы о продукте</h2>
            </div>
            <p>
              Презентация, заключение и исходный фирменный знак доступны для просмотра
              и скачивания.
            </p>
          </div>

          <div class="documents-grid">
            <a
              v-for="document in documents"
              :key="document.title"
              class="document-card"
              :href="asset(document.href)"
              target="_blank"
              rel="noopener"
              data-reveal
            >
              <span class="document-card__type">{{ document.type }}</span>
              <div>
                <h3>{{ document.title }}</h3>
                <p>{{ document.text }}</p>
              </div>
              <span class="document-card__arrow">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section id="faq" class="section faq-section">
        <div class="container faq-layout">
          <div class="faq-intro" data-reveal>
            <p class="eyebrow">Вопросы и ответы</p>
            <h2>Главное перед покупкой</h2>
            <p>
              Не нашли нужной информации — позвоните или отправьте вопрос через форму.
            </p>
            <a class="faq-intro__phone" :href="`tel:${product.phone}`">
              {{ product.phoneFormatted }}
            </a>
          </div>

          <div class="faq-list" data-reveal>
            <article
              v-for="(item, index) in faqs"
              :key="item.question"
              class="faq-item"
              :class="{ 'is-open': activeFaq === index }"
            >
              <button
                type="button"
                :aria-expanded="activeFaq === index"
                @click="activeFaq = activeFaq === index ? null : index"
              >
                <span>{{ item.question }}</span>
                <i>{{ activeFaq === index ? '−' : '+' }}</i>
              </button>

              <Transition name="faq">
                <div v-if="activeFaq === index" class="faq-item__answer">
                  <p>{{ item.answer }}</p>
                </div>
              </Transition>
            </article>
          </div>
        </div>
      </section>

      <section class="section contact-section">
        <div class="container contact-card" data-reveal>
          <div class="contact-card__copy">
            <p class="eyebrow">Нужна консультация?</p>
            <h2>Поможем подобрать объем под вашу задачу</h2>
            <p>
              Оставьте номер телефона. Можно сразу указать площадь, тип поверхности и
              планируемое количество слоев.
            </p>

            <div class="contact-card__details">
              <a :href="`tel:${product.phone}`">{{ product.phoneFormatted }}</a>
              <a :href="`mailto:${product.email}`">{{ product.email }}</a>
            </div>
          </div>

          <form class="lead-form" @submit.prevent="submitLead">
            <div class="lead-form__row">
              <div class="field">
                <label for="lead-name">Имя</label>
                <input
                  id="lead-name"
                  v-model="lead.name"
                  type="text"
                  autocomplete="name"
                  placeholder="Как к вам обращаться"
                >
              </div>

              <div class="field">
                <label for="lead-phone">Телефон *</label>
                <input
                  id="lead-phone"
                  v-model="lead.phone"
                  type="tel"
                  autocomplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  required
                >
              </div>
            </div>

            <div class="field">
              <label for="lead-comment">Комментарий</label>
              <textarea
                id="lead-comment"
                v-model="lead.comment"
                rows="3"
                placeholder="Например: стены, 63 м², два слоя"
              />
            </div>

            <label class="consent">
              <input v-model="lead.consent" type="checkbox" required>
              <span>
                Я даю
                <NuxtLink to="/consent-processing" target="_blank">
                  согласие на обработку персональных данных
                </NuxtLink>
                и ознакомлен с
                <NuxtLink to="/privacy-policy" target="_blank">
                  политикой конфиденциальности
                </NuxtLink>.
              </span>
            </label>

            <button
              class="button button--full"
              type="submit"
              :disabled="submitState === 'loading'"
            >
              {{ submitState === 'loading' ? 'Отправляем…' : 'Перезвоните мне' }}
            </button>

            <p
              v-if="submitMessage"
              class="form-message"
              :class="{ 'form-message--error': submitState === 'error' }"
              role="status"
            >
              {{ submitMessage }}
            </p>
          </form>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-main">
        <div>
          <img
            class="footer-logo"
            :src="asset(product.logo)"
            width="180"
            height="70"
            alt="VIDTECHNOLOGY"
          >
          <p>Эластичные лакокрасочные материалы для частных и профессиональных задач.</p>
        </div>

        <div class="footer-nav">
          <button
            v-for="item in navItems"
            :key="item.id"
            type="button"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </button>
        </div>

        <div class="footer-contact">
          <a :href="`tel:${product.phone}`">{{ product.phoneFormatted }}</a>
          <a :href="`mailto:${product.email}`">{{ product.email }}</a>
          <span>Ежедневно 09:00–20:00</span>
        </div>
      </div>

      <div class="container footer-bottom">
        <span>© {{ new Date().getFullYear() }} VIDTECHNOLOGY</span>
        <div>
          <NuxtLink to="/privacy-policy">Политика конфиденциальности</NuxtLink>
          <NuxtLink to="/consent-processing">Согласие на обработку данных</NuxtLink>
        </div>
      </div>
    </footer>

    <button class="mobile-sticky-cta" type="button" @click="openLeadModal">
      Получить расчет
    </button>

    <Transition name="modal">
      <div
        v-if="leadModalOpen"
        class="modal-backdrop"
        role="presentation"
        @mousedown.self="closeLeadModal"
      >
        <section
          class="lead-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <button
            class="lead-modal__close"
            type="button"
            aria-label="Закрыть"
            @click="closeLeadModal"
          >
            ×
          </button>

          <p class="eyebrow">Консультация</p>
          <h2 id="lead-modal-title">Расскажите о вашей задаче</h2>
          <p class="lead-modal__intro">
            Мы уже добавили в заявку расчет: {{ recommendedLiters }} л,
            {{ packageLabel }}.
          </p>

          <form class="lead-form" @submit.prevent="submitLead">
            <div class="field">
              <label for="modal-name">Имя</label>
              <input
                id="modal-name"
                v-model="lead.name"
                type="text"
                autocomplete="name"
                placeholder="Как к вам обращаться"
              >
            </div>

            <div class="field">
              <label for="modal-phone">Телефон *</label>
              <input
                id="modal-phone"
                v-model="lead.phone"
                type="tel"
                autocomplete="tel"
                placeholder="+7 (___) ___-__-__"
                required
              >
            </div>

            <div class="field">
              <label for="modal-comment">Комментарий</label>
              <textarea
                id="modal-comment"
                v-model="lead.comment"
                rows="3"
                placeholder="Что планируете окрашивать?"
              />
            </div>

            <label class="consent">
              <input v-model="lead.consent" type="checkbox" required>
              <span>
                Согласен на
                <NuxtLink to="/consent-processing" target="_blank">
                  обработку персональных данных
                </NuxtLink>.
              </span>
            </label>

            <button
              class="button button--full"
              type="submit"
              :disabled="submitState === 'loading'"
            >
              {{ submitState === 'loading' ? 'Отправляем…' : 'Отправить заявку' }}
            </button>

            <p
              v-if="submitMessage"
              class="form-message"
              :class="{ 'form-message--error': submitState === 'error' }"
              role="status"
            >
              {{ submitMessage }}
            </p>
          </form>
        </section>
      </div>
    </Transition>
  </div>
</template>

<style>
:root {
  --ep-bg: #070b10;
  --ep-bg-soft: #0d131a;
  --ep-surface: #121920;
  --ep-surface-2: #171f27;
  --ep-line: rgba(255, 255, 255, 0.11);
  --ep-line-strong: rgba(255, 255, 255, 0.2);
  --ep-text: #f4f5f6;
  --ep-muted: #9ea7b0;
  --ep-accent: #f28722;
  --ep-accent-bright: #ff9c38;
  --ep-blue: #173d69;
  --ep-danger: #ff7777;
  --ep-radius-lg: 34px;
  --ep-radius-md: 22px;
  --ep-radius-sm: 14px;
  --ep-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  --ep-container: 1240px;
}

html {
  scroll-behavior: smooth;
  background: var(--ep-bg);
}

body {
  margin: 0;
  background: var(--ep-bg);
  color: var(--ep-text);
  font-family:
    Inter, Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  text-rendering: optimizeLegibility;
}

body,
button,
input,
select,
textarea {
  font: inherit;
}

button,
a,
input,
select,
textarea {
  -webkit-tap-highlight-color: transparent;
}

button,
a {
  color: inherit;
}

button {
  border: 0;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
}

* {
  box-sizing: border-box;
}

::selection {
  color: #111;
  background: var(--ep-accent-bright);
}

:focus-visible {
  outline: 3px solid var(--ep-accent-bright);
  outline-offset: 4px;
}

.ep-site {
  min-width: 320px;
  overflow: clip;
  background:
    radial-gradient(circle at 80% 8%, rgba(19, 58, 104, 0.24), transparent 25rem),
    var(--ep-bg);
  color: var(--ep-text);
}

.container {
  width: min(calc(100% - 40px), var(--ep-container));
  margin-inline: auto;
}

.section {
  position: relative;
  padding: 118px 0;
  scroll-margin-top: 84px;
}

.eyebrow {
  margin: 0 0 20px;
  color: #a9c3dc;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  line-height: 1.3;
  text-transform: uppercase;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 52px;
}

.section-heading--split {
  display: grid;
  max-width: none;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  align-items: end;
  gap: 80px;
}

.section-heading h2,
.order-intro h2,
.faq-intro h2,
.contact-card h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(42px, 5vw, 72px);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.98;
}

.section-heading > p,
.section-heading--split > p,
.order-intro > p,
.faq-intro > p,
.contact-card__copy > p {
  margin: 0;
  color: var(--ep-muted);
  font-size: 17px;
  line-height: 1.75;
}

/* Header */

.site-header {
  position: absolute;
  z-index: 30;
  top: 0;
  right: 0;
  left: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(to bottom, rgba(4, 7, 10, 0.94), rgba(4, 7, 10, 0.38));
  backdrop-filter: blur(18px);
}

.header-inner {
  display: flex;
  min-height: 92px;
  align-items: center;
  gap: 28px;
}

.brand {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
}

.brand__logo {
  display: block;
  width: 158px;
  height: 62px;
  object-fit: contain;
}

.desktop-nav {
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 25px;
}

.desktop-nav__link,
.footer-nav button {
  padding: 7px 0;
  border: 0;
  background: transparent;
  color: #c6cbd0;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0.04em;
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.desktop-nav__link:hover,
.footer-nav button:hover {
  color: #fff;
  transform: translateY(-1px);
}

.header-contact {
  display: flex;
  min-width: 152px;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.header-contact__phone {
  font-size: 14px;
  font-weight: 700;
}

.header-contact span {
  color: #808890;
  font-size: 10px;
}

.button {
  display: inline-flex;
  min-height: 54px;
  align-items: center;
  justify-content: center;
  padding: 0 26px;
  border: 1px solid transparent;
  border-radius: 10px;
  background:
    linear-gradient(135deg, var(--ep-accent-bright), #e56f0b);
  box-shadow: 0 14px 34px rgba(236, 118, 17, 0.2);
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.035em;
  text-align: center;
  text-transform: uppercase;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    filter 180ms ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 44px rgba(236, 118, 17, 0.3);
  filter: brightness(1.05);
}

.button:disabled {
  cursor: wait;
  opacity: 0.65;
  transform: none;
}

.button--small {
  min-height: 46px;
  padding-inline: 21px;
  font-size: 11px;
}

.button--ghost {
  border-color: var(--ep-line-strong);
  background: rgba(255, 255, 255, 0.025);
  box-shadow: none;
  color: #d7dce0;
}

.button--ghost:hover {
  border-color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: none;
}

.button--full {
  width: 100%;
}

.menu-button {
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  cursor: pointer;
}

.menu-button span {
  width: 18px;
  height: 1px;
  background: #fff;
}

/* Hero */

.hero {
  position: relative;
  min-height: 100vh;
  padding: 158px 0 42px;
  overflow: hidden;
  border-bottom: 1px solid var(--ep-line);
  background:
    linear-gradient(110deg, rgba(7, 11, 16, 1) 0%, rgba(7, 11, 16, 0.93) 42%, rgba(6, 13, 22, 0.7) 100%);
}

.hero::before {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
  background-size: 72px 72px;
  content: "";
  mask-image: linear-gradient(to bottom, #000, transparent 82%);
  pointer-events: none;
}

.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}

.hero__glow--one {
  top: 15%;
  right: 9%;
  width: 430px;
  height: 430px;
  background: rgba(22, 72, 130, 0.38);
}

.hero__glow--two {
  right: 34%;
  bottom: 11%;
  width: 220px;
  height: 220px;
  background: rgba(242, 135, 34, 0.1);
}

.hero__grid {
  position: relative;
  z-index: 2;
  display: grid;
  min-height: 620px;
  grid-template-columns: minmax(0, 0.88fr) minmax(440px, 1.12fr);
  align-items: center;
  gap: 24px;
}

.hero__content {
  max-width: 620px;
}

.hero__title {
  display: flex;
  margin: 0;
  flex-direction: column;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(78px, 9vw, 136px);
  font-weight: 400;
  letter-spacing: -0.07em;
  line-height: 0.73;
}

.hero__title span {
  color: #fff;
}

.hero__title strong {
  margin-top: 0.18em;
  color: var(--ep-accent);
  font-weight: 400;
}

.hero__subtitle {
  max-width: 430px;
  margin: 42px 0 0;
  color: #d5dade;
  font-size: clamp(20px, 2vw, 28px);
  line-height: 1.35;
}

.hero-metrics {
  display: grid;
  margin-top: 44px;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

.hero-metric {
  min-height: 80px;
  padding: 0 22px;
  border-left: 1px solid var(--ep-line-strong);
}

.hero-metric:first-child {
  padding-left: 0;
  border-left: 0;
}

.hero-metric strong,
.hero-metric span {
  display: block;
}

.hero-metric strong {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

.hero-metric span {
  max-width: 130px;
  margin-top: 7px;
  color: var(--ep-muted);
  font-size: 12px;
  line-height: 1.45;
}

.hero__actions {
  display: flex;
  margin-top: 38px;
  flex-wrap: wrap;
  gap: 14px;
}

.hero-product {
  position: relative;
  display: flex;
  min-height: 610px;
  align-items: center;
  justify-content: center;
  isolation: isolate;
}

.hero-product__halo {
  position: absolute;
  z-index: -2;
  width: 85%;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(37, 91, 153, 0.46), rgba(8, 19, 32, 0.1) 58%, transparent 72%);
  filter: blur(12px);
}

.hero-product img {
  position: relative;
  z-index: 2;
  display: block;
  width: min(100%, 690px);
  max-height: 600px;
  object-fit: contain;
  filter: drop-shadow(0 38px 55px rgba(0, 0, 0, 0.62));
  transform: translateY(8px);
}

.hero-product__label {
  position: absolute;
  z-index: 3;
  top: 13%;
  right: 3%;
  padding: 9px 14px;
  border: 1px solid var(--ep-line-strong);
  border-radius: 100px;
  background: rgba(7, 11, 16, 0.55);
  color: #c4ccd4;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
}

.hero-product__floor {
  position: absolute;
  z-index: -1;
  right: 4%;
  bottom: 8%;
  left: 4%;
  height: 19%;
  border-radius: 50%;
  background: rgba(16, 25, 34, 0.95);
  box-shadow:
    0 0 80px rgba(54, 105, 164, 0.14),
    inset 0 1px rgba(255, 255, 255, 0.08);
  transform: perspective(500px) rotateX(65deg);
}

.quick-features {
  position: relative;
  z-index: 3;
  display: grid;
  margin-top: 12px;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--ep-line);
  border-radius: 20px;
  background: rgba(12, 18, 25, 0.64);
  backdrop-filter: blur(18px);
}

.quick-feature {
  display: grid;
  min-height: 116px;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 22px;
  border-left: 1px solid var(--ep-line);
}

.quick-feature:first-child {
  border-left: 0;
}

.quick-feature__mark {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(242, 135, 34, 0.5);
  border-radius: 50%;
  color: var(--ep-accent);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 14px;
}

.quick-feature h2 {
  margin: 0 0 6px;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.quick-feature p {
  margin: 0;
  color: var(--ep-muted);
  font-size: 11px;
  line-height: 1.5;
}

/* Calculator */

.calculator-section {
  background:
    linear-gradient(180deg, #0c1218, #0a0f14);
}

.calculator-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(290px, 0.62fr) minmax(330px, 0.9fr);
  gap: 22px;
}

.calculator-panel,
.calculator-result {
  min-height: 520px;
  border: 1px solid var(--ep-line);
  border-radius: var(--ep-radius-md);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018));
  box-shadow: var(--ep-shadow);
}

.calculator-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: start;
  gap: 22px;
  padding: 34px;
}

.calculator-panel__note {
  margin: 4px 0 0;
  grid-column: 1 / -1;
  color: #76808a;
  font-size: 12px;
  line-height: 1.6;
}

.field {
  min-width: 0;
}

.field--wide {
  grid-column: 1 / -1;
}

.field label {
  display: block;
  margin-bottom: 10px;
  color: #aab2b9;
  font-size: 12px;
}

.field input,
.field select,
.field textarea {
  display: block;
  width: 100%;
  border: 1px solid var(--ep-line-strong);
  border-radius: 10px;
  outline: none;
  background: rgba(3, 7, 10, 0.46);
  color: #fff;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.field input,
.field select {
  min-height: 50px;
  padding: 0 15px;
}

.field textarea {
  min-height: 98px;
  padding: 14px 15px;
  resize: vertical;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #636d77;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: rgba(242, 135, 34, 0.75);
  box-shadow: 0 0 0 4px rgba(242, 135, 34, 0.08);
}

.field select {
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, #87919a 50%),
    linear-gradient(135deg, #87919a 50%, transparent 50%);
  background-position:
    calc(100% - 19px) 21px,
    calc(100% - 14px) 21px;
  background-repeat: no-repeat;
  background-size: 5px 5px;
}

.input-with-unit {
  position: relative;
}

.input-with-unit input {
  padding-right: 54px;
}

.input-with-unit span {
  position: absolute;
  top: 50%;
  right: 15px;
  color: #939da6;
  font-size: 13px;
  transform: translateY(-50%);
}

.calculator-result {
  display: flex;
  flex-direction: column;
  padding: 34px;
}

.calculator-result > p {
  margin: 0;
  color: var(--ep-muted);
  font-size: 13px;
}

.calculator-result > strong {
  display: block;
  margin-top: 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 62px;
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 1;
}

.calculator-result > strong small {
  font-family: inherit;
  font-size: 24px;
  font-weight: 400;
}

.calculator-result dl {
  margin: 34px 0;
}

.calculator-result dl > div {
  padding: 18px 0;
  border-top: 1px solid var(--ep-line);
}

.calculator-result dt {
  color: #7f8992;
  font-size: 11px;
}

.calculator-result dd {
  margin: 7px 0 0;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
}

.calculator-result dd.price {
  color: var(--ep-accent-bright);
  font-size: 28px;
}

.calculator-result .button {
  margin-top: auto;
}

.calculator-photo {
  position: relative;
  min-height: 520px;
  margin: 0;
  overflow: hidden;
  border-radius: var(--ep-radius-md);
  box-shadow: var(--ep-shadow);
}

.calculator-photo::after {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(5, 8, 12, 0.95), transparent 50%),
    linear-gradient(to right, rgba(6, 10, 14, 0.25), transparent);
  content: "";
}

.calculator-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.calculator-photo figcaption {
  position: absolute;
  z-index: 2;
  right: 28px;
  bottom: 26px;
  left: 28px;
}

.calculator-photo figcaption span,
.calculator-photo figcaption strong {
  display: block;
}

.calculator-photo figcaption span {
  color: #aeb6bd;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.calculator-photo figcaption strong {
  margin-top: 7px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 29px;
  font-weight: 400;
}

/* Application */

.application-section {
  border-top: 1px solid var(--ep-line);
  border-bottom: 1px solid var(--ep-line);
  background:
    radial-gradient(circle at 85% 50%, rgba(21, 61, 108, 0.2), transparent 26rem),
    #080d12;
}

.application-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(310px, 0.55fr);
  gap: 80px;
}

.use-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid var(--ep-line);
  border-left: 1px solid var(--ep-line);
}

.use-card {
  display: flex;
  min-height: 138px;
  flex-direction: column;
  justify-content: space-between;
  padding: 21px;
  border-right: 1px solid var(--ep-line);
  border-bottom: 1px solid var(--ep-line);
  background: rgba(255, 255, 255, 0.012);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.use-card:hover {
  z-index: 2;
  background: rgba(255, 255, 255, 0.045);
  transform: translateY(-3px);
}

.use-card span {
  color: var(--ep-accent);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 14px;
}

.use-card strong {
  max-width: 130px;
  font-size: 13px;
  line-height: 1.4;
}

.material-note {
  align-self: end;
  padding: 42px 0 12px;
}

.material-note h3 {
  max-width: 390px;
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 48px;
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1;
}

.material-note > p:not(.eyebrow) {
  margin: 28px 0 0;
  color: var(--ep-muted);
  line-height: 1.75;
}

.material-note ul {
  display: grid;
  margin: 30px 0;
  padding: 0;
  gap: 11px;
  list-style: none;
}

.material-note li {
  position: relative;
  padding-left: 21px;
  color: #d1d6da;
  font-size: 13px;
}

.material-note li::before {
  position: absolute;
  top: 0.58em;
  left: 0;
  width: 7px;
  height: 1px;
  background: var(--ep-accent);
  content: "";
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  background: transparent;
  color: var(--ep-accent-bright);
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
}

.text-link span {
  transition: transform 180ms ease;
}

.text-link:hover span {
  transform: translate(3px, -3px);
}

/* Advantages */

.advantages-section {
  background:
    linear-gradient(180deg, #0b1117, #080d12);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--ep-line);
  border-left: 1px solid var(--ep-line);
}

.advantage-card {
  min-height: 260px;
  padding: 34px;
  border-right: 1px solid var(--ep-line);
  border-bottom: 1px solid var(--ep-line);
  background: rgba(255, 255, 255, 0.012);
  transition: background 200ms ease;
}

.advantage-card:hover {
  background:
    linear-gradient(145deg, rgba(242, 135, 34, 0.06), rgba(255, 255, 255, 0.02));
}

.advantage-card > span {
  color: var(--ep-accent);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 17px;
}

.advantage-card h3 {
  margin: 60px 0 14px;
  font-size: 18px;
}

.advantage-card p {
  margin: 0;
  color: var(--ep-muted);
  font-size: 14px;
  line-height: 1.7;
}

/* Order */

.order-section {
  border-top: 1px solid var(--ep-line);
  border-bottom: 1px solid var(--ep-line);
  background:
    radial-gradient(circle at 15% 30%, rgba(33, 77, 125, 0.16), transparent 28rem),
    #090e13;
}

.order-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(420px, 1.18fr);
  gap: 110px;
}

.order-intro {
  position: sticky;
  top: 120px;
  align-self: start;
}

.order-intro > p {
  margin-top: 28px;
}

.order-intro .button {
  margin-top: 34px;
}

.order-steps {
  border-top: 1px solid var(--ep-line);
}

.order-steps article {
  display: grid;
  min-height: 180px;
  grid-template-columns: 88px 1fr;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid var(--ep-line);
}

.order-steps article > span {
  color: var(--ep-accent);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 42px;
}

.order-steps h3 {
  margin: 0 0 12px;
  font-size: 20px;
}

.order-steps p {
  max-width: 520px;
  margin: 0;
  color: var(--ep-muted);
  line-height: 1.7;
}

/* Documents */

.documents-section {
  background: #080d12;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.document-card {
  position: relative;
  display: flex;
  min-height: 245px;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  overflow: hidden;
  border: 1px solid var(--ep-line);
  border-radius: 18px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.012));
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
}

.document-card::before {
  position: absolute;
  top: -80px;
  right: -80px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(31, 80, 136, 0.18);
  content: "";
  filter: blur(20px);
}

.document-card:hover {
  border-color: rgba(242, 135, 34, 0.5);
  background:
    linear-gradient(145deg, rgba(242, 135, 34, 0.07), rgba(255, 255, 255, 0.018));
  transform: translateY(-5px);
}

.document-card__type {
  display: inline-flex;
  width: fit-content;
  padding: 7px 10px;
  border: 1px solid var(--ep-line-strong);
  border-radius: 7px;
  color: #acb5bd;
  font-size: 10px;
  letter-spacing: 0.12em;
}

.document-card h3 {
  max-width: 270px;
  margin: 0 0 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 27px;
  font-weight: 400;
  line-height: 1.1;
}

.document-card p {
  max-width: 300px;
  margin: 0;
  color: var(--ep-muted);
  font-size: 13px;
  line-height: 1.55;
}

.document-card__arrow {
  position: absolute;
  right: 24px;
  bottom: 24px;
  color: var(--ep-accent);
  font-size: 20px;
}

/* FAQ */

.faq-section {
  border-top: 1px solid var(--ep-line);
  background:
    linear-gradient(180deg, #0b1117, #080d12);
}

.faq-layout {
  display: grid;
  grid-template-columns: minmax(300px, 0.65fr) minmax(0, 1.35fr);
  gap: 100px;
}

.faq-intro {
  position: sticky;
  top: 120px;
  align-self: start;
}

.faq-intro > p {
  margin-top: 26px;
}

.faq-intro__phone {
  display: inline-block;
  margin-top: 30px;
  color: var(--ep-accent-bright);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
}

.faq-list {
  border-top: 1px solid var(--ep-line);
}

.faq-item {
  border-bottom: 1px solid var(--ep-line);
}

.faq-item > button {
  display: grid;
  width: 100%;
  min-height: 94px;
  grid-template-columns: 1fr 44px;
  align-items: center;
  gap: 24px;
  padding: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  text-align: left;
}

.faq-item > button span {
  font-size: 18px;
}

.faq-item > button i {
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ep-line-strong);
  border-radius: 50%;
  color: var(--ep-accent);
  font-size: 21px;
  font-style: normal;
  font-weight: 300;
  transition:
    border-color 180ms ease,
    background 180ms ease;
}

.faq-item.is-open > button i {
  border-color: rgba(242, 135, 34, 0.5);
  background: rgba(242, 135, 34, 0.08);
}

.faq-item__answer {
  overflow: hidden;
}

.faq-item__answer p {
  max-width: 720px;
  margin: -8px 70px 30px 0;
  color: var(--ep-muted);
  line-height: 1.75;
}

/* Contact */

.contact-section {
  padding-top: 40px;
  background: #080d12;
}

.contact-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(420px, 0.85fr);
  gap: 90px;
  padding: 74px;
  border: 1px solid var(--ep-line);
  border-radius: var(--ep-radius-lg);
  background:
    radial-gradient(circle at 18% 30%, rgba(38, 88, 148, 0.22), transparent 25rem),
    linear-gradient(145deg, #101821, #0b1016);
  box-shadow: var(--ep-shadow);
}

.contact-card__copy > p {
  max-width: 580px;
  margin-top: 28px;
}

.contact-card__details {
  display: flex;
  margin-top: 34px;
  flex-wrap: wrap;
  gap: 12px 28px;
}

.contact-card__details a {
  color: #dce1e4;
  font-size: 14px;
  font-weight: 600;
}

.lead-form {
  display: grid;
  align-content: start;
  gap: 18px;
}

.lead-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.consent {
  display: grid;
  grid-template-columns: 18px 1fr;
  align-items: start;
  gap: 10px;
  color: #808b94;
  cursor: pointer;
  font-size: 11px;
  line-height: 1.55;
}

.consent input {
  width: 16px;
  height: 16px;
  margin: 1px 0 0;
  accent-color: var(--ep-accent);
}

.consent a {
  color: #b5bec6;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.form-message {
  margin: 0;
  color: #9ed1a7;
  font-size: 12px;
  line-height: 1.5;
}

.form-message--error {
  color: var(--ep-danger);
}

/* Footer */

.site-footer {
  padding: 80px 0 30px;
  border-top: 1px solid var(--ep-line);
  background: #05090d;
}

.footer-main {
  display: grid;
  grid-template-columns: minmax(240px, 1.2fr) 0.7fr 0.7fr;
  gap: 80px;
}

.footer-logo {
  width: 150px;
  height: 58px;
  object-fit: contain;
}

.footer-main > div:first-child p {
  max-width: 380px;
  margin: 18px 0 0;
  color: #78828a;
  font-size: 13px;
  line-height: 1.65;
}

.footer-nav,
.footer-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
}

.footer-contact a {
  font-size: 14px;
}

.footer-contact span {
  color: #707a83;
  font-size: 12px;
}

.footer-bottom {
  display: flex;
  margin-top: 62px;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding-top: 25px;
  border-top: 1px solid var(--ep-line);
  color: #6e7780;
  font-size: 11px;
}

.footer-bottom > div {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
}

.footer-bottom a:hover {
  color: #fff;
}

/* Mobile menu, modal, animations */

.mobile-menu {
  position: fixed;
  z-index: 90;
  inset: 0;
  display: flex;
  padding: 22px;
  flex-direction: column;
  background:
    radial-gradient(circle at 80% 10%, rgba(32, 81, 139, 0.3), transparent 20rem),
    rgba(5, 9, 13, 0.99);
}

.mobile-menu__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-menu__head img {
  width: 145px;
  height: 56px;
  object-fit: contain;
}

.mobile-menu__head button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  cursor: pointer;
  font-size: 28px;
  font-weight: 200;
}

.mobile-menu nav {
  display: flex;
  margin-top: 55px;
  flex-direction: column;
}

.mobile-menu nav button {
  padding: 16px 0;
  border-bottom: 1px solid var(--ep-line);
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 31px;
  text-align: left;
}

.mobile-menu__phone {
  margin: auto 0 20px;
  color: var(--ep-accent-bright);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 27px;
}

.mobile-sticky-cta {
  display: none;
}

.modal-backdrop {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  overflow-y: auto;
  padding: 24px;
  place-items: center;
  background: rgba(1, 3, 5, 0.82);
  backdrop-filter: blur(15px);
}

.lead-modal {
  position: relative;
  width: min(100%, 560px);
  padding: 46px;
  border: 1px solid var(--ep-line-strong);
  border-radius: 26px;
  background:
    radial-gradient(circle at 85% 10%, rgba(36, 83, 139, 0.22), transparent 18rem),
    #10171e;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.65);
}

.lead-modal__close {
  position: absolute;
  top: 17px;
  right: 17px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  cursor: pointer;
  font-size: 26px;
  font-weight: 200;
}

.lead-modal h2 {
  max-width: 430px;
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 46px;
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1;
}

.lead-modal__intro {
  margin: 18px 0 28px;
  color: var(--ep-muted);
  font-size: 14px;
  line-height: 1.65;
}

[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 700ms ease,
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

.menu-enter-active,
.menu-leave-active,
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.menu-enter-from,
.menu-leave-to,
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.menu-enter-from .mobile-menu,
.menu-leave-to .mobile-menu,
.modal-enter-from .lead-modal,
.modal-leave-to .lead-modal {
  transform: translateY(16px) scale(0.985);
}

.faq-enter-active,
.faq-leave-active {
  transition:
    opacity 200ms ease,
    max-height 250ms ease;
}

.faq-enter-from,
.faq-leave-to {
  max-height: 0;
  opacity: 0;
}

.faq-enter-to,
.faq-leave-from {
  max-height: 240px;
  opacity: 1;
}

@media (max-width: 1160px) {
  .desktop-nav {
    gap: 15px;
  }

  .desktop-nav__link {
    font-size: 10px;
  }

  .header-contact {
    display: none;
  }

  .hero__grid {
    grid-template-columns: minmax(0, 0.85fr) minmax(400px, 1.15fr);
  }

  .hero__title {
    font-size: clamp(74px, 9vw, 112px);
  }

  .quick-feature {
    padding: 18px;
  }

  .calculator-layout {
    grid-template-columns: 1fr 1fr;
  }

  .calculator-photo {
    min-height: 430px;
    grid-column: 1 / -1;
  }

  .application-grid {
    gap: 50px;
  }

  .use-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 920px) {
  .section {
    padding: 90px 0;
  }

  .desktop-nav,
  .header-cta {
    display: none;
  }

  .menu-button {
    display: flex;
    margin-left: auto;
  }

  .header-inner {
    min-height: 78px;
  }

  .hero {
    min-height: auto;
    padding-top: 126px;
  }

  .hero__grid {
    min-height: auto;
    grid-template-columns: 1fr;
  }

  .hero__content {
    max-width: 700px;
  }

  .hero-product {
    min-height: 520px;
  }

  .hero-product img {
    max-height: 530px;
  }

  .quick-features {
    grid-template-columns: 1fr 1fr;
  }

  .quick-feature:nth-child(3) {
    border-left: 0;
  }

  .quick-feature:nth-child(n + 3) {
    border-top: 1px solid var(--ep-line);
  }

  .section-heading--split,
  .application-grid,
  .order-layout,
  .faq-layout,
  .contact-card,
  .footer-main {
    grid-template-columns: 1fr;
  }

  .section-heading--split {
    gap: 25px;
  }

  .material-note {
    max-width: 620px;
  }

  .order-layout,
  .faq-layout,
  .contact-card {
    gap: 58px;
  }

  .order-intro,
  .faq-intro {
    position: static;
  }

  .advantages-grid {
    grid-template-columns: 1fr 1fr;
  }

  .documents-grid {
    grid-template-columns: 1fr;
  }

  .document-card {
    min-height: 205px;
  }

  .contact-card {
    padding: 54px;
  }

  .footer-main {
    gap: 42px;
  }

  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 680px) {
  .container {
    width: min(calc(100% - 28px), var(--ep-container));
  }

  .section {
    padding: 74px 0;
  }

  .site-header {
    position: absolute;
  }

  .brand__logo {
    width: 136px;
    height: 54px;
  }

  .hero {
    padding-top: 112px;
  }

  .hero__title {
    font-size: clamp(67px, 23vw, 96px);
  }

  .hero__subtitle {
    margin-top: 32px;
    font-size: 20px;
  }

  .hero-metrics {
    grid-template-columns: 1fr;
  }

  .hero-metric,
  .hero-metric:first-child {
    display: grid;
    min-height: auto;
    grid-template-columns: 100px 1fr;
    align-items: center;
    padding: 15px 0;
    border-top: 1px solid var(--ep-line);
    border-left: 0;
  }

  .hero-metric:last-child {
    border-bottom: 1px solid var(--ep-line);
  }

  .hero-metric span {
    max-width: none;
    margin-top: 0;
  }

  .hero__actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .hero-product {
    min-height: 390px;
  }

  .hero-product img {
    max-height: 410px;
  }

  .hero-product__label {
    top: 5%;
    right: 0;
  }

  .quick-features {
    grid-template-columns: 1fr;
  }

  .quick-feature,
  .quick-feature:nth-child(3) {
    border-top: 1px solid var(--ep-line);
    border-left: 0;
  }

  .quick-feature:first-child {
    border-top: 0;
  }

  .section-heading {
    margin-bottom: 38px;
  }

  .section-heading h2,
  .order-intro h2,
  .faq-intro h2,
  .contact-card h2 {
    font-size: 43px;
  }

  .calculator-layout {
    grid-template-columns: 1fr;
  }

  .calculator-panel,
  .calculator-result {
    min-height: auto;
    padding: 24px;
  }

  .calculator-panel {
    grid-template-columns: 1fr;
  }

  .field--wide,
  .calculator-panel__note {
    grid-column: auto;
  }

  .calculator-result > strong {
    font-size: 52px;
  }

  .calculator-photo {
    min-height: 430px;
    grid-column: auto;
  }

  .use-grid {
    grid-template-columns: 1fr 1fr;
  }

  .use-card {
    min-height: 122px;
    padding: 16px;
  }

  .material-note h3 {
    font-size: 40px;
  }

  .advantages-grid {
    grid-template-columns: 1fr;
  }

  .advantage-card {
    min-height: 220px;
    padding: 26px;
  }

  .advantage-card h3 {
    margin-top: 42px;
  }

  .order-steps article {
    min-height: 160px;
    grid-template-columns: 58px 1fr;
  }

  .order-steps article > span {
    font-size: 30px;
  }

  .faq-item > button {
    min-height: 88px;
  }

  .faq-item > button span {
    font-size: 16px;
  }

  .faq-item__answer p {
    margin-right: 0;
  }

  .contact-section {
    padding-top: 20px;
  }

  .contact-card {
    width: calc(100% - 20px);
    padding: 35px 22px;
    border-radius: 24px;
  }

  .lead-form__row {
    grid-template-columns: 1fr;
  }

  .lead-modal {
    padding: 38px 20px 24px;
  }

  .lead-modal h2 {
    padding-right: 30px;
    font-size: 39px;
  }

  .site-footer {
    padding-bottom: 92px;
  }

  .footer-bottom > div {
    flex-direction: column;
  }

  .mobile-sticky-cta {
    position: fixed;
    z-index: 45;
    right: 12px;
    bottom: 12px;
    left: 12px;
    display: block;
    min-height: 52px;
    border-radius: 10px;
    background:
      linear-gradient(135deg, var(--ep-accent-bright), #e56f0b);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.42);
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }

  [data-reveal] {
    opacity: 1;
    transform: none;
  }
}
</style>
