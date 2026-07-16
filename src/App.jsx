import { useCallback, useState } from 'react'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'
import Results from './components/Results'
import Lesson from './components/Lesson'
import Complete from './components/Complete'
import {
  adjustLevel,
  generateQuestion,
  startingLevel,
} from './lib/questionBank'
import { buildLessonPlan } from './lib/lessons'

const TOTAL_QUESTIONS = 20

export default function App() {
  const [phase, setPhase] = useState('welcome') // welcome | quiz | results | lesson | complete
  const [student, setStudent] = useState(null)
  const [level, setLevel] = useState(4)
  const [streak, setStreak] = useState(0) // positive correct streak, negative wrong streak
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [recentDomains, setRecentDomains] = useState([])
  const [plan, setPlan] = useState(null)

  const startQuiz = useCallback(({ name, grade }) => {
    const start = startingLevel(grade)
    const first = generateQuestion(start, [])
    setStudent({ name, grade })
    setLevel(start)
    setStreak(0)
    setQuestionNumber(1)
    setQuestion(first)
    setAnswers([])
    setRecentDomains([first.domain])
    setPlan(null)
    setPhase('quiz')
  }, [])

  const handleAnswer = useCallback(
    ({ selectedIndex, correct, question: q }) => {
      const record = {
        domain: q.domain,
        level: q.level,
        prompt: q.prompt,
        options: q.options,
        correctIndex: q.correctIndex,
        selectedIndex,
        correct,
        tip: q.tip,
      }

      const nextAnswers = [...answers, record]
      const nextStreak = correct ? (streak > 0 ? streak + 1 : 1) : streak < 0 ? streak - 1 : -1
      const nextLevel = adjustLevel(level, correct, nextStreak)
      const nextDomains = [...recentDomains, q.domain].slice(-5)

      setAnswers(nextAnswers)
      setStreak(nextStreak)
      setLevel(nextLevel)
      setRecentDomains(nextDomains)

      if (questionNumber >= TOTAL_QUESTIONS) {
        const lessonPlan = buildLessonPlan(nextAnswers, student.name, student.grade)
        setPlan(lessonPlan)
        setPhase('results')
        return
      }

      const nextQ = generateQuestion(nextLevel, nextDomains)
      setQuestion(nextQ)
      setQuestionNumber((n) => n + 1)
    },
    [answers, streak, level, recentDomains, questionNumber, student]
  )

  function restart() {
    setPhase('welcome')
    setStudent(null)
    setQuestion(null)
    setAnswers([])
    setPlan(null)
    setStreak(0)
    setQuestionNumber(1)
  }

  return (
    <div className="app">
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>

      {phase === 'welcome' && <Welcome onStart={startQuiz} />}

      {phase === 'quiz' && question && (
        <Quiz
          student={student}
          question={question}
          questionNumber={questionNumber}
          level={level}
          streak={streak}
          onAnswer={handleAnswer}
        />
      )}

      {phase === 'results' && plan && (
        <Results
          plan={plan}
          onStartLesson={() => setPhase('lesson')}
          onRetake={restart}
        />
      )}

      {phase === 'lesson' && plan && (
        <Lesson plan={plan} onFinish={() => setPhase('complete')} />
      )}

      {phase === 'complete' && plan && (
        <Complete plan={plan} onRestart={restart} />
      )}
    </div>
  )
}
