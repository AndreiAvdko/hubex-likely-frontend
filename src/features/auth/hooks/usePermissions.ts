// features/auth/hooks/usePermissions.ts
import { useAuth } from '../context/AuthContexts';
import type { PermissionKey } from '../types/permissions.types';

// Просто реэкспортируем useAuth как usePermissions для удобства
export const usePermissions = useAuth;

// Утилиты для конкретных проверок
export const useHasPermission = (permission: PermissionKey) => {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
};

export const useHasAnyPermission = (permissions: PermissionKey[]) => {
  const { hasAnyPermission } = useAuth();
  return hasAnyPermission(permissions);
};

export const useHasAllPermissions = (permissions: PermissionKey[]) => {
  const { hasAllPermissions } = useAuth();
  return hasAllPermissions(permissions);
};