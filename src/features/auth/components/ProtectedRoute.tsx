// features/auth/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContexts'
import type { PermissionKey } from '../constants/permissions.constants'

interface ProtectedRouteProps {
  children: React.ReactNode
  permissions?: PermissionKey | PermissionKey[]  // только права
  mode?: 'any' | 'all'  // any - хотя бы одно право, all - все права
  fallbackPath?: string
}

export function ProtectedRoute({ 
  children, 
  permissions,
  mode = 'any',
  fallbackPath = '/unauthorized'
}: ProtectedRouteProps) {
  const { user, isLoading, hasAnyPermission, hasAllPermissions } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Если права не указаны — доступ открыт (для всех авторизованных)
  if (!permissions) {
    return <>{children}</>
  }

  const permissionsArray = Array.isArray(permissions) ? permissions : [permissions]
  const hasAccess = mode === 'any' 
    ? hasAnyPermission(permissionsArray)
    : hasAllPermissions(permissionsArray)
  
  if (!hasAccess) {
    return <Navigate to={fallbackPath} replace />
  }

  return <>{children}</>
}