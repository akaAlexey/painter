# ELASTIC PRO / VIDTECHNOLOGY — Nuxt landing

Одностраничный Nuxt 3 лендинг для краски ELASTIC PRO: SEO-страница, заявка, калькулятор расхода, визуализатор колеровки, FAQ и документы.

## Запуск

```bash
npm install
npm run dev
```

Локально сайт будет доступен на `http://localhost:3000`.

## Статическая генерация

```bash
npm run generate
npm run preview
```

Главная страница пререндерится для SEO. API отправки заявок требует серверного запуска Nuxt или хостинга с поддержкой server routes.

## Почта для заявок

Скопируйте `.env.example` в `.env` и заполните SMTP:

```env
SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Vidtechnology@mail.ru
SMTP_PASS=APP_PASSWORD
MAIL_FROM="ELASTIC PRO <Vidtechnology@mail.ru>"
LEAD_RECIPIENT_EMAIL=Vidtechnology@mail.ru
```

## Что есть в v5

- форма заявки как главный сценарий;
- автоподстановка расчета из калькулятора в заявку;
- автоподстановка выбранного оттенка из визуализатора в заявку;
- CSS-мокап банки ELASTIC PRO в hero без старых клиентских промо-картинок;
- мобильная нижняя CTA-панель “Позвонить / Оставить заявку”;
- FAQ-блок и JSON-LD `FAQPage` для SEO;
- клиентские тексты без технического мусора про Nuxt/API;
- сохранены документы: презентация, экспертное заключение, логотип.
