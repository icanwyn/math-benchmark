# Math Quest Benchmark (Grades 3–6)

An adaptive math diagnostic inspired by i-Ready-style testing. Students enter their name and grade, take a **20-question multiple-choice** benchmark that adjusts difficulty based on each answer, then receive a **personalized ~15-minute lesson** on the skills they need most.

## Features

- **Student intake** — name + grade level (3–6)
- **Adaptive engine** — difficulty rises after correct answers (faster on streaks) and eases after misses
- **20 multiple-choice questions** — 4 options; correct answer letter is **shuffled** every time (not always A/B/C/D)
- **Domains** — operations, place value, fractions, decimals, geometry, word problems, ratios & percents
- **Skill report** — score, placement band, and per-domain breakdown
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

1. Starting level is based on the selected grade (e.g. grade 3 starts lower than grade 6).
2. Each item is generated for the current level across grade-appropriate domains.
3. Correct answers raise the level; incorrect answers lower it (with larger moves on streaks).
4. After 20 items, weakest domains drive the mini-lesson content.

## Stack

- React 19 + Vite 8
- Pure CSS (no UI framework)
- Client-side only — no backend required

## License

MIT
