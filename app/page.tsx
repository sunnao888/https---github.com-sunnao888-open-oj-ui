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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4 flex flex-col min-h-0">
        {/* 顶部标题和搜索区域 */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                题目列表
              </h1>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
            {totalCount > 0 && (
              <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm border">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  共 <span className="text-blue-600 dark:text-blue-400 font-bold">{totalCount}</span> 题
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                type="search"
                placeholder="搜索题目..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-full sm:w-80 h-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                disabled={loading}
              />
            </div>
            <Button
              variant="outline"
              size="default"
              onClick={handleRefresh}
              disabled={loading}
              className="h-11 px-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </Button>
          </div>
        </div>

        {/* 错误状态 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 flex-shrink-0">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-red-700 dark:text-red-300 font-medium">加载失败</p>
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              重试
            </Button>
          </div>
        )}

        {/* 题目表格容器 - 使用计算的最小高度确保分页组件固定在底部 */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="h-full overflow-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                  <TableRow className="sticky top-0 bg-slate-50 dark:bg-slate-900/50 z-10 border-b border-slate-200 dark:border-slate-700">
                    <TableHead className="w-[80px] text-center font-semibold text-slate-700 dark:text-slate-300">状态</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">题目</TableHead>
                    <TableHead className="text-center font-semibold text-slate-700 dark:text-slate-300">难度</TableHead>
                    <TableHead className="text-center font-semibold text-slate-700 dark:text-slate-300">通过率</TableHead>
                    <TableHead className="text-center font-semibold text-slate-700 dark:text-slate-300">点赞</TableHead>
                    <TableHead className="text-center font-semibold text-slate-700 dark:text-slate-300">收藏</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-96">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="relative">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            <div className="absolute inset-0 rounded-full border-2 border-blue-200 dark:border-blue-800"></div>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 font-medium">正在加载题目...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : problems.length > 0 ? (
                    problems.map((problem: Problem) => (
                      <TableRow key={problem.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 border-b border-slate-100 dark:border-slate-800">
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            {problem.status === "Solved" && (
                              <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                            )}
                            {problem.status === "Attempted" && (
                              <div className="p-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                                <Edit3 className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                              </div>
                            )}
                            {problem.status === "Todo" && (
                              <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <XCircle className="h-4 w-4 text-slate-400" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="space-y-2">
                            <ProblemLink 
                              problem={problem} 
                              className="font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-lg leading-tight"
                            >
                              {problem.title}
                            </ProblemLink>
                            <div className="flex flex-wrap gap-1.5">
                              {problem.tags.map((tag, index) => (
                                <Badge 
                                  key={`${problem.id}-${tag}-${index}`} 
                                  variant="secondary" 
                                  className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <ProblemDifficultyBadge difficulty={problem.difficulty} />
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-medium text-slate-700 dark:text-slate-300">
                            {problem.acceptanceRate}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-1 text-slate-600 dark:text-slate-400">
                            <ThumbsUp className="h-4 w-4 text-green-500" />
                            <span className="font-medium">{problem.likes.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <button className="group">
                            <Star
                              className={cn(
                                "h-5 w-5 transition-all duration-200",
                                problem.isFavorited 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-slate-400 group-hover:text-yellow-400 group-hover:scale-110"
                              )}
                            />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-96">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                            <Search className="h-8 w-8 text-slate-400" />
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                              {searchQuery ? `没有找到包含 "${searchQuery}" 的题目` : "暂无题目"}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                              {searchQuery ? "请尝试其他关键词" : "数据正在加载中"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* 分页组件 - 固定在底部 */}
          {totalPages > 1 && !loading && (
            <div className="mt-6 flex justify-center items-center space-x-2 flex-shrink-0">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-3">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => goToPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-all duration-200"
                  >
                    上一页
                  </Button>
                  <div className="flex items-center space-x-1">
                    {getPaginationButtons().map((item, index) =>
                      typeof item === "number" ? (
                        <Button
                          key={`page-${item}`}
                          variant={currentPage === item ? "default" : "ghost"}
                          size="sm"
                          onClick={() => goToPage(item)}
                          className={cn(
                            "min-w-[2.5rem] h-9 transition-all duration-200",
                            currentPage === item 
                              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                          )}
                        >
                          {item}
                        </Button>
                      ) : (
                        <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-slate-500 dark:text-slate-400">
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-all duration-200"
                  >
                    下一页
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
