# kilcdevs505 — KILCdevs Error Page

> **500 Internal Server Error** — анимированная страница ошибки для [kilcdevs.net](https://kilcdevs.net)

## 🛠 Стек

- **React 19** + **TypeScript**
- **Vite 8** (сборщик)
- **CSS Modules** (изоляция стилей)
- **Cloudflare Pages** (хостинг)

## 🚀 Запуск локально

```bash
npm install
npm run dev
```

## 📦 Сборка

```bash
npm run build
# output → dist/
```

## 🌐 Деплой

Проект автоматически деплоится через **Cloudflare Pages** при каждом пуше в ветку `main`.

- **Production**: [kilcdevs.net](https://kilcdevs.net)
- **Preview**: автоматически на каждый Pull Request

## 📁 Структура

```
src/
├── hooks/
│   ├── useParticles.ts     # canvas-частицы
│   └── useScramble.ts      # scramble-анимация терминала
├── components/
│   ├── ParticlesCanvas/
│   ├── Orbs/
│   ├── Navbar/
│   ├── RobotSVG/
│   ├── Terminal/
│   └── Footer/
└── pages/
    └── error/
        └── Error500.tsx
```
