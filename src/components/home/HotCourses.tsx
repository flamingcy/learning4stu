import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { courses } from "@/data/quizData"
import { Star, Users, BookOpen } from "lucide-react"

const difficultyMap = {
  easy: { label: "入门", variant: "forest" as const },
  medium: { label: "进阶", variant: "sunshine" as const },
  hard: { label: "挑战", variant: "candy" as const },
}

export function HotCourses() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black">热门课程</h2>
        <Link
          to="/courses"
          className="text-sm font-medium text-primary hover:underline"
        >
          查看全部
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.slice(0, 6).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}

interface CourseCardProps {
  course: typeof courses[0]
}

export function CourseCard({ course }: CourseCardProps) {
  const diff = difficultyMap[course.difficulty]

  return (
    <Link to={`/course/${course.id}`}>
      <Card className="group overflow-hidden hover:scale-[1.02] transition-bounce cursor-pointer h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={diff.variant}>{diff.label}</Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="ocean">{course.category}</Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-base mb-1.5 group-hover:text-primary transition-smooth">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {course.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.lessons}课时
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.students}人
            </span>
            <span className="flex items-center gap-1 text-sunshine">
              <Star className="w-3.5 h-3.5 fill-sunshine" />
              {course.rating}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function CourseGrid({ categoryFilter }: { categoryFilter?: string }) {
  const filtered = categoryFilter
    ? courses.filter((c) => c.category === categoryFilter || categoryFilter === "all")
    : courses

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">📭</p>
        <p className="text-muted-foreground font-medium">暂无相关课程</p>
        <Button variant="outline" className="mt-4">
          <Link to="/courses">查看全部课程</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {filtered.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
