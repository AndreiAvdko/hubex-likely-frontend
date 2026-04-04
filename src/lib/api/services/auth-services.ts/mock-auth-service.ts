// src/lib/api/services/mock-auth.service.ts
import type { UserRole } from '@/configs/routes.config'

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

// Тестовые учетные записи
const TEST_USERS: Record<string, { password: string; user: User }> = {
  'admin@screwit.ru': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@screwit.ru',
      username: 'admin_system',
      role: 'admin',
      firstName: 'Администратор',
      lastName: 'Системы',
    },
  },
  'customer@screwit.ru': {
    password: 'customer123',
    user: {
      id: '2',
      email: 'customer@screwit.ru',
      username: 'customer_user',
      role: 'customer',
      firstName: 'Иван',
      lastName: 'Петров',
    },
  },
  'contractor@screwit.ru': {
    password: 'contractor123',
    user: {
      id: '3',
      email: 'contractor@screwit.ru',
      username: 'contractor_user',
      role: 'contractor',
      firstName: 'Сергей',
      lastName: 'Иванов',
    },
  },
}

class MockAuthService {
  /**
   * Вход в систему (мок)
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const userData = TEST_USERS[data.email]
    
    if (!userData || userData.password !== data.password) {
      throw new Error('Неверный email или пароль')
    }
    
    // Генерируем моковый токен
    const mockToken = btoa(JSON.stringify({
      userId: userData.user.id,
      role: userData.user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 часа
    }))
    
    // Сохраняем данные в localStorage
    localStorage.setItem('accessToken', mockToken)
    localStorage.setItem('userRole', userData.user.role)
    localStorage.setItem('user', JSON.stringify(userData.user))
    
    return {
      accessToken: mockToken,
      user: userData.user,
    }
  }

  /**
   * Выход из системы
   */
  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('user')
  }

  /**
   * Проверка авторизации
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken')
  }

  /**
   * Получение текущего пользователя
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  /**
   * Получение роли текущего пользователя
   */
  getCurrentUserRole(): UserRole | null {
    const role = localStorage.getItem('userRole')
    if (!role) return null
    return role as UserRole
  }

  /**
   * Сброс сессии (для тестирования)
   */
  clearSession(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('user')
  }
}

export const mockAuthService = new MockAuthService()