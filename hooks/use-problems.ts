import { useState, useEffect, useCallback } from 'react'
import { questionApi, tagApi, adaptQuestionToProblem, type QuestionPageReq, type QuestionResp } from '@/lib'
import { Problem } from '@/types/problem'
import { ApiError } from '@/lib/api'

interface UseProblemsOptions {
  pageSize?: number
  initialSearch?: string
}

interface UseProblemsResult {
  problems: Problem[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  totalCount: number
  searchQuery: string
  setSearchQuery: (query: string) => void
  setCurrentPage: (page: number) => void
  refresh: () => Promise<void>
}

export function useProblems(options: UseProblemsOptions = {}): UseProblemsResult {
  const { pageSize = 10, initialSearch = '' } = options

  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState(initialSearch)

  const totalPages = Math.ceil(totalCount / pageSize)

  const fetchProblems = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params: QuestionPageReq = {
        pageNo: currentPage,
        pageSize,
        title: searchQuery.trim() || undefined
      }

      const result = await questionApi.getPage(params)
      
      // 转换后端数据格式为前端格式
      const adaptedProblems = result.list.map(question => adaptQuestionToProblem(question))
      
      setProblems(adaptedProblems)
      setTotalCount(result.total)
    } catch (err) {
      console.error('获取题目列表失败:', err)
      let errorMessage = '获取题目列表失败'
      
      if (err instanceof ApiError) {
        errorMessage = err.message || '获取题目列表失败'
      }
      
      setError(errorMessage)
      setProblems([])
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize, searchQuery])

  const refresh = useCallback(async () => {
    await fetchProblems()
  }, [fetchProblems])

  // 当页码或搜索条件变化时重新获取数据
  useEffect(() => {
    fetchProblems()
  }, [fetchProblems])

  // 搜索条件变化时重置到第一页
  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  // 确保页码在有效范围内
  const handleSetCurrentPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages || 1))
    setCurrentPage(validPage)
  }, [totalPages])

  return {
    problems,
    loading,
    error,
    currentPage,
    totalPages,
    totalCount,
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    setCurrentPage: handleSetCurrentPage,
    refresh
  }
}

// 获取单个题目的hook
export function useProblem(id: string) {
  console.log("id", id)
  const [problem, setProblem] = useState<Problem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProblem = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)

      const question = await questionApi.get(parseInt(id))
      const adaptedProblem = adaptQuestionToProblem(question)
      
      setProblem(adaptedProblem)
    } catch (err) {
      console.error('获取题目详情失败:', err)
      let errorMessage = '获取题目详情失败'
      
      if (err instanceof ApiError) {
        errorMessage = err.message || '获取题目详情失败'
      }
      
      setError(errorMessage)
      setProblem(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProblem()
  }, [fetchProblem])

  const refresh = useCallback(async () => {
    await fetchProblem()
  }, [fetchProblem])

  return {
    problem,
    loading,
    error,
    refresh
  }
} 