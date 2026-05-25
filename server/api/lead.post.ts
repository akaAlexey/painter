import nodemailer from 'nodemailer'

const rateLimit = new Map<string, number[]>()

type LeadPayload = {
  name?: string
  phone?: string
  area?: string
  volume?: string
  contactMethod?: string
  comment?: string
  website?: string
}

function clean(value: unknown, limit = 800) {
  return String(value ?? '').trim().slice(0, limit)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function assertRateLimit(ip: string) {
  const now = Date.now()
  const windowMs = 60_000
  const maxRequests = 4
  const recent = (rateLimit.get(ip) || []).filter((timestamp) => now - timestamp < windowMs)

  if (recent.length >= maxRequests) {
    throw createError({ statusCode: 429, statusMessage: 'Слишком много заявок. Попробуйте еще раз через минуту.' })
  }

  recent.push(now)
  rateLimit.set(ip, recent)
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  assertRateLimit(ip)

  const body = await readBody<LeadPayload>(event)
  const website = clean(body.website, 120)

  if (website) {
    return { ok: true }
  }

  const name = clean(body.name, 80)
  const phone = clean(body.phone, 40)
  const area = clean(body.area, 40)
  const volume = clean(body.volume, 40)
  const contactMethod = clean(body.contactMethod, 40) || 'звонок'
  const comment = clean(body.comment, 900)

  if (name.length < 2) {
    throw createError({ statusCode: 400, statusMessage: 'Укажите имя клиента.' })
  }

  if (!isValidPhone(phone)) {
    throw createError({ statusCode: 400, statusMessage: 'Укажите корректный номер телефона.' })
  }

  const config = useRuntimeConfig(event)
  const smtpHost = process.env.SMTP_HOST || String(config.smtpHost || '')
  const smtpPort = Number(process.env.SMTP_PORT || config.smtpPort || 465)
  const smtpSecure = String(process.env.SMTP_SECURE ?? config.smtpSecure) !== 'false'
  const smtpUser = process.env.SMTP_USER || String(config.smtpUser || '')
  const smtpPass = process.env.SMTP_PASS || String(config.smtpPass || '')
  const mailFrom = process.env.MAIL_FROM || String(config.mailFrom || smtpUser)
  const leadRecipientEmail = process.env.LEAD_RECIPIENT_EMAIL || String(config.leadRecipientEmail || '')

  if (!smtpHost || !smtpUser || !smtpPass || !mailFrom || !leadRecipientEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Отправка писем не настроена: проверьте SMTP-переменные в .env или на хостинге.'
    })
  }

  const fields = [
    ['Имя', name],
    ['Телефон', phone],
    ['Предпочтительный способ связи', contactMethod],
    ['Площадь', area ? `${area} м²` : 'не указана'],
    ['Интересующий объем', volume || 'не указан'],
    ['Комментарий', comment || 'без комментария']
  ]

  const text = [
    'Новая заявка с сайта ELASTIC PRO',
    '',
    ...fields.map(([label, value]) => `${label}: ${value}`),
    '',
    `IP: ${ip}`,
    `Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} МСК`
  ].join('\n')

  const htmlRows = fields.map(([label, value]) => `
    <tr>
      <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#64748b;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#0f172a;font-weight:700;">${escapeHtml(value)}</td>
    </tr>
  `).join('')

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h1 style="font-size:22px;margin:0 0 16px;">Новая заявка ELASTIC PRO</h1>
      <p style="margin:0 0 18px;color:#475569;">Клиент оставил заявку на сайте и хочет связаться с продавцом.</p>
      <table style="border-collapse:collapse;width:100%;max-width:680px;">${htmlRows}</table>
      <p style="margin-top:18px;color:#94a3b8;font-size:12px;">IP: ${escapeHtml(ip)} · ${escapeHtml(new Date().toISOString())}</p>
    </div>
  `

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  })

  await transporter.sendMail({
    from: mailFrom,
    to: leadRecipientEmail,
    replyTo: smtpUser,
    subject: `Заявка ELASTIC PRO: ${name}, ${phone}`,
    text,
    html
  })

  return { ok: true }
})
