import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  visible: boolean
}

export function Toast({ message, type = "info", visible }: ToastProps) {
  const typeClasses: Record<string, string> = {
    success: "gradient-forest text-forest-foreground",
    error: "bg-destructive text-destructive-foreground",
    info: "gradient-ocean text-ocean-foreground",
  }

  if (!visible) return null

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
      <div
        className={cn(
          "rounded-kid px-6 py-3 shadow-float font-semibold text-sm",
          typeClasses[type]
        )}
      >
        {message}
      </div>
    </div>
  )
}
