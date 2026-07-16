import { makeChoices, randInt, pick, formatFraction, gcd } from './utils'

/**
 * Domains assessed across grades 3–6
 */
export const DOMAINS = {
  operations: { name: 'Operations', emoji: '➕', color: '#FF6B6B' },
  placeValue: { name: 'Place Value', emoji: '🔢', color: '#4ECDC4' },
  fractions: { name: 'Fractions', emoji: '🍕', color: '#FFE66D' },
  decimals: { name: 'Decimals', emoji: '📐', color: '#95E1D3' },
  geometry: { name: 'Geometry', emoji: '📏', color: '#A78BFA' },
  wordProblems: { name: 'Word Problems', emoji: '📖', color: '#F9A8D4' },
  ratios: { name: 'Ratios & Percents', emoji: '⚖️', color: '#60A5FA' },
}

/**
 * Difficulty levels 1–10 roughly map to grade bands:
 * 1–3 ≈ Grade 3, 4–5 ≈ Grade 4, 6–7 ≈ Grade 5, 8–10 ≈ Grade 6+
 */
export function startingLevel(grade) {
  const map = { 3: 3, 4: 4, 5: 6, 6: 8 }
  return map[grade] ?? 4
}

function clampLevel(level) {
  return Math.max(1, Math.min(10, Math.round(level)))
}

function uniqueDistractors(correct, candidates) {
  const set = new Set()
  for (const c of candidates) {
    if (String(c) !== String(correct) && c !== undefined && c !== null && !Number.isNaN(c)) {
      set.add(String(c))
    }
  }
  return [...set].slice(0, 3)
}

// ─── Generators by domain ───────────────────────────────────────────

function genOperations(level) {
  if (level <= 2) {
    const a = randInt(10, 50)
    const b = randInt(5, 40)
    const op = pick(['+', '-'])
    const correct = op === '+' ? a + b : a - b
    const prompt = `What is ${a} ${op} ${b}?`
    const distractors = uniqueDistractors(correct, [
      correct + 1,
      correct - 1,
      correct + 10,
      a + b,
      Math.abs(a - b),
      a * 2 - b,
    ])
    return { prompt, correct, distractors, tip: 'Add or subtract carefully — watch the ones and tens places.' }
  }

  if (level <= 4) {
    const a = randInt(3, 12)
    const b = randInt(3, 12)
    const correct = a * b
    const prompt = `What is ${a} × ${b}?`
    const distractors = uniqueDistractors(correct, [
      a * b + a,
      a * b - b,
      a + b,
      a * (b + 1),
      (a - 1) * b,
      a * b + 1,
    ])
    return { prompt, correct, distractors, tip: 'Use your multiplication facts or skip-count.' }
  }

  if (level <= 6) {
    const b = randInt(2, 12)
    const q = randInt(4, 25)
    const a = b * q
    const correct = q
    const prompt = `What is ${a} ÷ ${b}?`
    const distractors = uniqueDistractors(correct, [q + 1, q - 1, q + 2, a - b, b, q * 2])
    return { prompt, correct, distractors, tip: 'Division asks: how many groups of the divisor fit into the number?' }
  }

  if (level <= 8) {
    // Multi-digit multiply or order of operations
    if (Math.random() < 0.5) {
      const a = randInt(12, 48)
      const b = randInt(11, 25)
      const correct = a * b
      const prompt = `What is ${a} × ${b}?`
      const distractors = uniqueDistractors(correct, [
        a * (b + 1),
        (a + 1) * b,
        a * b + a,
        a * b - b,
        a * 10 + b,
      ])
      return { prompt, correct, distractors, tip: 'Break it up: multiply by tens and ones, then add.' }
    }
    const a = randInt(2, 8)
    const b = randInt(3, 9)
    const c = randInt(2, 6)
    const correct = a + b * c
    const prompt = `What is ${a} + ${b} × ${c}?`
    const distractors = uniqueDistractors(correct, [
      (a + b) * c,
      a * b + c,
      a + b + c,
      a * b * c,
      b * c - a,
    ])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Order of operations: multiply and divide before add and subtract (PEMDAS).',
    }
  }

  // Level 9–10: integers / multi-step
  const a = randInt(-20, 20)
  const b = randInt(-15, 15)
  const op = pick(['+', '-'])
  const correct = op === '+' ? a + b : a - b
  const fa = a < 0 ? `(${a})` : String(a)
  const fb = b < 0 ? `(${b})` : String(b)
  const prompt = `What is ${fa} ${op} ${fb}?`
  const distractors = uniqueDistractors(correct, [
    a + b,
    a - b,
    -(a + b),
    Math.abs(a) + Math.abs(b),
    a * b,
    correct + 2,
  ])
  return {
    prompt,
    correct,
    distractors,
    tip: 'With integers: subtracting a negative is like adding; adding a negative is like subtracting.',
  }
}

function genPlaceValue(level) {
  if (level <= 3) {
    const n = randInt(100, 999)
    const place = pick([
      { name: 'hundreds', value: Math.floor(n / 100) },
      { name: 'tens', value: Math.floor((n % 100) / 10) },
      { name: 'ones', value: n % 10 },
    ])
    const prompt = `In the number ${n}, what digit is in the ${place.name} place?`
    const digits = String(n).split('').map(Number)
    const distractors = uniqueDistractors(place.value, [...digits, place.value + 1, 0, 9])
    return {
      prompt,
      correct: place.value,
      distractors,
      tip: 'Hundreds | Tens | Ones — read from left to right.',
    }
  }

  if (level <= 6) {
    const n = randInt(1000, 99999)
    const places = [
      { name: 'ten-thousands', div: 10000 },
      { name: 'thousands', div: 1000 },
      { name: 'hundreds', div: 100 },
      { name: 'tens', div: 10 },
    ]
    const place = pick(places.filter((p) => n >= p.div))
    const digit = Math.floor(n / place.div) % 10
    const prompt = `In the number ${n.toLocaleString()}, what digit is in the ${place.name} place?`
    const distractors = uniqueDistractors(digit, [0, 1, 5, 9, digit + 1, digit - 1, Math.floor(n / 10) % 10])
    return {
      prompt,
      correct: digit,
      distractors,
      tip: 'Each place is 10 times the place to its right.',
    }
  }

  // Rounding
  const n = randInt(100, 9999)
  const roundTo = level >= 8 ? 100 : 10
  const correct = Math.round(n / roundTo) * roundTo
  const prompt = `Round ${n.toLocaleString()} to the nearest ${roundTo === 100 ? 'hundred' : 'ten'}.`
  const distractors = uniqueDistractors(correct, [
    Math.floor(n / roundTo) * roundTo,
    Math.ceil(n / roundTo) * roundTo,
    correct + roundTo,
    correct - roundTo,
    n,
  ])
  return {
    prompt,
    correct,
    distractors,
    tip: 'Look at the digit to the right of the place you are rounding. 5 or more → round up.',
  }
}

function genFractions(level) {
  if (level <= 3) {
    const d = pick([2, 3, 4, 5, 6, 8])
    const n = randInt(1, d - 1)
    const of = d * randInt(2, 6)
    const correct = (n / d) * of
    const prompt = `What is ${n}/${d} of ${of}?`
    const distractors = uniqueDistractors(correct, [of / d, n * of, of - n, correct + 1, of * n])
    return {
      prompt,
      correct,
      distractors,
      tip: `First find 1/${d} of ${of} (divide by ${d}), then multiply by ${n}.`,
    }
  }

  if (level <= 5) {
    // Equivalent fractions / compare
    if (Math.random() < 0.5) {
      const d = pick([2, 3, 4, 5, 6])
      const n = randInt(1, d - 1)
      const m = randInt(2, 5)
      const correct = formatFraction(n * m, d * m)
      const prompt = `Which fraction is equivalent to ${n}/${d}?`
      const distractors = uniqueDistractors(correct, [
        formatFraction(n + 1, d * m),
        formatFraction(n * m, d * m + 1),
        formatFraction(n, d * m),
        formatFraction(n * m + 1, d * m),
        `${n + m}/${d + m}`,
      ])
      return {
        prompt,
        correct,
        distractors,
        tip: 'Multiply (or divide) the numerator and denominator by the same number.',
      }
    }
    const d = pick([4, 5, 6, 8, 10])
    const n1 = randInt(1, d - 1)
    const n2 = randInt(1, d - 1)
    if (n1 === n2) return genFractions(level)
    const correct = n1 > n2 ? `${n1}/${d}` : `${n2}/${d}`
    const other = n1 > n2 ? `${n2}/${d}` : `${n1}/${d}`
    const prompt = `Which is greater: ${n1}/${d} or ${n2}/${d}?`
    const distractors = uniqueDistractors(correct, [other, 'They are equal', `${d}/${n1}`, '1'])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Same denominator? The larger numerator is the larger fraction.',
    }
  }

  if (level <= 7) {
    // Add/subtract like denominators
    const d = pick([5, 6, 8, 10, 12])
    const n1 = randInt(1, d - 2)
    const n2 = randInt(1, d - n1)
    const op = pick(['+', '-'])
    let cn, cd
    if (op === '+') {
      cn = n1 + n2
      cd = d
    } else {
      if (n1 < n2) return genFractions(level)
      cn = n1 - n2
      cd = d
    }
    const correct = formatFraction(cn, cd)
    const prompt = `What is ${n1}/${d} ${op} ${n2}/${d}?`
    const distractors = uniqueDistractors(correct, [
      formatFraction(n1 + n2, d * 2),
      formatFraction(Math.abs(n1 - n2), d * 2),
      formatFraction(n1 + n2, d + d),
      `${n1 + n2}/${d + d}`,
      formatFraction(cn + 1, cd),
      String(cn),
    ])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Same denominators: add or subtract the numerators; keep the denominator.',
    }
  }

  // Unlike denominators or multiply
  if (Math.random() < 0.5) {
    const n1 = randInt(1, 5)
    const d1 = randInt(n1 + 1, 8)
    const n2 = randInt(1, 5)
    const d2 = randInt(n2 + 1, 8)
    const cn = n1 * n2
    const cd = d1 * d2
    const correct = formatFraction(cn, cd)
    const prompt = `What is ${n1}/${d1} × ${n2}/${d2}?`
    const distractors = uniqueDistractors(correct, [
      formatFraction(n1 + n2, d1 + d2),
      formatFraction(n1 * n2, d1 + d2),
      formatFraction(n1 + n2, d1 * d2),
      formatFraction(n1 * d2, d1 * n2),
    ])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Multiply numerators together and denominators together, then simplify.',
    }
  }

  const d1 = pick([2, 3, 4, 5, 6])
  const d2 = pick([2, 3, 4, 5, 6].filter((x) => x !== d1))
  const n1 = randInt(1, d1 - 1)
  const n2 = randInt(1, d2 - 1)
  const lcm = (d1 * d2) / gcd(d1, d2)
  const cn = n1 * (lcm / d1) + n2 * (lcm / d2)
  const correct = formatFraction(cn, lcm)
  const prompt = `What is ${n1}/${d1} + ${n2}/${d2}?`
  const distractors = uniqueDistractors(correct, [
    formatFraction(n1 + n2, d1 + d2),
    formatFraction(n1 + n2, lcm),
    formatFraction(n1 * n2, lcm),
    `${n1 + n2}/${d1}`,
  ])
  return {
    prompt,
    correct,
    distractors,
    tip: 'Find a common denominator first, then add the numerators.',
  }
}

function genDecimals(level) {
  if (level <= 4) {
    const tenths = randInt(1, 9)
    const correct = (tenths / 10).toFixed(1)
    const prompt = `What is ${tenths}/10 as a decimal?`
    const distractors = uniqueDistractors(correct, [
      (tenths / 100).toFixed(2),
      String(tenths),
      (tenths * 10).toString(),
      `0.0${tenths}`,
      (1 + tenths / 10).toFixed(1),
    ])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Tenths are one place after the decimal point (0.1, 0.2, …).',
    }
  }

  if (level <= 6) {
    const a = (randInt(10, 99) / 10).toFixed(1)
    const b = (randInt(10, 99) / 10).toFixed(1)
    const op = pick(['+', '-'])
    const na = parseFloat(a)
    const nb = parseFloat(b)
    if (op === '-' && na < nb) return genDecimals(level)
    const correctNum = op === '+' ? na + nb : na - nb
    const correct = Number(correctNum.toFixed(1))
    const prompt = `What is ${a} ${op} ${b}?`
    const distractors = uniqueDistractors(correct, [
      Number((correctNum + 0.1).toFixed(1)),
      Number((correctNum - 0.1).toFixed(1)),
      Number((na + nb).toFixed(1)),
      Number((Math.abs(na - nb)).toFixed(1)),
      Number((correctNum + 1).toFixed(1)),
    ])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Line up the decimal points, then add or subtract like whole numbers.',
    }
  }

  // Multiply decimals or convert percent
  if (Math.random() < 0.5) {
    const a = (randInt(2, 9) / 10).toFixed(1)
    const b = randInt(2, 9)
    const correctNum = parseFloat(a) * b
    const correct = Number(correctNum.toFixed(1))
    const prompt = `What is ${a} × ${b}?`
    const distractors = uniqueDistractors(correct, [
      Number((correctNum + parseFloat(a)).toFixed(1)),
      b,
      Number((parseFloat(a) + b).toFixed(1)),
      Number((correctNum * 10).toFixed(0)),
    ])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Multiply as whole numbers, then place the decimal (count decimal places).',
    }
  }

  const p = pick([10, 20, 25, 50, 75])
  const whole = pick([20, 40, 80, 100, 200])
  const correct = (p / 100) * whole
  const prompt = `What is ${p}% of ${whole}?`
  const distractors = uniqueDistractors(correct, [p, whole - p, correct * 2, whole / p, p + whole])
  return {
    prompt,
    correct,
    distractors,
    tip: 'Percent means per 100. 25% = 0.25 or 1/4.',
  }
}

function genGeometry(level) {
  if (level <= 3) {
    const shapes = [
      { q: 'How many sides does a triangle have?', a: 3, d: [2, 4, 5] },
      { q: 'How many sides does a square have?', a: 4, d: [3, 5, 6] },
      { q: 'How many sides does a hexagon have?', a: 6, d: [5, 7, 8] },
      { q: 'How many vertices (corners) does a rectangle have?', a: 4, d: [2, 3, 5] },
      { q: 'How many right angles are in a square?', a: 4, d: [1, 2, 3] },
    ]
    const s = pick(shapes)
    return {
      prompt: s.q,
      correct: s.a,
      distractors: s.d,
      tip: 'Count sides and corners carefully. A square has 4 equal sides and 4 right angles.',
    }
  }

  if (level <= 5) {
    const l = randInt(3, 12)
    const w = randInt(2, 10)
    if (Math.random() < 0.5) {
      const correct = l * w
      const prompt = `A rectangle is ${l} units long and ${w} units wide. What is its area?`
      const distractors = uniqueDistractors(correct, [2 * (l + w), l + w, l * w + l, (l + w) * 2, l * 2])
      return {
        prompt,
        correct,
        distractors,
        tip: 'Area of a rectangle = length × width.',
      }
    }
    const correct = 2 * (l + w)
    const prompt = `A rectangle is ${l} units long and ${w} units wide. What is its perimeter?`
    const distractors = uniqueDistractors(correct, [l * w, l + w, 2 * l + w, 4 * l, l * 2])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Perimeter = distance around = 2 × (length + width).',
    }
  }

  if (level <= 7) {
    const s = randInt(2, 10)
    const correct = s * s
    const prompt = `What is the area of a square with side length ${s}?`
    const distractors = uniqueDistractors(correct, [4 * s, s * 2, s * s + s, 2 * s + 2 * s, s + s])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Area of a square = side × side (side²).',
    }
  }

  // Volume of rectangular prism
  const l = randInt(2, 8)
  const w = randInt(2, 6)
  const h = randInt(2, 6)
  const correct = l * w * h
  const prompt = `A box is ${l} cm long, ${w} cm wide, and ${h} cm tall. What is its volume (cm³)?`
  const distractors = uniqueDistractors(correct, [
    l * w,
    2 * (l * w + w * h + l * h),
    l + w + h,
    l * w + h,
    (l + w) * h,
  ])
  return {
    prompt,
    correct,
    distractors,
    tip: 'Volume of a rectangular prism = length × width × height.',
  }
}

function genWordProblems(level) {
  const names = ['Maya', 'Leo', 'Ava', 'Noah', 'Zoe', 'Eli', 'Mia', 'Kai']
  const name = pick(names)

  if (level <= 3) {
    const has = randInt(12, 40)
    const gets = randInt(5, 15)
    const correct = has + gets
    const prompt = `${name} has ${has} stickers and gets ${gets} more. How many stickers does ${name} have now?`
    const distractors = uniqueDistractors(correct, [has - gets, has * gets, gets, has + gets + 1, has])
    return {
      prompt,
      correct,
      distractors,
      tip: '“Gets more” means addition. Find the total.',
    }
  }

  if (level <= 5) {
    const packs = randInt(3, 9)
    const each = randInt(4, 12)
    const correct = packs * each
    const prompt = `${name} buys ${packs} packs of pencils with ${each} pencils in each pack. How many pencils in all?`
    const distractors = uniqueDistractors(correct, [packs + each, packs * each + packs, each, packs * 2])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Equal groups → multiply (packs × pencils per pack).',
    }
  }

  if (level <= 7) {
    const total = randInt(3, 8) * randInt(4, 12)
    const friends = randInt(3, 8)
    if (total % friends !== 0) return genWordProblems(level)
    const correct = total / friends
    const prompt = `${name} has ${total} cookies to share equally among ${friends} friends. How many does each friend get?`
    const distractors = uniqueDistractors(correct, [friends, total - friends, correct + 1, total + friends])
    return {
      prompt,
      correct,
      distractors,
      tip: '“Share equally” means divide the total by the number of groups.',
    }
  }

  const price = randInt(3, 12)
  const qty = randInt(2, 6)
  const paid = price * qty + randInt(5, 20)
  const correct = paid - price * qty
  const prompt = `${name} buys ${qty} notebooks for $${price} each and pays with $${paid}. How much change does ${name} get?`
  const distractors = uniqueDistractors(correct, [price * qty, paid, price, correct + price, paid - price])
  return {
    prompt,
    correct,
    distractors,
    tip: 'Total cost = price × quantity. Change = money paid − total cost.',
  }
}

function genRatios(level) {
  if (level <= 6) {
    const a = randInt(2, 8)
    const b = randInt(2, 8)
    const m = randInt(2, 5)
    const correct = `${a * m}:${b * m}`
    const prompt = `A ratio of ${a}:${b} is equivalent to which ratio?`
    const distractors = uniqueDistractors(correct, [
      `${a + m}:${b + m}`,
      `${a * m}:${b}`,
      `${a}:${b * m}`,
      `${a + 1}:${b + 1}`,
      `${b * m}:${a * m}`,
    ])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Equivalent ratios: multiply (or divide) both parts by the same number.',
    }
  }

  if (level <= 8) {
    const part = randInt(2, 6)
    const whole = part * randInt(3, 8)
    const correct = `${part}:${whole - part}`
    const prompt = `There are ${part} red marbles out of ${whole} marbles. What is the ratio of red to not-red?`
    const distractors = uniqueDistractors(correct, [
      `${part}:${whole}`,
      `${whole - part}:${part}`,
      `${part}:${part}`,
      `${whole}:${part}`,
    ])
    return {
      prompt,
      correct,
      distractors,
      tip: 'Part-to-part: red : (total − red). Simplify if you can.',
    }
  }

  const p = pick([10, 20, 25, 40, 50])
  const whole = pick([40, 50, 80, 100, 200])
  const correct = (p / 100) * whole
  const prompt = `What is ${p}% of ${whole}?`
  const distractors = uniqueDistractors(correct, [p, whole - correct, correct / 2, whole / 2, p + whole])
  return {
    prompt,
    correct,
    distractors,
    tip: 'Convert % to a decimal or fraction, then multiply by the whole.',
  }
}

const GENERATORS = {
  operations: genOperations,
  placeValue: genPlaceValue,
  fractions: genFractions,
  decimals: genDecimals,
  geometry: genGeometry,
  wordProblems: genWordProblems,
  ratios: genRatios,
}

/** Domains more likely at each grade band */
function domainWeights(level) {
  if (level <= 3) {
    return {
      operations: 3,
      placeValue: 2,
      fractions: 2,
      geometry: 2,
      wordProblems: 2,
      decimals: 1,
      ratios: 0,
    }
  }
  if (level <= 5) {
    return {
      operations: 2,
      placeValue: 2,
      fractions: 3,
      geometry: 2,
      wordProblems: 2,
      decimals: 2,
      ratios: 1,
    }
  }
  if (level <= 7) {
    return {
      operations: 2,
      placeValue: 1,
      fractions: 3,
      geometry: 2,
      wordProblems: 2,
      decimals: 3,
      ratios: 2,
    }
  }
  return {
    operations: 2,
    placeValue: 1,
    fractions: 2,
    geometry: 2,
    wordProblems: 2,
    decimals: 2,
    ratios: 3,
  }
}

function pickDomain(level, recentDomains = []) {
  const weights = domainWeights(level)
  const pool = []
  for (const [domain, w] of Object.entries(weights)) {
    if (w <= 0) continue
    // Slightly discourage immediate repeats
    const penalty = recentDomains.slice(-2).includes(domain) ? 0.4 : 1
    const n = Math.max(1, Math.round(w * 3 * penalty))
    for (let i = 0; i < n; i++) pool.push(domain)
  }
  return pick(pool.length ? pool : Object.keys(GENERATORS))
}

/**
 * Generate one adaptive question at the given difficulty level.
 */
export function generateQuestion(level, recentDomains = []) {
  const L = clampLevel(level)
  let domain = pickDomain(L, recentDomains)
  let raw
  try {
    raw = GENERATORS[domain](L)
  } catch {
    domain = 'operations'
    raw = genOperations(L)
  }

  // Ensure we got valid data; retry once on operations if needed
  if (!raw || raw.correct === undefined) {
    domain = 'operations'
    raw = genOperations(L)
  }

  const { options, correctIndex } = makeChoices(raw.correct, raw.distractors || [])

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    domain,
    level: L,
    prompt: raw.prompt,
    options,
    correctIndex,
    tip: raw.tip || '',
    letters: ['A', 'B', 'C', 'D'],
  }
}

export function adjustLevel(currentLevel, wasCorrect, streak) {
  let next = currentLevel
  if (wasCorrect) {
    // Climb faster on streaks (i-Ready-like)
    next += streak >= 3 ? 1.25 : streak >= 2 ? 1 : 0.75
  } else {
    next -= streak <= -2 ? 1.25 : 0.9
  }
  return Math.max(1, Math.min(10, next))
}

export function levelLabel(level) {
  const L = clampLevel(level)
  if (L <= 2) return 'Building'
  if (L <= 4) return 'Grade 3–4'
  if (L <= 6) return 'Grade 4–5'
  if (L <= 8) return 'Grade 5–6'
  return 'Challenge'
}
