import type { SupportedLanguage } from "@/components/code-editor" // Assuming this is exported from code-editor.tsx

export type SubmissionStatus =
  | "Accepted"
  | "Wrong Answer"
  | "Time Limit Exceeded"
  | "Runtime Error"
  | "Compilation Error"
  | "Pending"
  | "Judging"

export interface Submission {
  id: string
  problemId: string
  problemTitle: string // Denormalized for easier display
  userId: string // For future use with actual users
  language: SupportedLanguage
  status: SubmissionStatus
  judgingInfo?: string // e.g., "Test case 5/10 failed", "Output differs"
  submissionTime: Date
  codeSnippet?: string // Optional: for viewing the submitted code
}
