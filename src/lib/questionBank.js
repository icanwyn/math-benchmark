import { makeChoices, randInt, pick, formatFraction, gcd } from './utils'

/**
 * Domains assessed across grades 3–8
 */
export const DOMAINS = {
  operations: { name: 'Operations', emoji: '➕', color: '#FF6B6B' },
  placeValue: { name: 'Place Value', emoji: '🔢', color: '#4ECDC4' },
  fractions: { name: 'Fractions', emoji: '🍕', color: '#FFE66D' },
  decimals: { name: 'Decimals', emoji: '📐', color: '#95E1D3' },
  geometry: { name: 'Geometry', emoji: '📏', color: '#A78BFA' },
  wordProblems: { name: 'Word Problems', emoji: '📖', color: '#F9A8D4' },
  ratios: { name: 'Ratios & Percents', emoji: '⚖️', color: '#60A5FA' },
  expressions: { name: 'Expressions & Equations', emoji: '🔤', color: '#34D399' },
}

/** Max adaptive difficulty (maps through grade 8+ challenge) */
export const MAX_LEVEL = 14
export const MIN_LEVEL = 1

/**
 * Difficulty levels 1–14 map roughly to grade bands:
 * 1–2 building · 3–4 Gr3 · 5–6 Gr4 · 7–8 Gr5 · 9–10 Gr6 · 11–12 Gr7 · 13–14 Gr8+
 */
export function startingLevel(grade) {
  const map = { 3: 3, 4: 5, 5: 7, 6: 9, 7: 11, 8: 12 }
  return map[grade] ?? 5
}

function clampLevel(level) {
  return Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, Math.round(level)))
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
    if (op === '-' && a < b) return genOperations(level)
    const correct = op === '+' ? a + b : a - b
    return {
      prompt: `What is ${a} ${op} ${b}?`,
      correct,
      distractors: uniqueDistractors(correct, [correct + 1, correct - 1, correct + 10, a + b, Math.abs(a - b)]),
      tip: 'Add or subtract carefully — watch the ones and tens places.',
    }
  }

  if (level <= 4) {
    const a = randInt(3, 12)
    const b = randInt(3, 12)
    const correct = a * b
    return {
      prompt: `What is ${a} × ${b}?`,
      correct,
      distractors: uniqueDistractors(correct, [a * b + a, a + b, a * (b + 1), (a - 1) * b, a * b + 1]),
      tip: 'Use your multiplication facts or skip-count.',
    }
  }

  if (level <= 6) {
    const b = randInt(2, 12)
    const q = randInt(4, 25)
    const a = b * q
    return {
      prompt: `What is ${a} ÷ ${b}?`,
      correct: q,
      distractors: uniqueDistractors(q, [q + 1, q - 1, q + 2, a - b, b]),
      tip: 'Division asks: how many groups of the divisor fit into the number?',
    }
  }

  if (level <= 8) {
    if (Math.random() < 0.5) {
      const a = randInt(12, 48)
      const b = randInt(11, 25)
      const correct = a * b
      return {
        prompt: `What is ${a} × ${b}?`,
        correct,
        distractors: uniqueDistractors(correct, [a * (b + 1), (a + 1) * b, a * b + a, a * 10 + b]),
        tip: 'Break it up: multiply by tens and ones, then add.',
      }
    }
    const a = randInt(2, 8)
    const b = randInt(3, 9)
    const c = randInt(2, 6)
    const correct = a + b * c
    return {
      prompt: `What is ${a} + ${b} × ${c}?`,
      correct,
      distractors: uniqueDistractors(correct, [(a + b) * c, a * b + c, a + b + c, a * b * c]),
      tip: 'Order of operations: multiply and divide before add and subtract (PEMDAS).',
    }
  }

  if (level <= 10) {
    // Integers
    const a = randInt(-20, 20)
    const b = randInt(-15, 15)
    if (a === 0 && b === 0) return genOperations(level)
    const op = pick(['+', '-', '×'])
    let correct
    if (op === '+') correct = a + b
    else if (op === '-') correct = a - b
    else correct = a * b
    const fa = a < 0 ? `(${a})` : String(a)
    const fb = b < 0 ? `(${b})` : String(b)
    return {
      prompt: `What is ${fa} ${op} ${fb}?`,
      correct,
      distractors: uniqueDistractors(correct, [a + b, a - b, -(a + b), Math.abs(a) + Math.abs(b), a * b, correct + 2]),
      tip: 'Integer rules: same signs multiply to positive; different signs to negative. Subtracting a negative is adding.',
    }
  }

  if (level <= 12) {
    // Exponents / absolute value / multi-step order
    const kind = pick(['exp', 'abs', 'pemdas'])
    if (kind === 'exp') {
      const base = randInt(2, 6)
      const exp = randInt(2, 4)
      const correct = base ** exp
      return {
        prompt: `What is ${base}^${exp}?`,
        correct,
        distractors: uniqueDistractors(correct, [base * exp, base + exp, base ** (exp - 1), (base + 1) ** exp, base * base]),
        tip: 'An exponent is repeated multiplication: a^n means a multiplied by itself n times.',
      }
    }
    if (kind === 'abs') {
      const n = randInt(-30, -1)
      const correct = Math.abs(n)
      return {
        prompt: `What is |${n}|?`,
        correct,
        distractors: uniqueDistractors(correct, [n, -n - 1, n - 1, 0]),
        tip: 'Absolute value is distance from zero — always non-negative.',
      }
    }
    const a = randInt(2, 6)
    const b = randInt(2, 5)
    const c = randInt(2, 6)
    const correct = (a + b) * c
    return {
      prompt: `What is (${a} + ${b}) × ${c}?`,
      correct,
      distractors: uniqueDistractors(correct, [a + b * c, a * b * c, a + b + c, a * c + b]),
      tip: 'Parentheses first, then multiply.',
    }
  }

  // Level 13–14: scientific-ish powers of 10, square roots of perfect squares, multi-op integers
  const kind = pick(['sqrt', 'power10', 'intMulti'])
  if (kind === 'sqrt') {
    const root = randInt(4, 15)
    const n = root * root
    return {
      prompt: `What is √${n}?`,
      correct: root,
      distractors: uniqueDistractors(root, [root + 1, root - 1, n / 2, root * 2, Math.floor(n / 4)]),
      tip: 'Square root asks: what number times itself equals this? √(k²) = k (for k ≥ 0).',
    }
  }
  if (kind === 'power10') {
    const exp = randInt(2, 5)
    const correct = 10 ** exp
    return {
      prompt: `What is 10^${exp}?`,
      correct,
      distractors: uniqueDistractors(correct, [10 * exp, 10 ** (exp - 1), 10 + exp, exp * 100]),
      tip: '10^n is 1 followed by n zeros (for whole-number n ≥ 0).',
    }
  }
  const a = randInt(-12, 12)
  const b = randInt(2, 8)
  const c = randInt(-9, 9)
  const correct = a * b + c
  const fa = a < 0 ? `(${a})` : String(a)
  return {
    prompt: `What is ${fa} × ${b} ${c < 0 ? '−' : '+'} ${Math.abs(c)}?`,
    correct,
    distractors: uniqueDistractors(correct, [a + b + c, a * b - c, (a + b) * c, a * (b + c), correct + b]),
    tip: 'Multiply first, then add or subtract. Watch integer signs carefully.',
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
    const digits = String(n).split('').map(Number)
    return {
      prompt: `In the number ${n}, what digit is in the ${place.name} place?`,
      correct: place.value,
      distractors: uniqueDistractors(place.value, [...digits, place.value + 1, 0, 9]),
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
    return {
      prompt: `In the number ${n.toLocaleString()}, what digit is in the ${place.name} place?`,
      correct: digit,
      distractors: uniqueDistractors(digit, [0, 1, 5, 9, digit + 1, digit - 1]),
      tip: 'Each place is 10 times the place to its right.',
    }
  }

  if (level <= 9) {
    const n = randInt(100, 9999)
    const roundTo = level >= 8 ? 100 : 10
    const correct = Math.round(n / roundTo) * roundTo
    return {
      prompt: `Round ${n.toLocaleString()} to the nearest ${roundTo === 100 ? 'hundred' : 'ten'}.`,
      correct,
      distractors: uniqueDistractors(correct, [
        Math.floor(n / roundTo) * roundTo,
        correct + roundTo,
        correct - roundTo,
        n,
      ]),
      tip: 'Look at the digit to the right of the place you are rounding. 5 or more → round up.',
    }
  }

  if (level <= 12) {
    // Scientific notation: convert
    const coeff = randInt(11, 99) / 10 // 1.1–9.9
    const exp = randInt(3, 6)
    const n = Math.round(coeff * 10 ** exp)
    // Ask for coefficient when written as a.b × 10^e
    const cStr = (n / 10 ** exp).toFixed(1)
    if (Math.random() < 0.5) {
      return {
        prompt: `Which is ${n.toLocaleString()} in scientific notation?`,
        correct: `${cStr} × 10^${exp}`,
        distractors: uniqueDistractors(`${cStr} × 10^${exp}`, [
          `${cStr} × 10^${exp + 1}`,
          `${(n / 10 ** (exp - 1)).toFixed(1)} × 10^${exp - 1}`,
          `${n} × 10^0`,
          `${cStr} × 10^${exp - 1}`,
        ]),
        tip: 'Scientific notation is a number 1 ≤ |a| < 10 times a power of 10.',
      }
    }
    return {
      prompt: `What is ${cStr} × 10^${exp} as a whole number?`,
      correct: n,
      distractors: uniqueDistractors(n, [n * 10, Math.round(n / 10), n + exp, Math.round(parseFloat(cStr) * exp)]),
      tip: 'Multiply the coefficient by 10^exp (move the decimal exp places right).',
    }
  }

  // Level 13–14: compare scientific notation / place value of decimals in large numbers
  const exp1 = randInt(4, 7)
  const exp2 = exp1 + pick([-1, 0, 1])
  const a = (randInt(20, 90) / 10).toFixed(1)
  const b = (randInt(20, 90) / 10).toFixed(1)
  const v1 = parseFloat(a) * 10 ** exp1
  const v2 = parseFloat(b) * 10 ** exp2
  const correct = v1 > v2 ? `${a} × 10^${exp1}` : v2 > v1 ? `${b} × 10^${exp2}` : 'They are equal'
  return {
    prompt: `Which is greater: ${a} × 10^${exp1} or ${b} × 10^${exp2}?`,
    correct,
    distractors: uniqueDistractors(correct, [
      `${a} × 10^${exp1}`,
      `${b} × 10^${exp2}`,
      'They are equal',
      `${a} × 10^${exp2}`,
    ]),
    tip: 'Compare exponents first when bases are powers of 10; if equal, compare coefficients.',
  }
}

function genFractions(level) {
  if (level <= 3) {
    const d = pick([2, 3, 4, 5, 6, 8])
    const n = randInt(1, d - 1)
    const of = d * randInt(2, 6)
    const correct = (n / d) * of
    return {
      prompt: `What is ${n}/${d} of ${of}?`,
      correct,
      distractors: uniqueDistractors(correct, [of / d, n * of, of - n, correct + 1]),
      tip: `First find 1/${d} of ${of} (divide by ${d}), then multiply by ${n}.`,
    }
  }

  if (level <= 5) {
    if (Math.random() < 0.5) {
      const d = pick([2, 3, 4, 5, 6])
      const n = randInt(1, d - 1)
      const m = randInt(2, 5)
      const correct = formatFraction(n * m, d * m)
      return {
        prompt: `Which fraction is equivalent to ${n}/${d}?`,
        correct,
        distractors: uniqueDistractors(correct, [
          formatFraction(n + 1, d * m),
          formatFraction(n * m, d * m + 1),
          formatFraction(n, d * m),
          `${n + m}/${d + m}`,
        ]),
        tip: 'Multiply (or divide) the numerator and denominator by the same number.',
      }
    }
    const d = pick([4, 5, 6, 8, 10])
    const n1 = randInt(1, d - 1)
    const n2 = randInt(1, d - 1)
    if (n1 === n2) return genFractions(level)
    const correct = n1 > n2 ? `${n1}/${d}` : `${n2}/${d}`
    const other = n1 > n2 ? `${n2}/${d}` : `${n1}/${d}`
    return {
      prompt: `Which is greater: ${n1}/${d} or ${n2}/${d}?`,
      correct,
      distractors: uniqueDistractors(correct, [other, 'They are equal', `${d}/${n1}`, '1']),
      tip: 'Same denominator? The larger numerator is the larger fraction.',
    }
  }

  if (level <= 7) {
    const d = pick([5, 6, 8, 10, 12])
    const n1 = randInt(1, d - 2)
    const n2 = randInt(1, d - n1)
    const op = pick(['+', '-'])
    if (op === '-' && n1 < n2) return genFractions(level)
    const cn = op === '+' ? n1 + n2 : n1 - n2
    const correct = formatFraction(cn, d)
    return {
      prompt: `What is ${n1}/${d} ${op} ${n2}/${d}?`,
      correct,
      distractors: uniqueDistractors(correct, [
        formatFraction(n1 + n2, d * 2),
        formatFraction(Math.abs(n1 - n2), d * 2),
        `${n1 + n2}/${d + d}`,
        String(cn),
      ]),
      tip: 'Same denominators: add or subtract the numerators; keep the denominator.',
    }
  }

  if (level <= 10) {
    if (Math.random() < 0.5) {
      const n1 = randInt(1, 5)
      const d1 = randInt(n1 + 1, 8)
      const n2 = randInt(1, 5)
      const d2 = randInt(n2 + 1, 8)
      const correct = formatFraction(n1 * n2, d1 * d2)
      return {
        prompt: `What is ${n1}/${d1} × ${n2}/${d2}?`,
        correct,
        distractors: uniqueDistractors(correct, [
          formatFraction(n1 + n2, d1 + d2),
          formatFraction(n1 * n2, d1 + d2),
          formatFraction(n1 + n2, d1 * d2),
        ]),
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
    return {
      prompt: `What is ${n1}/${d1} + ${n2}/${d2}?`,
      correct,
      distractors: uniqueDistractors(correct, [
        formatFraction(n1 + n2, d1 + d2),
        formatFraction(n1 + n2, lcm),
        formatFraction(n1 * n2, lcm),
      ]),
      tip: 'Find a common denominator first, then add the numerators.',
    }
  }

  if (level <= 12) {
    // Divide fractions
    const n1 = randInt(1, 6)
    const d1 = randInt(n1 + 1, 9)
    const n2 = randInt(1, 6)
    const d2 = randInt(n2 + 1, 9)
    const correct = formatFraction(n1 * d2, d1 * n2)
    return {
      prompt: `What is ${n1}/${d1} ÷ ${n2}/${d2}?`,
      correct,
      distractors: uniqueDistractors(correct, [
        formatFraction(n1 * n2, d1 * d2),
        formatFraction(n1 * n2, d1 * d2),
        formatFraction(d1 * n2, n1 * d2),
        formatFraction(n1 * d2, d1 + n2),
      ]),
      tip: 'Dividing by a fraction = multiply by its reciprocal (keep-change-flip).',
    }
  }

  // Level 13–14: mixed numbers / complex fraction ops
  const w = randInt(1, 4)
  const n = randInt(1, 3)
  const d = randInt(n + 1, 6)
  // Convert mixed to improper
  const improper = w * d + n
  if (Math.random() < 0.5) {
    return {
      prompt: `Convert ${w} ${n}/${d} to an improper fraction.`,
      correct: `${improper}/${d}`,
      distractors: uniqueDistractors(`${improper}/${d}`, [
        `${w * n}/${d}`,
        `${w + n}/${d}`,
        `${improper}/${d + w}`,
        `${w}/${d}`,
      ]),
      tip: 'Improper = (whole × denominator) + numerator, over the same denominator.',
    }
  }
  return {
    prompt: `What is ${improper}/${d} as a mixed number?`,
    correct: `${w} ${n}/${d}`,
    distractors: uniqueDistractors(`${w} ${n}/${d}`, [
      `${w + 1} ${n}/${d}`,
      `${w} ${n}/${d + 1}`,
      `${n} ${w}/${d}`,
      `${improper}/${d}`,
    ]),
    tip: 'Divide numerator by denominator: quotient is the whole number, remainder over denominator.',
  }
}

function genDecimals(level) {
  if (level <= 4) {
    const tenths = randInt(1, 9)
    const correct = (tenths / 10).toFixed(1)
    return {
      prompt: `What is ${tenths}/10 as a decimal?`,
      correct,
      distractors: uniqueDistractors(correct, [(tenths / 100).toFixed(2), String(tenths), `0.0${tenths}`]),
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
    return {
      prompt: `What is ${a} ${op} ${b}?`,
      correct,
      distractors: uniqueDistractors(correct, [
        Number((correctNum + 0.1).toFixed(1)),
        Number((correctNum - 0.1).toFixed(1)),
        Number((na + nb).toFixed(1)),
      ]),
      tip: 'Line up the decimal points, then add or subtract like whole numbers.',
    }
  }

  if (level <= 9) {
    if (Math.random() < 0.5) {
      const a = (randInt(2, 9) / 10).toFixed(1)
      const b = randInt(2, 9)
      const correct = Number((parseFloat(a) * b).toFixed(1))
      return {
        prompt: `What is ${a} × ${b}?`,
        correct,
        distractors: uniqueDistractors(correct, [b, Number((parseFloat(a) + b).toFixed(1)), Number((correct * 10).toFixed(0))]),
        tip: 'Multiply as whole numbers, then place the decimal (count decimal places).',
      }
    }
    const p = pick([10, 20, 25, 50, 75])
    const whole = pick([20, 40, 80, 100, 200])
    const correct = (p / 100) * whole
    return {
      prompt: `What is ${p}% of ${whole}?`,
      correct,
      distractors: uniqueDistractors(correct, [p, whole - p, correct * 2, whole / 2]),
      tip: 'Percent means per 100. 25% = 0.25 or 1/4.',
    }
  }

  if (level <= 12) {
    // Decimal ÷ or percent increase / multi-step
    if (Math.random() < 0.5) {
      const b = pick([0.2, 0.25, 0.5, 0.4, 0.1])
      const q = randInt(2, 12)
      const a = Number((b * q).toFixed(2))
      return {
        prompt: `What is ${a} ÷ ${b}?`,
        correct: q,
        distractors: uniqueDistractors(q, [q + 1, q - 1, a, Math.round(a * b)]),
        tip: 'Dividing by a decimal: multiply both numbers by 10 or 100 to make the divisor a whole number.',
      }
    }
    const price = randInt(20, 80)
    const pct = pick([10, 15, 20, 25])
    const correct = price + (price * pct) / 100
    return {
      prompt: `A jacket costs $${price}. After a ${pct}% increase, what is the new price?`,
      correct,
      distractors: uniqueDistractors(correct, [price - (price * pct) / 100, (price * pct) / 100, price + pct, price * pct]),
      tip: 'New amount = original + (percent as decimal × original), or original × (1 + r).',
    }
  }

  // Rational ops / repeating awareness via simple conversion
  const p = pick([12, 15, 18, 24, 36])
  const whole = pick([50, 80, 120, 150, 200])
  const correct = Number(((p / 100) * whole).toFixed(1))
  // often integer
  const correctInt = (p / 100) * whole
  return {
    prompt: `What is ${p}% of ${whole}?`,
    correct: Number.isInteger(correctInt) ? correctInt : correct,
    distractors: uniqueDistractors(Number.isInteger(correctInt) ? correctInt : correct, [
      p,
      whole - correctInt,
      correctInt * 2,
      Math.round(whole * (p / 10)),
    ]),
    tip: 'Convert percent to decimal (÷ 100), then multiply by the whole.',
  }
}

function genGeometry(level) {
  if (level <= 3) {
    const shapes = [
      { q: 'How many sides does a triangle have?', a: 3, d: [2, 4, 5] },
      { q: 'How many sides does a square have?', a: 4, d: [3, 5, 6] },
      { q: 'How many sides does a hexagon have?', a: 6, d: [5, 7, 8] },
      { q: 'How many vertices (corners) does a rectangle have?', a: 4, d: [2, 3, 5] },
    ]
    const s = pick(shapes)
    return { prompt: s.q, correct: s.a, distractors: s.d, tip: 'Count sides and corners carefully.' }
  }

  if (level <= 5) {
    const l = randInt(3, 12)
    const w = randInt(2, 10)
    if (Math.random() < 0.5) {
      return {
        prompt: `A rectangle is ${l} units long and ${w} units wide. What is its area?`,
        correct: l * w,
        distractors: uniqueDistractors(l * w, [2 * (l + w), l + w, l * w + l]),
        tip: 'Area of a rectangle = length × width.',
      }
    }
    return {
      prompt: `A rectangle is ${l} units long and ${w} units wide. What is its perimeter?`,
      correct: 2 * (l + w),
      distractors: uniqueDistractors(2 * (l + w), [l * w, l + w, 2 * l + w]),
      tip: 'Perimeter = 2 × (length + width).',
    }
  }

  if (level <= 8) {
    if (Math.random() < 0.5) {
      const s = randInt(2, 10)
      return {
        prompt: `What is the area of a square with side length ${s}?`,
        correct: s * s,
        distractors: uniqueDistractors(s * s, [4 * s, s * 2, s * s + s]),
        tip: 'Area of a square = side × side (side²).',
      }
    }
    const l = randInt(2, 8)
    const w = randInt(2, 6)
    const h = randInt(2, 6)
    return {
      prompt: `A box is ${l} cm long, ${w} cm wide, and ${h} cm tall. What is its volume (cm³)?`,
      correct: l * w * h,
      distractors: uniqueDistractors(l * w * h, [l * w, 2 * (l * w + w * h + l * h), l + w + h]),
      tip: 'Volume of a rectangular prism = length × width × height.',
    }
  }

  if (level <= 11) {
    // Circles or triangle area or angle facts
    const kind = pick(['circle', 'tri', 'angle'])
    if (kind === 'circle') {
      const r = randInt(2, 10)
      if (Math.random() < 0.5) {
        return {
          prompt: `A circle has radius ${r}. What is its diameter?`,
          correct: 2 * r,
          distractors: uniqueDistractors(2 * r, [r, r * r, 3 * r, Math.PI.toFixed(0)]),
          tip: 'Diameter = 2 × radius.',
        }
      }
      // Use π ≈ 3.14 for circumference; ask integer when possible with π as 3
      const correct = 2 * 3 * r // approximate with π=3 for clean MC
      return {
        prompt: `Using π ≈ 3, what is the circumference of a circle with radius ${r}?`,
        correct,
        distractors: uniqueDistractors(correct, [3 * r, 2 * r, 3 * r * r, 2 * 3 * r + r]),
        tip: 'Circumference = 2πr (or πd). Here use π ≈ 3.',
      }
    }
    if (kind === 'tri') {
      const b = randInt(4, 16)
      const h = randInt(3, 12)
      const correct = (b * h) / 2
      if (!Number.isInteger(correct)) return genGeometry(level)
      return {
        prompt: `What is the area of a triangle with base ${b} and height ${h}?`,
        correct,
        distractors: uniqueDistractors(correct, [b * h, b + h, (b * h) / 4, 2 * (b + h)]),
        tip: 'Area of a triangle = (1/2) × base × height.',
      }
    }
    const a1 = randInt(30, 120)
    const correct = 180 - a1
    return {
      prompt: `Two angles form a straight line. One measures ${a1}°. What is the other?`,
      correct,
      distractors: uniqueDistractors(correct, [90 - (a1 % 90), 180 + a1, 360 - a1, a1]),
      tip: 'Supplementary angles on a straight line add to 180°.',
    }
  }

  // Level 12–14: Pythagorean theorem (nice triples)
  const triples = [
    [3, 4, 5],
    [5, 12, 13],
    [6, 8, 10],
    [7, 24, 25],
    [8, 15, 17],
    [9, 12, 15],
  ]
  const [a, b, c] = pick(triples)
  const scale = level >= 13 ? randInt(1, 3) : 1
  const A = a * scale
  const B = b * scale
  const C = c * scale
  const miss = pick(['hyp', 'leg'])
  if (miss === 'hyp') {
    return {
      prompt: `A right triangle has legs ${A} and ${B}. What is the hypotenuse?`,
      correct: C,
      distractors: uniqueDistractors(C, [A + B, A * B, C - 1, Math.abs(A - B), A + B - 1]),
      tip: 'Pythagorean theorem: a² + b² = c². The hypotenuse is the longest side opposite the right angle.',
    }
  }
  // find missing leg
  return {
    prompt: `A right triangle has hypotenuse ${C} and one leg ${A}. What is the other leg?`,
    correct: B,
    distractors: uniqueDistractors(B, [C - A, C + A, A, C, B + 1]),
    tip: 'Rearrange a² + b² = c² → b² = c² − a², then take the square root.',
  }
}

function genWordProblems(level) {
  const names = ['Maya', 'Leo', 'Ava', 'Noah', 'Zoe', 'Eli', 'Mia', 'Kai', 'Jordan', 'Sam']
  const name = pick(names)

  if (level <= 3) {
    const has = randInt(12, 40)
    const gets = randInt(5, 15)
    return {
      prompt: `${name} has ${has} stickers and gets ${gets} more. How many stickers does ${name} have now?`,
      correct: has + gets,
      distractors: uniqueDistractors(has + gets, [has - gets, has * gets, gets]),
      tip: '“Gets more” means addition. Find the total.',
    }
  }

  if (level <= 5) {
    const packs = randInt(3, 9)
    const each = randInt(4, 12)
    return {
      prompt: `${name} buys ${packs} packs of pencils with ${each} pencils in each pack. How many pencils in all?`,
      correct: packs * each,
      distractors: uniqueDistractors(packs * each, [packs + each, each, packs * 2]),
      tip: 'Equal groups → multiply (packs × pencils per pack).',
    }
  }

  if (level <= 8) {
    const total = randInt(3, 8) * randInt(4, 12)
    const friends = randInt(3, 8)
    if (total % friends !== 0) return genWordProblems(level)
    return {
      prompt: `${name} has ${total} cookies to share equally among ${friends} friends. How many does each friend get?`,
      correct: total / friends,
      distractors: uniqueDistractors(total / friends, [friends, total - friends, total / friends + 1]),
      tip: '“Share equally” means divide the total by the number of groups.',
    }
  }

  if (level <= 10) {
    const price = randInt(3, 12)
    const qty = randInt(2, 6)
    const paid = price * qty + randInt(5, 20)
    return {
      prompt: `${name} buys ${qty} notebooks for $${price} each and pays with $${paid}. How much change does ${name} get?`,
      correct: paid - price * qty,
      distractors: uniqueDistractors(paid - price * qty, [price * qty, paid, price]),
      tip: 'Total cost = price × quantity. Change = money paid − total cost.',
    }
  }

  if (level <= 12) {
    // Rate / unit rate / multi-step percent
    if (Math.random() < 0.5) {
      const hours = randInt(2, 6)
      const perHour = randInt(4, 15)
      const total = hours * perHour
      return {
        prompt: `${name} types ${total} pages in ${hours} hours at a constant rate. How many pages per hour?`,
        correct: perHour,
        distractors: uniqueDistractors(perHour, [total, hours, total - hours, perHour + hours]),
        tip: 'Unit rate = total ÷ time (or ÷ second quantity).',
      }
    }
    const price = randInt(40, 120)
    const off = pick([10, 15, 20, 25, 30])
    const correct = price - (price * off) / 100
    return {
      prompt: `A game costs $${price} and is ${off}% off. What is the sale price?`,
      correct,
      distractors: uniqueDistractors(correct, [(price * off) / 100, price + (price * off) / 100, price - off, price]),
      tip: 'Discount amount = percent × original. Sale price = original − discount.',
    }
  }

  // Linear situation: distance = rate × time or simple interest-like
  const rate = randInt(35, 65)
  const time = randInt(2, 5)
  const correct = rate * time
  return {
    prompt: `A train travels at ${rate} mph for ${time} hours. How far does it go (miles)?`,
    correct,
    distractors: uniqueDistractors(correct, [rate + time, rate - time, rate * time + rate, Math.round(rate / time)]),
    tip: 'Distance = rate × time (d = rt).',
  }
}

function genRatios(level) {
  if (level <= 6) {
    const a = randInt(2, 8)
    const b = randInt(2, 8)
    const m = randInt(2, 5)
    const correct = `${a * m}:${b * m}`
    return {
      prompt: `A ratio of ${a}:${b} is equivalent to which ratio?`,
      correct,
      distractors: uniqueDistractors(correct, [`${a + m}:${b + m}`, `${a * m}:${b}`, `${a}:${b * m}`, `${b * m}:${a * m}`]),
      tip: 'Equivalent ratios: multiply (or divide) both parts by the same number.',
    }
  }

  if (level <= 9) {
    const part = randInt(2, 6)
    const whole = part * randInt(3, 8)
    const correct = `${part}:${whole - part}`
    return {
      prompt: `There are ${part} red marbles out of ${whole} marbles. What is the ratio of red to not-red?`,
      correct,
      distractors: uniqueDistractors(correct, [`${part}:${whole}`, `${whole - part}:${part}`, `${whole}:${part}`]),
      tip: 'Part-to-part: red : (total − red).',
    }
  }

  if (level <= 11) {
    const p = pick([10, 20, 25, 40, 50, 15, 30])
    const whole = pick([40, 50, 80, 100, 200, 60])
    const correct = (p / 100) * whole
    if (!Number.isInteger(correct)) return genRatios(level)
    return {
      prompt: `What is ${p}% of ${whole}?`,
      correct,
      distractors: uniqueDistractors(correct, [p, whole - correct, correct / 2, whole / 2]),
      tip: 'Convert % to a decimal or fraction, then multiply by the whole.',
    }
  }

  if (level <= 12) {
    // Proportion: a/b = c/x
    const a = randInt(2, 9)
    const b = randInt(2, 9)
    const k = randInt(2, 6)
    const c = a * k
    const correct = b * k
    return {
      prompt: `Solve the proportion: ${a}/${b} = ${c}/x. What is x?`,
      correct,
      distractors: uniqueDistractors(correct, [c, a * b, b * c, correct + a, k]),
      tip: 'Cross-multiply: a · x = b · c, so x = (b · c) / a. Or scale the ratio by the same factor.',
    }
  }

  // Constant of proportionality / percent change
  if (Math.random() < 0.5) {
    const k = randInt(2, 9)
    const x = randInt(3, 12)
    const y = k * x
    return {
      prompt: `y is proportional to x with y = ${y} when x = ${x}. What is the constant k in y = kx?`,
      correct: k,
      distractors: uniqueDistractors(k, [y, x, y + x, y - x, k + 1]),
      tip: 'If y = kx, then k = y/x (constant of proportionality).',
    }
  }
  const oldVal = randInt(40, 100)
  const newVal = oldVal + pick([10, 15, 20, 25, 30])
  const correct = Math.round(((newVal - oldVal) / oldVal) * 100)
  return {
    prompt: `A value increases from ${oldVal} to ${newVal}. What is the percent increase?`,
    correct: `${correct}%`,
    distractors: uniqueDistractors(`${correct}%`, [
      `${newVal - oldVal}%`,
      `${Math.round((newVal / oldVal) * 100)}%`,
      `${correct + 5}%`,
      `${100 - correct}%`,
    ]),
    tip: 'Percent change = (new − old) / old × 100%.',
  }
}

function genExpressions(level) {
  // Grades 6–8 focus; still usable when adaptive climbs
  if (level <= 8) {
    // Evaluate simple expression
    const x = randInt(2, 9)
    const a = randInt(2, 6)
    const b = randInt(1, 10)
    const correct = a * x + b
    return {
      prompt: `If x = ${x}, what is ${a}x + ${b}?`,
      correct,
      distractors: uniqueDistractors(correct, [a + x + b, a * x - b, a + x * b, (a + b) * x]),
      tip: 'Replace x with the number, then multiply before adding (order of operations).',
    }
  }

  if (level <= 10) {
    // One-step equation
    if (Math.random() < 0.5) {
      const x = randInt(3, 15)
      const a = randInt(2, 9)
      const b = a * x
      return {
        prompt: `Solve for x: ${a}x = ${b}`,
        correct: x,
        distractors: uniqueDistractors(x, [b, a, b - a, b + a, x + 1]),
        tip: 'Divide both sides by the coefficient of x.',
      }
    }
    const x = randInt(5, 30)
    const a = randInt(3, 20)
    const b = x + a
    return {
      prompt: `Solve for x: x + ${a} = ${b}`,
      correct: x,
      distractors: uniqueDistractors(x, [b + a, a, b, x + a]),
      tip: 'Undo addition by subtracting the same number from both sides.',
    }
  }

  if (level <= 12) {
    // Two-step equation
    const x = randInt(2, 12)
    const a = randInt(2, 8)
    const b = randInt(1, 15)
    const c = a * x + b
    return {
      prompt: `Solve for x: ${a}x + ${b} = ${c}`,
      correct: x,
      distractors: uniqueDistractors(x, [c - b, c / a, a + b, x + 1, Math.round(c / a - b)]),
      tip: 'Two-step: subtract/add to isolate the ax term, then divide by a.',
    }
  }

  // Level 13–14: distribute / combine like terms / inequality simple
  const kind = pick(['distribute', 'combine', 'inequality'])
  if (kind === 'distribute') {
    const a = randInt(2, 6)
    const b = randInt(1, 9)
    const c = randInt(1, 8)
    // a(b + c) = ab + ac — ask for simplified value of expression a(x+c) when x=b... or simplify coefficient
    const correct = a * b + a * c
    return {
      prompt: `Simplify: ${a}(${b} + ${c})`,
      correct,
      distractors: uniqueDistractors(correct, [a * b + c, a + b + c, a * (b + c) + a, a * b * c]),
      tip: 'Distribute: multiply the outside number by each term inside the parentheses.',
    }
  }
  if (kind === 'combine') {
    const a = randInt(2, 8)
    const b = randInt(1, 7)
    const c = randInt(2, 8)
    const d = randInt(1, 6)
    // (a x + b) + (c x + d) → (a+c)x + (b+d) — ask coefficient of x
    const correct = `${a + c}x + ${b + d}`
    return {
      prompt: `Combine like terms: ${a}x + ${b} + ${c}x + ${d}`,
      correct,
      distractors: uniqueDistractors(correct, [
        `${a + c}x + ${b * d}`,
        `${a * c}x + ${b + d}`,
        `${a + b + c + d}x`,
        `${a + c}x − ${b + d}`,
      ]),
      tip: 'Add coefficients of like terms (the x terms together, constants together).',
    }
  }
  const x = randInt(3, 10)
  const a = randInt(2, 5)
  const b = a * x + randInt(1, 5)
  // a x < b → x < b/a — ask largest integer x if a x < b with known
  const maxInt = Math.ceil(b / a) - 1
  return {
    prompt: `What is the largest integer x that satisfies ${a}x < ${b}?`,
    correct: maxInt,
    distractors: uniqueDistractors(maxInt, [maxInt + 1, maxInt - 1, Math.floor(b / a), b - a]),
    tip: 'Solve like an equation, then test integers. Inequality direction stays the same when dividing by a positive number.',
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
  expressions: genExpressions,
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
      expressions: 0,
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
      expressions: 0,
    }
  }
  if (level <= 8) {
    return {
      operations: 2,
      placeValue: 1,
      fractions: 3,
      geometry: 2,
      wordProblems: 2,
      decimals: 3,
      ratios: 2,
      expressions: 1,
    }
  }
  if (level <= 11) {
    // Grade 6–7
    return {
      operations: 2,
      placeValue: 1,
      fractions: 2,
      geometry: 2,
      wordProblems: 2,
      decimals: 2,
      ratios: 3,
      expressions: 3,
    }
  }
  // Grade 7–8 challenge
  return {
    operations: 2,
    placeValue: 1,
    fractions: 2,
    geometry: 3,
    wordProblems: 2,
    decimals: 1,
    ratios: 3,
    expressions: 4,
  }
}

function pickDomain(level, recentDomains = []) {
  const weights = domainWeights(level)
  const pool = []
  for (const [domain, w] of Object.entries(weights)) {
    if (w <= 0) continue
    const penalty = recentDomains.slice(-2).includes(domain) ? 0.35 : 1
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

/**
 * i-Ready-style adaptive step: climb on success (faster with streaks),
 * drop on misses. Fractional levels allow smoother movement across 3–8.
 */
export function adjustLevel(currentLevel, wasCorrect, streak) {
  let next = currentLevel
  if (wasCorrect) {
    next += streak >= 4 ? 1.35 : streak >= 3 ? 1.15 : streak >= 2 ? 0.95 : 0.7
  } else {
    next -= streak <= -3 ? 1.35 : streak <= -2 ? 1.1 : 0.85
  }
  return Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, next))
}

export function levelLabel(level) {
  const L = clampLevel(level)
  if (L <= 2) return 'Building'
  if (L <= 4) return 'Grade 3–4'
  if (L <= 6) return 'Grade 4–5'
  if (L <= 8) return 'Grade 5–6'
  if (L <= 10) return 'Grade 6–7'
  if (L <= 12) return 'Grade 7–8'
  return 'Grade 8+'
}
