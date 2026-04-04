// src/components/auth/protected-route.tsx
import { Navigate } from 'react-router-dom'
import { useUserRole } from '@/hooks/useUserRole'
import type { UserRole } from '@/configs/routes.config'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallbackPath?: string
}

export function ProtectedRoute({ children, allowedRoles, fallbackPath = '/' }: ProtectedRouteProps) {
  const { role } = useUserRole()
  
  // Если пользователь не авторизован
  if (!role) {
    return <Navigate to="/login" replace />
  }
  
  // Если роль не имеет доступа
  if (!allowedRoles.includes(role)) {
    return <Navigate to={fallbackPath} replace />
  }
  
  return <>{children}</>
}