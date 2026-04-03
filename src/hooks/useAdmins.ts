// src/hooks/useAdmins.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/lib/api/services/user-services'
import type { PaginationParams } from '@/lib/api/types/users-types'

// Ключи кэша для администраторов
export const adminKeys = {
  all: ['admins'] as const,
  lists: () => [...adminKeys.all, 'list'] as const,
  list: (pagination: PaginationParams) => [...adminKeys.lists(), pagination] as const,
  detail: (id: string) => [...adminKeys.all, 'detail', id] as const,
}

/**
 * Хук для получения списка администраторов с пагинацией
 * @param pagination - параметры пагинации (page, limit, sort)
 */
export function useAdmins(pagination: PaginationParams = {}) {
  return useQuery({
    queryKey: adminKeys.list(pagination),
    queryFn: () => userService.getAdmins(pagination),
    staleTime: 5 * 60 * 1000,
    // keepPreviousData позволяет сохранять предыдущие данные при загрузке новой страницы
    placeholderData: (previousData) => previousData,
  })
}

/**
 * Хук для удаления администратора
 */
export function useDeleteAdmin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      // Инвалидируем все списки администраторов
      queryClient.invalidateQueries({ queryKey: adminKeys.lists() })
    },
  })
}