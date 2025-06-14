import { apiGet, apiPost, apiPut, apiDelete, PageResult } from './api'
import { 
  QuestionResp, 
  QuestionSaveReq, 
  QuestionPageReq,
  TagResp,
  TagSaveReq,
  TagPageReq
} from '../types/backend-types'

// 题目API
export const questionApi = {
  // 创建题目
  async create(data: QuestionSaveReq): Promise<number> {
    return apiPost<number>('/biz/question/create', data)
  },

  // 更新题目
  async update(data: QuestionSaveReq): Promise<boolean> {
    return apiPut<boolean>('/biz/question/update', data)
  },

  // 删除题目
  async delete(id: number): Promise<boolean> {
    return apiDelete<boolean>(`/biz/question/delete?id=${id}`)
  },

  // 批量删除题目
  async deleteList(ids: number[]): Promise<boolean> {
    const idsStr = ids.join(',')
    return apiDelete<boolean>(`/biz/question/delete-list?ids=${idsStr}`)
  },

  // 获取题目详情 - 不需要认证
  async get(id: number): Promise<QuestionResp> {
    return apiGet<QuestionResp>(`/app-api/biz/question/get?id=${id}`, false)
  },

  // 获取题目分页列表 - 不需要认证
  async getPage(params: QuestionPageReq): Promise<PageResult<QuestionResp>> {
    const query = new URLSearchParams({
      pageNo: params.pageNo.toString(),
      pageSize: params.pageSize.toString(),
    })
    
    if (params.title) {
      query.append('title', params.title)
    }

    return apiGet<PageResult<QuestionResp>>(`/app-api/biz/question/page?${query.toString()}`, false)
  },

  // 导出题目Excel
  async exportExcel(params: QuestionPageReq): Promise<Blob> {
    const query = new URLSearchParams({
      pageNo: params.pageNo.toString(),
      pageSize: params.pageSize.toString(),
    })
    
    if (params.title) {
      query.append('title', params.title)
    }

    // 这里需要特殊处理，因为返回的是文件流
    const response = await fetch(`/biz/question/export-excel?${query.toString()}`)
    return response.blob()
  }
}

// 标签API
export const tagApi = {
  // 创建标签
  async create(data: TagSaveReq): Promise<number> {
    return apiPost<number>('/biz/tag/create', data)
  },

  // 更新标签
  async update(data: TagSaveReq): Promise<boolean> {
    return apiPut<boolean>('/biz/tag/update', data)
  },

  // 删除标签
  async delete(id: number): Promise<boolean> {
    return apiDelete<boolean>(`/biz/tag/delete?id=${id}`)
  },

  // 批量删除标签
  async deleteList(ids: number[]): Promise<boolean> {
    const idsStr = ids.join(',')
    return apiDelete<boolean>(`/biz/tag/delete-list?ids=${idsStr}`)
  },

  // 获取标签详情
  async get(id: number): Promise<TagResp> {
    return apiGet<TagResp>(`/biz/tag/get?id=${id}`, true)
  },

  // 获取标签分页列表
  async getPage(params: TagPageReq): Promise<PageResult<TagResp>> {
    const query = new URLSearchParams({
      pageNo: params.pageNo.toString(),
      pageSize: params.pageSize.toString(),
    })
    
    if (params.name) {
      query.append('name', params.name)
    }
    
    if (params.createTime && params.createTime.length > 0) {
      params.createTime.forEach(time => {
        query.append('createTime', time)
      })
    }

    return apiGet<PageResult<TagResp>>(`/biz/tag/page?${query.toString()}`, true)
  },

  // 根据问题id获取标签列表 - 不需要认证
  async getListByQuestionId(questionId: number): Promise<TagResp[]> {
    return apiGet<TagResp[]>(`/biz/tag/get-list-by-question-id?questionId=${questionId}`, false)
  },

  // 获取全部标签列表 - 不需要认证
  async getListAll(): Promise<TagResp[]> {
    return apiGet<TagResp[]>('/biz/tag/get-list-all', false)
  },

  // 导出标签Excel
  async exportExcel(params: TagPageReq): Promise<Blob> {
    const query = new URLSearchParams({
      pageNo: params.pageNo.toString(),
      pageSize: params.pageSize.toString(),
    })
    
    if (params.name) {
      query.append('name', params.name)
    }
    
    if (params.createTime && params.createTime.length > 0) {
      params.createTime.forEach(time => {
        query.append('createTime', time)
      })
    }

    // 这里需要特殊处理，因为返回的是文件流
    const response = await fetch(`/biz/tag/export-excel?${query.toString()}`)
    return response.blob()
  }
} 