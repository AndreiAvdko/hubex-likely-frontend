// features/auth/context/AuthContexts.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/features/auth/services/auth-service'
import type { UserRole } from '@/configs/routes.config'
import type { PermissionKey, UserPermissions } from '../types/permissions.types'

interface User {
  id: string
  email: string
  username: string
  role: UserRole
  firstName?: string
  lastName?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  permissions: UserPermissions
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  hasPermission: (permission: PermissionKey) => boolean
  hasAnyPermission: (permissions: PermissionKey[]) => boolean
  hasAllPermissions: (permissions: PermissionKey[]) => boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Функция для загрузки прав пользователя
const fetchUserPermissions = async (userId: string): Promise<UserPermissions> => {
  // Используем тот же сервис (мок или реальный)
  if (typeof (authService as any).getUserPermissions === 'function') {
    return await (authService as any).getUserPermissions(userId)
  }
  
  // Fallback: пустые права
  console.warn('getUserPermissions not implemented in authService')
  return {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [permissions, setPermissions] = useState<UserPermissions>({})

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = authService.getCurrentUser()
      setUser(currentUser)
      
      if (currentUser) {
        const userPermissions = await fetchUserPermissions(currentUser.id)
        setPermissions(userPermissions)
      }
      
      setIsLoading(false)
    }
    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    setUser(response.user)
    
    const userPermissions = await fetchUserPermissions(response.user.id)
    setPermissions(userPermissions)
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
    setPermissions({})
  }

  const hasPermission = (permission: PermissionKey): boolean => {
    return permissions[permission] === true
  }

  const hasAnyPermission = (perms: PermissionKey[]): boolean => {
    return perms.some(p => permissions[p] === true)
  }

  const hasAllPermissions = (perms: PermissionKey[]): boolean => {
    return perms.every(p => permissions[p] === true)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        permissions,
        login,
        logout,
        isAuthenticated: !!user,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}