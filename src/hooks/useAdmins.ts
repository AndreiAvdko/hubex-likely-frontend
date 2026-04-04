// src/hooks/useAdmins.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '@/lib/api/services/user-services/admin-service'
import type { PaginationParams } from '@/lib/api/types/users-types/types'

export const adminKeys = {
  all: ['admins'] as const,
  lists: () => [...adminKeys.all, 'list'] as const,
  list: (pagination: PaginationParams) => [...adminKeys.lists(), pagination] as const,
  detail: (id: string) => [...adminKeys.all, 'detail', id] as const,
}

/**
 * Хук для получения списка администраторов (только для админов)
 */
export function useAdmins(pagination: PaginationParams = {}) {
  return useQuery({
    queryKey: adminKeys.list(pagination),
    queryFn: () => adminService.getAdmins(pagination),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    // Доступно только для админов
    enabled: () => {
      const userRole = localStorage.getItem('userRole')
      return userRole === 'admin'
    },
  })
}

/**
 * Хук для удаления пользователя (только для админов)
 */
export function useDeleteUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['contractors'] })
    },
  })
}

/**
 * Хук для создания пользователя (только для админов)
 */
export function useCreateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: adminService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['contractors'] })
    },
  })
}

// Алиасы для удобства
export const useDeleteAdmin = useDeleteUser
export const useCreateAdmin = useCreateUser