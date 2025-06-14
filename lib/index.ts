// API统一入口
export * from './api'
export * from './auth-api'
export * from './question-api'
export * from './data-adapter'

// 重新导出常用类型
export type { 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse, 
  UserInfo,
  PermissionInfo 
} from './auth-api'

export type {
  QuestionResp,
  QuestionSaveReq,
  QuestionPageReq,
  TagResp,
  TagSaveReq,
  TagPageReq
} from '../types/backend-types'

export type { Problem, ProblemDifficulty } from '../types/problem' 