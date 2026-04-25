import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-kid text-sm font-semibold ring-offset-background transition-bounce focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-button hover:opacity-90 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90 active:scale-95",
        outline: "border-2 border-primary bg-card text-primary hover:bg-primary hover:text-primary-foreground active:scale-95",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-80 active:scale-95",
        ghost: "hover:bg-muted hover:text-foreground active:scale-95",
        link: "text-primary underline-offset-4 hover:underline",
        ocean: "gradient-ocean text-ocean-foreground shadow-button hover:opacity-90 active:scale-95",
        forest: "gradient-forest text-forest-foreground shadow-button hover:opacity-90 active:scale-95",
        candy: "gradient-candy text-candy-foreground shadow-button hover:opacity-90 active:scale-95",
        sunshine: "gradient-sunshine text-sunshine-foreground shadow-button hover:opacity-90 active:scale-95",
        success: "bg-success text-success-foreground shadow-button hover:opacity-90 active:scale-95",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 rounded-kid px-8 text-base",
        xl: "h-14 rounded-bubble px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
