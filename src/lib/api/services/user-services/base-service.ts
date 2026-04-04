// src/lib/api/services/base.service.ts
import { apiClient } from '../../client'
import type { PaginationParams, PaginatedResponse } from '../../types/users-types/types'

export abstract class BaseUserService {
  protected abstract getEndpoint(): string
  
  async getAll<T>(pagination?: PaginationParams): Promise<PaginatedResponse<T>> {
    const params = new URLSearchParams()
    
    if (pagination?.page) params.append('page', String(pagination.page))
    if (pagination?.limit) params.append('limit', String(pagination.limit))
    if (pagination?.sort) params.append('sort', pagination.sort)
    
    const response = await apiClient.get<{ data: unknown[]; pagination: unknown }>(
      `${this.getEndpoint()}?${params.toString()}`
    )
    
    return {
      data: response.data as T[],
      pagination: response.pagination as PaginatedResponse<T>['pagination'],
    }
  }
}