// src/pages/users/admins-page.tsx
import { useState } from 'react'
import { Plus, MoreVertical, Shield, RefreshCw, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAdmins, useDeleteAdmin, adminKeys } from '@/hooks/useAdmins'
import type { PaginationParams } from '@/lib/api/types/users-types/types'
import { useQueryClient } from '@tanstack/react-query'
import { cn } from '@/lib/utils'

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  blocked: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
}

const statusLabels: Record<string, string> = {
  active: 'Активен',
  inactive: 'Неактивен',
  blocked: 'Заблокирован',
  pending: 'Ожидает',
}

// Компонент карточки администратора
const AdminCard = ({ admin, onDelete }: { admin: any; onDelete: (id: string) => void }) => {
  const getFullName = (admin: { firstName?: string | null; lastName?: string | null; username: string }) => {
    if (admin.firstName || admin.lastName) {
      return `${admin.lastName || ''} ${admin.firstName || ''}`.trim()
    }
    return admin.username
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Shield className="size-5 text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium text-foreground">
                  {getFullName(admin)}
                </p>
                <Badge 
                  variant="outline" 
                  className={cn(statusColors[admin.status], 'border-none text-xs')}
                >
                  {statusLabels[admin.status]}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 break-all">{admin.email}</p>
              
              <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Роль:</span>
                  <span className="text-foreground">
                    {admin.role === 'admin' ? 'Администратор' : admin.role}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Последняя активность:</span>
                  <span className="text-foreground">
                    {admin.lastLoginAt ? formatDate(admin.lastLoginAt) : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon-sm" className="shrink-0 ml-2">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-auto min-w-[140px]">
              <DropdownMenuItem className="cursor-pointer whitespace-nowrap">
                <Edit className="mr-2 size-4 shrink-0" />
                <span>Редактировать</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600 whitespace-nowrap"
                onClick={() => onDelete(admin.id)}
              >
                <Trash2 className="mr-2 size-4 shrink-0" />
                <span>Удалить</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminsPage() {
  const queryClient = useQueryClient()
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 20,
    sort: 'createdAt:desc',
  })

  // Исправлено: передаем только один аргумент - pagination
  const { data, isLoading, isFetching } = useAdmins(pagination)
  const deleteAdmin = useDeleteAdmin()

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: adminKeys.lists() })
  }

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить администратора?')) {
      await deleteAdmin.mutateAsync(id)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Компонент пагинации
  const PaginationComponent = () => {
    if (!data?.pagination || data.pagination.pages <= 1) return null
    
    const { page, pages, total, limit } = data.pagination
    const startItem = (page - 1) * limit + 1
    const endItem = Math.min(page * limit, total)
    
    return (
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          Показано {startItem} - {endItem} из {total} администраторов
        </div>
        <div className="flex items-center gap-2 order-1 sm:order-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="gap-1"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Назад</span>
          </Button>
          
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: Math.min(5, pages) }, (_, i) => {
              let pageNum: number
              if (pages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= pages - 2) {
                pageNum = pages - 4 + i
              } else {
                pageNum = page - 2 + i
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'default' : 'outline'}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>
          
          <span className="text-sm sm:hidden">
            {page} / {pages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pages}
            className="gap-1"
          >
            <span className="hidden sm:inline">Вперед</span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Скелетон загрузки
  const SkeletonCard = () => (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Skeleton className="size-5 rounded mt-0.5" />
            <div className="flex-1">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-48 mb-2" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex min-h-full flex-col">
      {/* Заголовок */}
      <div className="sticky top-0 z-10 border-b border-border bg-card px-4 py-3 shadow-sm sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground sm:text-xl">
              Администраторы
            </h1>
            <p className="text-sm text-muted-foreground">
              Управление администраторами системы
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleRefresh}
              disabled={isFetching}
              title="Обновить"
            >
              <RefreshCw className={cn("size-4", isFetching && "animate-spin")} />
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="size-4" />
              <span className="hidden sm:inline">Добавить администратора</span>
              <span className="sm:hidden">Добавить</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Список карточек */}
      <div className="flex-1 p-4 sm:p-6">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : data?.data.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Администраторы не найдены
          </div>
        ) : (
          data?.data.map((admin) => (
            <AdminCard 
              key={admin.id} 
              admin={admin}
              onDelete={handleDelete}
            />
          ))
        )}

        <PaginationComponent />
      </div>
    </div>
  )
}