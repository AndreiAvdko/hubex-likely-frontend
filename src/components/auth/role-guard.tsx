// src/components/auth/role-guard.tsx
import { Navigate } from 'react-router-dom'

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: ('admin' | 'customer' | 'contractor')[]
  fallbackPath?: string
}

export function RoleGuard({ children, allowedRoles, fallbackPath = '/' }: RoleGuardProps) {
  const userRole = localStorage.getItem('userRole') as 'admin' | 'customer' | 'contractor' | null
  
  if (!userRole) {
    return <Navigate to="/login" replace />
  }
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={fallbackPath} replace />
  }
  
  return <>{children}</>
}