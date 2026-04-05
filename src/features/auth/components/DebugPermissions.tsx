// features/auth/components/DebugPermissions.tsx (только для разработки)
import { useAuth } from '../context/AuthContexts'

export function DebugPermissions() {
  const { permissions, user } = useAuth()
  
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-lg bg-black/80 p-3 text-xs text-white">
      <div className="font-bold mb-1">User: {user?.role}</div>
      <div className="text-gray-400">Permissions:</div>
      <div className="max-h-32 overflow-auto">
        {Object.entries(permissions)
          .filter(([, value]) => value === true)
          .map(([key]) => (
            <div key={key} className="text-green-400">✓ {key}</div>
          ))}
      </div>
    </div>
  )
}