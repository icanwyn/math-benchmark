export default function Results({ plan, onStartLesson, onRetake }) {
  return (
    <div className="screen results-screen">
      <div className="card results-card">
        <div className="results-hero">
          <div className="score-ring" style={{ '--p': plan.percent }}>
            <span className="score-num">{plan.percent}%</span>
            <span className="score-label">Score</span>
          </div>
          <div className="results-text">
            <h1>Quest Complete, {plan.studentName}! 🎉</h1>
            <p className="results-msg">{plan.message}</p>
            <div className="stat-row">
              <div className="stat">
                <strong>
                  {plan.totalCorrect}/{plan.total}
                </strong>
                <span>Correct</span>
              </div>
              <div className="stat">
                <strong>{plan.placement}</strong>
                <span>Placement</span>
              </div>
              <div className="stat">
                <strong>~L{plan.avgLevel}</strong>
                <span>Avg level</span>
              </div>
            </div>
          </div>
        </div>

        <section className="skill-section">
          <h2>Skill Breakdown</h2>
          <ul className="skill-list">
            {plan.scores.map((s) => {
              const pct = Math.round(s.rate * 100)
              return (
                <li key={s.domain}>
                  <div className="skill-head">
                    <span>
                      {s.meta.emoji} {s.meta.name}
                    </span>
                    <span>
                      {s.correct}/{s.total} ({pct}%)
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{
                        width: `${pct}%`,
                        background: s.meta.color,
                      }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="lesson-preview">
          <h2>Your Personalized Lesson 📚</h2>
          <p>
            About <strong>{plan.estimatedMinutes} minutes</strong> focused on what you need most:
          </p>
          <div className="focus-chips">
            {plan.lessonBlocks.map((b) => (
              <span key={b.domain} className="focus-chip" style={{ borderColor: b.meta.color }}>
                {b.meta.emoji} {b.lesson.title}
              </span>
            ))}
          </div>
        </section>

        <div className="btn-row">
          <button type="button" className="btn btn-primary btn-lg" onClick={onStartLesson}>
            Start My {plan.estimatedMinutes}-Min Lesson 🚀
          </button>
          <button type="button" className="btn btn-ghost" onClick={onRetake}>
            Retake Benchmark
          </button>
        </div>
      </div>
    </div>
  )
}
