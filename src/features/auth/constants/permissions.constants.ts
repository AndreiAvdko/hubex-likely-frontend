// features/auth/constants/permissions.constants.ts

// 1. Все возможные права в одном месте
export const PERMISSIONS = {
  // Users
  USERS_READ_ADMINS: 'users:read:admins',
  USERS_READ_CUSTOMERS: 'users:read:customers',
  USERS_READ_CONTRACTORS: 'users:read:contractors',
  USERS_WRITE_ADMINS: 'users:write:admins',
  USERS_WRITE_CUSTOMERS: 'users:write:customers',
  USERS_WRITE_CONTRACTORS: 'users:write:contractors',
  USERS_DELETE_ADMINS: 'users:delete:admins',
  USERS_DELETE_CUSTOMERS: 'users:delete:customers',
  USERS_DELETE_CONTRACTORS: 'users:delete:contractors',
  
  // Tickets
  TICKETS_READ: 'tickets:read',
  TICKETS_WRITE: 'tickets:write',
  TICKETS_DELETE: 'tickets:delete',
  TICKETS_ASSIGN: 'tickets:assign',
  
  // Objects
  OBJECTS_READ: 'objects:read',
  OBJECTS_WRITE: 'objects:write',
  OBJECTS_DELETE: 'objects:delete',
  
  // Schedule
  SCHEDULE_VIEW: 'schedule:view',
  SCHEDULE_EDIT: 'schedule:edit',
  
  // Planner
  PLANNER_VIEW: 'planner:view',
  PLANNER_EDIT: 'planner:edit',
  
  // Reports
  REPORTS_VIEW: 'reports:view',
  
  // Settings
  SETTINGS_MANAGE: 'settings:manage',
} as const

export type PermissionKey = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// Метаданные для каждого права (описание, категория)
export const PERMISSIONS_META: Record<PermissionKey, {
  label: string
  description: string
  category: string
}> = {
  // Users
  [PERMISSIONS.USERS_READ_ADMINS]: {
    label: 'Просмотр администраторов',
    description: 'Возможность просматривать список и карточки администраторов',
    category: 'users',
  },
  [PERMISSIONS.USERS_READ_CUSTOMERS]: {
    label: 'Просмотр заказчиков',
    description: 'Возможность просматривать список и карточки заказчиков',
    category: 'users',
  },
  [PERMISSIONS.USERS_READ_CONTRACTORS]: {
    label: 'Просмотр исполнителей',
    description: 'Возможность просматривать список и карточки исполнителей',
    category: 'users',
  },
  [PERMISSIONS.USERS_WRITE_ADMINS]: {
    label: 'Редактирование администраторов',
    description: 'Возможность создавать и редактировать администраторов',
    category: 'users',
  },
  [PERMISSIONS.USERS_WRITE_CUSTOMERS]: {
    label: 'Редактирование заказчиков',
    description: 'Возможность создавать и редактировать заказчиков',
    category: 'users',
  },
  [PERMISSIONS.USERS_WRITE_CONTRACTORS]: {
    label: 'Редактирование исполнителей',
    description: 'Возможность создавать и редактировать исполнителей',
    category: 'users',
  },
  [PERMISSIONS.USERS_DELETE_ADMINS]: {
    label: 'Удаление администраторов',
    description: 'Возможность удалять администраторов',
    category: 'users',
  },
  [PERMISSIONS.USERS_DELETE_CUSTOMERS]: {
    label: 'Удаление заказчиков',
    description: 'Возможность удалять заказчиков',
    category: 'users',
  },
  [PERMISSIONS.USERS_DELETE_CONTRACTORS]: {
    label: 'Удаление исполнителей',
    description: 'Возможность удалять исполнителей',
    category: 'users',
  },
  
  // Tickets
  [PERMISSIONS.TICKETS_READ]: {
    label: 'Просмотр заявок',
    description: 'Возможность просматривать список заявок и детали',
    category: 'tickets',
  },
  [PERMISSIONS.TICKETS_WRITE]: {
    label: 'Создание и редактирование заявок',
    description: 'Возможность создавать новые заявки и редактировать существующие',
    category: 'tickets',
  },
  [PERMISSIONS.TICKETS_DELETE]: {
    label: 'Удаление заявок',
    description: 'Возможность удалять заявки',
    category: 'tickets',
  },
  [PERMISSIONS.TICKETS_ASSIGN]: {
    label: 'Назначение исполнителей',
    description: 'Возможность назначать исполнителей на заявки',
    category: 'tickets',
  },
  
  // Objects
  [PERMISSIONS.OBJECTS_READ]: {
    label: 'Просмотр объектов',
    description: 'Возможность просматривать список объектов и детали',
    category: 'objects',
  },
  [PERMISSIONS.OBJECTS_WRITE]: {
    label: 'Создание и редактирование объектов',
    description: 'Возможность создавать и редактировать объекты',
    category: 'objects',
  },
  [PERMISSIONS.OBJECTS_DELETE]: {
    label: 'Удаление объектов',
    description: 'Возможность удалять объекты',
    category: 'objects',
  },
  
  // Schedule
  [PERMISSIONS.SCHEDULE_VIEW]: {
    label: 'Просмотр графика',
    description: 'Возможность просматривать календарь и график работ',
    category: 'schedule',
  },
  [PERMISSIONS.SCHEDULE_EDIT]: {
    label: 'Редактирование графика',
    description: 'Возможность изменять график работ',
    category: 'schedule',
  },
  
  // Planner
  [PERMISSIONS.PLANNER_VIEW]: {
    label: 'Просмотр планировщика',
    description: 'Возможность просматривать планировщик работ',
    category: 'planner',
  },
  [PERMISSIONS.PLANNER_EDIT]: {
    label: 'Редактирование планировщика',
    description: 'Возможность изменять планировщик работ',
    category: 'planner',
  },
  
  // Reports
  [PERMISSIONS.REPORTS_VIEW]: {
    label: 'Просмотр отчетов',
    description: 'Возможность просматривать отчеты и аналитику',
    category: 'reports',
  },
  
  // Settings
  [PERMISSIONS.SETTINGS_MANAGE]: {
    label: 'Управление настройками',
    description: 'Возможность изменять глобальные настройки системы',
    category: 'settings',
  },
}

// Группировка прав по категориям для удобного отображения
export const PERMISSIONS_BY_CATEGORY = Object.entries(PERMISSIONS_META).reduce((acc, [key, meta]) => {
  const category = meta.category
  if (!acc[category]) {
    acc[category] = []
  }
  acc[category].push({
    key: key as PermissionKey,
    ...meta,
  })
  return acc
}, {} as Record<string, Array<{ key: PermissionKey; label: string; description: string; category: string }>>)