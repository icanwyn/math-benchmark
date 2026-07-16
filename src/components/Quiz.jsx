import { useEffect, useMemo, useState } from 'react'
import { DOMAINS, levelLabel } from '../lib/questionBank'

const TOTAL = 20

export default function Quiz({
  student,
  question,
  questionNumber,
  level,
  onAnswer,
  streak,
}) {
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    setSelected(null)
    setLocked(false)
    setFeedback(null)
  }, [question.id])

  const domain = DOMAINS[question.domain]
  const progress = (questionNumber / TOTAL) * 100

  const streakLabel = useMemo(() => {
    if (streak >= 3) return `🔥 ${streak} in a row!`
    if (streak >= 1) return `✨ ${streak} streak`
    if (streak <= -2) return '💪 Keep going!'
    return null
  }, [streak])

  function handleSelect(index) {
    if (locked) return
    setSelected(index)
  }

  function handleSubmit() {
    if (selected === null || locked) return
    setLocked(true)
    const isCorrect = selected === question.correctIndex
    setFeedback({
      isCorrect,
      correctIndex: question.correctIndex,
    })
    // Brief pause so students see feedback
    setTimeout(() => {
      onAnswer({
        selectedIndex: selected,
        correct: isCorrect,
        question,
      })
    }, isCorrect ? 700 : 1100)
  }

  return (
    <div className="screen quiz-screen">
      <header className="quiz-header">
        <div className="quiz-meta">
          <span className="student-chip">👋 {student.name}</span>
          <span className="grade-chip">Grade {student.grade}</span>
        </div>
        <div className="progress-block">
          <div className="progress-top">
            <span>
              Question {questionNumber} of {TOTAL}
            </span>
            <span className="level-chip" title="Adaptive difficulty">
              {levelLabel(level)} · L{Math.round(level)}
            </span>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={questionNumber} aria-valuemin={1} aria-valuemax={TOTAL}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        {streakLabel && <div className="streak-banner">{streakLabel}</div>}
      </header>

      <div className="card question-card">
        <div className="domain-row">
          <span className="domain-pill" style={{ background: domain?.color || '#ddd' }}>
            {domain?.emoji} {domain?.name}
          </span>
        </div>

        <h2 className="question-prompt">{question.prompt}</h2>

        <div className="options-grid" role="listbox" aria-label="Answer choices">
          {question.options.map((opt, i) => {
            const letter = question.letters[i]
            let state = ''
            if (feedback) {
              if (i === feedback.correctIndex) state = 'correct'
              else if (i === selected && !feedback.isCorrect) state = 'wrong'
              else state = 'dim'
            } else if (selected === i) {
              state = 'selected'
            }
            return (
              <button
                key={`${question.id}-${i}`}
                type="button"
                role="option"
                aria-selected={selected === i}
                className={`option-btn ${state}`}
                onClick={() => handleSelect(i)}
                disabled={locked}
              >
                <span className="option-letter">{letter}</span>
                <span className="option-text">{opt}</span>
              </button>
            )
          })}
        </div>

        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'ok' : 'nope'}`} role="status">
            {feedback.isCorrect ? (
              <span>✅ Nice! That&apos;s correct.</span>
            ) : (
              <span>
                ❌ Not quite — the answer is{' '}
                <strong>
                  {question.letters[feedback.correctIndex]}. {question.options[feedback.correctIndex]}
                </strong>
                {question.tip ? <em className="tip-line"> Tip: {question.tip}</em> : null}
              </span>
            )}
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary btn-lg"
          disabled={selected === null || locked}
          onClick={handleSubmit}
        >
          {locked ? 'Next…' : 'Check Answer'}
        </button>
      </div>
    </div>
  )
}
