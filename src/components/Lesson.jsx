import { useEffect, useMemo, useState } from 'react'

const SECTION_LABELS = {
  hook: 'Why It Matters',
  vocab: 'Vocabulary',
  teach: 'Learn',
  strategy: 'Strategy',
  example: 'Worked Example',
  mistakes: 'Watch Out',
  practice: 'Practice',
  check: 'Check Yourself',
  summary: 'Takeaways',
}

/**
 * Guided personalized lesson with rich section types and revealable practice.
 */
export default function Lesson({ plan, onFinish }) {
  const slides = useMemo(() => buildSlides(plan), [plan])
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState({})
  const [secondsLeft, setSecondsLeft] = useState(plan.estimatedMinutes * 60)

  const slide = slides[index]
  const progress = ((index + 1) / slides.length) * 100

  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const mins = Math.floor(secondsLeft / 60)
  const secs = String(secondsLeft % 60).padStart(2, '0')

  function next() {
    if (index < slides.length - 1) {
      setIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onFinish()
    }
  }

  function prev() {
    if (index > 0) {
      setIndex((i) => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function toggleAnswer(key) {
    setRevealed((r) => ({ ...r, [key]: !r[key] }))
  }

  return (
    <div className="screen lesson-screen">
      <header className="lesson-header">
        <div className="lesson-top">
          <span className="pill">📚 Personalized Lesson</span>
          <span className="timer" title="Suggested lesson timer">
            ⏱️ {mins}:{secs}
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill lesson-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="lesson-step">
          Step {index + 1} of {slides.length}
          {slide.domainName ? ` · ${slide.emoji || ''} ${slide.domainName}` : ''}
        </p>
      </header>

      <div className={`card lesson-card lesson-kind-${slide.kind}`}>
        {slide.kind === 'intro' && <IntroSlide plan={plan} />}

        {slide.kind === 'domain-intro' && <DomainIntroSlide slide={slide} />}

        {slide.kind === 'hook' && (
          <TypedHeader slide={slide}>
            <div className="lesson-body hook-body">
              {renderBody(slide.body)}
            </div>
          </TypedHeader>
        )}

        {slide.kind === 'vocab' && (
          <TypedHeader slide={slide}>
            <ul className="vocab-list">
              {slide.terms.map((t) => (
                <li key={t.term} className="vocab-card">
                  <strong className="vocab-term">{t.term}</strong>
                  <span className="vocab-def">{t.definition}</span>
                </li>
              ))}
            </ul>
          </TypedHeader>
        )}

        {slide.kind === 'teach' && (
          <TypedHeader slide={slide}>
            <div className="lesson-body">{renderBody(slide.body)}</div>
          </TypedHeader>
        )}

        {slide.kind === 'strategy' && (
          <TypedHeader slide={slide}>
            <ol className="strategy-steps">
              {slide.steps.map((step, i) => (
                <li key={i} className="strategy-step">
                  <span className="strategy-num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </TypedHeader>
        )}

        {slide.kind === 'example' && (
          <TypedHeader slide={slide} badge="Worked Example">
            <div className="example-panel">
              {slide.body && <div className="example-problem">{renderBody(slide.body)}</div>}
              {slide.steps?.length > 0 && (
                <ol className="example-steps">
                  {slide.steps.map((step, i) => (
                    <li key={i}>
                      <span className="example-step-label">Step {i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </TypedHeader>
        )}

        {slide.kind === 'mistakes' && (
          <TypedHeader slide={slide}>
            <ul className="mistakes-list">
              {slide.items.map((item, i) => (
                <li key={i} className="mistake-card">
                  <div className="mistake-row wrong">
                    <span className="mistake-icon">❌</span>
                    <div>
                      <strong>Wrong</strong>
                      <p>{item.wrong}</p>
                    </div>
                  </div>
                  <div className="mistake-row right">
                    <span className="mistake-icon">✅</span>
                    <div>
                      <strong>Right</strong>
                      <p>{item.right}</p>
                    </div>
                  </div>
                  <div className="mistake-row fix">
                    <span className="mistake-icon">💡</span>
                    <div>
                      <strong>Fix</strong>
                      <p>{item.fix}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </TypedHeader>
        )}

        {slide.kind === 'practice' && (
          <TypedHeader slide={slide}>
            <p className="muted">Try each one. Use the hint if you are stuck, then reveal the answer.</p>
            <ul className="practice-list">
              {slide.problems.map((p, i) => {
                const key = `${slide.id}-${i}`
                const hintKey = `${key}-hint`
                return (
                  <li key={key} className="practice-item">
                    <div className="practice-q">
                      <span className="practice-num">{i + 1}</span>
                      {p.q}
                    </div>
                    <div className="practice-actions">
                      {p.hint && (
                        <button
                          type="button"
                          className="btn btn-small btn-ghost"
                          onClick={() => toggleAnswer(hintKey)}
                        >
                          {revealed[hintKey] ? 'Hide hint' : 'Hint 💡'}
                        </button>
                      )}
                      <button type="button" className="btn btn-small" onClick={() => toggleAnswer(key)}>
                        {revealed[key] ? 'Hide answer' : 'Show answer'}
                      </button>
                    </div>
                    {revealed[hintKey] && p.hint && (
                      <div className="practice-hint">💡 {p.hint}</div>
                    )}
                    {revealed[key] && <div className="practice-a">✅ {p.a}</div>}
                  </li>
                )
              })}
            </ul>
          </TypedHeader>
        )}

        {slide.kind === 'check' && (
          <TypedHeader slide={slide}>
            <p className="muted">Self-check time! Think first, then reveal the explanation.</p>
            <ul className="practice-list check-list">
              {slide.problems.map((p, i) => {
                const key = `${slide.id}-c-${i}`
                return (
                  <li key={key} className="practice-item check-item">
                    <div className="practice-q">
                      <span className="practice-num check-num">{i + 1}</span>
                      {p.q}
                    </div>
                    <button type="button" className="btn btn-small" onClick={() => toggleAnswer(key)}>
                      {revealed[key] ? 'Hide explanation' : 'Show explanation'}
                    </button>
                    {revealed[key] && (
                      <div className="check-reveal">
                        <div className="practice-a">✅ {p.a}</div>
                        {p.explanation && (
                          <div className="check-explanation">
                            <strong>Why:</strong> {p.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </TypedHeader>
        )}

        {slide.kind === 'summary' && (
          <TypedHeader slide={slide}>
            <div className="lesson-body summary-body">{renderBody(slide.body)}</div>
          </TypedHeader>
        )}

        {slide.kind === 'miss-review' && (
          <>
            <div className="domain-row">
              <span className="domain-pill" style={{ background: slide.color }}>
                {slide.emoji} From Your Test
              </span>
              <span className="section-type">Review</span>
            </div>
            <h1>Let&apos;s Look at a Tricky One 🔍</h1>
            <p>
              This one was tough in <strong>{slide.domainName}</strong>. Study the correct answer and tip.
            </p>
            <div className="miss-card">
              <p className="miss-prompt">{slide.prompt}</p>
              <p>
                Correct answer: <strong>{slide.correctAnswer}</strong>
              </p>
              {slide.tip && <p className="tip-box">💡 {slide.tip}</p>}
            </div>
          </>
        )}

        {slide.kind === 'wrap' && (
          <>
            <h1>You Did It, {plan.studentName}! 🏆</h1>
            <p>
              You finished your personalized Math Quest lesson. Keep practicing a little each day —
              small steps make big math superstars.
            </p>
            <div className="wrap-stats">
              <div className="stat">
                <strong>{plan.percent}%</strong>
                <span>Benchmark score</span>
              </div>
              <div className="stat">
                <strong>{plan.placement}</strong>
                <span>Current placement</span>
              </div>
              <div className="stat">
                <strong>{plan.lessonBlocks.length}</strong>
                <span>Skills coached</span>
              </div>
            </div>
            <ul className="next-steps">
              <li>🔁 Retake the benchmark next week to see growth</li>
              <li>📝 Practice the skills you reviewed today</li>
              <li>🎯 Aim for a higher adaptive level each time</li>
            </ul>
          </>
        )}

        <div className="btn-row lesson-nav">
          <button type="button" className="btn btn-ghost" onClick={prev} disabled={index === 0}>
            ← Back
          </button>
          <button type="button" className="btn btn-primary" onClick={next}>
            {index === slides.length - 1 ? 'Finish Lesson 🎉' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  )
}

function TypedHeader({ slide, badge, children }) {
  const label = badge || SECTION_LABELS[slide.sectionType] || slide.sectionType || 'Learn'
  return (
    <>
      <div className="domain-row">
        <span className="domain-pill" style={{ background: slide.color }}>
          {slide.emoji} {slide.domainName}
        </span>
        <span className={`section-type type-${slide.sectionType || 'teach'}`}>{label}</span>
      </div>
      <h1>{slide.title}</h1>
      {children}
    </>
  )
}

function IntroSlide({ plan }) {
  return (
    <>
      <h1>Let&apos;s Level Up, {plan.studentName}! 🌟</h1>
      <p>
        Based on your benchmark, we&apos;ll spend about <strong>{plan.estimatedMinutes} minutes</strong>{' '}
        on the skills that will help you most.
        {plan.deepDive
          ? ' You have one focus area — we are going deep with a full mini-lesson!'
          : ' We will hit the key ideas, strategies, examples, and practice for each focus skill.'}{' '}
        Take your time and think as you go.
      </p>
      <ul className="focus-list">
        {plan.lessonBlocks.map((b) => (
          <li key={b.domain}>
            <span className="big-emoji">{b.meta.emoji}</span>
            <div>
              <strong>{b.lesson.title}</strong>
              <span>
                You got {Math.round(b.rate * 100)}% in this area — about {b.lesson.minutes} min of coaching.
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function DomainIntroSlide({ slide }) {
  return (
    <>
      <div className="domain-intro-hero" style={{ borderColor: slide.color }}>
        <span className="domain-intro-emoji">{slide.emoji}</span>
        <div>
          <p className="domain-intro-label">Now learning</p>
          <h1>{slide.title}</h1>
          <p className="muted">
            You scored {slide.ratePct}% here. Let&apos;s build this skill step by step.
          </p>
        </div>
      </div>
      <p className="domain-intro-note">
        Up next: vocabulary, teaching, strategies, worked examples, practice, and takeaways.
      </p>
    </>
  )
}

function renderBody(body) {
  if (!body) return null
  return String(body)
    .split('\n')
    .map((line, i) => <p key={i}>{line || '\u00A0'}</p>)
}

function buildSlides(plan) {
  const slides = [{ kind: 'intro', id: 'intro' }]

  for (const block of plan.lessonBlocks) {
    const lesson = block.lesson
    const color = block.meta.color
    const emoji = block.meta.emoji
    const domainName = block.meta.name

    slides.push({
      kind: 'domain-intro',
      id: `domain-${block.domain}`,
      title: lesson.title,
      emoji,
      color,
      domainName,
      ratePct: Math.round(block.rate * 100),
    })

    // Miss review early so teaching connects to real errors
    if (block.misses?.length) {
      block.misses.forEach((m, mi) => {
        slides.push({
          kind: 'miss-review',
          id: `miss-${block.domain}-${mi}`,
          domainName,
          emoji,
          color,
          prompt: m.prompt,
          correctAnswer: m.options[m.correctIndex],
          tip: m.tip,
        })
      })
    }

    for (let i = 0; i < lesson.sections.length; i++) {
      const sec = lesson.sections[i]
      const base = {
        id: `${block.domain}-${sec.type}-${i}`,
        title: sec.title,
        color,
        emoji,
        domainName,
        sectionType: sec.type,
      }

      switch (sec.type) {
        case 'hook':
          slides.push({ ...base, kind: 'hook', body: sec.body })
          break
        case 'vocab':
          slides.push({ ...base, kind: 'vocab', terms: sec.terms || [] })
          break
        case 'teach':
          slides.push({ ...base, kind: 'teach', body: sec.body })
          break
        case 'strategy':
          slides.push({ ...base, kind: 'strategy', steps: sec.steps || [] })
          break
        case 'example':
          slides.push({
            ...base,
            kind: 'example',
            body: sec.body,
            steps: sec.steps || [],
          })
          break
        case 'mistakes':
          slides.push({ ...base, kind: 'mistakes', items: sec.items || [] })
          break
        case 'practice':
          slides.push({ ...base, kind: 'practice', problems: sec.problems || [] })
          break
        case 'check':
          slides.push({ ...base, kind: 'check', problems: sec.problems || [] })
          break
        case 'summary':
          slides.push({ ...base, kind: 'summary', body: sec.body })
          break
        default:
          // Fallback for any legacy plain body section
          slides.push({
            ...base,
            kind: 'teach',
            body: sec.body || '',
            sectionType: 'teach',
          })
      }
    }
  }

  slides.push({ kind: 'wrap', id: 'wrap' })
  return slides
}
