<script setup lang="ts">
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

    if (leadDraft.value.comment) {
      const current = form.comment.trim()
      form.comment = current ? `${leadDraft.value.comment}\n${current}` : leadDraft.value.comment
    }
  },
  { immediate: true }
)

const isPhoneValid = computed(() => {
  const digits = form.phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
})

const canSubmit = computed(() => form.name.trim().length >= 2 && isPhoneValid.value && !pending.value)

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
    form.comment = ''
  } catch {
    errorMessage.value = 'Автоматическая отправка пока недоступна. Скопируйте номер продавца и свяжитесь напрямую.'
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
        <h2 id="contacts-title">Оставьте номер — поможем рассчитать и оформить заказ</h2>
        <p>
          Укажите площадь и задачу ремонта. Продавец уточнит расход, подходящую фасовку 1 / 5 / 9 л и условия получения заказа.
        </p>

        <div class="lead-points">
          <span>Расчет объема по площади</span>
          <span>Фасовка 1 / 5 / 9 л</span>
          <span>Покупка для дома, ремонта или объекта</span>
        </div>

        <div class="contact-actions contact-actions--sales">
          <CopyPhoneButton class-name="btn btn-primary liquid-btn" />
        </div>

        <div class="quick-offers glass-card">
          <strong>Что удобно указать в заявке</strong>
          <div>
            <span>площадь в м²</span>
            <span>нужную фасовку</span>
            <span>тип поверхности</span>
            <span>нужен ли обратный звонок</span>
          </div>
        </div>

        <p class="contact-note">
          Краска продается в белом матовом цвете. Перед подтверждением заказа продавец уточнит площадь, способ нанесения, запас и удобный формат получения.
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
            <input v-model.trim="form.phone" type="tel" name="phone" autocomplete="tel" placeholder="+7 985 138-58-50" required>
          </label>
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
          <textarea v-model.trim="form.comment" name="comment" rows="4" placeholder="Например: нужен расчет для фасада, площадь 63 м², хочу уточнить наличие" />
        </label>

        <button class="btn btn-primary liquid-btn submit-btn" type="submit" :disabled="pending">
          <span v-if="pending">Отправляем...</span>
          <span v-else>Отправить заявку</span>
        </button>

        <p v-if="success" class="form-status success">Заявка отправлена. Продавец свяжется с вами по телефону.</p>
        <div v-if="errorMessage" class="form-fallback">
          <p class="form-status error">{{ errorMessage }}</p>
          <CopyPhoneButton class-name="btn btn-secondary" />
        </div>
        <p class="form-legal">Нажимая кнопку, вы соглашаетесь с <NuxtLink to="/privacy-policy">политикой конфиденциальности</NuxtLink> и <NuxtLink to="/consent-processing">согласием на обработку персональных данных</NuxtLink>.</p>
      </form>
    </div>
  </section>
</template>
