// src/lib/api/services/auth.service.ts
import type { UserRole } from '@/configs/routes.config'
import { mockAuthService } from './mock-auth-service'

// Переключатель: true - использовать мок, false - использовать реальный API
export const USE_MOCK_AUTH = true

interface LoginRequest {
  email: string
  password: string
}

interface User {
  id: string
  email: string
  username: string
  role: UserRole
  firstName?: string
  lastName?: string
}

interface LoginResponse {
  accessToken: string
  user: User
}

// Реальный Auth Service (заглушка)
class RealAuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    // TODO: Реализовать реальный запрос к API
    throw new Error('Real auth service not implemented yet')
  }

  async logout(): Promise<void> {
    throw new Error('Real auth service not implemented yet')
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken')
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  getCurrentUserRole(): UserRole | null {
    const role = localStorage.getItem('userRole')
    if (!role) return null
    return role as UserRole
  }
}

// Экспортируем выбранный сервис
export const authService = USE_MOCK_AUTH ? mockAuthService : new RealAuthService()