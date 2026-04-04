// src/pages/login-page.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Building2, 
  Users, 
  Shield, 
  HardHat,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/context/AuthContexts'
import { USE_MOCK_AUTH } from '@/lib/api/services/auth-services.ts/auth-service'
import { cn } from '@/lib/utils'

// Тестовые аккаунты
const testAccounts = [
  {
    role: 'admin',
    name: 'Администратор',
    email: 'admin@screwit.ru',
    password: 'admin123',
    icon: Shield,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
    description: 'Полный доступ к системе',
  },
  {
    role: 'customer',
    name: 'Заказчик',
    email: 'customer@screwit.ru',
    password: 'customer123',
    icon: Users,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    description: 'Доступ к своим заявкам и объектам',
  },
  {
    role: 'contractor',
    name: 'Исполнитель',
    email: 'contractor@screwit.ru',
    password: 'contractor123',
    icon: HardHat,
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    description: 'Выполнение заявок и отчетность',
  },
]

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading: authLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showTestUsers, setShowTestUsers] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleQuickLogin = async (email: string, password: string) => {
    setFormData({ email, password, rememberMe: false })
    setIsLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      setErrors({
        email: '',
        password: 'Неверный email или пароль'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors = { email: '', password: '' }
    let isValid = true

    if (!formData.email) {
      newErrors.email = 'Введите email'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email'
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      await login(formData.email, formData.password)
      navigate('/')
    } catch (error) {
      setErrors({
        email: '',
        password: 'Неверный email или пароль'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Иконка и описание системы */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            Screw It Desk
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Единая платформа для управления заявками, объектами и исполнителями
          </p>
        </div>

        {/* Карточка с формой входа */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Добро пожаловать
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Войдите в свою учетную запись
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ivan@company.ru"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "pl-10",
                    errors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Пароль
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={cn(
                    "pl-10 pr-10",
                    errors.password && "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                  disabled={isLoading}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-normal text-muted-foreground cursor-pointer"
                >
                  Запомнить меня
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Забыли пароль?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Вход...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Войти
                </>
              )}
            </Button>
          </form>

          {/* Тоггл для показа тестовых пользователей (только в режиме моков) */}
          {USE_MOCK_AUTH && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    или
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Показать тестовых пользователей
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {showTestUsers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                  <Switch
                    checked={showTestUsers}
                    onCheckedChange={setShowTestUsers}
                  />
                </div>
              </div>

              {/* Тестовые пользователи (появляются при включенном тоггле) */}
              {showTestUsers && (
                <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">
                  <p className="text-xs text-muted-foreground text-center">
                    Нажмите на карточку для автоматического входа
                  </p>
                  {testAccounts.map((account) => {
                    const Icon = account.icon
                    return (
                      <div
                        key={account.role}
                        className="cursor-pointer rounded-lg border border-border bg-muted/30 p-3 transition-all hover:bg-muted/50 hover:shadow-md"
                        onClick={() => handleQuickLogin(account.email, account.password)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={cn("rounded-lg p-2", account.color)}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{account.name}</p>
                              <p className="text-sm text-muted-foreground">{account.email}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Пароль: {account.password}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {account.description}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="shrink-0">
                            Войти
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}