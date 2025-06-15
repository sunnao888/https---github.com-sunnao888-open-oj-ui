"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useProblem } from "@/hooks/use-problems"
import type { Problem } from "@/types/problem"
import ProblemDifficultyBadge from "@/components/problem-difficulty-badge"
import { Badge } from "@/components/ui/badge"
import CodeEditor, { type SupportedLanguage } from "@/components/code-editor"
import { Button } from "@/components/ui/button"
import { Play, Upload, Settings2, Loader2, AlertCircle, ArrowLeft, Clock, Users, Trophy, BookOpen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const languageOptions: { value: SupportedLanguage; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python 3" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
]

export default function ProblemSolvingPageClient({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isLoggedIn, loading: authLoading } = useAuth()
  const { problem, loading: problemLoading, error, refresh } = useProblem(params.id)
  const { toast } = useToast()
  
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("javascript")
  const [userCode, setUserCode] = useState("") // To store user's current code in editor

  // 当问题加载完成或语言改变时更新代码
  useEffect(() => {
    if (problem?.initialCode?.[selectedLanguage]) {
      setUserCode(problem.initialCode[selectedLanguage]!)
    } else if (problem?.initialCode?.javascript) {
      // Fallback to JS if specific lang not found
      setUserCode(problem.initialCode.javascript)
    } else {
      setUserCode(`// 开始用 ${selectedLanguage} 编程...`)
    }
  }, [problem, selectedLanguage])

  // 检查登录状态
  useEffect(() => {
    if (!authLoading && isLoggedIn === false) {
      router.push("/login")
    }
  }, [isLoggedIn, authLoading, router])

  const handleLanguageChange = (langValue: string) => {
    const lang = langValue as SupportedLanguage
    setSelectedLanguage(lang)
    if (problem?.initialCode?.[lang]) {
      setUserCode(problem.initialCode[lang]!)
    } else if (problem?.initialCode?.javascript) {
      setUserCode(problem.initialCode.javascript)
    } else {
      setUserCode(`// 开始用 ${lang} 编程...`)
    }
  }

  const getSolutionCodeForLanguage = (lang: SupportedLanguage): string => {
    return (
      problem?.solutionCode?.[lang] ||
      problem?.solutionCode?.javascript ||
      "// 该语言暂无官方解答。"
    )
  }

  const handleRunCode = () => {
    toast({
      title: "运行代码",
      description: "代码运行功能正在开发中...",
    })
  }

  const handleSubmitCode = () => {
    toast({
      title: "提交代码",
      description: "代码提交功能正在开发中...",
    })
  }

  const handleRetry = () => {
    refresh()
  }

  // 加载状态
  if (authLoading || problemLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-2 p-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-8 w-3/4 rounded-lg" />
        </div>
        <div className="flex flex-grow overflow-hidden gap-4 p-4">
          <div className="w-1/2 space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
          <div className="w-1/2 space-y-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  // 用户未登录
  if (isLoggedIn === false) {
    return null // 会被重定向处理
  }

  // 错误状态
  if (error) {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center space-y-6 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 max-w-md">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full w-fit mx-auto">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">加载题目失败</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">{error}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={handleRetry} className="bg-blue-600 hover:bg-blue-700">
              重试
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 题目不存在
  if (!problem) {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center space-y-6 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 max-w-md">
          <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full w-fit mx-auto">
            <BookOpen className="h-12 w-12 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">题目不存在</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">找不到ID为 {params.id} 的题目</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">返回首页</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* 头部导航栏 */}
      <div className="flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="hover:bg-slate-100 dark:hover:bg-slate-700">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回题目列表
              </Link>
            </Button>
            <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{problem.title}</h1>
              <div className="flex items-center gap-3 mt-2">
                <ProblemDifficultyBadge difficulty={problem.difficulty} />
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Users className="h-4 w-4" />
                  <span>{problem.submissionCount.toLocaleString()} 次提交</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Trophy className="h-4 w-4" />
                  <span>{problem.acceptanceRate} 通过率</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {problem.tags.map((tag, index) => (
                <Badge key={`${problem.id}-${tag}-${index}`} variant="secondary" className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-700">
              <Settings2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-grow overflow-hidden">
        {/* 左侧面板：题目描述和解答 */}
        <div className="w-1/2 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
          <Tabs defaultValue="statement" className="flex flex-col h-full">
            <div className="flex-shrink-0 px-4 pt-4">
              <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-700">
                <TabsTrigger value="statement" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                  题目描述
                </TabsTrigger>
                <TabsTrigger value="solution" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                  参考解答
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="statement" className="flex-grow overflow-hidden m-0 p-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none 
                    prose-headings:text-slate-900 dark:prose-headings:text-slate-100
                    prose-p:text-slate-700 dark:prose-p:text-slate-300
                    prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 
                    prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700
                    prose-pre:rounded-lg prose-pre:p-4
                    prose-code:text-blue-600 dark:prose-code:text-blue-400
                    prose-code:bg-blue-50 dark:prose-code:bg-blue-900/30
                    prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-code:before:content-none prose-code:after:content-none
                    prose-strong:text-slate-900 dark:prose-strong:text-slate-100"
                    dangerouslySetInnerHTML={{ __html: problem.details }}
                  />
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="solution" className="flex-grow overflow-hidden m-0 p-0">
              <div className="h-full flex flex-col">
                <div className="flex-shrink-0 p-4 border-b border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    参考解答 - {languageOptions.find(lang => lang.value === selectedLanguage)?.label}
                  </p>
                </div>
                <div className="flex-grow">
                  <CodeEditor
                    initialCode={getSolutionCodeForLanguage(selectedLanguage)}
                    language={selectedLanguage}
                    readOnly={true}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* 右侧面板：代码编辑器 */}
        <div className="w-1/2 bg-white dark:bg-slate-800 flex flex-col">
          {/* 语言选择器 */}
          <div className="flex-shrink-0 p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">代码编辑器</h3>
              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="选择编程语言" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 代码编辑器 */}
          <div className="flex-grow">
            <CodeEditor
              initialCode={userCode}
              language={selectedLanguage}
              onCodeChange={(newCode) => setUserCode(newCode)}
            />
          </div>

          {/* 底部操作按钮 */}
          <div className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Clock className="h-4 w-4" />
                <span>记住要仔细测试你的代码</span>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700" 
                  onClick={handleRunCode}
                >
                  <Play className="h-4 w-4" />
                  运行代码
                </Button>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 shadow-sm" 
                  onClick={handleSubmitCode}
                >
                  <Upload className="h-4 w-4" />
                  提交答案
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
