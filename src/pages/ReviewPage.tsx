import { useLocation, Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { QuizProblem } from "@/data/quizData"
import { ArrowLeft, RotateCcw, Trophy, Star, Target, CheckCircle2, XCircle } from "lucide-react"

interface ReviewResult {
  id: number
  userAnswer: string
  correctAnswer: number
  isCorrect: boolean
}

export function ReviewPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { results: ReviewResult[]; problems: QuizProblem[] } | null

  if (!state) {
    return (
      <main className="container mx-auto px-4 lg:px-8 py-16 text-center">
        <p className="text-6xl mb-6">📝</p>
        <h2 className="text-2xl font-black mb-3">还没有答题记录</h2>
        <p className="text-muted-foreground mb-6">先去答题吧，答完题目后可以在这里查看详情！</p>
        <Link to="/quiz">
          <Button size="xl">去答题</Button>
        </Link>
      </main>
    )
  }

  const { results, problems } = state
  const correctCount = results.filter((r) => r.isCorrect).length
  const totalCount = results.length
  const score = Math.round((correctCount / totalCount) * 100)
  const allCorrect = correctCount === totalCount

  const getGrade = () => {
    if (score === 100) return { emoji: "🏆", label: "完美！", color: "text-sunshine" }
    if (score >= 80) return { emoji: "🌟", label: "优秀！", color: "text-success" }
    if (score >= 60) return { emoji: "👍", label: "不错！", color: "text-ocean" }
    return { emoji: "💪", label: "加油！", color: "text-primary" }
  }

  const grade = getGrade()

  return (
    <main className="container mx-auto px-4 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </button>

      {/* Score Card */}
      <Card className={`p-8 mb-8 text-center overflow-hidden relative ${
        allCorrect ? "border-sunshine/40" : ""
      }`}>
        {allCorrect && (
          <div className="absolute inset-0 bg-sunshine/5" />
        )}
        <div className="relative z-10">
          <p className="text-6xl mb-4 animate-bounce-soft">{grade.emoji}</p>
          <h1 className={`text-4xl font-black mb-2 ${grade.color}`}>
            {grade.label}
          </h1>

          {/* Score Circle */}
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-primary/20 my-6 relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64" cy="64" r="58"
                fill="none"
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="8"
              />
              <circle
                cx="64" cy="64" r="58"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${score * 3.64} 364`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="text-center">
              <span className="text-3xl font-black text-primary">{score}</span>
              <span className="text-xs text-muted-foreground block">分</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">共 {totalCount} 题</span>
            </div>
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-4 h-4" />
              <span>答对 {correctCount} 题</span>
            </div>
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="w-4 h-4" />
              <span>答错 {totalCount - correctCount} 题</span>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-6 h-6 transition-smooth ${
                  s <= Math.ceil(score / 20)
                    ? "text-sunshine fill-sunshine animate-star-pulse"
                    : "text-muted"
                }`}
                style={{ animationDelay: `${s * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Detail Section Header */}
      <h2 className="text-xl font-black mb-4">答题详情</h2>

      {/* Detailed Results */}
      <div className="space-y-4 mb-8">
        {results.map((result) => {
          const problem = problems.find((p) => p.id === result.id)!
          return (
            <Card
              key={result.id}
              className={`p-5 transition-smooth ${
                result.isCorrect
                  ? "border-success/30 bg-success/5"
                  : "border-destructive/30 bg-destructive/5"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  result.isCorrect
                    ? "bg-success/20"
                    : "bg-destructive/20"
                }`}>
                  {result.isCorrect ? "✓" : "✗"}
                </div>

                {/* Problem Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold">第 {result.id} 题</span>
                    {result.isCorrect ? (
                      <span className="text-xs font-semibold text-success">回答正确</span>
                    ) : (
                      <span className="text-xs font-semibold text-destructive">回答错误</span>
                    )}
                  </div>

                  {/* Visual representation */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <div className="flex gap-0.5">
                      {Array.from({ length: problem.leftItems.count }).map((_, i) => (
                        <span key={`l-${i}`} className="text-xl">{problem.leftItems.emoji}</span>
                      ))}
                    </div>
                    <span className="text-lg font-black text-primary">+</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: problem.rightItems.count }).map((_, i) => (
                        <span key={`r-${i}`} className="text-xl">{problem.rightItems.emoji}</span>
                      ))}
                    </div>
                  </div>

                  {/* Equation */}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-mono font-bold">
                      {problem.leftItems.count} + {problem.rightItems.count} =
                    </span>
                    <span className={`font-mono font-bold px-2 py-0.5 rounded-lg ${
                      result.isCorrect
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive line-through"
                    }`}>
                      {result.userAnswer}
                    </span>
                    {!result.isCorrect && (
                      <span className="font-mono font-bold px-2 py-0.5 rounded-lg bg-success/20 text-success">
                        {result.correctAnswer}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/quiz">
          <Button size="xl" variant="outline">
            <RotateCcw className="w-5 h-5 mr-2" />
            再来一次
          </Button>
        </Link>
        <Link to="/">
          <Button size="xl">
            <Trophy className="w-5 h-5 mr-2" />
            返回首页
          </Button>
        </Link>
      </div>
    </main>
  )
}
