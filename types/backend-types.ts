// 后端API对应的类型定义

// 标签类型
export interface Tag {
  id: number
  createTime: string
  updateTime: string
  creator: string
  updater: string
  deleted: boolean
  name: string
}

export interface TagResp {
  id: number
  createTime: string
  name: string
}

// 题目类型
export interface QuestionResp {
  id: number
  createTime: string
  title: string
  submitNum: number
  acceptNum: number
  thumbNum: number
  favourNum: number
  tags: Tag[]
  difficulty: string
  content: string
  answer: string
  judgeCase: string
  judgeConfig: string
}

export interface QuestionSaveReq {
  id?: number
  title: string
  content: string
  answer: string
  judgeCase?: string
  judgeConfig?: string
  tagIds?: number[]
  difficulty: string
}

// 题目查询参数
export interface QuestionPageReq {
  pageNo: number
  pageSize: number
  title?: string
}

// 标签查询参数
export interface TagPageReq {
  pageNo: number
  pageSize: number
  createTime?: string[]
  name?: string
}

export interface TagSaveReq {
  id?: number
  name: string
} 