# قطب‌نما · Qotbnama

> **اندیشه‌ات را بهتر بشناس** — _Know your ideas better._

Qotbnama is a **static, single-page educational web app** that helps users discover their
**approximate political orientation** through a short questionnaire, then teaches them about
political systems and ideologies in a **completely neutral, educational** manner.

Everything runs in the browser. **No backend, no database, no API, no login, no analytics.**
All data is processed and stored locally on the user's device.

- 🌍 **Trilingual** — Persian (RTL), English, German (LTR), with automatic browser-language detection
- 🧭 **Research-based questionnaire** — 35 items adapted from the Political Compass, Nolan Chart, WVS, ESS and Pew political-values batteries
- 📊 **Visual results** — interactive political compass, radar chart, signed dimension bars, detailed neutral analysis
- 🎓 **Engaging learning** — 20 interactive topic cards with definitions, history, advantages, criticisms, real examples and common misconceptions
- 🖼️ **Export & share** — PDF report, downloadable share image, and social sharing (X, Facebook, LinkedIn, Telegram, WhatsApp, copy link)
- 🌗 **Light & dark mode**, mobile-first, accessible (WCAG AA targets), smooth animations

---

## Tech stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | React 18 + TypeScript                             |
| Build tool     | Vite 5                                            |
| Styling        | Tailwind CSS 3 (class-based dark mode)            |
| Routing        | React Router 6 — **HashRouter** (no server rewrites needed) |
| Animation      | Framer Motion                                     |
| Charts         | Recharts (radar) + a custom SVG political compass |
| i18n           | i18next + react-i18next + browser language detector |
| PDF / image    | jsPDF + html2canvas                               |

---

## Getting started

### Prerequisites

- Node.js **18+** (tested on Node 22)
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the printed local URL (default `http://localhost:5173`). The dev server honors a `PORT`
environment variable if one is set.

### Build

```bash
npm run build      # type-checks then builds to dist/
npm run preview    # serve the production build locally
```

### Other scripts

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

---

## Deployment

The app is a fully static bundle in `dist/` and uses **HashRouter**, so routes like
`/#/results` never hit the server — it works on any static host **without** rewrite rules.
`base` is set to `./` (relative paths), so it also works from a sub-path.

| Host             | How                                                                 |
| ---------------- | ------------------------------------------------------------------- |
| **Vercel**       | Import the repo; framework preset _Vite_; build `npm run build`, output `dist`. |
| **Netlify**      | Build command `npm run build`, publish directory `dist`.            |
| **GitHub Pages** | `npm run build`, then publish the `dist/` folder (e.g. via `gh-pages`). Relative `base` + HashRouter means no extra config. |
| **Shared hosting** | Upload the contents of `dist/` to your web root.                  |

---

## Project structure

```
src/
├── assets/                # (static imports, if any)
├── components/
│   ├── ui/                # Button, Card, Logo, Icon, Accordion, SectionHeading, PageLoader
│   ├── layout/            # Navbar, Footer, Layout, ThemeToggle, LanguageSwitcher
│   ├── charts/            # PoliticalCompass (SVG), DimensionRadar (Recharts), DimensionBar
│   ├── quiz/              # LikertScale, QuestionCard
│   ├── results/           # ResultSummary, SharePanel, ShareCard, ResultReport
│   └── education/         # TopicCard
├── context/               # ThemeContext, QuizContext
├── data/                  # questions.ts, dimensions.ts, education.ts (the content model)
├── hooks/                 # useDirection
├── i18n/                  # i18next setup + language helpers
├── locales/               # fa.json, en.json, de.json (all UI + content strings)
├── pages/                 # Landing, Introduction, Questionnaire, Results, Education, EducationDetail, NotFound
├── services/              # scoring.ts, storage.ts, pdf.ts, share.ts
├── types/                 # shared TypeScript types
├── App.tsx                # routes (HashRouter) + lazy loading
├── main.tsx               # entry
└── index.css              # Tailwind layers + theme variables
```

---

## Scoring methodology

The questionnaire measures **five conceptual dimensions**, each with **7 items** (35 total). More
balanced items per dimension raise internal-consistency reliability and reduce measurement error,
so each dimension's score is a more stable estimate:

| Dimension     | Negative pole (−)        | Positive pole (+)      |
| ------------- | ------------------------ | ---------------------- |
| `economic`    | Left                     | Right                  |
| `social`      | Libertarian              | Authoritarian          |
| `democratic`  | Non-democratic           | Democratic             |
| `state`       | Free market              | State intervention     |
| `secular`     | Traditional / religious  | Secular                |

Each item carries metadata: `dimension`, `weight`, `polarity`, `source` (methodology) and
`reasoning` (see `src/data/questions.ts`). Items are **balanced-keyed** — every dimension mixes
positive- and reverse-keyed statements to reduce **acquiescence bias** (the tendency to agree
regardless of content), a standard practice in WVS/ESS instruments.

**Computation** (`src/services/scoring.ts`):

1. Each 7-point Likert answer (index `0..6`) is centered: `centered = index − 3` → range `[-3, 3]`.
2. `contribution = centered × polarity × weight`.
3. Per dimension, sum contributions and divide by the maximum possible absolute sum
   (`3 × Σweight`) → normalise to `[-1, 1]`, then scale to **`[-100, 100]`**.
4. **Unanswered items are skipped** and excluded from the denominator, so partial completion
   still produces a fair estimate.
5. The **political-compass** coordinates reuse two dimensions: `x = economic`, `y = social`.
6. **Top contributors** = items whose `|centered × polarity × weight|` is largest.
7. **Recommended topics** = education topics whose compass position is nearest (Euclidean
   distance) to the user's position.

The result is explicitly framed as an **educational estimate, not a scientific diagnosis**, and
the language never judges the user.

---

## Localization

- Languages: **Persian (`fa`, RTL)**, **English (`en`)**, **German (`de`)**.
- Detection order: saved preference → browser language → fallback (`fa`/`en`).
- The choice is persisted in `localStorage` (`qotbnama.language`).
- `<html lang dir>` is updated on every change (`src/i18n/index.ts → applyLanguage`).
- **All** user-facing strings — UI, questions, dimensions and the full education content — live
  in `src/locales/{fa,en,de}.json`. No hard-coded copy in components.

### Adding a language

1. Add `src/locales/<code>.json` (copy an existing file and translate).
2. Register it in `src/i18n/index.ts` (`resources`, `SUPPORTED_LANGUAGES`, `DIRECTION`).
3. Set the correct `dir` (`rtl`/`ltr`).

---

## PDF generation

`src/services/pdf.ts` renders the off-screen **`ResultReport`** component (a self-contained,
light-themed report) to a canvas with **html2canvas**, then paginates that image into an A4
**jsPDF** document.

Why image-based? jsPDF's built-in fonts cannot shape Persian/Arabic (RTL, joined glyphs) or
guarantee German umlauts. Capturing the already-correctly-rendered DOM makes the export
**pixel-faithful and correct for all three languages** without manual font embedding/shaping.
The report includes the logo, date, language, the user's position, compass, dimension bars,
top contributors, recommended topics and the disclaimer.

The **share image** (`ShareCard`) is produced the same way and downloaded as a PNG.

---

## Privacy

- No personal information is requested; no account, no login.
- No analytics or third-party tracking by default.
- Answers, theme and language are stored only in the browser's `localStorage`
  (keys prefixed `qotbnama.`) and can be cleared via **Retake** on the results page.

---

## Customization guide

| Want to…                         | Edit                                                              |
| -------------------------------- | ----------------------------------------------------------------- |
| Change/add **questions**         | `src/data/questions.ts` + add text under `questions.*` in each locale |
| Tune **weights / polarity**      | `src/data/questions.ts`                                           |
| Adjust **dimensions / colors**   | `src/data/dimensions.ts`                                          |
| Add/edit **education topics**    | `src/data/education.ts` + content under `education.topics.*` in each locale |
| Change the **palette / gradients** | `tailwind.config.js` (`brand`, `axis`, `brand-gradient`) and `src/index.css` variables |
| Replace the **logo**             | `public/logo.svg` (and `public/og-image.svg` for social previews) |
| Change **scoring rules**         | `src/services/scoring.ts` (documented inline)                    |

---

## Accessibility

- Semantic landmarks, a **skip link**, and `aria-*` on interactive widgets (radiogroup Likert
  scale, listbox language switcher, expandable accordions).
- Full **keyboard support** in the questionnaire: keys `1–7` select an answer, arrow keys
  navigate between questions (direction-aware in RTL).
- Visible focus rings, AA-oriented contrast in both themes, and `prefers-reduced-motion`
  support that disables animations.

---

## Disclaimer

Qotbnama is an **educational** tool. Its result is an approximate snapshot of tendencies at the
moment of answering — **not** a scientific or psychological diagnosis. All educational content is
written to remain **politically neutral**.

## License

Provided for educational use. Replace this section with your preferred license before publishing.
