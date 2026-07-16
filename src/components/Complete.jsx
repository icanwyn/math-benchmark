export default function Complete({ plan, onRestart }) {
  return (
    <div className="screen complete-screen">
      <div className="card complete-card">
        <div className="trophy" aria-hidden="true">
          🏅
        </div>
        <h1>Amazing Work, {plan.studentName}!</h1>
        <p>
          You completed the adaptive Math Quest benchmark <strong>and</strong> your personalized
          lesson. That&apos;s how mathematicians grow!
        </p>
        <div className="stat-row">
          <div className="stat">
            <strong>{plan.percent}%</strong>
            <span>Score</span>
          </div>
          <div className="stat">
            <strong>{plan.placement}</strong>
            <span>Placement</span>
          </div>
          <div className="stat">
            <strong>Grade {plan.grade}</strong>
            <span>Started as</span>
          </div>
        </div>
        <button type="button" className="btn btn-primary btn-lg" onClick={onRestart}>
          New Quest ✨
        </button>
      </div>
    </div>
  )
}
