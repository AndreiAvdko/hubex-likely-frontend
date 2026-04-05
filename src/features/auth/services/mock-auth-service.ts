// features/auth/services/mock-auth-service.ts
import { DEFAULT_ROLE_PERMISSIONS, type UserPermissions } from '../types/permissions.types'
import type { UserRole } from '@/configs/routes.config'

interface User {
  id: string
  email: string
  username: string
  role: UserRole
  firstName?: string
  lastName?: string
}

interface LoginResponse {
  user: User
  token: string
}

// Тестовые пользователи
const mockUsers = [
  {
    id: '1',
    email: 'admin@screwit.ru',
    password: 'admin123',
    username: 'admin',
    role: 'admin' as UserRole,
    firstName: 'Администратор',
    lastName: 'Системы',
  },
  {
    id: '2',
    email: 'customer@screwit.ru',
    password: 'customer123',
    username: 'customer',
    role: 'customer' as UserRole,
    firstName: 'Иван',
    lastName: 'Петров',
  },
  {
    id: '3',
    email: 'contractor@screwit.ru',
    password: 'contractor123',
    username: 'contractor',
    role: 'contractor' as UserRole,
    firstName: 'Сергей',
    lastName: 'Исполнителей',
  },
]

// Получение прав по роли
const getPermissionsByRole = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'admin':
      return DEFAULT_ROLE_PERMISSIONS.admin
    case 'customer':
      return DEFAULT_ROLE_PERMISSIONS.customer
    case 'contractor':
      return DEFAULT_ROLE_PERMISSIONS.contractor
    default:
      return {}
  }
}

// Хранилище токена в localStorage
const TOKEN_KEY = 'mock_auth_token'
const USER_KEY = 'mock_auth_user'

export const mockAuthService = {
  // Логин
  async login({ email, password }: { email: string; password: string }): Promise<LoginResponse> {
    // Имитируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const user = mockUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Неверный email или пароль')
    }
    
    // Создаем фейковый токен
    const token = `mock_token_${user.id}_${Date.now()}`
    
    // Сохраняем в localStorage
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify({ 
      id: user.id, 
      email: user.email, 
      role: user.role,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    }))
    
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    }
  },
  
  // Получение текущего пользователя
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY)
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },
  
  // Получение прав пользователя
  async getUserPermissions(userId: string): Promise<UserPermissions> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Находим пользователя по ID
    const user = mockUsers.find(u => u.id === userId)
    
    if (!user) {
      return {}
    }
    
    // Возвращаем права на основе роли
    return getPermissionsByRole(user.role)
  },
  
  // Выход
  async logout(): Promise<void> {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
  
  // Проверка аутентификации
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY)
  },
  
  // Получение токена
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
}