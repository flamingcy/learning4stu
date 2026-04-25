import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

const slides = [
  {
    title: "让学习变成一场冒险",
    subtitle: "专为6-12岁少儿打造的趣味学习平台",
    cta: "开始学习",
    ctaLink: "/courses",
    image: "/images/hero-banner.png",
  },
  {
    title: "数学不再枯燥",
    subtitle: "用图形和游戏的方式，让孩子爱上数学思维",
    cta: "挑战答题",
    ctaLink: "/quiz",
    image: "/images/math-course.png",
  },
  {
    title: "每天进步一点点",
    subtitle: "丰富的课程体系，陪伴孩子快乐成长",
    cta: "查看课程",
    ctaLink: "/courses",
    image: "/images/english-course.png",
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden rounded-kid gradient-hero mx-4 lg:mx-0">
      <div className="relative flex flex-col-reverse md:flex-row items-center min-h-[320px] md:min-h-[400px] p-6 md:p-12 lg:p-16">
        {/* Content */}
        <div className="flex-1 z-10 text-center md:text-left animate-scale-pop" key={current}>
          <div className="inline-flex items-center gap-1.5 rounded-bubble bg-card/20 px-3 py-1 text-xs font-semibold text-primary-foreground mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            趣学乐园
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-3 leading-tight">
            {slide.title}
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg mb-6 max-w-md">
            {slide.subtitle}
          </p>
          <Link to={slide.ctaLink}>
            <Button
              size="xl"
              className="bg-card text-primary font-bold hover:bg-card/90 shadow-float"
            >
              {slide.cta}
            </Button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center md:justify-end mb-4 md:mb-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain animate-float drop-shadow-2xl"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/20 hover:bg-card/30 flex items-center justify-center text-primary-foreground transition-smooth backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/20 hover:bg-card/30 flex items-center justify-center text-primary-foreground transition-smooth backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-smooth ${
              idx === current
                ? "w-8 bg-card"
                : "w-2 bg-card/40 hover:bg-card/60"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
