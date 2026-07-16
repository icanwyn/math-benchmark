import { useState } from 'react'

const GRADES = [
  { value: 3, label: '3rd Grade', emoji: '🌱', desc: 'Multiplication, fractions intro' },
  { value: 4, label: '4th Grade', emoji: '🚀', desc: 'Multi-digit math & fractions' },
  { value: 5, label: '5th Grade', emoji: '⭐', desc: 'Decimals, volume & more' },
  { value: 6, label: '6th Grade', emoji: '🏆', desc: 'Ratios, percents & integers' },
]

export default function Welcome({ onStart }) {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState(null)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed.length < 1) {
      setError('Please enter your name so we can personalize your quest!')
      return
    }
    if (!grade) {
      setError('Pick your grade level to start at the right challenge.')
      return
    }
    onStart({ name: trimmed, grade })
  }

  return (
    <div className="screen welcome-screen">
      <div className="floating-shapes" aria-hidden="true">
        <span>➕</span>
        <span>✖️</span>
        <span>➗</span>
        <span>π</span>
        <span>🔺</span>
        <span>⭐</span>
      </div>

      <div className="card hero-card">
        <div className="badge-row">
          <span className="pill">Adaptive · i-Ready style</span>
          <span className="pill pill-soft">Grades 3–6</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-emoji" aria-hidden="true">🧮</span>
          Math Quest
          <span className="hero-sub">Benchmark Adventure</span>
        </h1>

        <p className="hero-copy">
          20 adaptive questions that get harder when you&apos;re ready — then a fun
          15-minute lesson built just for what you need.
        </p>

        <form className="welcome-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Your first name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              placeholder="Type your name…"
              maxLength={40}
              autoComplete="given-name"
              className="text-input"
            />
          </label>

          <fieldset className="field">
            <legend className="field-label">Your grade</legend>
            <div className="grade-grid">
              {GRADES.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  className={`grade-card ${grade === g.value ? 'selected' : ''}`}
                  onClick={() => {
                    setGrade(g.value)
                    setError('')
                  }}
                >
                  <span className="grade-emoji">{g.emoji}</span>
                  <span className="grade-label">{g.label}</span>
                  <span className="grade-desc">{g.desc}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-primary btn-lg">
            Start My Quest ✨
          </button>
        </form>

        <ul className="feature-list">
          <li>🎯 Adapts to your answers</li>
          <li>🔀 Answer letters shuffle every time</li>
          <li>📚 Personalized mini-lesson after</li>
        </ul>
      </div>
    </div>
  )
}
