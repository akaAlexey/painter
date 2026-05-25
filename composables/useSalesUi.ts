export type SalesUiState = {
  offerOpen: boolean
  offerTopic: string
}

export function useSalesUi() {
  return useState<SalesUiState>('sales-ui', () => ({
    offerOpen: false,
    offerTopic: ''
  }))
}

export function useSalesUiActions() {
  const state = useSalesUi()
  const draft = useLeadDraft()

  function scrollToLead() {
    if (!process.client) return
    window.requestAnimationFrame(() => {
      document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function openOfferModal(topic = '') {
    state.value.offerOpen = true
    state.value.offerTopic = topic
  }

  function closeOfferModal() {
    state.value.offerOpen = false
  }

  function applyOffer(payload: { label: string; comment: string; volume?: string }) {
    draft.value = {
      ...draft.value,
      volume: payload.volume || draft.value.volume,
      source: 'offer-modal',
      comment: payload.comment,
      updatedAt: Date.now()
    }

    closeOfferModal()
    scrollToLead()
  }

  return { state, openOfferModal, closeOfferModal, applyOffer, scrollToLead }
}
