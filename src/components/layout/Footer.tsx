import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center text-lg">
                📚
              </div>
              <span className="text-xl font-black text-gradient-hero">趣学乐园</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              专为6-12岁少儿打造的在线学习平台，让每个孩子都能在快乐中学习成长。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4">快速导航</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/courses", label: "全部课程" },
                { to: "/quiz", label: "趣味答题" },
                { to: "/", label: "学习排行" },
                { to: "/", label: "我的课程" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm mb-4">帮助支持</h4>
            <ul className="space-y-2.5">
              {["常见问题", "联系客服", "家长指南", "使用教程"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-smooth cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-sm mb-4">关于我们</h4>
            <ul className="space-y-2.5">
              {["平台介绍", "教育理念", "师资团队", "合作伙伴"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-smooth cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 趣学乐园. 保留所有权利.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            用 <Heart className="w-3 h-3 text-candy fill-candy" /> 为孩子们打造
          </p>
        </div>
      </div>
    </footer>
  )
}
