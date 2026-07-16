import { DOMAINS } from './questionBank'

/**
 * Personalized ~15-minute lesson content keyed by domain.
 * Each lesson has intro, teach, examples, practice, and wrap-up sections.
 */
export const LESSONS = {
  operations: {
    title: 'Mastering Operations',
    emoji: '➕',
    minutes: 4,
    sections: [
      {
        type: 'teach',
        title: 'Addition & Subtraction Strategies',
        body: 'Break numbers into tens and ones. For 47 + 36: add 40 + 30 = 70, then 7 + 6 = 13, then 70 + 13 = 83. For subtraction, you can count up from the smaller number.',
      },
      {
        type: 'teach',
        title: 'Multiplication Facts',
        body: 'Multiplication is equal groups. 6 × 4 means 6 groups of 4 (or 4 groups of 6). Use known facts: 6 × 4 = 6 × 2 × 2 = 12 × 2 = 24. Practice skip-counting by 2s, 5s, and 10s.',
      },
      {
        type: 'example',
        title: 'Worked Example',
        body: 'What is 8 × 7?\n• Think: 8 × 5 = 40 and 8 × 2 = 16\n• 40 + 16 = 56\n• So 8 × 7 = 56',
      },
      {
        type: 'teach',
        title: 'Division & Order of Operations',
        body: 'Division undoes multiplication. 56 ÷ 8 = 7 because 8 × 7 = 56. When you see +, −, ×, ÷ together, use PEMDAS: Parentheses, Exponents, Multiply/Divide (left to right), Add/Subtract (left to right).',
      },
      {
        type: 'example',
        title: 'PEMDAS Example',
        body: '3 + 4 × 5\n• Multiply first: 4 × 5 = 20\n• Then add: 3 + 20 = 23\n• Not (3 + 4) × 5 = 35!',
      },
      {
        type: 'practice',
        title: 'Try These',
        problems: [
          { q: '45 + 28 = ?', a: '73' },
          { q: '9 × 6 = ?', a: '54' },
          { q: '2 + 5 × 3 = ?', a: '17' },
        ],
      },
    ],
  },
  placeValue: {
    title: 'Place Value Power',
    emoji: '🔢',
    minutes: 3,
    sections: [
      {
        type: 'teach',
        title: 'What Place Value Means',
        body: 'Each digit has a value based on its position. In 3,482:\n• 3 is in the thousands → 3,000\n• 4 is in the hundreds → 400\n• 8 is in the tens → 80\n• 2 is in the ones → 2',
      },
      {
        type: 'teach',
        title: 'Rounding',
        body: 'To round to the nearest ten, look at the ones digit. 0–4 stay the same; 5–9 round up. To round to the nearest hundred, look at the tens digit.',
      },
      {
        type: 'example',
        title: 'Rounding Example',
        body: 'Round 3,672 to the nearest hundred.\n• Look at the tens digit: 7\n• 7 ≥ 5, so round up\n• 3,672 → 3,700',
      },
      {
        type: 'practice',
        title: 'Try These',
        problems: [
          { q: 'In 5,914, which digit is in the hundreds place?', a: '9' },
          { q: 'Round 846 to the nearest ten.', a: '850' },
          { q: 'Round 2,350 to the nearest hundred.', a: '2,400' },
        ],
      },
    ],
  },
  fractions: {
    title: 'Fraction Friends',
    emoji: '🍕',
    minutes: 4,
    sections: [
      {
        type: 'teach',
        title: 'Parts of a Whole',
        body: 'A fraction has a numerator (top) and denominator (bottom). The denominator is how many equal parts; the numerator is how many you have. 3/4 means 3 out of 4 equal parts.',
      },
      {
        type: 'teach',
        title: 'Equivalent Fractions',
        body: 'Equivalent fractions name the same amount. Multiply or divide top and bottom by the same number: 1/2 = 2/4 = 3/6 = 4/8.',
      },
      {
        type: 'teach',
        title: 'Adding & Subtracting',
        body: 'Same denominators: add/subtract numerators only — keep the denominator. Different denominators: find a common denominator first, then add.',
      },
      {
        type: 'example',
        title: 'Worked Example',
        body: '1/3 + 1/6\n• Common denominator is 6\n• 1/3 = 2/6\n• 2/6 + 1/6 = 3/6 = 1/2',
      },
      {
        type: 'practice',
        title: 'Try These',
        problems: [
          { q: 'What is 2/5 of 20?', a: '8' },
          { q: 'Simplify 4/8.', a: '1/2' },
          { q: '1/4 + 2/4 = ?', a: '3/4' },
        ],
      },
    ],
  },
  decimals: {
    title: 'Decimal Detectives',
    emoji: '📐',
    minutes: 3,
    sections: [
      {
        type: 'teach',
        title: 'Decimal Places',
        body: 'The first digit after the decimal is tenths (0.1). The second is hundredths (0.01). So 0.3 = 3/10 and 0.25 = 25/100 = 1/4.',
      },
      {
        type: 'teach',
        title: 'Adding & Subtracting Decimals',
        body: 'Always line up the decimal points. Add zeros if needed so both numbers have the same number of decimal places. Then add or subtract as usual.',
      },
      {
        type: 'example',
        title: 'Worked Example',
        body: '2.5 + 1.75\n  2.50\n+ 1.75\n------\n  4.25',
      },
      {
        type: 'practice',
        title: 'Try These',
        problems: [
          { q: 'Write 7/10 as a decimal.', a: '0.7' },
          { q: '3.2 + 1.5 = ?', a: '4.7' },
          { q: 'What is 50% of 80?', a: '40' },
        ],
      },
    ],
  },
  geometry: {
    title: 'Geometry Galaxy',
    emoji: '📏',
    minutes: 3,
    sections: [
      {
        type: 'teach',
        title: 'Shapes & Angles',
        body: 'Triangles have 3 sides, quadrilaterals (squares, rectangles) have 4, pentagons 5, hexagons 6. A right angle measures 90° — like the corner of a book.',
      },
      {
        type: 'teach',
        title: 'Perimeter, Area & Volume',
        body: 'Perimeter = distance around a shape.\nArea of rectangle = length × width.\nArea of square = side × side.\nVolume of a box = length × width × height.',
      },
      {
        type: 'example',
        title: 'Worked Example',
        body: 'Rectangle 6 by 4:\n• Area = 6 × 4 = 24 square units\n• Perimeter = 2 × (6 + 4) = 20 units',
      },
      {
        type: 'practice',
        title: 'Try These',
        problems: [
          { q: 'Area of a 5×5 square?', a: '25' },
          { q: 'Perimeter of a 7×3 rectangle?', a: '20' },
          { q: 'Volume of a 2×3×4 box?', a: '24' },
        ],
      },
    ],
  },
  wordProblems: {
    title: 'Word Problem Workshop',
    emoji: '📖',
    minutes: 4,
    sections: [
      {
        type: 'teach',
        title: 'Read → Plan → Solve → Check',
        body: '1) Read carefully and underline the question.\n2) Note the numbers and key words (total, left, each, share…).\n3) Choose the operation.\n4) Solve and check if the answer makes sense.',
      },
      {
        type: 'teach',
        title: 'Clue Words',
        body: 'Add: total, altogether, combined, more.\nSubtract: left, difference, how many more, change.\nMultiply: each, groups of, times, per.\nDivide: share equally, split, per group, average.',
      },
      {
        type: 'example',
        title: 'Worked Example',
        body: 'Sam buys 3 packs of 8 markers and pays with $30. Each pack costs $4. Change?\n• Cost = 3 × $4 = $12\n• Change = $30 − $12 = $18',
      },
      {
        type: 'practice',
        title: 'Try These',
        problems: [
          { q: 'Lia has 24 apples, gives away 9. How many left?', a: '15' },
          { q: '4 bags with 6 oranges each — total?', a: '24' },
          { q: '30 stickers shared by 5 kids — each gets?', a: '6' },
        ],
      },
    ],
  },
  ratios: {
    title: 'Ratios & Percents',
    emoji: '⚖️',
    minutes: 4,
    sections: [
      {
        type: 'teach',
        title: 'What is a Ratio?',
        body: 'A ratio compares two quantities. 2:3 means 2 parts to 3 parts. You can write it as 2:3, 2 to 3, or 2/3.',
      },
      {
        type: 'teach',
        title: 'Equivalent Ratios',
        body: 'Multiply or divide both sides by the same number. 2:3 = 4:6 = 6:9. Tables of equivalent ratios help solve problems.',
      },
      {
        type: 'teach',
        title: 'Percents',
        body: 'Percent means “per 100.” 25% = 25/100 = 1/4 = 0.25. To find a percent of a number: convert to a decimal and multiply. 20% of 50 = 0.20 × 50 = 10.',
      },
      {
        type: 'example',
        title: 'Worked Example',
        body: 'Recipe uses 2 cups flour to 3 cups milk (2:3).\nFor 4 cups flour: multiply both by 2 → 4:6, so 6 cups milk.',
      },
      {
        type: 'practice',
        title: 'Try These',
        problems: [
          { q: 'Simplify the ratio 4:8.', a: '1:2' },
          { q: 'What is 25% of 40?', a: '10' },
          { q: '3:5 is equivalent to ? : 10', a: '6' },
        ],
      },
    ],
  },
}

/**
 * Analyze quiz results and build a personalized lesson plan (~15 min).
 */
export function buildLessonPlan(answers, studentName, grade) {
  const byDomain = {}
  for (const key of Object.keys(DOMAINS)) {
    byDomain[key] = { correct: 0, total: 0, misses: [] }
  }

  for (const a of answers) {
    const d = a.domain
    if (!byDomain[d]) byDomain[d] = { correct: 0, total: 0, misses: [] }
    byDomain[d].total += 1
    if (a.correct) byDomain[d].correct += 1
    else byDomain[d].misses.push(a)
  }

  const scores = Object.entries(byDomain)
    .filter(([, v]) => v.total > 0)
    .map(([domain, v]) => ({
      domain,
      ...v,
      rate: v.correct / v.total,
      meta: DOMAINS[domain],
    }))
    .sort((a, b) => a.rate - b.rate || b.total - a.total)

  // Focus on weakest 2–3 domains (those under 80% or the worst ones)
  let focus = scores.filter((s) => s.rate < 0.8).slice(0, 3)
  if (focus.length === 0) {
    // Strong overall — reinforce top challenge areas + one stretch
    focus = scores.slice(0, 2)
    if (focus.length === 0) {
      focus = [{ domain: 'operations', rate: 1, correct: 0, total: 0, misses: [], meta: DOMAINS.operations }]
    }
  }

  const totalCorrect = answers.filter((a) => a.correct).length
  const total = answers.length
  const percent = total ? Math.round((totalCorrect / total) * 100) : 0

  // Estimated grade placement from average difficulty of correct answers
  const correctLevels = answers.filter((a) => a.correct).map((a) => a.level)
  const avgLevel =
    correctLevels.length > 0
      ? correctLevels.reduce((s, n) => s + n, 0) / correctLevels.length
      : 1

  let placement = 'Grade 3'
  if (avgLevel >= 8.5) placement = 'Grade 6+'
  else if (avgLevel >= 7) placement = 'Grade 6'
  else if (avgLevel >= 5.5) placement = 'Grade 5'
  else if (avgLevel >= 4) placement = 'Grade 4'
  else if (avgLevel >= 2.5) placement = 'Grade 3'
  else placement = 'Building Grade 3 skills'

  const lessonBlocks = focus.map((f) => ({
    domain: f.domain,
    rate: f.rate,
    meta: f.meta,
    lesson: LESSONS[f.domain],
    misses: f.misses.slice(0, 3),
  }))

  const estimatedMinutes = Math.min(
    15,
    Math.max(10, lessonBlocks.reduce((s, b) => s + (b.lesson?.minutes || 3), 0) + 2)
  )

  return {
    studentName,
    grade,
    totalCorrect,
    total,
    percent,
    placement,
    avgLevel: Math.round(avgLevel * 10) / 10,
    scores,
    lessonBlocks,
    estimatedMinutes,
    message: feedbackMessage(percent, studentName),
  }
}

function feedbackMessage(percent, name) {
  if (percent >= 90) return `Incredible work, ${name}! You're crushing it — let's polish a few challenge skills.`
  if (percent >= 75) return `Great job, ${name}! You've got a strong foundation. Here's a focused boost.`
  if (percent >= 50) return `Nice effort, ${name}! You're building solid skills. This lesson targets your next wins.`
  return `You showed up and tried hard, ${name}! This mini-lesson will help you level up fast.`
}
