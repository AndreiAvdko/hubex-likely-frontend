// src/lib/api/services/customer.service.ts
import { apiClient } from '../../client'
import { API_ENDPOINTS } from '../../endpoints'
import { CustomerAdapter } from '../../adapters/users-adapters/customer-adapter'
import type { 
  CustomerUser,
  PaginationParams, 
  PaginatedResponse,
  UpdateUserRequest
} from '../../types/users-types/types'

/**
 * Сервис для заказчиков
 * Доступен для чтения своего профиля и списка заказчиков (для админов)
 */
class CustomerService {
  /**
   * Получение списка заказчиков (только для администраторов)
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
   * Получение своего профиля (для заказчика)
   */
  async getMyProfile(): Promise<CustomerUser> {
    const response = await apiClient.get<Record<string, unknown>>(API_ENDPOINTS.profile.base)
    return CustomerAdapter.toCustomerUser(response)
  }

  /**
   * Обновление своего профиля (для заказчика)
   */
  async updateMyProfile(data: UpdateUserRequest): Promise<CustomerUser> {
    const response = await apiClient.patch<Record<string, unknown>>(API_ENDPOINTS.profile.base, data)
    return CustomerAdapter.toCustomerUser(response)
  }
}

export const customerService = new CustomerService()