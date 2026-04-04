// src/hooks/useCustomers.ts
import { useQuery } from '@tanstack/react-query'
import { customerService } from '@/lib/api/services/user-services/customer-service'
import type { PaginationParams } from '@/lib/api/types/users-types/types'

export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (pagination: PaginationParams) => [...customerKeys.lists(), pagination] as const,
  profile: () => [...customerKeys.all, 'profile'] as const,
}

/**
 * Хук для получения списка заказчиков (только для админов)
 */
export function useCustomers(pagination: PaginationParams = {}) {
  return useQuery({
    queryKey: customerKeys.list(pagination),
    queryFn: () => customerService.getCustomers(pagination),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    enabled: () => {
      const userRole = localStorage.getItem('userRole')
      return userRole === 'admin'
    },
  })
}

/**
 * Хук для получения профиля заказчика (для самого заказчика)
 */
export function useCustomerProfile() {
  return useQuery({
    queryKey: customerKeys.profile(),
    queryFn: () => customerService.getMyProfile(),
    staleTime: 5 * 60 * 1000,
    enabled: () => {
      const userRole = localStorage.getItem('userRole')
      return userRole === 'customer'
    },
  })
}