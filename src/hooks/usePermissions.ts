// src/hooks/usePermissions.ts
import { useUserRole } from './useUserRole'

export function usePermissions() {
  const { isAdmin, isCustomer, isContractor, role } = useUserRole()
  
  return {
    // Управление пользователями
    canCreateUser: isAdmin,
    canEditUser: isAdmin,
    canDeleteUser: isAdmin,
    
    // Просмотр страниц
    canViewAdminsPage: isAdmin,
    canViewCustomersPage: isAdmin || isCustomer || isContractor,
    canViewContractorsPage: isAdmin || isCustomer || isContractor,
    
    // Действия с заявками
    canCreateTicket: true, // все могут создавать заявки
    canAssignTicket: isAdmin, // только админы назначают
    canCompleteTicket: isContractor, // исполнители завершают
    
    // Информация о роли
    role,
    isAdmin,
    isCustomer,
    isContractor,
  }
}