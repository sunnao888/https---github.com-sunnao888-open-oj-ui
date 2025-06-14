"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ApiError } from "@/lib/api"

export default function RegisterPage() {
  const router = useRouter()
  const { register, loading } = useAuth()
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!username.trim()) newErrors.username = "用户名不能为空。"
    if (!nickname.trim()) newErrors.nickname = "昵称不能为空。"
    if (!password) newErrors.password = "密码不能为空。"
    else if (password.length < 6) newErrors.password = "密码长度至少需要6位字符。"
    if (!confirmPassword) newErrors.confirmPassword = "请确认密码。"
    else if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致。"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "验证错误",
        description: "请检查表单中的错误。",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await register({
        username: username.trim(),
        nickname: nickname.trim(),
        password: password.trim()
      })
      
      toast({
        title: "注册成功！",
        description: "欢迎加入我们！",
      })
    } catch (error) {
      console.error('注册错误:', error)
      
      let errorMessage = "注册失败，请稍后重试"
      
      if (error instanceof ApiError) {
        switch (error.code) {
          case 400:
            errorMessage = "用户名已存在或数据格式不正确"
            break
          case 409:
            errorMessage = "用户名已被占用"
            break
          default:
            errorMessage = error.message || "注册失败"
        }
      }
      
      toast({
        title: "注册失败",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">创建账户</CardTitle>
          <CardDescription>请填写以下信息进行注册。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="grid gap-4">
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
              {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nickname">昵称</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="您的显示名称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={isSubmitting || loading}
                required
              />
              {errors.nickname && <p className="text-xs text-red-500">{errors.nickname}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="至少6位字符"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting || loading}
                required
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">确认密码</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="再次输入密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting || loading}
                required
              />
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>
            <Button 
              type="submit" 
              className="w-full mt-2"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? "注册中..." : "创建账户"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            已有账户？{" "}
            <Link href="/login" className="underline hover:text-primary">
              登录
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
