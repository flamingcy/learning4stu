import { HeroCarousel } from "@/components/home/HeroCarousel"
import { CategoryNav } from "@/components/home/CategoryNav"
import { HotCourses } from "@/components/home/HotCourses"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Zap, BookOpen, Trophy, Users } from "lucide-react"

export function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="container mx-auto px-4 lg:px-8 pt-6 pb-10">
        <HeroCarousel />
      </section>

      {/* Stats Bar */}
      <section className="container mx-auto px-4 lg:px-8 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "精选课程", value: "200+", color: "gradient-hero" },
            { icon: Users, label: "活跃学员", value: "50,000+", color: "gradient-ocean" },
            { icon: Trophy, label: "累计答题", value: "100万+", color: "gradient-sunshine" },
            { icon: Zap, label: "正确率", value: "92%", color: "gradient-forest" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} rounded-kid p-4 md:p-5 text-center`}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary-foreground/80" />
              <p className="text-2xl md:text-3xl font-black text-primary-foreground">{stat.value}</p>
              <p className="text-xs text-primary-foreground/70 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 lg:px-8 pb-12">
        <CategoryNav />
      </section>

      {/* Hot Courses */}
      <section className="container mx-auto px-4 lg:px-8 pb-12">
        <HotCourses />
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 lg:px-8 pb-16">
        <div className="gradient-ocean rounded-kid p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-bubbles" />
          <div className="relative z-10">
            <p className="text-4xl mb-4">🎮</p>
            <h2 className="text-2xl md:text-3xl font-black text-ocean-foreground mb-3">
              准备好挑战了吗？
            </h2>
            <p className="text-ocean-foreground/80 mb-6 max-w-md mx-auto">
              来试试我们的趣味数学题，看看你能答对多少！
            </p>
            <Link to="/quiz">
              <Button
                size="xl"
                className="bg-card text-ocean font-bold hover:bg-card/90 shadow-float"
              >
                开始挑战
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
