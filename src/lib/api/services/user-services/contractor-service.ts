// src/lib/api/services/contractor.service.ts
import { apiClient } from '../../client'
import { API_ENDPOINTS } from '../../endpoints'
import { ContractorAdapter } from '../../adapters/users-adapters/contractor-adapter'

import type { 
  ContractorUser,
  PaginationParams, 
  PaginatedResponse,
  UpdateUserRequest
} from '../../types/users-types/types'

/**
 * Сервис для исполнителей
 * Доступен для чтения своего профиля и списка исполнителей (для админов)
 */
class ContractorService {
  /**
   * Получение списка исполнителей (только для администраторов)
   */
  async getContractors(pagination?: PaginationParams): Promise<PaginatedResponse<ContractorUser>> {
    const params = new URLSearchParams()
    
    if (pagination?.page) params.append('page', String(pagination.page))
    if (pagination?.limit) params.append('limit', String(pagination.limit))
    if (pagination?.sort) params.append('sort', pagination.sort)
    
    const response = await apiClient.get<{ data: unknown[]; pagination: unknown }>(
      `${API_ENDPOINTS.users.contractors}?${params.toString()}`
    )
    
    return {
      data: response.data.map((item) => ContractorAdapter.toContractorUser(item as Record<string, unknown>)),
      pagination: response.pagination as PaginatedResponse<ContractorUser>['pagination'],
    }
  }

  /**
   * Получение своего профиля (для исполнителя)
   */
  async getMyProfile(): Promise<ContractorUser> {
    const response = await apiClient.get<Record<string, unknown>>(API_ENDPOINTS.profile.base)
    return ContractorAdapter.toContractorUser(response)
  }

  /**
   * Обновление своего профиля (для исполнителя)
   */
  async updateMyProfile(data: UpdateUserRequest): Promise<ContractorUser> {
    const response = await apiClient.patch<Record<string, unknown>>(API_ENDPOINTS.profile.base, data)
    return ContractorAdapter.toContractorUser(response)
  }
}

export const contractorService = new ContractorService()