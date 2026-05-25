<script setup lang="ts">
import { product } from '~/data/product'

const form = reactive({
  name: '',
  phone: '',
  area: '',
  volume: 'рассчитать',
  contactMethod: 'звонок',
  comment: '',
  website: ''
})

const leadDraft = useLeadDraft()
const lastAppliedDraft = ref(0)
const pending = ref(false)
const success = ref(false)
const errorMessage = ref('')

watch(
  () => leadDraft.value.updatedAt,
  (updatedAt) => {
    if (!updatedAt || updatedAt === lastAppliedDraft.value) return
    lastAppliedDraft.value = updatedAt

    if (leadDraft.value.area) form.area = leadDraft.value.area
    if (leadDraft.value.volume) form.volume = leadDraft.value.volume

    const nextNotes = [leadDraft.value.comment, leadDraft.value.color ? `Цвет: ${leadDraft.value.color}` : '']
      .filter(Boolean)
      .join('\n')

    if (nextNotes) {
      const current = form.comment.trim()
      form.comment = current ? `${nextNotes}\n${current}` : nextNotes
    }
  },
  { immediate: true }
)

const isPhoneValid = computed(() => {
  const digits = form.phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
})

const canSubmit = computed(() => form.name.trim().length >= 2 && isPhoneValid.value && !pending.value)

const mailHref = computed(() => {
  const subject = encodeURIComponent('Заявка ELASTIC PRO')
  const body = encodeURIComponent([
    'Здравствуйте. Хочу купить ELASTIC PRO.',
    `Имя: ${form.name || 'не указано'}`,
    `Телефон: ${form.phone || 'не указан'}`,
    `Способ связи: ${form.contactMethod}`,
    form.area ? `Площадь: ${form.area} м²` : '',
    form.volume ? `Объем: ${form.volume}` : '',
    form.comment ? `Комментарий: ${form.comment}` : ''
  ].filter(Boolean).join('\n'))
  return `mailto:${product.email}?subject=${subject}&body=${body}`
})

async function submitLead() {
  success.value = false
  errorMessage.value = ''

  if (!canSubmit.value) {
    errorMessage.value = 'Заполните имя и корректный номер телефона.'
    return
  }

  pending.value = true

  try {
    await $fetch('/api/lead', {
      method: 'POST',
      body: { ...form }
    })

    success.value = true
    form.name = ''
    form.phone = ''
    form.area = ''
    form.volume = 'рассчитать'
    form.contactMethod = 'звонок'
    form.comment = ''
  } catch (error: unknown) {
    const responseError = error as { data?: { statusMessage?: string }; statusMessage?: string; message?: string }
    errorMessage.value = responseError.data?.statusMessage || responseError.statusMessage || responseError.message || 'Не удалось отправить заявку. Попробуйте позвонить или написать на почту.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section id="contacts" class="section contacts lead-section" aria-labelledby="contacts-title">
    <div class="container contacts-grid">
      <div class="contacts-copy reveal-up">
        <p class="eyebrow">Заявка на покупку</p>
        <h2 id="contacts-title">Оставьте номер — поможем продать, рассчитать и оформить заказ</h2>
        <p>
          Сайт в первую очередь помогает продать ELASTIC PRO: можно рассчитать расход, выбрать фасовку, указать интерес к колеровке и сразу отправить заявку продавцу.
        </p>

        <div class="lead-points">
          <span>Расчет объема и фасовки 1 / 5 / 9 л</span>
          <span>Колеровка и помощь с выбором оттенка</span>
          <span>Покупка для дома, ремонта или объекта</span>
        </div>

        <div class="contact-actions contact-actions--sales">
          <CopyPhoneButton class-name="btn btn-primary liquid-btn" />
          <a class="btn btn-secondary" :href="mailHref">Отправить заявку на почту</a>
        </div>

        <div class="quick-offers glass-card">
          <strong>Что удобно указать в заявке</strong>
          <div>
            <span>площадь в м²</span>
            <span>нужную фасовку</span>
            <span>интерес к колеровке</span>
            <span>нужен ли обратный звонок</span>
          </div>
        </div>

        <p class="contact-note">
          Белая база подходит для колеровки. Перед подтверждением продавец уточнит площадь, способ нанесения, запас и удобный формат получения заказа.
        </p>
      </div>

      <form class="lead-form glass-card reveal-up reveal-delay-1" @submit.prevent="submitLead">
        <div class="form-head">
          <span>Покупатель</span>
          <strong>ELASTIC PRO</strong>
        </div>

        <label class="honeypot" aria-hidden="true" tabindex="-1">
          <span>Сайт</span>
          <input v-model="form.website" type="text" name="website" autocomplete="off" tabindex="-1">
        </label>

        <div class="form-row two-columns">
          <label>
            <span>Имя*</span>
            <input v-model.trim="form.name" type="text" name="name" autocomplete="name" placeholder="Иван" required>
          </label>
          <label>
            <span>Телефон*</span>
            <input v-model.trim="form.phone" type="tel" name="phone" autocomplete="tel" placeholder="+7 977 496-67-37" required>
          </label>
        </div>

        <div class="contact-methods" aria-label="Предпочтительный способ связи">
          <button type="button" :class="{ active: form.contactMethod === 'звонок' }" @click="form.contactMethod = 'звонок'">Звонок</button>
          <button type="button" :class="{ active: form.contactMethod === 'Telegram' }" @click="form.contactMethod = 'Telegram'">Telegram</button>
          <button type="button" :class="{ active: form.contactMethod === 'MAX' }" @click="form.contactMethod = 'MAX'">MAX</button>
        </div>

        <div class="form-row two-columns">
          <label>
            <span>Площадь, м²</span>
            <input v-model.trim="form.area" type="text" inputmode="decimal" name="area" placeholder="Например, 63">
          </label>
          <label>
            <span>Интересует объем</span>
            <select v-model="form.volume" name="volume">
              <option value="рассчитать">Рассчитать</option>
              <option value="1 л">1 л</option>
              <option value="5 л">5 л</option>
              <option value="9 л">9 л</option>
              <option value="оптовая заявка">Оптовая заявка</option>
            </select>
          </label>
        </div>

        <label>
          <span>Комментарий</span>
          <textarea v-model.trim="form.comment" name="comment" rows="4" placeholder="Например: нужна белая база под колеровку, расчет для фасада, нужна консультация по покупке" />
        </label>

        <button class="btn btn-primary liquid-btn submit-btn" type="submit" :disabled="pending">
          <span v-if="pending">Отправляем...</span>
          <span v-else>Отправить заявку</span>
        </button>

        <p v-if="success" class="form-status success">Заявка отправлена. Продавец свяжется с вами по указанному способу.</p>
        <p v-if="errorMessage" class="form-status error">{{ errorMessage }}</p>
        <p class="form-legal">Нажимая кнопку, вы соглашаетесь с <NuxtLink to="/privacy-policy">политикой конфиденциальности</NuxtLink> и <NuxtLink to="/consent-processing">согласием на обработку персональных данных</NuxtLink>.</p>
      </form>
    </div>
  </section>
</template>
