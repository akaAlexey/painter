export type LeadDraft = {
  area: string
  volume: string
  comment: string
  color: string
  source: string
  updatedAt: number
}

export function useLeadDraft() {
  return useState<LeadDraft>('lead-draft', () => ({
    area: '',
    volume: 'рассчитать',
    comment: '',
    color: '',
    source: '',
    updatedAt: 0
  }))
}

export function useLeadActions() {
  const draft = useLeadDraft()

  function scrollToLead() {
    if (!process.client) return
    window.requestAnimationFrame(() => {
      document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function setCalculation(payload: {
    area: number
    coats: number
    requiredLiters: number
    totalLiters: number
    cansText: string
    priceText: string
  }) {
    const areaText = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(payload.area)
    const requiredText = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(payload.requiredLiters)
    const totalText = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(payload.totalLiters)

    draft.value = {
      ...draft.value,
      area: String(payload.area),
      volume: payload.cansText || 'рассчитать',
      source: 'calculator',
      comment: `Расчет с сайта: площадь ${areaText} м², ${payload.coats} слоя, минимум ${requiredText} л, к покупке ${totalText} л (${payload.cansText}), ориентир ${payload.priceText}.`,
      updatedAt: Date.now()
    }

    scrollToLead()
  }

  function setColor(payload: { label: string; color: string }) {
    draft.value = {
      ...draft.value,
      color: `${payload.label} (${payload.color})`,
      source: 'visualizer',
      comment: `Интересует колеровка: ${payload.label}. Оттенок с визуализатора: ${payload.color}.`,
      updatedAt: Date.now()
    }

    scrollToLead()
  }

  return { draft, setCalculation, setColor, scrollToLead }
}
