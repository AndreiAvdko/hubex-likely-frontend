// src/lib/api/services/user.service.ts
import { apiClient } from '../client'
import { API_ENDPOINTS } from '../endpoints'
import { UserAdapter } from '../adapters/user-adapter'
import type { 
  // UserListItem,
  AdminUser,
  // CustomerUser,
  // ContractorUser,
  PaginationParams, 
  PaginatedResponse,
  // CreateUserRequest,
  // UpdateUserRequest
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
      data: response.data.map((item) => UserAdapter.toAdminUser(item as Record<string, unknown>)),
      pagination: response.pagination as PaginatedResponse<AdminUser>['pagination'],
    }
  }

  /**
   * Получение списка заказчиков
   */
  // async getCustomers(pagination?: PaginationParams): Promise<PaginatedResponse<CustomerUser>> {
  //   const params = new URLSearchParams()
    
  //   if (pagination?.page) params.append('page', String(pagination.page))
  //   if (pagination?.limit) params.append('limit', String(pagination.limit))
  //   if (pagination?.sort) params.append('sort', pagination.sort)
    
  //   const response = await apiClient.get<{ data: unknown[]; pagination: unknown }>(
  //     `${API_ENDPOINTS.users.customers}?${params.toString()}`
  //   )
    
  //   return {
  //     data: response.data.map((item) => UserAdapter.toCustomerUser(item as Record<string, unknown>)),
  //     pagination: response.pagination as PaginatedResponse<CustomerUser>['pagination'],
  //   }
  // }

  /**
   * Получение списка исполнителей
   */
  // async getContractors(pagination?: PaginationParams): Promise<PaginatedResponse<ContractorUser>> {
  //   const params = new URLSearchParams()
    
  //   if (pagination?.page) params.append('page', String(pagination.page))
  //   if (pagination?.limit) params.append('limit', String(pagination.limit))
  //   if (pagination?.sort) params.append('sort', pagination.sort)
    
  //   const response = await apiClient.get<{ data: unknown[]; pagination: unknown }>(
  //     `${API_ENDPOINTS.users.contractors}?${params.toString()}`
  //   )
    
  //   return {
  //     data: response.data.map((item) => UserAdapter.toContractorUser(item as Record<string, unknown>)),
  //     pagination: response.pagination as PaginatedResponse<ContractorUser>['pagination'],
  //   }
  // }

  /**
   * Получение пользователя по ID
   */
  // async getUserById(id: string): Promise<UserListItem> {
  //   const response = await apiClient.get<Record<string, unknown>>(API_ENDPOINTS.users.byId(id))
  //   return UserAdapter.toUserListItem(response)
  // }

  /**
   * Создание пользователя (админ)
   */
  // async createUser(data: CreateUserRequest): Promise<UserListItem> {
  //   const response = await apiClient.post<Record<string, unknown>>(API_ENDPOINTS.users.base, data)
  //   return UserAdapter.toUserListItem(response)
  // }

  /**
   * Обновление пользователя
   */
  // async updateUser(id: string, data: UpdateUserRequest): Promise<UserListItem> {
  //   const response = await apiClient.patch<Record<string, unknown>>(API_ENDPOINTS.users.byId(id), data)
  //   return UserAdapter.toUserListItem(response)
  // }

  /**
   * Удаление пользователя
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.users.byId(id))
  }

  /**
   * Восстановление пользователя
   */
  // async restoreUser(id: string): Promise<UserListItem> {
  //   const response = await apiClient.post<Record<string, unknown>>(API_ENDPOINTS.users.restore(id))
  //   return UserAdapter.toUserListItem(response)
  // }

  /**
   * Получение своего профиля
   */
  // async getProfile(): Promise<UserListItem> {
  //   const response = await apiClient.get<Record<string, unknown>>(API_ENDPOINTS.profile.base)
  //   return UserAdapter.toUserListItem(response)
  // }

  /**
   * Обновление своего профиля
   */
  // async updateProfile(data: UpdateUserRequest): Promise<UserListItem> {
  //   const response = await apiClient.patch<Record<string, unknown>>(API_ENDPOINTS.profile.base, data)
  //   return UserAdapter.toUserListItem(response)
  // }

  /**
   * Смена пароля
   */
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    await apiClient.post(API_ENDPOINTS.profile.changePassword, data)
  }
}

export const userService = new UserService()