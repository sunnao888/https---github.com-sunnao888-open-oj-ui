"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ApiError } from "@/lib/api"

export default function LoginPage() {
  const { login, loading } = useAuth()
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "输入错误",
        description: "请输入用户名和密码",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      await login({
        username: username.trim(),
        password: password.trim()
      })
      
      toast({
        title: "登录成功",
        description: "欢迎回来！",
      })
    } catch (error) {
      console.error('登录错误:', error)
      
      let errorMessage = "登录失败，请稍后重试"
      
      if (error instanceof ApiError) {
        switch (error.code) {
          case 401:
            errorMessage = "用户名或密码错误"
            break
          case 403:
            errorMessage = "账户已被禁用"
            break
          case 404:
            errorMessage = "用户不存在"
            break
          default:
            errorMessage = error.message || "登录失败"
        }
      }
      
      toast({
        title: "登录失败",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">登录</CardTitle>
          <CardDescription>请输入您的用户名和密码进行登录。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                type="text"
                placeholder="您的用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting || loading}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">密码</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="您的密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting || loading}
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? "登录中..." : "登录"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            还没有账户？{" "}
            <Link href="/register" className="underline hover:text-primary">
              注册
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
