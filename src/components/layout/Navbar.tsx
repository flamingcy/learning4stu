import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Home,
  PenTool,
  Menu,
  X,
  Search,
  User,
} from "lucide-react"

const navLinks = [
  { to: "/", label: "首页", icon: Home },
  { to: "/courses", label: "全部课程", icon: BookOpen },
  { to: "/quiz", label: "趣味答题", icon: PenTool },
]

export function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center text-lg">
            📚
          </div>
          <span className="text-xl font-black text-gradient-hero hidden sm:inline">
            趣学乐园
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-kid text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className={cn(
            "transition-smooth overflow-hidden",
            searchOpen ? "w-48 md:w-64" : "w-0"
          )}>
            <input
              type="text"
              placeholder="搜索课程..."
              className="w-full h-9 rounded-kid bg-muted px-4 text-sm outline-none border-2 border-transparent focus:border-primary/30"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="shrink-0"
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* User */}
          <Button variant="ghost" size="icon" className="shrink-0">
            <User className="w-4 h-4" />
          </Button>

          {/* Login */}
          <Button size="sm" className="hidden sm:flex">
            登录
          </Button>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card animate-slide-up">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-kid text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              )
            })}
            <Button className="mt-2">登录</Button>
          </div>
        </div>
      )}
    </header>
  )
}
