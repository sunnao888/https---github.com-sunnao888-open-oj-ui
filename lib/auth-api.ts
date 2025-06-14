import { apiPost, apiGet } from './api'

// 认证相关类型定义
export interface LoginRequest {
  username: string
  password: string
  captchaVerification?: string
  socialType?: number
  socialCode?: string
  socialState?: string
}

export interface RegisterRequest {
  username: string
  nickname: string
  password: string
  captchaVerification?: string
}

export interface LoginResponse {
  userId: number
  accessToken: string
  refreshToken: string
  expiresTime: string
}

export interface UserInfo {
  id: number
  nickname: string
  avatar: string
  deptId: number
  username: string
  email: string
}

export interface PermissionInfo {
  user: UserInfo
  roles: string[]
  permissions: string[]
  menus: any[] // 简化菜单类型
}

// 认证API函数
export const authApi = {
  // 登录
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiPost<LoginResponse>('/admin-api/system/auth/login', data)
    // 登录成功后保存token
    if (response.accessToken) {
      localStorage.setItem('access_token', response.accessToken)
      localStorage.setItem('refresh_token', response.refreshToken)
    }
    return response
  },

  // 注册
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await apiPost<LoginResponse>('/admin-api/system/auth/register', data)
    // 注册成功后保存token
    if (response.accessToken) {
      localStorage.setItem('access_token', response.accessToken)
      localStorage.setItem('refresh_token', response.refreshToken)
    }
    return response
  },

  // 登出
  async logout(): Promise<boolean> {
    const response = await apiPost<boolean>('/admin-api/system/auth/logout')
    // 清除本地token
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    return response
  },

  // 获取用户权限信息
  async getPermissionInfo(): Promise<PermissionInfo> {
    return apiGet<PermissionInfo>('/admin-api/system/auth/get-permission-info', true)
  },

  // 刷新token
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await apiPost<LoginResponse>(`/admin-api/system/auth/refresh-token?refreshToken=${refreshToken}`)
    if (response.accessToken) {
      localStorage.setItem('access_token', response.accessToken)
      localStorage.setItem('refresh_token', response.refreshToken)
    }
    return response
  }
} 