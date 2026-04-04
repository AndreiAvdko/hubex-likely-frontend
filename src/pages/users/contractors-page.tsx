// src/pages/users/contractors-page.tsx
import { useState } from 'react'
import { Search, Plus, User, Star, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Contractor {
  id: string
  name: string
  specialization: string
  phone: string
  email: string
  rating: number
  completedTickets: number
  activeTickets: number
  status: 'available' | 'busy' | 'offline'
}

const mockContractors: Contractor[] = [
  {
    id: '1',
    name: 'Андреев Юрий',
    specialization: 'Электрик',
    phone: '+7 (911) 123-45-67',
    email: 'andreev@example.ru',
    rating: 4.8,
    completedTickets: 156,
    activeTickets: 3,
    status: 'available'
  },
  {
    id: '2',
    name: 'Бабиков Олег Павлович',
    specialization: 'Сантехник',
    phone: '+7 (921) 234-56-78',
    email: 'babikov@example.ru',
    rating: 4.9,
    completedTickets: 203,
    activeTickets: 5,
    status: 'busy'
  },
  {
    id: '3',
    name: 'Безбородов Андрей Юрьевич',
    specialization: 'Универсал',
    phone: '+7 (931) 345-67-89',
    email: 'bezborodov@example.ru',
    rating: 4.7,
    completedTickets: 98,
    activeTickets: 2,
    status: 'available'
  },
  {
    id: '4',
    name: 'Борисенко Сергей Анатольевич',
    specialization: 'Вентиляция',
    phone: '+7 (941) 456-78-90',
    email: 'borisenko@example.ru',
    rating: 4.6,
    completedTickets: 67,
    activeTickets: 1,
    status: 'offline'
  }
]

const statusConfig = {
  available: { label: 'Доступен', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40' },
  busy: { label: 'Занят', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40' },
  offline: { label: 'Не в сети', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800' }
}

export function ContractorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredContractors = mockContractors.filter(contractor =>
    contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contractor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contractor.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Исполнители
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Управление исполнителями работ
            </p>
          </div>
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            Добавить исполнителя
          </Button>
        </div>
        
        <div className="mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск по имени, специализации или email..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContractors.map((contractor) => (
            <div
              key={contractor.id}
              className="cursor-pointer rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <User className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{contractor.name}</h3>
                    <p className="text-sm text-muted-foreground">{contractor.specialization}</p>
                  </div>
                </div>
                <Badge className={statusConfig[contractor.status].className}>
                  {statusConfig[contractor.status].label}
                </Badge>
              </div>
              
              <div className="mt-3 space-y-2 text-sm">
                <p className="text-muted-foreground">{contractor.phone}</p>
                <p className="text-muted-foreground">{contractor.email}</p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-foreground">{contractor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Выполнено: {contractor.completedTickets}
                    </span>
                  </div>
                </div>
                {contractor.activeTickets > 0 && (
                  <div className="mt-2 rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                    Активных заявок: {contractor.activeTickets}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {filteredContractors.length === 0 && (
          <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
            Исполнители не найдены
          </div>
        )}
      </div>
    </div>
  )
}