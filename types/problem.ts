export type ProblemDifficulty = "Easy" | "Medium" | "Hard"

export interface Problem {
  id: string
  title: string
  difficulty: ProblemDifficulty
  tags: string[]
  description: string // For the problem list (short)
  details: string // For the problem page (can be HTML/Markdown)
  initialCode?: {
    javascript?: string
    python?: string
    java?: string
    csharp?: string // C# is often requested, using clike for C/C++
    go?: string
    c?: string
    cpp?: string
  }
  solutionCode?: {
    // To store example solution code for the "Solution" tab
    javascript?: string
    python?: string
    java?: string
    csharp?: string
    go?: string
    c?: string
    cpp?: string
  }
  submissionCount: number
  acceptanceCount: number
  likes: number
  favorites: number
  isFavorited?: boolean
  status?: "Solved" | "Attempted" | "Todo"
  acceptanceRate?: string
}
