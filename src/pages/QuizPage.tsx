import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Toast } from "@/components/ui/toast"
import { quizProblems, type QuizProblem } from "@/data/quizData"
import { Check, ChevronRight, RotateCcw, Trophy } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface ToastState {
  message: string
  type: ToastType
  visible: boolean
}

export function QuizPage() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<ToastState>({ message: "", type: "info", visible: false })

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type, visible: true })
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500)
  }, [])

  const handleInput = useCallback((problemId: number, value: string) => {
    if (submitted) return
    const cleaned = value.replace(/[^0-9]/g, "").slice(0, 3)
    setAnswers((prev) => ({ ...prev, [problemId]: cleaned }))
  }, [submitted])

  const handleSubmit = useCallback(() => {
    const unanswered = quizProblems.filter((p) => !answers[p.id] || answers[p.id].trim() === "")
    if (unanswered.length > 0) {
      showToast(`还有 ${unanswered.length} 题没有作答哦~`, "error")
      return
    }
    setSubmitted(true)

    const correctCount = quizProblems.filter(
      (p) => parseInt(answers[p.id] || "0") === p.answer
    ).length

    if (correctCount === quizProblems.length) {
      showToast("太棒了！全部答对！", "success")
    } else {
      showToast(`答对了 ${correctCount}/${quizProblems.length} 题`, "info")
    }
  }, [answers, showToast])

  const handleReset = useCallback(() => {
    setAnswers({})
    setSubmitted(false)
  }, [])

  const handleReview = useCallback(() => {
    const results = quizProblems.map((p) => ({
      id: p.id,
      userAnswer: answers[p.id] || "",
      correctAnswer: p.answer,
      isCorrect: parseInt(answers[p.id] || "0") === p.answer,
    }))
    navigate("/review", { state: { results, problems: quizProblems } })
  }, [answers, navigate])

  const correctCount = submitted
    ? quizProblems.filter((p) => parseInt(answers[p.id] || "0") === p.answer).length
    : 0

  return (
    <main className="container mx-auto px-4 lg:px-8 py-8">
      <Toast {...toast} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">
          <span className="text-gradient-hero">求总和</span> - 趣味加法
        </h1>
        <p className="text-muted-foreground">数一数图中的物品，算出它们的总和吧！</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-muted-foreground">
            已作答 {Object.keys(answers).filter((k) => answers[parseInt(k)]).length}/{quizProblems.length}
          </span>
          {submitted && (
            <span className="font-bold text-success flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {correctCount}/{quizProblems.length} 正确
            </span>
          )}
        </div>
        <div className="h-3 rounded-bubble bg-muted overflow-hidden">
          <div
            className="h-full gradient-hero rounded-bubble transition-smooth"
            style={{
              width: `${(Object.keys(answers).filter((k) => answers[parseInt(k)]).length / quizProblems.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {quizProblems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            answer={answers[problem.id] || ""}
            onInput={handleInput}
            submitted={submitted}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {!submitted ? (
          <Button size="xl" onClick={handleSubmit}>
            <Check className="w-5 h-5 mr-2" />
            提交答案
          </Button>
        ) : (
          <>
            <Button size="xl" variant="outline" onClick={handleReset}>
              <RotateCcw className="w-5 h-5 mr-2" />
              重新答题
            </Button>
            <Button size="xl" onClick={handleReview}>
              查看详情
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </>
        )}
      </div>
    </main>
  )
}

interface ProblemCardProps {
  problem: QuizProblem
  answer: string
  onInput: (id: number, value: string) => void
  submitted: boolean
}

function ProblemCard({ problem, answer, onInput, submitted }: ProblemCardProps) {
  const isCorrect = parseInt(answer || "0") === problem.answer
  const showResult = submitted && answer

  return (
    <Card className={`p-5 transition-smooth ${
      showResult
        ? isCorrect
          ? "border-success/40 bg-success/5"
          : "border-destructive/40 bg-destructive/5"
        : ""
    }`}>
      {/* Problem Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-muted-foreground">
          第 {problem.id} 题
        </span>
        <span className="text-xs text-muted-foreground">
          ? {problem.unit}
        </span>
      </div>

      {/* Items Display */}
      <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
        {/* Left Group */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex flex-wrap justify-center gap-1 max-w-[140px]">
            {Array.from({ length: problem.leftItems.count }).map((_, i) => (
              <span key={`l-${i}`} className="text-2xl animate-bounce-soft" style={{ animationDelay: `${i * 0.1}s` }}>
                {problem.leftItems.emoji}
              </span>
            ))}
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {problem.leftItems.count}{problem.unit}
          </span>
        </div>

        {/* Plus Symbol */}
        <span className="text-2xl font-black text-primary">+</span>

        {/* Right Group */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex flex-wrap justify-center gap-1 max-w-[140px]">
            {Array.from({ length: problem.rightItems.count }).map((_, i) => (
              <span key={`r-${i}`} className="text-2xl animate-bounce-soft" style={{ animationDelay: `${i * 0.1 + 0.5}s` }}>
                {problem.rightItems.emoji}
              </span>
            ))}
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {problem.rightItems.count}{problem.unit}
          </span>
        </div>
      </div>

      {/* Equation Input */}
      <div className="flex items-center justify-center gap-2">
        <div className="answer-box bg-muted/50 border-solid cursor-default">
          {problem.leftItems.count}
        </div>
        <span className="text-xl font-black text-primary">+</span>
        <div className="answer-box bg-muted/50 border-solid cursor-default">
          {problem.rightItems.count}
        </div>
        <span className="text-xl font-black text-foreground">=</span>
        <input
          type="text"
          inputMode="numeric"
          value={answer}
          onChange={(e) => onInput(problem.id, e.target.value)}
          disabled={submitted}
          placeholder="?"
          className={`answer-box ${
            showResult
              ? isCorrect
                ? "correct"
                : "incorrect"
              : ""
          }`}
        />
      </div>

      {/* Result Feedback */}
      {showResult && (
        <div className={`mt-3 text-center text-sm font-semibold animate-scale-pop ${
          isCorrect ? "text-success" : "text-destructive"
        }`}>
          {isCorrect ? "✓ 回答正确！" : `✗ 正确答案是 ${problem.answer}`}
        </div>
      )}
    </Card>
  )
}
