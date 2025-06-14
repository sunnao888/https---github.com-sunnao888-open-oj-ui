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
import { Play, Upload, Settings2, Loader2, AlertCircle, ArrowLeft } from "lucide-react"
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
      <div className="flex flex-col h-[calc(100vh-3.5rem)] p-4">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-8 w-3/4" />
        </div>
        <div className="flex flex-grow overflow-hidden gap-4">
          <div className="w-1/2 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-full w-full" />
          </div>
          <div className="w-1/2 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-full w-full" />
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
      <div className="flex flex-col h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold">加载题目失败</h2>
          <p className="text-muted-foreground">{error}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={handleRetry}>重试</Button>
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
      <div className="flex flex-col h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">题目不存在</h2>
          <p className="text-muted-foreground">找不到ID为 {params.id} 的题目</p>
          <Button variant="outline" asChild>
            <Link href="/">返回首页</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-shrink-0 p-3 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{problem.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <ProblemDifficultyBadge difficulty={problem.difficulty} />
              {problem.tags.map((tag, index) => (
                <Badge key={`${problem.id}-${tag}-${index}`} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Settings2 className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-grow overflow-hidden">
        {/* Left Panel: Problem Description & Solution Tabs */}
        <Tabs defaultValue="statement" className="w-1/2 border-r flex flex-col">
          <TabsList className="m-2 grid w-auto grid-cols-2 self-start">
            <TabsTrigger value="statement">题目</TabsTrigger>
            <TabsTrigger value="solution">解答</TabsTrigger>
          </TabsList>
          <TabsContent value="statement" className="flex-grow overflow-hidden m-0 p-0">
            <ScrollArea className="h-full p-4 pt-0">
              <div
                className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-[#2d2d2d] prose-pre:p-3 prose-pre:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-muted prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: problem.details }}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="solution" className="flex-grow overflow-hidden m-0 p-0">
            <ScrollArea className="h-full">
              <CodeEditor
                initialCode={getSolutionCodeForLanguage(selectedLanguage)}
                language={selectedLanguage}
                readOnly={true}
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        {/* Right Panel: Code Editor and Actions */}
        <div className="w-1/2 flex flex-col">
          <div className="p-2 border-b">
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px] h-8 text-xs">
                <SelectValue placeholder="选择语言" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className="text-xs">
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-grow p-1">
            <CodeEditor
              initialCode={userCode}
              language={selectedLanguage}
              onCodeChange={(newCode) => setUserCode(newCode)}
            />
          </div>

          <div className="flex items-center justify-end gap-2 p-2 border-t flex-shrink-0">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleRunCode}>
              <Play className="h-4 w-4" /> 运行代码
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 flex items-center gap-1" onClick={handleSubmitCode}>
              <Upload className="h-4 w-4" /> 提交
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
