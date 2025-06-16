"use client"

import type React from "react"
import { useProblems } from "@/hooks/use-problems"
import type { Problem } from "@/types/problem"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import ProblemDifficultyBadge from "@/components/problem-difficulty-badge"
import { ThumbsUp, Star, CheckCircle, Edit3, XCircle, Search, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProblemLink from "@/components/problem-link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const ITEMS_PER_PAGE = 10

export default function HomePage() {
  const { toast } = useToast()
  
  const {
    problems,
    loading,
    error,
    currentPage,
    totalPages,
    totalCount,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    refresh
  } = useProblems({ pageSize: ITEMS_PER_PAGE })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleRefresh = async () => {
    try {
      await refresh()
      toast({
        title: "刷新成功",
        description: "题目列表已更新",
      })
    } catch (error) {
      toast({
        title: "刷新失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    }
  }

  // Helper to generate pagination buttons with ellipsis
  const getPaginationButtons = () => {
    const buttons: (number | string)[] = []
    const maxButtons = 7 // Max buttons to show (e.g., 1 ... 4 5 6 ... 10)
    const sideButtons = 2 // Number of buttons on each side of current page

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i)
      }
    } else {
      buttons.push(1) // Always show first page

      const start = Math.max(2, currentPage - sideButtons)
      const end = Math.min(totalPages - 1, currentPage + sideButtons)

      if (currentPage - sideButtons > 2) {
        buttons.push("...")
      }

      for (let i = start; i <= end; i++) {
        buttons.push(i)
      }

      if (currentPage + sideButtons < totalPages - 1) {
        buttons.push("...")
      }

      buttons.push(totalPages) // Always show last page
    }
    return buttons
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 flex flex-col">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-center sm:text-left">题目列表</h1>
            {totalCount > 0 && (
              <span className="text-sm text-muted-foreground">
                共 {totalCount} 题
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索题目..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-full"
                disabled={loading}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              className="shrink-0"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span className="text-destructive">{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="ml-auto"
            >
              重试
            </Button>
          </div>
        )}

        <div className="flex-grow overflow-y-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="sticky top-0 bg-background z-10">
                <TableHead className="w-[60px]">状态</TableHead>
                <TableHead>题目</TableHead>
                <TableHead className="text-center">难度</TableHead>
                <TableHead className="text-center">通过率</TableHead>
                <TableHead className="text-center">点赞</TableHead>
                <TableHead className="text-center">收藏</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      正在加载题目...
                    </div>
                  </TableCell>
                </TableRow>
              ) : problems.length > 0 ? (
                problems.map((problem: Problem) => (
                  <TableRow key={problem.id} className="hover:bg-muted/50">
                    <TableCell className="text-center">
                      {problem.status === "Solved" && <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />}
                      {problem.status === "Attempted" && <Edit3 className="h-5 w-5 text-yellow-500 mx-auto" />}
                      {problem.status === "Todo" && <XCircle className="h-5 w-5 text-gray-500 mx-auto" />}
                    </TableCell>
                    <TableCell>
                      <ProblemLink problem={problem} className="font-medium hover:text-primary transition-colors">
                        {problem.title}
                      </ProblemLink>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {problem.tags.map((tag, index) => (
                          <Badge key={`${problem.id}-${tag}-${index}`} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <ProblemDifficultyBadge difficulty={problem.difficulty} />
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {problem.acceptanceRate}
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      <div className="flex items-center justify-center">
                        <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                        {problem.likes.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Star
                        className={cn(
                          "h-5 w-5 mx-auto cursor-pointer",
                          problem.isFavorited ? "fill-yellow-400 text-yellow-400" : "text-gray-500 hover:text-gray-400",
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    {searchQuery ? `没有找到包含 "${searchQuery}" 的题目` : "暂无题目"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && !loading && (
          <div className="mt-6 flex justify-center items-center space-x-2 flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => goToPage(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              上一页
            </Button>
            {getPaginationButtons().map((item, index) =>
              typeof item === "number" ? (
                <Button
                  key={`page-${item}`}
                  variant={currentPage === item ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(item)}
                >
                  {item}
                </Button>
              ) : (
                <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm">
                  {item}
                </span>
              ),
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
    </div>
  )
}
