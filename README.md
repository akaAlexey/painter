# ELASTIC PRO / VIDTECHNOLOGY — Nuxt landing

Промо-лендинг на Nuxt 3 для продажи белой матовой краски ELASTIC PRO. В проекте есть:

- SEO-одностраничник с SSR и статической генерацией;
- форма заявки;
- калькулятор расхода;
- интерьерный блок с реальной фотографией;
- FAQ;
- блок документов;
- политика конфиденциальности;
- согласие на обработку персональных данных;
- sitemap.xml и robots.txt;
- GitHub Pages workflow.

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Статическая генерация

```bash
npm run generate
npm run preview
```

Для GitHub Pages используется статическая сборка.

## Продакшен-домен

Сайт собирается для `https://elastic-pro.ru` с корневым `baseURL`.

Для подключения домена к GitHub Pages нужно:

1. В `Settings → Pages → Custom domain` указать `elastic-pro.ru`.
2. В DNS REG.RU заменить парковочные записи на четыре A-записи GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Для `www` создать CNAME на `akaalexey.github.io`.
4. После проверки DNS включить `Enforce HTTPS` в настройках GitHub Pages.

Проект публикуется через custom GitHub Actions workflow, поэтому файл `CNAME` не используется: домен задается в настройках Pages.

## Важно для GitHub Pages

GitHub Pages не поддерживает серверные Nuxt API routes. Это значит:

- сам лендинг, SEO, калькулятор, модалки и копирование номера будут работать;
- отправка заявки через `/api/lead` на GitHub Pages работать не будет;
- для рабочей серверной формы нужен Vercel / Netlify / VPS / любой Node-хостинг.

## SMTP для серверной отправки заявок

Скопируйте `.env.example` в `.env` и заполните SMTP-настройки:

```env
SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Vidtechnology@mail.ru
SMTP_PASS=APP_PASSWORD
MAIL_FROM="ELASTIC PRO <Vidtechnology@mail.ru>"
LEAD_RECIPIENT_EMAIL=Vidtechnology@mail.ru
```

## Полезные страницы

- `/` — главная страница;
- `/privacy-policy` — политика конфиденциальности;
- `/consent-processing` — согласие на обработку персональных данных;
- `/sitemap.xml` — карта сайта;
- `/robots.txt` — robots.

## GitHub Pages деплой

После коммита и push:

1. Открой `Repository → Settings → Pages`.
2. В `Build and deployment` выбери `Source → GitHub Actions`.
3. Дождись выполнения workflow в разделе `Actions`.

## Публичные материалы

- логотип сайта хранится как PNG с прозрачным фоном;
- продуктовый packshot в hero подготовлен в черном исполнении;
- в публичной копии экспертного заключения адресные строки скрыты и документ заново сохранен как плоская копия без исходного слоя.
