// src/lib/api/services/user.service.ts
import { apiClient } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import { AdminAdapter } from '../adapters/users-adapters/admin-adapter'
import { CustomerAdapter } from '../adapters/users-adapters/customer-adapter'
import { ContractorAdapter } from '../adapters/users-adapters/contractor-adapter'
import type { 
  AdminUser,
  CustomerUser,
  ContractorUser,
  PaginationParams, 
  PaginatedResponse,
} from '../types/users-types/types'

class UserService {
  /**
   * Получение списка администраторов
   */
  async getAdmins(pagination?: PaginationParams): Promise<PaginatedResponse<AdminUser>> {
    const params = new URLSearchParams()
    
    if (pagination?.page) params.append('page', String(pagination.page))
    if (pagination?.limit) params.append('limit', String(pagination.limit))
    if (pagination?.sort) params.append('sort', pagination.sort)
    
    const response = await apiClient.get<{ data: unknown[]; pagination: unknown }>(
      `${API_ENDPOINTS.users.admins}?${params.toString()}`
    )
    
    return {
      data: response.data.map((item) => AdminAdapter.toAdminUser(item as Record<string, unknown>)),
      pagination: response.pagination as PaginatedResponse<AdminUser>['pagination'],
    }
  }

  /**
   * Получение списка заказчиков
   */
  async getCustomers(pagination?: PaginationParams): Promise<PaginatedResponse<CustomerUser>> {
    const params = new URLSearchParams()
    
    if (pagination?.page) params.append('page', String(pagination.page))
    if (pagination?.limit) params.append('limit', String(pagination.limit))
    if (pagination?.sort) params.append('sort', pagination.sort)
    
    const response = await apiClient.get<{ data: unknown[]; pagination: unknown }>(
      `${API_ENDPOINTS.users.customers}?${params.toString()}`
    )
    
    return {
      data: response.data.map((item) => CustomerAdapter.toCustomerUser(item as Record<string, unknown>)),
      pagination: response.pagination as PaginatedResponse<CustomerUser>['pagination'],
    }
  }

  /**
   * Получение списка исполнителей
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

  // ... остальные методы
}

export const userService = new UserService()