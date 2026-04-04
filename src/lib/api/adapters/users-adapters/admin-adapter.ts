// src/lib/api/adapters/admin.adapter.ts
import { BaseAdapter } from './base-adapter'
import type { AdminUser } from '../../types/users-types/types'

export class AdminAdapter extends BaseAdapter {
  static toAdminUser(raw: Record<string, unknown>): AdminUser {
    return {
      ...this.toBaseUser(raw),
      role: 'admin',
    } as AdminUser
  }
}