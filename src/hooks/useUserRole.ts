// src/hooks/useUserRole.ts
import { useAuth } from '@/context/AuthContexts'

export function useUserRole() {
  const { user } = useAuth()
  const role = user?.role || null
  
  const isAdmin = role === 'admin'
  const isCustomer = role === 'customer'
  const isContractor = role === 'contractor'
  
  return {
    role,
    isAdmin,
    isCustomer,
    isContractor,
    canManageUsers: isAdmin,
    canViewAdmins: isAdmin,
    canViewCustomers: isAdmin || isCustomer || isContractor,
    canViewContractors: isAdmin || isCustomer || isContractor,
  }
}