// features/auth/services/auth-service.ts
import { mockAuthService } from './mock-auth-service'

// Флаг использования моков (можно вынести в .env)
export const USE_MOCK_AUTH = true

// Реальный сервис (заглушка, будет заменен на реальный API позже)
const realAuthService = {
  async login(_data: { email: string; password: string }) {
    throw new Error('Real auth not implemented yet')
  },
  getCurrentUser() {
    return null
  },
  async logout() {
    // TODO: реализовать
  },
}

// Экспортируем нужный сервис в зависимости от флага
export const authService = USE_MOCK_AUTH ? mockAuthService : realAuthService