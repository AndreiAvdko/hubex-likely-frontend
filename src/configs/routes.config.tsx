// src/config/routes.config.tsx
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { PlaceholderPage } from '@/pages/placeholder-page'
import { TicketDetailPage } from '@/components/ticket-detail/ticket-detail-page'
import { TicketsPage } from '@/pages/tickets-page'
import { ObjectsPage } from '@/pages/objects-page'
import { ObjectDetailPage } from '@/pages/object-detail-page'
import { SchedulePage } from '@/pages/schedule-page'
import { PlannerPage } from '@/pages/planner-page'
import { AdminsPage } from '@/pages/users/admins-page'
import { CustomersPage } from '@/pages/users/customers-page'
import { ContractorsPage } from '@/pages/users/contractors-page'
import { LoginPage } from '@/pages/login-page'
import { Route } from 'react-router-dom'

// Типы для ролей
export type UserRole = 'admin' | 'customer' | 'contractor'

// Интерфейс для конфигурации маршрута
interface RouteConfig {
  path: string
  element: React.ReactNode
  allowedRoles?: UserRole[]
  isPublic?: boolean
}

// // Интерфейс для вложенных маршрутов
// interface NestedRouteConfig {
//   element: React.ReactNode
//   children: RouteConfig[]
// }

// Публичные маршруты (без авторизации)
export const publicRoutes: RouteConfig[] = [
  {
    path: '/login',
    element: <LoginPage />,
    isPublic: true,
  },
]

// Защищенные маршруты (с авторизацией и проверкой ролей)
export const protectedRoutes: RouteConfig[] = [
  // Админские маршруты - только для админов
  {
    path: 'users/admins',
    element: <AdminsPage />,
    allowedRoles: ['admin'],
  },
  
  // Маршруты для заказчиков и исполнителей
  {
    path: 'users/customers',
    element: <CustomersPage />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'users/contractors',
    element: <ContractorsPage />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  
  // Общие маршруты для всех авторизованных
  {
    path: '/',
    element: <TicketsPage />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'objects',
    element: <ObjectsPage />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'objects/:id',
    element: <ObjectDetailPage />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'tickets/schedule',
    element: <SchedulePage />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'tickets/marking',
    element: <PlaceholderPage title="Маркировка" />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'tickets/planner',
    element: <PlannerPage />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'tickets/:id',
    element: <TicketDetailPage />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'companies',
    element: <PlaceholderPage title="Компании" />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'messages',
    element: <PlaceholderPage title="Сообщения" />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'checklists',
    element: <PlaceholderPage title="Чек-листы" />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
  {
    path: 'warehouses',
    element: <PlaceholderPage title="Склады | Материалы" />,
    allowedRoles: ['admin', 'customer', 'contractor'],
  },
]

// Маршрут для 404
export const notFoundRoute: RouteConfig = {
  path: '*',
  element: <Navigate to="/" replace />,
  isPublic: true,
}

// Функция для рендеринга защищенных маршрутов
export const renderProtectedRoutes = () => {
  return protectedRoutes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <ProtectedRoute allowedRoles={route.allowedRoles!}>
          {route.element}
        </ProtectedRoute>
      }
    />
  ))
}

// Функция для рендеринга публичных маршрутов
export const renderPublicRoutes = () => {
  return publicRoutes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={route.element}
    />
  ))
}