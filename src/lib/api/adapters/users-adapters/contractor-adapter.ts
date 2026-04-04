// src/lib/api/adapters/contractor.adapter.ts
import { BaseAdapter } from './base-adapter'
import type { ContractorUser } from '../../types/users-types/types'

export class ContractorAdapter extends BaseAdapter {
  static toContractorUser(raw: Record<string, unknown>): ContractorUser {
    const baseUser = this.toBaseUser(raw)
    
    return {
      ...baseUser,
      role: 'contractor',
      rating: this.getNullableNumber(raw, 'rating'),
      completedTickets: this.getNullableNumber(raw, 'completedTickets'),
      activeTickets: this.getNullableNumber(raw, 'activeTickets'),
      companyId: this.getNullableString(raw, 'companyId'),
    }
  }
}