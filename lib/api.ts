// API配置和通用函数
export const API_BASE_URL = '/api'

// 通用响应类型
export interface CommonResult<T = any> {
  code: number
  data: T
  msg: string
}

// 分页结果类型
export interface PageResult<T> {
  list: T[]
  total: number
}

// API错误类
export class ApiError extends Error {
  constructor(public code: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

// 通用请求函数
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders: Record<string, string> = {}

  // 只有在有请求体的情况下才添加Content-Type
  if (options.body) {
    defaultHeaders['Content-Type'] = 'application/json'
  }

  // 从localStorage获取token
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText)
  }

  const result: CommonResult<T> = await response.json()
  
  if (result.code !== 0) {
    throw new ApiError(result.code, result.msg)
  }

  return result.data
}

// 简单的GET请求 - 现在通过代理不会有CORS问题
export async function apiGet<T>(endpoint: string, requireAuth: boolean = false): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const headers: Record<string, string> = {}

  // 添加认证头部（如果需要）
  if (requireAuth) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })
    
    if (!response.ok) {
      throw new ApiError(response.status, response.statusText)
    }

    const result: CommonResult<T> = await response.json()
    
    if (result.code !== 0) {
      throw new ApiError(result.code, result.msg)
    }

    return result.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, error instanceof Error ? error.message : '网络请求失败')
  }
}

// POST请求
export function apiPost<T>(endpoint: string, data?: any): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  })
}

// PUT请求
export function apiPut<T>(endpoint: string, data?: any): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  })
}

// DELETE请求
export function apiDelete<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE' })
} 