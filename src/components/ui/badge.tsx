import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "ocean" | "forest" | "candy" | "sunshine" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses: Record<string, string> = {
    default: "bg-primary/10 text-primary",
    ocean: "bg-ocean/10 text-ocean",
    forest: "bg-forest/10 text-forest",
    candy: "bg-candy/10 text-candy",
    sunshine: "bg-sunshine/10 text-sunshine",
    success: "bg-success/10 text-success",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-bubble px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
