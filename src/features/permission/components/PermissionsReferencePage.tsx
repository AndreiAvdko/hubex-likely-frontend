// features/permissions/components/PermissionsReferencePage.tsx
import { useState } from 'react'
import { 
  PERMISSIONS_META, 
  PERMISSIONS_BY_CATEGORY,
  type PermissionKey 
} from '@/features/auth/constants/permissions.constants'

import {DEFAULT_ROLE_PERMISSIONS} from '@/features/auth/types/permissions.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Switch } from '@/shared/ui/switch'
import { 
  Key, 
  Shield, 
  Users, 
  Ticket, 
  Building2, 
  Calendar, 
  CalendarClock, 
  BarChart3, 
  Settings,
  Plus,
  CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Иконки для категорий
const categoryIcons: Record<string, React.ElementType> = {
  users: Users,
  tickets: Ticket,
  objects: Building2,
  schedule: Calendar,
  planner: CalendarClock,
  reports: BarChart3,
  settings: Settings,
}

const categoryLabels: Record<string, string> = {
  users: 'Пользователи',
  tickets: 'Заявки',
  objects: 'Объекты',
  schedule: 'График',
  planner: 'Планировщик',
  reports: 'Отчеты',
  settings: 'Настройки',
}

// Доступные роли (позже будут из бэкенда)
const availableRoles = [
  { id: 'admin', name: 'Администратор', description: 'Полный доступ ко всем функциям' },
  { id: 'customer', name: 'Заказчик', description: 'Доступ к своим заявкам и объектам' },
  { id: 'contractor', name: 'Исполнитель', description: 'Выполнение заявок и отчетность' },
]

export function PermissionsReferencePage() {
  const [selectedRole, setSelectedRole] = useState<string>('admin')
  const [permissionsState, setPermissionsState] = useState<Record<string, boolean>>(() => {
    // Инициализируем состояниями из DEFAULT_ROLE_PERMISSIONS для выбранной роли
    const rolePermissions = DEFAULT_ROLE_PERMISSIONS[selectedRole as keyof typeof DEFAULT_ROLE_PERMISSIONS]
    return rolePermissions || {}
  })

  // Получаем права выбранной роли
  const getRolePermissions = (roleId: string) => {
    return DEFAULT_ROLE_PERMISSIONS[roleId as keyof typeof DEFAULT_ROLE_PERMISSIONS] || {}
  }

  // Обработчик переключения роли
  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId)
    const rolePermissions = getRolePermissions(roleId)
    setPermissionsState(rolePermissions)
  }

  // Обработчик переключения права
  const handlePermissionToggle = (permissionKey: PermissionKey) => {
    setPermissionsState(prev => ({
      ...prev,
      [permissionKey]: !prev[permissionKey]
    }))
  }

  // Добавление новой роли (пока просто алерт)
  const handleAddRole = () => {
    alert('Функция добавления роли будет реализована позже')
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Key className="h-6 w-6" />
            Справочник прав доступа
          </h1>
          <p className="text-muted-foreground mt-1">
            Управление правами для ролей. Выберите роль и настройте доступ.
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Всего: {Object.keys(PERMISSIONS_META).length} прав
        </Badge>
      </div>

      {/* Роли */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Роли доступа
              </CardTitle>
              <CardDescription>
                Выберите роль для просмотра и настройки прав
              </CardDescription>
            </div>
            <Button onClick={handleAddRole} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Добавить роль
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {availableRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id)}
                className={cn(
                  'flex flex-col items-start p-4 rounded-lg border-2 transition-all text-left min-w-[180px]',
                  selectedRole === role.id
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border hover:border-primary/50 hover:bg-accent/50'
                )}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="font-semibold">{role.name}</span>
                  {selectedRole === role.id && (
                    <CheckCircle2 className="h-4 w-4 text-primary ml-auto" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {role.description}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Категории прав */}
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(PERMISSIONS_BY_CATEGORY).map(([category, permissions]) => {
          const Icon = categoryIcons[category] || Shield
          return (
            <Card key={category}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>{categoryLabels[category] || category}</CardTitle>
                  <CardDescription className="ml-2">
                    {permissions.length} прав
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {permissions.map((perm) => {
                    const isEnabled = permissionsState[perm.key] === true
                    return (
                      <div
                        key={perm.key}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/30 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-medium">
                              {perm.key}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          </div>
                          <div className="mt-1">
                            <div className="font-medium text-sm">{perm.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {perm.description}
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex items-center gap-2">
                          <span className={cn(
                            "text-xs",
                            isEnabled ? "text-green-600" : "text-gray-400"
                          )}>
                            {isEnabled ? "Включено" : "Выключено"}
                          </span>
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={() => handlePermissionToggle(perm.key)}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Info Footer */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">📝 Примечание:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Права в формате <code className="bg-muted px-1 rounded">категория:действие</code> или <code className="bg-muted px-1 rounded">категория:действие:подкатегория</code></li>
              <li>Для проверки прав используйте <code className="bg-muted px-1 rounded">hasPermission()</code> или компонент <code className="bg-muted px-1 rounded">PermissionGuard</code></li>
              <li>Изменения прав временные (для демонстрации). В будущем будет реализовано сохранение на бэкенд</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}