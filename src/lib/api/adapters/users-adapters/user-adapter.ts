// src/lib/api/adapters/user.adapter.ts
import type { BaseUser, AdminUser, AdminListItem } from '../../types/users-types/types'

export class UserAdapter {
  /**
   * Преобразует сырые данные из API в формат для списка администраторов
   */
  static toAdminListItem(raw: Record<string, unknown>): AdminListItem {
    return {
      id: this.getString(raw, 'id'),
      email: this.getString(raw, 'email'),
      username: this.getString(raw, 'username'),
      firstName: this.getNullableString(raw, 'firstName'),
      lastName: this.getNullableString(raw, 'lastName'),
      phone: this.getNullableString(raw, 'phone'),
      role: this.getEnum(raw, 'role', ['admin', 'customer', 'contractor'], 'admin') as 'admin',
      status: this.getEnum(raw, 'status', ['active', 'inactive', 'blocked', 'pending'], 'pending'),
    }
  }

  /**
   * Преобразует сырые данные в базового пользователя
   */
  static toBaseUser(raw: Record<string, unknown>): BaseUser {
    return {
      id: this.getString(raw, 'id'),
      email: this.getString(raw, 'email'),
      username: this.getString(raw, 'username'),
      firstName: this.getNullableString(raw, 'firstName'),
      lastName: this.getNullableString(raw, 'lastName'),
      phone: this.getNullableString(raw, 'phone'),
      role: this.getEnum(raw, 'role', ['admin', 'customer', 'contractor'], 'customer'),
      status: this.getEnum(raw, 'status', ['active', 'inactive', 'blocked', 'pending'], 'pending'),

      
      // rating: this.getNullableNumber(raw, 'rating'),
      // completedTickets: this.getNullableNumber(raw, 'completedTickets'),
      // activeTickets: this.getNullableNumber(raw, 'activeTickets'),
      // companyId: this.getNullableString(raw, 'companyId'),
      // emailVerifiedAt: this.getNullableDate(raw, 'emailVerifiedAt'),
      // lastLoginAt: this.getNullableDate(raw, 'lastLoginAt'),
      // createdAt: this.getString(raw, 'createdAt'),
      // updatedAt: this.getString(raw, 'updatedAt'),
    }
  }

  /**
   * Преобразует сырые данные в администратора
   */
  static toAdminUser(raw: Record<string, unknown>): AdminUser {
    return {
      ...this.toBaseUser(raw),
      role: 'admin',
    } as AdminUser
  }

  // Хелперы для безопасного извлечения данных
  private static getString(raw: Record<string, unknown>, key: string): string {
    const value = raw[key]
    if (typeof value === 'string') return value
    if (value === null || value === undefined) return ''
    return String(value)
  }

  private static getNullableString(raw: Record<string, unknown>, key: string): string | null {
    const value = raw[key]
    if (value === null || value === undefined) return null
    if (typeof value === 'string') return value
    return String(value)
  }

  // private static getNullableNumber(raw: Record<string, unknown>, key: string): number | null {
  //   const value = raw[key]
  //   if (typeof value === 'number') return value
  //   if (typeof value === 'string' && !isNaN(Number(value))) return Number(value)
  //   return null
  // }

  private static getEnum<T extends string>(
    raw: Record<string, unknown>, 
    key: string, 
    allowed: readonly T[], 
    defaultValue: T
  ): T {
    const value = raw[key]
    if (typeof value === 'string' && allowed.includes(value as T)) {
      return value as T
    }
    return defaultValue
  }

  // private static getNullableDate(raw: Record<string, unknown>, key: string): string | null {
  //   const value = raw[key]
  //   if (typeof value === 'string') return value
  //   return null
  // }
}