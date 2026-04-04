// src/components/layout/app-sidebar.tsx
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
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useUserRole } from '@/hooks/useUserRole'

const ticketSubItems = [
  { to: '/', label: 'Все заявки', end: true },
  { to: '/tickets/schedule', label: 'График', end: false },
  { to: '/tickets/marking', label: 'Маркировка', end: false },
  { to: '/tickets/planner', label: 'Планировщик работ', end: false },
] as const

// Подпункты для пользователей (только для админов)
const userSubItems = [
  { to: '/users/admins', label: 'Администратор', end: false },
  { to: '/users/customers', label: 'Заказчики', end: false },
  { to: '/users/contractors', label: 'Исполнители', end: false },
] as const

const mainNav = [
  { to: '/objects', label: 'Объекты | Оборудование', icon: Factory },
  { to: '/messages', label: 'Сообщения', icon: MessageSquare },
  { to: '/companies', label: 'Компании', icon: Building2 },
  { to: '/checklists', label: 'Чек-листы', icon: ClipboardList },
  { to: '/warehouses', label: 'Склады | Материалы', icon: Package },
] as const

export function AppSidebar() {
  const { role, isAdmin, isCustomer, isContractor } = useUserRole()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    tickets: true,
    users: false,
  })

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // На мобильных устройствах меню всегда свернуто (скрыто)
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
        {/* Плавающая кнопка открытия меню - в нижнем правом углу */}
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
              aria-expanded={!collapsed}
              aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
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

            {/* Раздел Пользователи - показываем только админам */}
            {isAdmin && (
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
                    to="/users/admins"
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
                    {userSubItems.map((item) => (
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
              </>
            )}

            {(!collapsed || isMobile) && <Separator className="my-2 bg-sidebar-border" />}

            {/* Основные пункты меню - показываем в зависимости от роли */}
            {mainNav.map((item) => {
              // Для заказчиков и исполнителей показываем только Objects и Messages
              if ((isCustomer || isContractor) && item.to !== '/objects' && item.to !== '/messages') {
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