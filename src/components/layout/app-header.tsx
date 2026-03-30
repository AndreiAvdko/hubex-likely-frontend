// src/components/layout/app-header.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Bell, 
  CircleHelp, 
  LogOut, 
  ChevronDown,
  Phone,
  BellRing,
  Star,
  KeyRound,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { ChangePasswordModal } from '@/components/auth/change-password-modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type AppHeaderProps = {
  breadcrumbs: string
  userInitials?: string
  userName?: string
  userRating?: number
  userPhone?: string
  onLogout?: () => void
  onChangePassword?: (oldPassword: string, newPassword: string) => Promise<void>
}

export function AppHeader({
  breadcrumbs,
  userInitials = 'ИИ',
  userName = 'Иванов Иван Иванович',
  userRating = 3.67,
  userPhone = '+7 (999) 123-45-67',
  onLogout,
  onChangePassword,
}: AppHeaderProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
    }
    setIsOpen(false)
  }

  const handleOpenChangePassword = () => {
    setIsPasswordModalOpen(true)
    setIsOpen(false)
  }

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false)
  }

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    if (onChangePassword) {
      await onChangePassword(oldPassword, newPassword)
    } else {
      // Здесь будет реальный запрос к API
      console.log('Смена пароля:', { oldPassword, newPassword })
      // Имитация успешной смены
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4 shadow-sm">
        <nav
          className="min-w-0 truncate text-sm text-muted-foreground"
          aria-label="Навигация"
        >
          <span className="font-medium text-foreground">{breadcrumbs}</span>
        </nav>
        
        <div className="flex items-center gap-1">
          {/* Кнопка справки */}
          <Button
            variant="ghost"
            size="icon"
            type="button"
            title="Справка"
            aria-label="Справка"
          >
            <CircleHelp className="size-5 text-muted-foreground" />
          </Button>
          
          {/* Кнопка уведомлений */}
          <Button
            variant="ghost"
            size="icon"
            type="button"
            title="Уведомления"
            aria-label="Уведомления"
          >
            <Bell className="size-5 text-muted-foreground" />
          </Button>
          
          {/* Выпадающее меню пользователя */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger>
              <div>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 px-2 hover:bg-muted/50",
                    isOpen && "bg-muted/50"
                  )}
                >
                  <Avatar className="size-9 border border-border">
                    <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-80">
              {/* Профиль пользователя */}
              <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-start gap-3">
                  <Avatar className="size-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-base font-semibold text-primary-foreground">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{userName}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-foreground">{userRating}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Phone className="size-3" />
                      <span>{userPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Настройка уведомлений */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Настройка уведомлений</span>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Включить Push уведомления
                </p>
              </div>

              <Separator />
              
              {/* Действия */}
              <div className="p-2">
                <DropdownMenuItem 
                  onClick={handleOpenChangePassword} 
                  className="cursor-pointer"
                >
                  <KeyRound className="mr-2 h-4 w-4" />
                  <span>Сменить пароль</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Модальное окно смены пароля */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
        onChangePassword={handleChangePassword}
      />
    </>
  )
}