import { useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { CourseGrid } from "@/components/home/HotCourses"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/quizData"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

const categoryMap: Record<string, string> = {
  math: "数学",
  chinese: "语文",
  english: "英语",
  science: "科学",
  art: "美术",
  music: "音乐",
}

export function CoursesPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  const [activeCategory, setActiveCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState("")

  const categoryLabel = activeCategory === "all" ? undefined : categoryMap[activeCategory]

  return (
    <main className="container mx-auto px-4 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">全部课程</h1>
        <p className="text-muted-foreground">选择感兴趣的课程，开启快乐学习之旅</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索课程名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 rounded-kid bg-card border-2 border-transparent focus:border-primary/30 pl-10 pr-4 text-sm outline-none shadow-soft transition-smooth"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <Button
          variant={activeCategory === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveCategory("all")}
          className={cn(activeCategory === "all" && "shadow-button")}
        >
          全部
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "shrink-0",
              activeCategory === cat.id && "shadow-button"
            )}
          >
            <span className="mr-1.5">{cat.icon}</span>
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Course Grid */}
      <CourseGrid categoryFilter={categoryLabel} />

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">想要练习数学？试试我们的趣味答题</p>
        <Link to="/quiz">
          <Button size="lg" variant="outline">
            去答题
          </Button>
        </Link>
      </div>
    </main>
  )
}
