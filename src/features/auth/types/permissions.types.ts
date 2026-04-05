import { PERMISSIONS } from "../constants/permissions.constants"


// 2. Тип на основе констант
export type PermissionKey = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// 3. Структура для хранения прав пользователя
export type UserPermissions = {
  [key in PermissionKey]?: boolean
}

// 4. Пресеты прав для системных ролей
export const DEFAULT_ROLE_PERMISSIONS = {
  admin: {
    [PERMISSIONS.USERS_READ_ADMINS]: true,
    [PERMISSIONS.USERS_READ_CUSTOMERS]: true,
    [PERMISSIONS.USERS_READ_CONTRACTORS]: true,

    [PERMISSIONS.TICKETS_READ]: true,
    [PERMISSIONS.TICKETS_WRITE]: true,
    [PERMISSIONS.TICKETS_ASSIGN]: true,
    [PERMISSIONS.OBJECTS_READ]: true,
    [PERMISSIONS.OBJECTS_WRITE]: true,
    [PERMISSIONS.SCHEDULE_VIEW]: true,
    [PERMISSIONS.SCHEDULE_EDIT]: true,
    [PERMISSIONS.PLANNER_VIEW]: true,
    [PERMISSIONS.PLANNER_EDIT]: true,
    [PERMISSIONS.REPORTS_VIEW]: true,
    [PERMISSIONS.SETTINGS_MANAGE]: true,
  },
  customer: {
    [PERMISSIONS.USERS_READ_ADMINS]: false,
    [PERMISSIONS.USERS_READ_CUSTOMERS]: false,
    [PERMISSIONS.USERS_READ_CONTRACTORS]: false,

    [PERMISSIONS.TICKETS_READ]: true,
    [PERMISSIONS.TICKETS_WRITE]: true,
    [PERMISSIONS.OBJECTS_READ]: true,
    [PERMISSIONS.SCHEDULE_VIEW]: true,
    [PERMISSIONS.PLANNER_VIEW]: true,
  },
  contractor: {
    [PERMISSIONS.USERS_READ_ADMINS]: true,
    [PERMISSIONS.USERS_READ_CUSTOMERS]: false,
    [PERMISSIONS.USERS_READ_CONTRACTORS]: false,

    [PERMISSIONS.TICKETS_READ]: true,
    [PERMISSIONS.TICKETS_WRITE]: true,
    [PERMISSIONS.TICKETS_ASSIGN]: true,
    [PERMISSIONS.OBJECTS_READ]: true,
    [PERMISSIONS.SCHEDULE_VIEW]: true,
    [PERMISSIONS.SCHEDULE_EDIT]: true,
    [PERMISSIONS.PLANNER_VIEW]: true,
    [PERMISSIONS.PLANNER_EDIT]: true,
  },
} as const

// 5. Вспомогательная функция для проверки существования права
export const isValidPermission = (key: string): key is PermissionKey => {
  return Object.values(PERMISSIONS).includes(key as any)
}