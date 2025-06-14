import type { Submission, SubmissionStatus } from "@/types/submission"
import type { SupportedLanguage } from "@/components/code-editor"
import { PROBLEMS_WITH_STATS } from "./problems" // To link to existing problems

const MOCK_USER_ID = "user123"

const getRandomProblem = () => {
  return PROBLEMS_WITH_STATS[Math.floor(Math.random() * PROBLEMS_WITH_STATS.length)]
}

const getRandomLanguage = (): SupportedLanguage => {
  const languages: SupportedLanguage[] = ["javascript", "python", "java", "c", "cpp", "go"]
  return languages[Math.floor(Math.random() * languages.length)]
}

const getRandomStatus = (): SubmissionStatus => {
  const statuses: SubmissionStatus[] = [
    "Accepted",
    "Wrong Answer",
    "Time Limit Exceeded",
    "Runtime Error",
    "Compilation Error",
  ]
  return statuses[Math.floor(Math.random() * statuses.length)]
}

const getRandomDate = (start = new Date(2023, 0, 1), end = new Date()): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export const MOCK_SUBMISSIONS: Submission[] = Array.from({ length: 50 }, (_, i) => {
  const problem = getRandomProblem()
  const status = getRandomStatus()
  let judgingInfo = ""
  if (status === "Wrong Answer") judgingInfo = `Test case ${Math.ceil(Math.random() * 10)}/10 failed.`
  else if (status === "Runtime Error")
    judgingInfo = `Runtime error: NullPointer Exception at line ${Math.ceil(Math.random() * 50)}.`
  else if (status === "Time Limit Exceeded")
    judgingInfo = `Exceeded time limit on test case ${Math.ceil(Math.random() * 10)}.`
  else if (status === "Compilation Error")
    judgingInfo = `Syntax error: unexpected token at line ${Math.ceil(Math.random() * 20)}.`

  return {
    id: `sub-${i + 1}-${Date.now()}`,
    problemId: problem.id,
    problemTitle: problem.title,
    userId: MOCK_USER_ID,
    language: getRandomLanguage(),
    status: status,
    judgingInfo: status === "Accepted" ? "All test cases passed!" : judgingInfo,
    submissionTime: getRandomDate(),
    codeSnippet: `// Mock code snippet for submission ${i + 1}\nconsole.log("Hello, ${problem.title}!");`,
  }
}).sort((a, b) => b.submissionTime.getTime() - a.submissionTime.getTime()) // Sort by newest first
