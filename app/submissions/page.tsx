"use client"
import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { MOCK_SUBMISSIONS } from "@/data/submissions"
import type { Submission } from "@/types/submission"
import type { SupportedLanguage } from "@/components/code-editor"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SubmissionStatusBadge from "@/components/submission-status-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

const ITEMS_PER_PAGE = 15
const languageOptions: { value: SupportedLanguage | "all"; label: string }[] = [
  { value: "all", label: "所有语言" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python 3" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
]

export default function SubmissionsPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const [problemTitleSearch, setProblemTitleSearch] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | "all">("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  const filteredSubmissions = useMemo(() => {
    return MOCK_SUBMISSIONS.filter((submission) => {
      const titleMatch = submission.problemTitle.toLowerCase().includes(problemTitleSearch.toLowerCase())
      const languageMatch = selectedLanguage === "all" || submission.language === selectedLanguage
      return titleMatch && languageMatch
    })
  }, [problemTitleSearch, selectedLanguage])

  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredSubmissions.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredSubmissions, currentPage])

  const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE)

  const goToPage = (pageNumber: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)))
  }

  if (isLoggedIn === undefined || isLoggedIn === false) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto py-8">
          <Skeleton className="h-12 w-1/4 mb-4" />
          <div className="flex gap-4 mb-6">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/4" />
          </div>
          <Skeleton className="h-96 w-full" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 flex-shrink-0">我的提交</h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-1/2 md:w-2/5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="按题目标题搜索..."
              value={problemTitleSearch}
              onChange={(e) => {
                setProblemTitleSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 w-full"
            />
          </div>
          <Select
            value={selectedLanguage}
            onValueChange={(value) => {
              setSelectedLanguage(value as SupportedLanguage | "all")
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-full sm:w-auto sm:min-w-[180px]">
              <SelectValue placeholder="按语言筛选" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-grow overflow-y-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="sticky top-0 bg-background z-10">
                <TableHead>题目</TableHead>
                <TableHead className="text-center">语言</TableHead>
                <TableHead className="text-center">状态</TableHead>
                <TableHead>详情</TableHead>
                <TableHead className="text-right">提交时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSubmissions.length > 0 ? (
                paginatedSubmissions.map((submission: Submission) => (
                  <TableRow key={submission.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Link
                        href={`/problems/${submission.problemId}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {submission.problemTitle}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center text-sm capitalize">{submission.language}</TableCell>
                    <TableCell className="text-center">
                      <SubmissionStatusBadge status={submission.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-xs">
                      {submission.judgingInfo || "-"}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(submission.submissionTime).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    没有找到符合条件的提交记录。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center space-x-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              上一页
            </Button>
            {/* Basic pagination numbers - can be enhanced */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1
              if (totalPages > 5 && currentPage > 3) {
                if (currentPage + 2 <= totalPages) pageNum = currentPage - 2 + i
                else pageNum = totalPages - 4 + i
              }
              if (pageNum > totalPages || pageNum < 1) return null
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-1">...</span>}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <Button variant="outline" size="sm" onClick={() => goToPage(totalPages)}>
                {totalPages}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              下一页
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
