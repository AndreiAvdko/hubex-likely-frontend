import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Factory,
  MessageSquare,
  Package,
  Ticket,
  Users,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Shield,
  HardHat,
  User,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/shared/ui/button'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { Separator } from '@/shared/ui/separator'
import { cn } from '@/lib/utils'
import { Key } from 'lucide-react'
import { useAuth } from '@/features/auth/context/AuthContexts'
import { PERMISSIONS } from '@/features/auth/constants/permissions.constants'

const ticketSubItems = [
  { to: '/', label: 'Все заявки', end: true },
  { to: '/tickets/schedule', label: 'График', end: false },
  { to: '/tickets/marking', label: 'Маркировка', end: false },
  { to: '/tickets/planner', label: 'Планировщик работ', end: false },
] as const

// Подпункты для пользователей с индивидуальными правами
const userSubItems = [
  { 
    to: '/users/admins', 
    label: 'Администраторы', 
    icon: Shield,
    end: false,  // добавляем явно
    permission: PERMISSIONS.USERS_READ_ADMINS  // новое право
  },
  { 
    to: '/users/customers', 
    label: 'Заказчики', 
    icon: User,
    end: false,  // добавляем явно
    permission: PERMISSIONS.USERS_READ_CUSTOMERS  // новое право
  },
  { 
    to: '/users/contractors', 
    label: 'Исполнители', 
    icon: HardHat,
    end: false,  // добавляем явно
    permission: PERMISSIONS.USERS_READ_CONTRACTORS  // новое право
  },
] as const

const mainNav = [
  { to: '/objects', label: 'Объекты | Оборудование', icon: Factory, permission: PERMISSIONS.OBJECTS_READ },
  { to: '/messages', label: 'Сообщения', icon: MessageSquare, permission: null },
  { to: '/companies', label: 'Компании', icon: Building2, permission: null },
  { to: '/checklists', label: 'Чек-листы', icon: ClipboardList, permission: null },
  { to: '/warehouses', label: 'Склады | Материалы', icon: Package, permission: null },
  { to: '/permissions-reference', label: 'Справочник прав', icon: Key, permission: PERMISSIONS.SETTINGS_MANAGE },
] as const

export function AppSidebar() {
  const { hasPermission } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    tickets: true,
    users: false,
  })

  // Проверяем права на просмотр каждого типа пользователей
  const canViewAdmins = hasPermission(PERMISSIONS.USERS_READ_ADMINS)
  const canViewCustomers = hasPermission(PERMISSIONS.USERS_READ_CUSTOMERS)
  const canViewContractors = hasPermission(PERMISSIONS.USERS_READ_CONTRACTORS)
  
  // Раздел пользователей виден, если есть хотя бы одно право на просмотр
  const canViewAnyUser = canViewAdmins || canViewCustomers || canViewContractors

  // Фильтруем подпункты пользователей по правам
  const visibleUserSubItems = userSubItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  )

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setCollapsed(true)
        setMobileMenuOpen(false)
      } else {
        setCollapsed(false)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSection = (section: 'tickets' | 'users') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  // Если это мобильное устройство и меню закрыто - показываем только кнопку
  if (isMobile && !mobileMenuOpen) {
    return (
      <>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="size-5" />
        </Button>
      </>
    )
  }

  // Полная версия сайдбара (десктоп или мобильное открытое меню)
  return (
    <>
      {/* Затемнение фона для мобильного меню */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={cn(
          'flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-out',
          !isMobile && (collapsed ? 'w-[4.25rem]' : 'w-60'),
          isMobile && mobileMenuOpen
            ? 'fixed left-0 top-0 z-50 h-full w-64'
            : isMobile && !mobileMenuOpen
            ? 'hidden'
            : ''
        )}
      >
        <div
          className={cn(
            'flex h-14 items-center border-b border-sidebar-border',
            collapsed && !isMobile 
              ? 'justify-center px-2' 
              : 'justify-between px-3'
          )}
        >
          {/* В развернутом состоянии показываем логотип и название */}
          {(!collapsed || isMobile) && (
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
                SI
              </div>
              <span className="truncate text-sm font-semibold tracking-tight">
                Screw It Desk
              </span>
            </div>
          )}
          
          {/* Кнопка сворачивания/разворачивания - только для десктопа */}
          {!isMobile && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "mx-auto"
              )}
              onClick={toggleCollapse}
            >
              {collapsed ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
            </Button>
          )}
          
          {/* Кнопка закрытия на мобильных устройствах */}
          {isMobile && mobileMenuOpen && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={closeMobileMenu}
              className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <X className="size-4" />
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-0.5 p-2" aria-label="Основное меню">
            {/* Раздел Заявки */}
            {(!collapsed || isMobile) && (
              <button
                onClick={() => toggleSection('tickets')}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground/90 hover:bg-sidebar-accent/50"
              >
                <div className="flex items-center gap-2">
                  <Ticket className="size-4 shrink-0" aria-hidden />
                  <span>Заявки</span>
                </div>
                {expandedSections.tickets ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </button>
            )}
            {(collapsed && !isMobile) && (
              <NavLink
                to="/"
                end
                title="Заявки"
                className={({ isActive }) =>
                  cn(
                    'flex size-10 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )
                }
              >
                <Ticket className="size-5" />
              </NavLink>
            )}
            {(!collapsed || isMobile) && expandedSections.tickets && (
              <div className="flex flex-col gap-0.5 pl-2">
                {ticketSubItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={isMobile ? closeMobileMenu : undefined}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md border-l-2 py-1.5 pr-2 pl-6 text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                        isActive
                          ? 'border-sidebar-primary bg-sidebar-accent/80 font-medium text-sidebar-accent-foreground'
                          : 'border-transparent text-sidebar-foreground/85 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Раздел Пользователи - показываем только если есть хотя бы одно право */}
            {canViewAnyUser && (
              <>
                {(!collapsed || isMobile) && <Separator className="my-2 bg-sidebar-border" />}
                
                {(!collapsed || isMobile) && (
                  <button
                    onClick={() => toggleSection('users')}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground/90 hover:bg-sidebar-accent/50"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="size-4 shrink-0" aria-hidden />
                      <span>Пользователи</span>
                    </div>
                    {expandedSections.users ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </button>
                )}
                
                {(collapsed && !isMobile) && (
                  <NavLink
                    to={visibleUserSubItems[0]?.to || '/users/admins'}
                    title="Пользователи"
                    className={({ isActive }) =>
                      cn(
                        'flex size-10 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      )
                    }
                  >
                    <Users className="size-5" />
                  </NavLink>
                )}
                
                {(!collapsed || isMobile) && expandedSections.users && (
                  <div className="flex flex-col gap-0.5 pl-2">
                    {visibleUserSubItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          end={item.end}
                          onClick={isMobile ? closeMobileMenu : undefined}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center gap-2 rounded-md border-l-2 py-1.5 pr-2 pl-6 text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                              isActive
                                ? 'border-sidebar-primary bg-sidebar-accent/80 font-medium text-sidebar-accent-foreground'
                                : 'border-transparent text-sidebar-foreground/85 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                            )
                          }
                        >
                          <Icon className="size-3.5 shrink-0" />
                          <span>{item.label}</span>
                        </NavLink>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {(!collapsed || isMobile) && <Separator className="my-2 bg-sidebar-border" />}

            {/* Основные пункты меню */}
            {mainNav.map((item) => {
              if (item.permission && !hasPermission(item.permission)) {
                return null
              }
              
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={collapsed && !isMobile ? item.label : undefined}
                  onClick={isMobile ? closeMobileMenu : undefined}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-md py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                      (collapsed && !isMobile) ? 'justify-center px-0' : 'px-2',
                      isActive
                        ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground/85 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
                    )
                  }
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {(!collapsed || isMobile) && <span className="truncate">{item.label}</span>}
                </NavLink>
              )
            })}
          </nav>
        </ScrollArea>
      </aside>
    </>
  )
}