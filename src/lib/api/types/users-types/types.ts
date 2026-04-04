// // src/lib/api/types/users-types/types.ts
// export interface BaseUser {
//   id: string
//   email: string
//   username: string
//   firstName?: string | null
//   lastName?: string | null
//   phone?: string | null
//   role: 'admin' | 'customer' | 'contractor'
//   status: 'active' | 'inactive' | 'blocked' | 'pending'
  
//   // Не нужно в BaseUser часть полей будет использоваться как дополнительные в дочерних: AdminUser, CustomerUser, ContractorUser
//   // rating?: number | null
//   // completedTickets?: number | null
//   // activeTickets?: number | null
//   // companyId?: string | null
//   // emailVerifiedAt?: string | null
//   // lastLoginAt?: string | null
//   // createdAt: string
//   // updatedAt: string
// }

// // Для администратора добавляем специфичные поля
// export interface AdminUser extends BaseUser {
//   role: 'admin'
// }

// // Фильтры для списка пользователей
// export interface UserFilters {
//   role?: 'admin' | 'customer' | 'contractor' | 'all'
//   status?: 'active' | 'inactive' | 'blocked' | 'pending' | 'all'
//   search?: string
// }

// // Пагинация
// export interface PaginationParams {
//   page?: number
//   limit?: number
//   sort?: string
// }

// export interface PaginatedResponse<T> {
//   data: T[]
//   pagination: {
//     page: number
//     limit: number
//     total: number
//     pages: number
//   }
// }

// export interface CreateUserRequest {
//   email: string
//   username: string
//   password: string
//   firstName?: string
//   lastName?: string
//   phone?: string
//   role?: 'admin' | 'customer' | 'contractor'
//   status?: 'active' | 'inactive' | 'blocked'
// }

// export interface UpdateUserRequest {
//   email?: string
//   username?: string
//   firstName?: string
//   lastName?: string
//   phone?: string
//   role?: 'admin' | 'customer' | 'contractor'
//   status?: 'active' | 'inactive' | 'blocked'
// }

// export interface ChangePasswordRequest {
//   currentPassword: string
//   newPassword: string
// }


// src/lib/api/types/users-types/types.ts
export interface BaseUser {
  id: string
  email: string
  username: string
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  role: 'admin' | 'customer' | 'contractor'
  status: 'active' | 'inactive' | 'blocked' | 'pending'
  // emailVerifiedAt?: string | null
  // lastLoginAt?: string | null
  // createdAt: string
  // updatedAt: string
}

// Администратор - расширяет BaseUser
export interface AdminUser extends BaseUser {
  role: 'admin'
}

// Заказчик - добавляет поля организации и количества заявок
export interface CustomerUser extends BaseUser {
  role: 'customer'
  organization?: string | null
  ticketsCount?: number | null 
}

// Исполнитель - добавляет рейтинг и статистику по заявкам
export interface ContractorUser extends BaseUser {
  role: 'contractor'
  rating?: number | null
  completedTickets?: number | null
  activeTickets?: number | null
  companyId?: string | null
}

// Для списков используем те же типы
export interface AdminListItem extends AdminUser {}
export interface CustomerListItem extends CustomerUser{}
export interface ContractorListItem extends ContractorUser{}

// Фильтры для списка пользователей
export interface UserFilters {
  role?: 'admin' | 'customer' | 'contractor' | 'all'
  status?: 'active' | 'inactive' | 'blocked' | 'pending' | 'all'
  search?: string
}

// Пагинация
export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface CreateUserRequest {
  email: string
  username: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: 'admin' | 'customer' | 'contractor'
  status?: 'active' | 'inactive' | 'blocked'
  organization?: string  // для заказчиков
}

export interface UpdateUserRequest {
  email?: string
  username?: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: 'admin' | 'customer' | 'contractor'
  status?: 'active' | 'inactive' | 'blocked'
  organization?: string  // для заказчиков
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}