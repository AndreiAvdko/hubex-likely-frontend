// src/lib/api/adapters/customer.adapter.ts
import { BaseAdapter } from './base-adapter'
import type { CustomerUser } from '../../types/users-types/types'

export class CustomerAdapter extends BaseAdapter {
  static toCustomerUser(raw: Record<string, unknown>): CustomerUser {
    const baseUser = this.toBaseUser(raw)
    
    return {
      ...baseUser,
      role: 'customer',
      organization: this.getNullableString(raw, 'organization'),
      ticketsCount: this.getNullableNumber(raw, 'ticketsCount'),
    }
  }
}