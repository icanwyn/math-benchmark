import { useEffect, useMemo, useState } from 'react'

/**
 * Guided ~15-minute lesson with timed progress and practice reveals.
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
        </p>
      </header>

      <div className="card lesson-card">
        {slide.kind === 'intro' && (
          <>
            <h1>Let&apos;s Level Up, {plan.studentName}! 🌟</h1>
            <p>
              Based on your benchmark, we&apos;ll spend about <strong>{plan.estimatedMinutes} minutes</strong>{' '}
              on the skills that will help you most. Take your time — pause the timer in your mind whenever you need to think!
            </p>
            <ul className="focus-list">
              {plan.lessonBlocks.map((b) => (
                <li key={b.domain}>
                  <span className="big-emoji">{b.meta.emoji}</span>
                  <div>
                    <strong>{b.lesson.title}</strong>
                    <span>
                      You got {Math.round(b.rate * 100)}% in this area — we&apos;ll make it stronger.
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {slide.kind === 'section' && (
          <>
            <div className="domain-row">
              <span className="domain-pill" style={{ background: slide.color }}>
                {slide.emoji} {slide.domainName}
              </span>
              <span className="section-type">{slide.sectionType}</span>
            </div>
            <h1>{slide.title}</h1>
            <div className="lesson-body">
              {slide.body.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </>
        )}

        {slide.kind === 'practice' && (
          <>
            <div className="domain-row">
              <span className="domain-pill" style={{ background: slide.color }}>
                {slide.emoji} Practice
              </span>
            </div>
            <h1>{slide.title}</h1>
            <p className="muted">Try each one, then reveal the answer.</p>
            <ul className="practice-list">
              {slide.problems.map((p, i) => {
                const key = `${slide.id}-${i}`
                return (
                  <li key={key} className="practice-item">
                    <div className="practice-q">
                      <span className="practice-num">{i + 1}</span>
                      {p.q}
                    </div>
                    <button type="button" className="btn btn-small" onClick={() => toggleAnswer(key)}>
                      {revealed[key] ? 'Hide answer' : 'Show answer'}
                    </button>
                    {revealed[key] && <div className="practice-a">✅ {p.a}</div>}
                  </li>
                )
              })}
            </ul>
          </>
        )}

        {slide.kind === 'miss-review' && (
          <>
            <h1>From Your Test 🔍</h1>
            <p>Let&apos;s look at a question that was tricky in <strong>{slide.domainName}</strong>.</p>
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

function buildSlides(plan) {
  const slides = [{ kind: 'intro', id: 'intro' }]

  for (const block of plan.lessonBlocks) {
    const lesson = block.lesson
    const color = block.meta.color
    const emoji = block.meta.emoji
    const domainName = block.meta.name

    // Optional miss review first
    if (block.misses?.length) {
      const m = block.misses[0]
      slides.push({
        kind: 'miss-review',
        id: `miss-${block.domain}`,
        domainName,
        prompt: m.prompt,
        correctAnswer: m.options[m.correctIndex],
        tip: m.tip,
      })
    }

    for (let i = 0; i < lesson.sections.length; i++) {
      const sec = lesson.sections[i]
      if (sec.type === 'practice') {
        slides.push({
          kind: 'practice',
          id: `${block.domain}-p-${i}`,
          title: sec.title,
          problems: sec.problems,
          color,
          emoji,
        })
      } else {
        slides.push({
          kind: 'section',
          id: `${block.domain}-s-${i}`,
          title: sec.title,
          body: sec.body,
          color,
          emoji,
          domainName,
          sectionType: sec.type === 'example' ? 'Example' : 'Learn',
        })
      }
    }
  }

  slides.push({ kind: 'wrap', id: 'wrap' })
  return slides
}
