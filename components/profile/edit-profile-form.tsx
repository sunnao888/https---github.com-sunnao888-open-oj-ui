"use client"

import { useState, type FormEvent } from "react"
import type { UserProfile } from "@/components/auth-provider"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface EditProfileFormProps {
  user: UserProfile
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const { updateUserProfile } = useAuth()
  const { toast } = useToast()
  const [nickname, setNickname] = useState(user.nickname)
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Basic validation
    if (!nickname.trim()) {
      toast({ title: "错误", description: "昵称不能为空。", variant: "destructive" })
      return
    }
    updateUserProfile({ nickname, avatarUrl })
    toast({ title: "成功", description: "个人资料更新成功！" })
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>编辑个人资料</CardTitle>
        <CardDescription>更新您的个人信息。</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username-display" className="text-sm text-muted-foreground">
              用户名（不可修改）
            </Label>
            <Input id="username-display" type="text" value={user.username} disabled className="mt-1 bg-muted/50" />
          </div>
          <div>
            <Label htmlFor="nickname">昵称</Label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="avatarUrl">头像链接</Label>
            <Input
              id="avatarUrl"
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="mt-1"
              placeholder="https://example.com/头像.png"
            />
            <p className="text-xs text-muted-foreground mt-1">
              输入您头像图片的链接地址。占位符示例：
              /placeholder.svg?width=100&height=100&query=new+avatar
            </p>
          </div>
          <Button type="submit">保存更改</Button>
        </form>
      </CardContent>
    </Card>
  )
}
