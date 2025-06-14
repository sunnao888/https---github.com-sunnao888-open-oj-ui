"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import { useRouter } from "next/navigation"
import { authApi, type LoginRequest, type RegisterRequest, type UserInfo } from "@/lib"
import { ApiError } from "@/lib/api"

export interface UserProfile {
  username: string
  nickname: string
  avatarUrl: string
  email?: string
  id?: number
}

interface AuthContextType {
  isLoggedIn: boolean
  user: UserProfile | null
  loading: boolean
  login: (loginData: LoginRequest) => Promise<void>
  register: (registerData: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  updateUserProfile: (newProfileData: Partial<UserProfile>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const isLoggedIn = !!user

  // 初始化时检查用户登录状态
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          // 获取用户权限信息来验证token是否有效
          const permissionInfo = await authApi.getPermissionInfo()
          const userInfo = permissionInfo.user
          setUser({
            id: userInfo.id,
            username: userInfo.username,
            nickname: userInfo.nickname,
            avatarUrl: userInfo.avatar || "/placeholder.svg?width=100&height=100",
            email: userInfo.email
          })
        } catch (error) {
          // Token无效，清除本地存储
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          console.error('Token验证失败:', error)
        }
      }
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = useCallback(
    async (loginData: LoginRequest) => {
      try {
        setLoading(true)
        const loginResponse = await authApi.login(loginData)
        
        // 获取用户详细信息
        const permissionInfo = await authApi.getPermissionInfo()
        const userInfo = permissionInfo.user
        
        setUser({
          id: userInfo.id,
          username: userInfo.username,
          nickname: userInfo.nickname,
          avatarUrl: userInfo.avatar || "/placeholder.svg?width=100&height=100",
          email: userInfo.email
        })
        
        router.push("/") // 登录成功后跳转到首页
      } catch (error) {
        console.error('登录失败:', error)
        throw error // 重新抛出错误，让调用方处理
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  const register = useCallback(
    async (registerData: RegisterRequest) => {
      try {
        setLoading(true)
        const registerResponse = await authApi.register(registerData)
        
        // 注册成功后获取用户信息
        const permissionInfo = await authApi.getPermissionInfo()
        const userInfo = permissionInfo.user
        
        setUser({
          id: userInfo.id,
          username: userInfo.username,
          nickname: userInfo.nickname,
          avatarUrl: userInfo.avatar || "/placeholder.svg?width=100&height=100",
          email: userInfo.email
        })
        
        router.push("/") // 注册成功后跳转到首页
      } catch (error) {
        console.error('注册失败:', error)
        throw error // 重新抛出错误，让调用方处理
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      setUser(null)
      router.push("/login") // 登出后跳转到登录页
    }
  }, [router])

  const updateUserProfile = useCallback((newProfileData: Partial<UserProfile>) => {
    setUser((currentUser) => {
      if (!currentUser) return null
      return { ...currentUser, ...newProfileData }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      updateUserProfile 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
