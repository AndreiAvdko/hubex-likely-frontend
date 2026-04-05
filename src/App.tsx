import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/context/AuthContexts'
import { AppShell } from '@/shared/layout/AppShell'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { protectedRoutes } from '@/configs/routes.config'
import { Navigate } from 'react-router-dom'
import { DebugPermissions } from './features/auth/components/DebugPermissions'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<AppShell />}>
            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute allowedRoles={route.allowedRoles!}>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <DebugPermissions /> {/* ← Отладка прав пользователя */}
    </AuthProvider>
  )
}