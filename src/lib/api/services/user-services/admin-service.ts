// src/lib/api/services/admin.service.ts
import { apiClient } from '../../client'
import { API_ENDPOINTS } from '../../endpoints'
import { AdminAdapter } from '../../adapters/users-adapters/admin-adapter'
import type { 
  AdminUser,
  PaginationParams, 
  PaginatedResponse,
  CreateUserRequest,
  UpdateUserRequest
} from '../../types/users-types/types'

/**
 * Сервис для административных операций
 * Доступен только для пользователей с ролью ADMIN
 */
class AdminService {
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
   * Создание пользователя (только для администраторов)
   */
  async createUser(data: CreateUserRequest): Promise<AdminUser> {
    const response = await apiClient.post<Record<string, unknown>>(API_ENDPOINTS.users.base, data)
    return AdminAdapter.toAdminUser(response)
  }

  /**
   * Обновление пользователя (только для администраторов)
   */
  async updateUser(id: string, data: UpdateUserRequest): Promise<AdminUser> {
    const response = await apiClient.patch<Record<string, unknown>>(API_ENDPOINTS.users.byId(id), data)
    return AdminAdapter.toAdminUser(response)
  }

  /**
   * Удаление пользователя (только для администраторов)
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.users.byId(id))
  }

  /**
   * Восстановление пользователя (только для администраторов)
   */
  async restoreUser(id: string): Promise<AdminUser> {
    const response = await apiClient.post<Record<string, unknown>>(API_ENDPOINTS.users.restore(id))
    return AdminAdapter.toAdminUser(response)
  }
}

export const adminService = new AdminService()