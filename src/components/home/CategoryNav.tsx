import { Link } from "react-router-dom"
import { categories } from "@/data/quizData"
import { cn } from "@/lib/utils"

const colorMap: Record<string, string> = {
  primary: "bg-primary/10 hover:bg-primary/20 border-primary/20",
  candy: "bg-candy/10 hover:bg-candy/20 border-candy/20",
  ocean: "bg-ocean/10 hover:bg-ocean/20 border-ocean/20",
  forest: "bg-forest/10 hover:bg-forest/20 border-forest/20",
  sunshine: "bg-sunshine/10 hover:bg-sunshine/20 border-sunshine/20",
  accent: "bg-accent hover:bg-accent/80 border-accent",
}

export function CategoryNav() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black">课程分类</h2>
        <Link
          to="/courses"
          className="text-sm font-medium text-primary hover:underline"
        >
          查看全部
        </Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/courses?category=${cat.id}`}
            className={cn(
              "flex flex-col items-center gap-2.5 p-4 md:p-5 rounded-kid border-2 transition-bounce hover:scale-105",
              colorMap[cat.color] || colorMap.primary
            )}
          >
            <span className="text-3xl md:text-4xl">{cat.icon}</span>
            <span className="text-sm font-semibold">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
