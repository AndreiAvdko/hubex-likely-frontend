// features/auth/components/PermissionGuard.tsx
import { type ReactNode } from 'react';  // type-only import
import { usePermissions } from '../hooks/usePermissions';
import type { PermissionKey } from '../types/permissions.types';

interface PermissionGuardProps {
  permissions: PermissionKey | PermissionKey[];
  mode?: 'any' | 'all';  // any - хотя бы одно, all - все
  fallback?: ReactNode;
  children: ReactNode;
}

export const PermissionGuard = ({ 
  permissions, 
  mode = 'any', 
  fallback = null, 
  children 
}: PermissionGuardProps) => {
  const { hasAnyPermission, hasAllPermissions } = usePermissions();
  
  const permsArray = Array.isArray(permissions) ? permissions : [permissions];
  const hasAccess = mode === 'any' 
    ? hasAnyPermission(permsArray)
    : hasAllPermissions(permsArray);
  
  return hasAccess ? <>{children}</> : <>{fallback}</>;
};