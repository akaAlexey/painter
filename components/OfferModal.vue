<script setup lang="ts">
const { state, closeOfferModal, applyOffer } = useSalesUiActions()

const offers = [
  {
    title: 'Рассчитать объем по площади',
    text: 'Подготовим расчет литража и фасовки 1 / 5 / 9 л.',
    action: () => applyOffer({
      label: 'Расчет объема',
      comment: 'Хочу получить расчет объема и подходящей фасовки ELASTIC PRO по площади.'
    })
  },
  {
    title: 'Оставить заявку на покупку',
    text: 'Если объем уже понятен, можно сразу перейти к заказу.',
    action: () => applyOffer({
      label: 'Покупка',
      comment: 'Хочу купить ELASTIC PRO. Нужна консультация по заказу и способу получения.'
    })
  },
  {
    title: 'Уточнить наличие',
    text: 'Продавец проверит доступную фасовку и поможет собрать заказ.',
    action: () => applyOffer({
      label: 'Наличие',
      comment: 'Хочу уточнить наличие ELASTIC PRO и доступную фасовку.'
    })
  },
  {
    title: 'Нужен обратный звонок',
    text: 'Продавец свяжется и ответит на вопросы по материалу.',
    action: () => applyOffer({
      label: 'Обратный звонок',
      comment: 'Нужен обратный звонок по краске ELASTIC PRO.'
    })
  }
]

watch(() => state.value.offerOpen, (isOpen) => {
  if (!process.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (process.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="state.offerOpen" class="offer-modal" @click.self="closeOfferModal">
      <div class="offer-modal__card glass-card" role="dialog" aria-modal="true" aria-labelledby="offer-modal-title">
        <button class="offer-modal__close" type="button" aria-label="Закрыть окно" @click="closeOfferModal">×</button>
        <p class="eyebrow">Быстрое предложение</p>
        <h2 id="offer-modal-title">Как удобнее начать заказ?</h2>
        <p class="offer-modal__lead">
          Выберите сценарий. Мы подставим его в заявку и переведем вас сразу к форме.
        </p>

        <div class="offer-modal__grid">
          <button
            v-for="item in offers"
            :key="item.title"
            class="offer-choice"
            type="button"
            @click="item.action()"
          >
            <strong>{{ item.title }}</strong>
            <span>{{ item.text }}</span>
          </button>
        </div>

        <div class="offer-modal__footer">
          <CopyPhoneButton class-name="btn btn-secondary offer-modal__phone" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
