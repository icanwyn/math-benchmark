/** Fisher–Yates shuffle (returns a new array). */
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Build 4-option MC with randomized answer letter (A–D). */
export function makeChoices(correct, distractors) {
  const unique = [correct, ...distractors]
    .map(String)
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 4)

  while (unique.length < 4) {
    const n = Number(correct)
    const noise = Number.isFinite(n)
      ? String(n + randInt(1, 9) * (Math.random() < 0.5 ? 1 : -1))
      : `Option ${unique.length + 1}`
    if (!unique.includes(noise)) unique.push(noise)
  }

  const options = shuffle(unique)
  const correctIndex = options.indexOf(String(correct))
  return { options, correctIndex }
}

export function gcd(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    ;[a, b] = [b, a % b]
  }
  return a || 1
}

export function simplifyFraction(n, d) {
  const g = gcd(n, d)
  return [n / g, d / g]
}

export function formatFraction(n, d) {
  const [sn, sd] = simplifyFraction(n, d)
  if (sd === 1) return String(sn)
  return `${sn}/${sd}`
}
