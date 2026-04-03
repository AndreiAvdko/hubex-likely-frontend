// src/lib/api/endpoints.ts
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    register: '/users/register',
    login: '/auth/login', // TODO: если будет 
    logout: '/auth/logout', // TODO: если будет
  },
  
  // User endpoints
  users: {
    base: '/users',
    admins: '/users/admins',
    customers: '/users/customers',
    contractors: '/users/contractors',
    restore: (id: string) => `/users/${id}/restore`,
    byId: (id: string) => `/users/${id}`,
  },
  
  // Profile endpoints
  profile: {
    base: '/profile',
    changePassword: '/profile/change-password',
    verifyEmail: '/profile/verify-email',
    resendVerification: '/profile/resend-verification',
  },
  
  // Internal endpoints
  internal: {
    byEmail: (email: string) => `/internal/users/by-email/${email}`,
    byId: (id: string) => `/internal/users/by-id/${id}`,
  },
} as const

// Тип для endpoints (для автодополнения)
export type ApiEndpoints = typeof API_ENDPOINTS