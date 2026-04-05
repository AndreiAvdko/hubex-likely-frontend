// src/configs/routes.config.tsx
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { PERMISSIONS } from '@/features/auth/constants/permissions.constants'
import type { PermissionKey } from '@/features/auth/constants/permissions.constants'
import { PlaceholderPage } from '@/pages/placeholder-page'
import { TicketDetailPage } from '@/features/tickets/components/ticket-detail/TicketDetailPage'
import { TicketsPage } from '@/features/tickets/components/TicketsPage'
import { ObjectsPage } from '@/features/objects/components/ObjectsPage'
import { ObjectDetailPage } from '@/features/objects/components/ObjectDetailPage'
import { SchedulePage } from '@/features/schedule/components/SchedulePage'
import { PlannerPage } from '@/features/planner/components/PlannerPage'
import { AdminsPage } from '@/features/users/components/AdminsPage'
import { CustomersPage } from '@/features/users/components/CustomersPage'
import { ContractorsPage } from '@/features/users/components/ContractorsPage'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { PermissionsReferencePage } from '@/features/permission/components/PermissionsReferencePage'
import { Route } from 'react-router-dom'

interface RouteConfig {
  path: string
  element: React.ReactNode
  permissions?: PermissionKey | PermissionKey[]  // только права
  mode?: 'any' | 'all'
  isPublic?: boolean
}

// Публичные маршруты
export const publicRoutes: RouteConfig[] = [
  {
    path: '/login',
    element: <LoginPage />,
    isPublic: true,
  },
]

// Защищенные маршруты — только проверка прав
export const protectedRoutes: RouteConfig[] = [
  // Пользователи — требуют соответствующие права
  {
    path: 'users/admins',
    element: <AdminsPage />,
    permissions: PERMISSIONS.USERS_READ_ADMINS,
  },
  {
    path: 'users/customers',
    element: <CustomersPage />,
    permissions: PERMISSIONS.USERS_READ_CUSTOMERS,
  },
  {
    path: 'users/contractors',
    element: <ContractorsPage />,
    permissions: PERMISSIONS.USERS_READ_CONTRACTORS,
  },
  
  // Тикеты
  {
    path: '/',
    element: <TicketsPage />,
    permissions: PERMISSIONS.TICKETS_READ,
  },
  {
    path: 'tickets/:id',
    element: <TicketDetailPage />,
    permissions: PERMISSIONS.TICKETS_READ,
  },
  {
    path: 'tickets/schedule',
    element: <SchedulePage />,
    permissions: PERMISSIONS.SCHEDULE_VIEW,
  },
  {
    path: 'tickets/marking',
    element: <PlaceholderPage title="Маркировка" />,
    permissions: PERMISSIONS.TICKETS_READ,
  },
  {
    path: 'tickets/planner',
    element: <PlannerPage />,
    permissions: PERMISSIONS.PLANNER_VIEW,
  },
  
  // Объекты
  {
    path: 'objects',
    element: <ObjectsPage />,
    permissions: PERMISSIONS.OBJECTS_READ,
  },
  {
    path: 'objects/:id',
    element: <ObjectDetailPage />,
    permissions: PERMISSIONS.OBJECTS_READ,
  },
  
  // Временные маршруты (без прав — доступны всем авторизованным)
  {
    path: 'companies',
    element: <PlaceholderPage title="Компании" />,
    // permissions: null,
  },
  {
    path: 'messages',
    element: <PlaceholderPage title="Сообщения" />,
    // permissions: null,
  },
  {
    path: 'checklists',
    element: <PlaceholderPage title="Чек-листы" />,
    // permissions: null,
  },
  {
    path: 'warehouses',
    element: <PlaceholderPage title="Склады | Материалы" />,
    // permissions: null,
  },
   // Справочник прав (только для админов/разработки)
  {
    path: 'permissions-reference',
    element: <PermissionsReferencePage />,
    permissions: PERMISSIONS.SETTINGS_MANAGE, // только админы с правом настройки
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
        <ProtectedRoute 
          permissions={route.permissions}
          mode={route.mode}
        >
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