# Math Quest Benchmark (Grades 3–8)

An adaptive math diagnostic inspired by i-Ready-style testing. Students enter their name and grade, take a **20-question multiple-choice** benchmark that adjusts difficulty based on each answer, then receive a **personalized ~15-minute lesson** on the skills they need most.

## Features

- **Student intake** — name + grade level (**3–8**)
- **Adaptive engine** — 14 difficulty levels spanning elementary through middle school; climbs on correct streaks, eases after misses
- **20 multiple-choice questions** — 4 options; correct answer letter is **shuffled** every time (not always A/B/C/D)
- **Domains** — operations, place value, fractions, decimals, geometry, word problems, ratios & percents, **expressions & equations**
- **Grade 7–8 content** — proportions, percent change, integers/exponents, two-step equations, Pythagorean theorem, scientific notation
- **Skill report** — score, placement band (through Grade 8+), and per-domain breakdown
- **Personalized lesson** — guided teach / examples / practice on weakest areas (~15 minutes)
- **Kid-friendly UI** — bright colors, progress bar, streaks, mobile-friendly

## Quick start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deploy

- **Vercel**: import this repo or run `npx vercel --prod`
- **GitHub**: push to a public/private repo and connect Vercel

## How adaptivity works

1. Starting level is based on the selected grade (grade 3 starts lower; grades 7–8 start higher).
2. Each item is generated for the current level (1–14) across grade-appropriate domains.
3. Correct answers raise the level; incorrect answers lower it (with larger moves on streaks).
4. Domain mix shifts with level (e.g. expressions & equations weigh more in middle school).
5. After 20 items, weakest domains drive the mini-lesson content.

## Stack

- React 19 + Vite 8
- Pure CSS (no UI framework)
- Client-side only — no backend required

## License

MIT
