import { getTicketDetail } from '@/data/mockTicketDetails'
import { mockTickets } from '@/data/mockTickets'

const labels: Record<string, string> = {
  '/': `Заявки (${mockTickets.length})`,
  '/tickets/schedule': 'График',
  '/tickets/marking': 'Маркировка',
  '/tickets/planner': 'Планировщик работ',
  '/objects': 'Объекты | Оборудование',
  '/users': 'Пользователи',
  '/companies': 'Компании',
  '/messages': 'Сообщения',
  '/checklists': 'Чек-листы',
  '/warehouses': 'Склады | Материалы',
}

/** Заглушка «тенанта» — позже можно брать из API/контекста */
const tenantName = 'Компании'

export function getHeaderBreadcrumb(pathname: string): string {
  const ticketMatch = /^\/tickets\/([^/]+)$/.exec(pathname)
  if (ticketMatch && !['schedule', 'marking', 'planner'].includes(ticketMatch[1])) {
    const detail = getTicketDetail(ticketMatch[1])
    if (detail) {
      return `${tenantName} / Заявки / № ${detail.displayNumber} от ${detail.createdAt}`
    }
    return `${tenantName} / Заявки`
  }
  const tail = labels[pathname] ?? 'Раздел'
  return `${tenantName} / ${tail}`
}
