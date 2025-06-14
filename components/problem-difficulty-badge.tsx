import type { ProblemDifficulty } from "@/types/problem"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProblemDifficultyBadgeProps {
  difficulty: ProblemDifficulty
}

export default function ProblemDifficultyBadge({ difficulty }: ProblemDifficultyBadgeProps) {
  const difficultyMap = {
    "Easy": "简单",
    "Medium": "中等", 
    "Hard": "困难"
  }

  return (
    <Badge
      className={cn(
        "font-semibold",
        difficulty === "Easy" && "bg-green-500/20 text-green-400 hover:bg-green-500/30",
        difficulty === "Medium" && "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30",
        difficulty === "Hard" && "bg-red-500/20 text-red-400 hover:bg-red-500/30",
      )}
    >
      {difficultyMap[difficulty] || difficulty}
    </Badge>
  )
}
