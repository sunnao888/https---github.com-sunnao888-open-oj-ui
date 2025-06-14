import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ProblemDifficulty } from "@/types/problem"

interface ProblemDifficultyBadgeProps {
  difficulty: ProblemDifficulty
  size?: "sm" | "md" | "lg"
  className?: string
}

const difficultyConfig = {
  Easy: {
    label: "简单",
    className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    dotColor: "bg-green-500"
  },
  Medium: {
    label: "中等",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
    dotColor: "bg-yellow-500"
  },
  Hard: {
    label: "困难",
    className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
    dotColor: "bg-red-500"
  }
}

const sizeConfig = {
  sm: {
    badge: "text-xs px-2 py-1 h-6",
    dot: "w-2 h-2"
  },
  md: {
    badge: "text-sm px-3 py-1 h-7",
    dot: "w-2.5 h-2.5"
  },
  lg: {
    badge: "text-base px-4 py-2 h-8",
    dot: "w-3 h-3"
  }
}

export default function ProblemDifficultyBadge({ 
  difficulty, 
  size = "md", 
  className 
}: ProblemDifficultyBadgeProps) {
  const config = difficultyConfig[difficulty]
  const sizeStyles = sizeConfig[size]

  return (
    <Badge 
      className={cn(
        "font-semibold border transition-all duration-200 hover:scale-105 flex items-center gap-1.5",
        config.className,
        sizeStyles.badge,
        className
      )}
    >
      <div className={cn("rounded-full", config.dotColor, sizeStyles.dot)} />
      {config.label}
    </Badge>
  )
}
