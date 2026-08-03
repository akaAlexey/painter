<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { product as productData } from '~/data/product'

type PaintVolume = 1 | 5 | 9

const config = useRuntimeConfig()
const baseURL = String(config.app.baseURL || config.public.baseURL || '/')
const normalizedBase = baseURL === '/' ? '' : baseURL.replace(/\/$/, '')
const asset = (path: string) => `${normalizedBase}${path.startsWith('/') ? path : `/${path}`}`

const configuredSiteUrl = String(config.public.siteUrl || 'https://elastic-pro.ru').replace(/\/$/, '')
const siteUrl = configuredSiteUrl || 'https://elastic-pro.ru'
const absoluteAsset = (path: string) => `${siteUrl}${asset(path)}`

const product = {
  ...productData,
  category: 'Эластичная матовая краска',
  tagline: 'Белое матовое покрытие для стен, потолков и фасадов',
  logo: '/img/logo-source.png',
  productImage: '/img/paint-bucket-v2.webp',
  productPhoto: '/img/paint-bucket-black.webp',
  applicationImage: '/img/paint-pouring.webp',
  interiorImage: '/img/interior-kitchen.jpg'
}

const title = 'ELASTIC PRO — белая эластичная матовая краска'
const description =
  'Белая эластичная матовая краска VIDTECHNOLOGY для стен, потолков и фасадов. Расход до 7 м² с литра в два слоя, фасовки 1, 5 и 9 литров.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: `${siteUrl}/`,
  ogImage: absoluteAsset(product.productPhoto),
  ogImageAlt: 'Черная банка белой матовой краски ELASTIC PRO',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: absoluteAsset(product.productPhoto),
  robots: 'index, follow, max-image-preview:large'
})

useHead({
  htmlAttrs: { lang: 'ru' },
  link: [
    { rel: 'canonical', href: `${siteUrl}/` },
    { rel: 'preload', as: 'image', href: asset(product.productImage), fetchpriority: 'high' }
  ],
  meta: [
    { name: 'theme-color', content: '#07090d' },
    { name: 'color-scheme', content: 'dark' }
  ]
})

const navItems = [
  { label: 'О продукте', id: 'product' },
  { label: 'Расчёт', id: 'calculator' },
  { label: 'Применение', id: 'application' },
  { label: 'Документы', id: 'documents' },
  { label: 'Вопросы', id: 'faq' }
]

const proofItems = [
  { value: '7 м²', label: 'с одного литра в два слоя' },
  { value: 'до 1 мм', label: 'устойчивость к микротрещинам' },
  { value: '1 / 5 / 9 л', label: 'три удобные фасовки' },
  { value: '1–4 ч', label: 'высыхание покрытия' }
]

const advantages = [
  {
    index: '01',
    title: 'Эластичное покрытие',
    text: 'Помогает скрывать небольшие дефекты основания и снижает риск проявления микротрещин.'
  },
  {
    index: '02',
    title: 'Глубокий белый мат',
    text: 'Спокойная ровная поверхность без лишнего блеска. Краска продаётся только в белом цвете.'
  },
  {
    index: '03',
    title: 'Для дома и фасада',
    text: 'Работает на подготовленных минеральных, бетонных, оштукатуренных и других пористых основаниях.'
  },
  {
    index: '04',
    title: 'Понятный расход',
    text: 'Один литр рассчитан примерно на 7 м² при нанесении в два слоя по ровной поверхности.'
  },
  {
    index: '05',
    title: 'Быстро сохнет',
    text: 'Слой высыхает примерно за час, повторное нанесение возможно ориентировочно через два часа.'
  },
  {
    index: '06',
    title: 'Можно мыть',
    text: 'После полного формирования покрытие выдерживает регулярный уход и влажную уборку.'
  }
]

const useCases = [
  { mark: '01', title: 'Стены и потолки', text: 'Жилые комнаты, коридоры и подготовленные влажные зоны.' },
  { mark: '02', title: 'Фасады', text: 'Минеральные и оштукатуренные поверхности с правильной подготовкой.' },
  { mark: '03', title: 'Ремонтные зоны', text: 'Стыки, небольшие дефекты и поверхности, где важна эластичность.' }
]

const applicationSteps = [
  { number: '01', title: 'Подготовить', text: 'Основание должно быть сухим, чистым и прочным.' },
  { number: '02', title: 'Загрунтовать', text: 'Использовать подходящий грунт глубокого проникновения.' },
  { number: '03', title: 'Нанести', text: 'Работать кистью, валиком или подходящим распылителем.' },
  { number: '04', title: 'Повторить', text: 'Второй слой наносить после высыхания первого.' }
]

const documents = [
  {
    type: 'PPTX',
    title: 'Презентация продукта',
    text: 'Описание ELASTIC PRO, расход, нанесение и хранение.',
    href: '/docs/presentation-elastic-pro.pptx'
  },
  {
    type: 'PDF',
    title: 'Экспертное заключение',
    text: 'Публичная копия экспертизы. Адресные данные скрыты.',
    href: '/docs/expert-conclusion-elastic-pro.pdf'
  },
  {
    type: 'PDF',
    title: 'Знак VIDTECHNOLOGY',
    text: 'Исходный фирменный знак производителя.',
    href: '/docs/brand-logo.pdf'
  }
]

const faqs = [
  {
    question: 'Какого цвета ELASTIC PRO?',
    answer:
      'ELASTIC PRO поставляется в белом матовом цвете. Мы не оказываем услугу колеровки, но при желании белую базу можно самостоятельно колеровать водными или универсальными пастами.'
  },
  {
    question: 'Сколько краски нужно на 63 м²?',
    answer:
      'При ориентире 1 литр на 7 м² в два слоя потребуется около 9 литров. Для пористого или фактурного основания лучше предусмотреть запас.'
  },
  {
    question: 'Подходит ли краска для фасада?',
    answer:
      'Да, при правильной подготовке основания. Материал подходит для минеральных, бетонных, оштукатуренных и других пористых поверхностей.'
  },
  {
    question: 'Сколько сохнет покрытие?',
    answer:
      'При температуре около +20 °C слой высыхает примерно за час, следующий можно наносить ориентировочно через два часа. Полное высыхание — около четырёх часов.'
  },
  {
    question: 'Нужно ли грунтовать поверхность?',
    answer:
      'Да. Основание очищают от пыли и непрочных слоёв, просушивают и обрабатывают подходящим грунтом глубокого проникновения.'
  },
  {
    question: 'Можно ли мыть окрашенную поверхность?',
    answer:
      'После полного формирования покрытия поверхность можно очищать с применением подходящих моющих средств.'
  }
]

const mobileMenuOpen = ref(false)
const contactModalOpen = ref(false)
const includeCalculation = ref(false)
const copied = ref(false)
const activeFaq = ref<number | null>(0)

const scrollToSection = (id: string) => {
  if (!import.meta.client) return
  mobileMenuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const openContact = (withCalculation = false) => {
  includeCalculation.value = withCalculation
  contactModalOpen.value = true
}

const closeContact = () => {
  contactModalOpen.value = false
  copied.value = false
}

const copyPhone = async () => {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(product.phoneFormatted)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 2200)
  } catch {
    copied.value = false
  }
}

watch([mobileMenuOpen, contactModalOpen], ([menuOpen, modalOpen]) => {
  if (!import.meta.client) return
  document.body.style.overflow = menuOpen || modalOpen ? 'hidden' : ''
})

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

const requiredLiters = computed(() => {
  const area = Math.max(0, Number(calculator.area) || 0)
  const coats = Math.max(1, Number(calculator.coats) || 1)
  const reserveFactor = 1 + Math.max(0, Number(calculator.reserve) || 0) / 100
  const surfaceFactor = surfaceFactors[calculator.surface] || 1
  return (area / product.coveragePerLiterTwoCoats) * (coats / 2) * reserveFactor * surfaceFactor
})

const recommendedLiters = computed(() => Math.max(1, Math.ceil(requiredLiters.value)))

const packagePlan = computed(() => {
  const need = recommendedLiters.value
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
  const maxOne = need + 4

  for (let n9 = 0; n9 <= maxNine; n9 += 1) {
    for (let n5 = 0; n5 <= maxFive; n5 += 1) {
      for (let n1 = 0; n1 <= maxOne; n1 += 1) {
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
          (candidate.excess === best.excess && candidate.count === best.count && candidate.cost < best.cost)
        ) {
          best = candidate
        }
      }
    }
  }

  return best || {
    total: need,
    cost: need * packagePrices[1],
    count: need,
    excess: 0,
    items: [{ volume: 1 as PaintVolume, count: need }]
  }
})

const packageLabel = computed(() =>
  packagePlan.value.items.map((item) => `${item.count} × ${item.volume} л`).join(' + ')
)

const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(value)

const calculationSummary = computed(
  () => `${calculator.area} м² · ${calculator.coats} слоя · ${packageLabel.value} · ${formatPrice(packagePlan.value.cost)}`
)

const handleEscape = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return
  mobileMenuOpen.value = false
  closeContact()
}

let revealObserver: IntersectionObserver | undefined

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
  document.documentElement.classList.add('ep-motion-ready')

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px' }
  )

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => revealObserver?.observe(element))
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  revealObserver?.disconnect()
  document.documentElement.classList.remove('ep-motion-ready')
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="ep-site">
    <SeoJsonLd :site-url="siteUrl" :asset-url="absoluteAsset" />

    <header class="site-header">
      <div class="container header-inner">
        <NuxtLink class="brand" to="/" aria-label="ELASTIC PRO — главная">
          <img
            :src="asset(product.logo)"
            width="900"
            height="448"
            alt="VIDTECHNOLOGY"
            draggable="false"
            @contextmenu.prevent
          >
          <span>
            <strong>ELASTIC PRO</strong>
            <small>эластичная матовая краска</small>
          </span>
        </NuxtLink>

        <nav class="desktop-nav" aria-label="Основная навигация">
          <button v-for="item in navItems" :key="item.id" type="button" @click="scrollToSection(item.id)">
            {{ item.label }}
          </button>
        </nav>

        <a class="header-phone" :href="`tel:${product.phone}`">
          <small>связаться напрямую</small>
          <strong>{{ product.phoneFormatted }}</strong>
        </a>

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
          <span>ELASTIC PRO</span>
          <button type="button" aria-label="Закрыть меню" @click="mobileMenuOpen = false">×</button>
        </div>
        <nav aria-label="Мобильная навигация">
          <button v-for="item in navItems" :key="item.id" type="button" @click="scrollToSection(item.id)">
            {{ item.label }}
          </button>
        </nav>
        <a class="mobile-menu__phone" :href="`tel:${product.phone}`">{{ product.phoneFormatted }}</a>
        <button class="button button--primary" type="button" @click="openContact(false)">Связаться</button>
      </div>
    </Transition>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-grid-lines" aria-hidden="true" />
        <div class="container hero-grid">
          <div class="hero-copy" data-reveal>
            <p class="eyebrow">VIDTECHNOLOGY · ELASTIC PRO</p>
            <h1 id="hero-title">
              <span>Белая.</span>
              <span>Матовая.</span>
              <strong>Эластичная.</strong>
            </h1>
            <p class="hero-lead">
              Ровное белое матовое покрытие, которое помогает скрыть мелкие дефекты и сохраняет аккуратный вид стен, потолков и фасадов.
            </p>
            <div class="hero-actions">
              <button class="button button--primary" type="button" @click="scrollToSection('calculator')">
                Рассчитать количество
                <span aria-hidden="true">↘</span>
              </button>
              <a class="button button--ghost" :href="`tel:${product.phone}`">Позвонить продавцу</a>
            </div>
            <div class="hero-facts" aria-label="Главное о продукте">
              <span>Только белый мат</span>
              <span>Внутри и снаружи</span>
              <span>Фасовки 1 · 5 · 9 л</span>
            </div>
          </div>

          <div class="product-stage" data-reveal>
            <div class="product-stage__halo" aria-hidden="true" />
            <div class="product-stage__name" aria-hidden="true">ELASTIC</div>
            <img
              class="product-stage__bucket"
              :src="asset(product.productImage)"
              width="1261"
              height="1247"
              alt="Банка белой матовой краски ELASTIC PRO"
              fetchpriority="high"
              draggable="false"
              @contextmenu.prevent
            >
            <div class="product-note product-note--coverage">
              <small>ориентир расхода</small>
              <strong>1 л / 7 м²</strong>
              <span>в два слоя</span>
            </div>
            <div class="product-note product-note--color">
              <span class="white-swatch" aria-hidden="true" />
              <div>
                <small>цвет продукта</small>
                <strong>Белый матовый</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="container proof-strip" data-reveal>
          <article v-for="(item, index) in proofItems" :key="item.value">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ item.value }}</strong>
            <small>{{ item.label }}</small>
          </article>
        </div>
      </section>

      <section id="product" class="section material-section" aria-labelledby="material-title">
        <div class="container material-grid">
          <figure class="material-photo" data-reveal>
            <img
              :src="asset(product.applicationImage)"
              width="721"
              height="1280"
              alt="Белая краска ELASTIC PRO переливается из черной банки"
              loading="lazy"
              draggable="false"
              @contextmenu.prevent
            >
            <figcaption>
              <span>01 / материал</span>
              <strong>Плотная однородная консистенция</strong>
            </figcaption>
          </figure>

          <div class="material-copy" data-reveal>
            <p class="section-kicker">Белый материал</p>
            <h2 id="material-title">Чистый белый мат — готовая основа для интерьера.</h2>
            <p class="section-lead">
              ELASTIC PRO поставляется готовой белой матовой краской. Плотное покрытие визуально выравнивает поверхность, а белая база оставляет свободу выбора оттенка.
            </p>
            <div class="material-statement">
              <span class="material-statement__swatch" aria-hidden="true" />
              <div>
                <small>цвет поставки</small>
                <strong>Белый матовый</strong>
                <p>При желании белую базу легко самостоятельно колеровать водными или универсальными пастами.</p>
              </div>
            </div>
            <ul class="clean-list">
              <li>Спокойная поверхность без выраженного блеска</li>
              <li>Для подготовленных внутренних и наружных оснований</li>
              <li>Нанесение кистью, валиком или подходящим распылителем</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="calculator" class="section calculator-section" aria-labelledby="calculator-title">
        <div class="container calculator-grid">
          <div class="calculator-intro" data-reveal>
            <p class="section-kicker">Точный ориентир</p>
            <h2 id="calculator-title">Сколько краски потребуется?</h2>
            <p>
              Укажите площадь и параметры поверхности. Калькулятор подберёт общий объём, фасовки и ориентировочную стоимость.
            </p>
            <div class="calculator-rule">
              <span>Базовый расход</span>
              <strong>1 литр ≈ 7 м²</strong>
              <small>при нанесении в два слоя</small>
            </div>
          </div>

          <div class="calculator-card" data-reveal>
            <div class="calculator-fields">
              <label class="field field--area">
                <span>Площадь поверхности</span>
                <div>
                  <input v-model.number="calculator.area" type="number" min="1" max="10000" inputmode="decimal">
                  <small>м²</small>
                </div>
              </label>
              <label class="field">
                <span>Количество слоёв</span>
                <select v-model.number="calculator.coats">
                  <option :value="1">1 слой</option>
                  <option :value="2">2 слоя</option>
                  <option :value="3">3 слоя</option>
                </select>
              </label>
              <label class="field">
                <span>Запас</span>
                <select v-model.number="calculator.reserve">
                  <option :value="0">Без запаса</option>
                  <option :value="10">10%</option>
                  <option :value="15">15%</option>
                </select>
              </label>
              <label class="field field--wide">
                <span>Тип поверхности</span>
                <select v-model="calculator.surface">
                  <option value="smooth">Ровная подготовленная</option>
                  <option value="porous">Пористая</option>
                  <option value="textured">Фактурная или сложная</option>
                </select>
              </label>
            </div>

            <div class="calculator-result">
              <div class="calculator-result__main">
                <span>Рекомендуемый объём</span>
                <strong>{{ packagePlan.total }}<small> л</small></strong>
              </div>
              <dl>
                <div>
                  <dt>Подходящая фасовка</dt>
                  <dd>{{ packageLabel }}</dd>
                </div>
                <div>
                  <dt>Ориентировочная стоимость</dt>
                  <dd>{{ formatPrice(packagePlan.cost) }}</dd>
                </div>
              </dl>
              <button class="button button--primary" type="button" @click="openContact(true)">
                Обсудить расчёт
                <span aria-hidden="true">↗</span>
              </button>
            </div>

            <p class="calculator-disclaimer">
              Расчёт ориентировочный. Фактический расход зависит от впитываемости, рельефа основания и инструмента.
            </p>
          </div>
        </div>
      </section>

      <section id="application" class="section application-section" aria-labelledby="application-title">
        <div class="container">
          <div class="section-heading" data-reveal>
            <p class="section-kicker">Область применения</p>
            <h2 id="application-title">Один материал. Разные задачи ремонта.</h2>
            <p>Работает там, где важны белый матовый вид, понятный расход и эластичность покрытия.</p>
          </div>

          <div class="application-showcase" data-reveal>
            <figure>
              <img
                :src="asset(product.interiorImage)"
                width="1280"
                height="575"
                alt="Светлый жилой интерьер с белыми стенами и потолком"
                loading="lazy"
                draggable="false"
                @contextmenu.prevent
              >
              <figcaption>Светлое матовое покрытие в жилом интерьере</figcaption>
            </figure>
            <div class="use-case-list">
              <article v-for="item in useCases" :key="item.mark">
                <span>{{ item.mark }}</span>
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.text }}</p>
                </div>
              </article>
            </div>
          </div>

          <div class="application-steps" data-reveal>
            <article v-for="step in applicationSteps" :key="step.number">
              <span>{{ step.number }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section advantages-section" aria-labelledby="advantages-title">
        <div class="container">
          <div class="section-heading section-heading--split" data-reveal>
            <div>
              <p class="section-kicker">Характеристики</p>
              <h2 id="advantages-title">Покрытие, рассчитанное на реальную эксплуатацию.</h2>
            </div>
            <p>
              Всё главное о материале — коротко и честно. Перед работой сверяйтесь с технической документацией и учитывайте состояние основания.
            </p>
          </div>

          <div class="advantages-grid" data-reveal>
            <article v-for="item in advantages" :key="item.index">
              <span>{{ item.index }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="documents" class="section documents-section" aria-labelledby="documents-title">
        <div class="container documents-layout">
          <div class="documents-intro" data-reveal>
            <p class="section-kicker">Документы</p>
            <h2 id="documents-title">Не слова. Материалы о продукте.</h2>
            <p>
              Презентация, экспертное заключение и исходный знак VIDTECHNOLOGY доступны для просмотра и скачивания.
            </p>
            <div class="document-safety">
              <span aria-hidden="true">✓</span>
              <p><strong>Публичная версия проверена.</strong> Адресные строки в экспертном заключении скрыты.</p>
            </div>
          </div>

          <div class="documents-list" data-reveal>
            <a
              v-for="(document, index) in documents"
              :key="document.href"
              :href="asset(document.href)"
              target="_blank"
              rel="noreferrer"
            >
              <span class="documents-list__index">0{{ index + 1 }}</span>
              <span class="documents-list__type">{{ document.type }}</span>
              <div>
                <h3>{{ document.title }}</h3>
                <p>{{ document.text }}</p>
              </div>
              <span class="documents-list__arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section class="section order-section" aria-labelledby="order-title">
        <div class="container order-panel" data-reveal>
          <div>
            <p class="section-kicker">Как заказать</p>
            <h2 id="order-title">От площади до нужной фасовки — один разговор.</h2>
          </div>
          <ol>
            <li><span>01</span><div><strong>Позвоните</strong><p>Расскажите, что и где планируете красить.</p></div></li>
            <li><span>02</span><div><strong>Получите расчёт</strong><p>Уточним основание, объём и подходящие фасовки.</p></div></li>
            <li><span>03</span><div><strong>Согласуйте получение</strong><p>Подтвердите заказ и удобный способ доставки.</p></div></li>
          </ol>
          <button class="button button--light" type="button" @click="openContact(false)">
            Связаться с продавцом
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section id="faq" class="section faq-section" aria-labelledby="faq-title">
        <div class="container faq-grid">
          <div class="faq-intro" data-reveal>
            <p class="section-kicker">Вопросы</p>
            <h2 id="faq-title">Главное перед покупкой.</h2>
            <p>Если ответа здесь нет — позвоните напрямую.</p>
            <a :href="`tel:${product.phone}`">{{ product.phoneFormatted }}</a>
          </div>

          <div class="faq-list" data-reveal>
            <article v-for="(item, index) in faqs" :key="item.question" :class="{ 'is-open': activeFaq === index }">
              <button type="button" :aria-expanded="activeFaq === index" @click="activeFaq = activeFaq === index ? null : index">
                <span>{{ item.question }}</span>
                <i aria-hidden="true">{{ activeFaq === index ? '−' : '+' }}</i>
              </button>
              <Transition name="faq">
                <div v-if="activeFaq === index" class="faq-answer"><p>{{ item.answer }}</p></div>
              </Transition>
            </article>
          </div>
        </div>
      </section>

      <section class="section contact-section" aria-labelledby="contact-title">
        <div class="container contact-panel" data-reveal>
          <div>
            <p class="section-kicker">Один контакт</p>
            <h2 id="contact-title">Нужна консультация по ELASTIC PRO?</h2>
            <p>Позвоните напрямую. Без колл-центра и переадресаций.</p>
          </div>
          <div class="contact-panel__action">
            <span>ежедневно · 09:00–20:00</span>
            <a :href="`tel:${product.phone}`">{{ product.phoneFormatted }}</a>
            <button type="button" @click="copyPhone">{{ copied ? 'Номер скопирован' : 'Скопировать номер' }}</button>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-main">
        <div class="footer-brand">
          <img
            :src="asset(product.logo)"
            width="900"
            height="448"
            alt="VIDTECHNOLOGY"
            draggable="false"
            @contextmenu.prevent
          >
          <p>ELASTIC PRO · белая эластичная матовая краска для внутренних и наружных работ.</p>
        </div>
        <nav aria-label="Навигация в подвале">
          <button v-for="item in navItems" :key="item.id" type="button" @click="scrollToSection(item.id)">{{ item.label }}</button>
        </nav>
        <div class="footer-contact">
          <a :href="`tel:${product.phone}`">{{ product.phoneFormatted }}</a>
          <span>Ежедневно 09:00–20:00</span>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© 2026 VIDTECHNOLOGY</span>
        <div>
          <NuxtLink to="/privacy-policy">Политика конфиденциальности</NuxtLink>
          <NuxtLink to="/consent-processing">Обработка данных</NuxtLink>
        </div>
      </div>
    </footer>

    <a class="mobile-sticky-call" :href="`tel:${product.phone}`">
      <span>Позвонить</span>
      <strong>{{ product.phoneFormatted }}</strong>
    </a>

    <Transition name="modal">
      <div v-if="contactModalOpen" class="modal-backdrop" @click.self="closeContact">
        <section class="contact-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button class="contact-modal__close" type="button" aria-label="Закрыть окно" @click="closeContact">×</button>
          <p class="section-kicker">Прямая связь</p>
          <h2 id="modal-title">Обсудим вашу задачу.</h2>
          <p>Позвоните продавцу ELASTIC PRO. Один номер, без переключений между менеджерами.</p>
          <div v-if="includeCalculation" class="modal-calculation">
            <span>Ваш расчёт</span>
            <strong>{{ calculationSummary }}</strong>
          </div>
          <a class="modal-phone" :href="`tel:${product.phone}`">{{ product.phoneFormatted }}</a>
          <div class="modal-actions">
            <a class="button button--primary" :href="`tel:${product.phone}`">Позвонить</a>
            <button class="button button--ghost" type="button" @click="copyPhone">
              {{ copied ? 'Скопировано' : 'Скопировать номер' }}
            </button>
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>
