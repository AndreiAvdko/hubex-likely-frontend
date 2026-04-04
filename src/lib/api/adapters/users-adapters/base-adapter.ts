// src/lib/api/adapters/base.adapter.ts

import type { BaseUser } from '../../types/users-types/types'

export abstract class BaseAdapter {
  protected static getString(raw: Record<string, unknown>, key: string): string {
    const value = raw[key]
    if (typeof value === 'string') return value
    if (value === null || value === undefined) return ''
    return String(value)
  }

  protected static getNullableString(raw: Record<string, unknown>, key: string): string | null {
    const value = raw[key]
    if (value === null || value === undefined) return null
    if (typeof value === 'string') return value
    return String(value)
  }

  protected static getNullableNumber(raw: Record<string, unknown>, key: string): number | null {
    const value = raw[key]
    if (typeof value === 'number') return value
    if (typeof value === 'string' && !isNaN(Number(value))) return Number(value)
    return null
  }

  protected static getEnum<T extends string>(
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

  protected static getNullableDate(raw: Record<string, unknown>, key: string): string | null {
    const value = raw[key]
    if (typeof value === 'string') return value
    return null
  }

  protected static toBaseUser(raw: Record<string, unknown>): BaseUser {
    return {
      id: this.getString(raw, 'id'),
      email: this.getString(raw, 'email'),
      username: this.getString(raw, 'username'),
      firstName: this.getNullableString(raw, 'firstName'),
      lastName: this.getNullableString(raw, 'lastName'),
      phone: this.getNullableString(raw, 'phone'),
      role: this.getEnum(raw, 'role', ['admin', 'customer', 'contractor'], 'customer'),
      status: this.getEnum(raw, 'status', ['active', 'inactive', 'blocked', 'pending'], 'pending'),
    }
  }
}