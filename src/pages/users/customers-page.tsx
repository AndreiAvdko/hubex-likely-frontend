// src/pages/users/customers-page.tsx
import { useState } from 'react'
import { Search, Plus, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Customer {
  id: string
  name: string
  company: string
  phone: string
  email: string
  ticketsCount: number
  status: 'active' | 'inactive'
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Соколов Дмитрий Михайлович',
    company: 'ООО "ТехноСервис Плюс"',
    phone: '+7 (912) 345-67-89',
    email: 'sokolov@technoservice.ru',
    ticketsCount: 12,
    status: 'active'
  },
  {
    id: '2',
    name: 'Кузнецова Елена Андреевна',
    company: 'ИП Казачухина',
    phone: '+7 (921) 456-78-90',
    email: 'elena@kazachuhina.ru',
    ticketsCount: 5,
    status: 'active'
  },
  {
    id: '3',
    name: 'Морозов Алексей Викторович',
    company: 'ООО "Ресторанные технологии"',
    phone: '+7 (931) 567-89-01',
    email: 'a.morozov@restotech.ru',
    ticketsCount: 8,
    status: 'inactive'
  }
]

export function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Заказчики
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Управление заказчиками и их компаниями
            </p>
          </div>
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            Добавить заказчика
          </Button>
        </div>
        
        <div className="mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск по имени, компании или email..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="grid gap-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="cursor-pointer rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-5 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{customer.name}</h3>
                    <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                      {customer.status === 'active' ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{customer.company}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm">
                    <span className="text-muted-foreground">{customer.phone}</span>
                    <span className="text-muted-foreground">{customer.email}</span>
                    <span className="text-muted-foreground">
                      Заявок: <span className="font-medium text-foreground">{customer.ticketsCount}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
            Заказчики не найдены
          </div>
        )}
      </div>
    </div>
  )
}