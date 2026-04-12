# 🚀 Деплой kilcdevs.net → Cloudflare Pages

> Полный пошаговый гайд: GitHub → Cloudflare Pages → DNS в Google Domains

---

## Шаг 1 — Загрузить код на GitHub

### 1.1 Создай репозиторий на GitHub

1. Открой [github.com/new](https://github.com/new)
2. Назови репо: `kilcdevs-site`
3. Видимость: **Public** (или Private — оба работают с CF Pages)
4. Нажми **Create repository**

### 1.2 Инициализируй git и запушь

Выполни в терминале из папки `kilcdevs505/`:

```bash
git init
git add .
git commit -m "feat: migrate 500 page to React + Vite"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kilcdevs-site.git
git push -u origin main
```

> Замени `YOUR_USERNAME` на свой логин GitHub.

---

## Шаг 2 — Подключить Cloudflare Pages

### 2.1 Зарегистрироваться / войти

Открой [dash.cloudflare.com](https://dash.cloudflare.com) и войди в аккаунт.

### 2.2 Создать Pages проект

1. В левом меню: **Workers & Pages** → **Create application** → вкладка **Pages**
2. Нажми **Connect to Git**
3. Разреши доступ к GitHub → выбери репо `kilcdevs-site`
4. Нажми **Begin setup**

### 2.3 Настройки сборки

| Поле | Значение |
|------|----------|
| **Project name** | `kilcdevs` |
| **Production branch** | `main` |
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(пусто)* |

> В разделе **Environment variables** добавь: `NODE_VERSION = 20`

5. Нажми **Save and Deploy** — CF автоматически собирает и деплоит проект.

После деплоя получишь URL вида: `https://kilcdevs.pages.dev`

---

## Шаг 3 — Добавить домен kilcdevs.net в Cloudflare

**Рекомендуется: Вариант A** — перенести NS на Cloudflare (даёт CDN, SSL, защиту автоматически).

### Вариант A: Перенести NS на Cloudflare

#### В Cloudflare:

1. Главная страница → **Add a Site**
2. Введи `kilcdevs.net` → **Continue** → план **Free** → **Continue**
3. Cloudflare импортирует текущие DNS-записи автоматически → **Continue**
4. Cloudflare выдаст два nameserver'а — скопируй их (вида `xxx.ns.cloudflare.com`)

#### В Google Domains:

1. [domains.google.com](https://domains.google.com) → выбери `kilcdevs.net`
2. **DNS** → **Name servers** → **Custom name servers**
3. Замени NS на полученные от Cloudflare → Сохрани
4. Распространение: **до 24-48 ч** (обычно 1-2 часа)

---

### Вариант B: Оставить NS в Google Domains (только CNAME)

В Google Domains → DNS → Custom records добавь:

| Хост | Тип | TTL | Данные |
|------|-----|-----|--------|
| `www` | CNAME | 3600 | `kilcdevs.pages.dev` |

Для `kilcdevs.net` без www — сделай редирект:
- DNS → **Synthetic records** → **Subdomain forward**
- Хост: `@`, цель: `https://www.kilcdevs.net`, тип: Permanent (301)

---

## Шаг 4 — Привязать домен в Cloudflare Pages

1. Cloudflare Pages → проект `kilcdevs`
2. Вкладка **Custom domains** → **Set up a custom domain**
3. Добавь `kilcdevs.net` и `www.kilcdevs.net`
4. Cloudflare создаст DNS-записи и выпустит SSL-сертификат (~5 мин)

---

## Шаг 5 — Проверка (PowerShell)

```powershell
# Проверить NS
Resolve-DnsName -Name kilcdevs.net -Type NS

# Проверить apex домен
Resolve-DnsName -Name kilcdevs.net

# Проверить www
Resolve-DnsName -Name www.kilcdevs.net -Type CNAME
```

Или онлайн: [dnschecker.org](https://dnschecker.org)

---

## Автоматический CI/CD

```
git push origin main
       ↓
GitHub → Cloudflare Pages
       ↓
npm run build → dist/
       ↓
kilcdevs.net ✅
```

---

## Итоговые DNS-записи

| Тип | Имя | Значение | Назначение |
|-----|-----|----------|------------|
| `CNAME` | `www` | `kilcdevs.pages.dev` | Production сайт |
| `CNAME` | `@` | `kilcdevs.pages.dev` | Apex (только через CF NS) |
| `MX` | `@` | *(из Google Workspace)* | Почта — **не трогать!** |
| `TXT` | `@` | *(Google verification)* | Верификация — **не трогать!** |

**CAUTION:** Не удаляй MX и TXT записи Google при переносе NS на Cloudflare — иначе сломается почта Google Workspace! Cloudflare их импортирует автоматически, но проверь что они есть в списке перед сохранением.
