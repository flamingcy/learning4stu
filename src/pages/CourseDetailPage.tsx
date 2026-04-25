import { useParams, Link } from "react-router-dom"
import { courses } from "@/data/quizData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Star,
  Users,
  BookOpen,
  Clock,
  PlayCircle,
  CheckCircle2,
} from "lucide-react"

const difficultyMap = {
  easy: { label: "入门", variant: "forest" as const },
  medium: { label: "进阶", variant: "sunshine" as const },
  hard: { label: "挑战", variant: "candy" as const },
}

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const course = courses.find((c) => c.id === id)

  if (!course) {
    return (
      <main className="container mx-auto px-4 lg:px-8 py-16 text-center">
        <p className="text-6xl mb-6">😕</p>
        <h2 className="text-2xl font-black mb-3">课程未找到</h2>
        <p className="text-muted-foreground mb-6">该课程可能已下架或不存在</p>
        <Link to="/courses">
          <Button size="xl">返回课程列表</Button>
        </Link>
      </main>
    )
  }

  const diff = difficultyMap[course.difficulty]

  // Mock lesson list
  const lessons = Array.from({ length: Math.min(course.lessons, 10) }).map((_, i) => ({
    id: i + 1,
    title: `第${i + 1}课: ${getlessonTitle(course.category, i)}`,
    duration: `${8 + Math.floor(Math.random() * 10)}分钟`,
    completed: i < 3,
  }))

  return (
    <main className="container mx-auto px-4 lg:px-8 py-8">
      {/* Back */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回课程列表
      </Link>

      {/* Course Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
        {/* Image */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="aspect-square relative group">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-smooth group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <PlayCircle className="w-16 h-16 text-card drop-shadow-lg" />
              </div>
            </div>
          </Card>
        </div>

        {/* Info */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={diff.variant}>{diff.label}</Badge>
            <Badge variant="ocean">{course.category}</Badge>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black mb-3">{course.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {course.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { icon: BookOpen, label: "课时数", value: `${course.lessons}课时` },
              { icon: Users, label: "学习人数", value: `${course.students}人` },
              { icon: Star, label: "评分", value: `${course.rating}分` },
              { icon: Clock, label: "总时长", value: `${course.lessons * 12}分钟` },
            ].map((stat) => (
              <div key={stat.label} className="bg-muted rounded-kid p-3 text-center">
                <stat.icon className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                <p className="text-sm font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mt-auto">
            <Button size="xl" className="flex-1 sm:flex-none">
              开始学习
            </Button>
            <Button size="xl" variant="outline" className="flex-1 sm:flex-none">
              收藏课程
            </Button>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <section>
        <h2 className="text-xl font-black mb-4">课程大纲</h2>
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="p-4 flex items-center gap-4 hover:shadow-card-hover cursor-pointer transition-smooth"
            >
              {/* Lesson Number */}
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                lesson.completed
                  ? "bg-success/15 text-success"
                  : "bg-muted text-muted-foreground"
              }`}>
                {lesson.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  lesson.id
                )}
              </div>

              {/* Lesson Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate">{lesson.title}</h4>
                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
              </div>

              {/* Play Button */}
              <PlayCircle className="shrink-0 w-8 h-8 text-primary/60 hover:text-primary transition-smooth" />
            </Card>
          ))}

          {course.lessons > 10 && (
            <p className="text-center text-sm text-muted-foreground pt-4">
              还有 {course.lessons - 10} 课时，开始学习后解锁全部内容
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

function getlessonTitle(category: string, index: number): string {
  const titles: Record<string, string[]> = {
    数学: ["认识数字", "比较大小", "简单加法", "简单减法", "凑十法", "数的分解", "图形认知", "规律发现", "应用题入门", "综合练习"],
    语文: ["拼音声母", "拼音韵母", "识字启蒙", "笔画练习", "词语理解", "句子造句", "看图说话", "故事阅读", "古诗欣赏", "综合练习"],
    英语: ["字母认识", "简单问候", "颜色名称", "数字英文", "动物名称", "水果单词", "家庭成员", "日常用语", "简单对话", "综合练习"],
    科学: ["观察自然", "认识动物", "认识植物", "水的变化", "天气认知", "地球知识", "简单实验", "光与影子", "声音探索", "综合实验"],
  }
  return (titles[category] || titles["数学"])[index] || `基础练习 ${index + 1}`
}
