# Shri — Premium React Starter

A scalable, production-ready **React + Vite** project with a curated set of modern libraries.

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 19 | UI Library |
| Vite | 8 | Build Tool |
| Tailwind CSS | v4 | Styling |
| ShadCN UI | latest | Component Library |
| Framer Motion | 12 | Animations |
| React Router DOM | v7 | Routing |
| Swiper.js | 12 | Carousels / Sliders |
| React Icons | 5 | Icon Sets |

---

## Folder Structure

```
src/
├── assets/          # Static assets (images, fonts, SVGs)
├── components/
│   ├── layout/      # Navbar, RootLayout, Footer, etc.
│   └── ui/          # ShadCN UI primitives (Button, Card, …)
├── hooks/           # Custom React hooks
│   ├── useMediaQuery.js
│   ├── useToggle.js
│   └── useLocalStorage.js
├── lib/
│   └── utils.js     # cn() utility (clsx + tailwind-merge)
├── pages/           # Route-level page components
│   ├── Home.jsx
│   ├── About.jsx
│   └── NotFound.jsx
└── utils/           # Pure helper functions & constants
    ├── constants.js
    └── helpers.js
```

---

## Getting Started

```bash
npm run dev     # Start dev server at http://localhost:5173
npm run build   # Production build
npm run preview # Preview production build
```

## Path Aliases

| Alias | Resolves to |
|---|---|
| `@/` | `src/` |
| `@components/` | `src/components/` |
| `@pages/` | `src/pages/` |
| `@assets/` | `src/assets/` |
| `@hooks/` | `src/hooks/` |
| `@utils/` | `src/utils/` |
| `@lib/` | `src/lib/` |

## Adding ShadCN Components

```bash
npx shadcn@latest add <component-name>
# e.g.
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add badge
```
