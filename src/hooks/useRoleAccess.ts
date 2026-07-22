import { UserRole } from './useAuthStore';
import { AdminView } from '@/components/dashboard/Sidebar';

// Matriz de permisos por rol (Módulo x Rol)
const PERMISSIONS_MATRIX: Record<UserRole, AdminView[]> = {
  admin: [
    'inicio', 'pipeline', 'calendario', 'almacen', 'finanzas', 'instalaciones',
    'quejas', 'ajustes', 'calculadora', 'historial', 'plantillas', 'errores',
    'manuales', 'asignaciones', 'validacion', 'herramientas', 'utiles', 'entregas'
  ],
  comercial: [
    'inicio', 'pipeline', 'calendario', 'quejas', 'calculadora',
    'plantillas', 'utiles', 'manuales'
  ],
  tecnico: [
    'inicio', 'calendario', 'instalaciones', 'almacen', 'asignaciones',
    'validacion', 'herramientas', 'utiles', 'manuales', 'errores'
  ],
  proyectista: [
    'inicio', 'calendario', 'calculadora', 'utiles', 'manuales',
    'herramientas', 'errores'
  ],
  transportista: [
    'inicio', 'entregas', 'almacen', 'utiles', 'manuales'
  ],
  almacenero: [
    'inicio', 'almacen', 'utiles', 'manuales'
  ],
  contable: [
    'inicio', 'finanzas', 'almacen', 'utiles', 'manuales', 'plantillas'
  ]
};

export function canAccessView(role: UserRole | undefined, view: AdminView): boolean {
  if (!role) return false;
  if (role === 'admin') return true;
  const allowed = PERMISSIONS_MATRIX[role] || ['inicio'];
  return allowed.includes(view);
}

export function getAllowedViews(role: UserRole | undefined): AdminView[] {
  if (!role) return ['inicio'];
  return PERMISSIONS_MATRIX[role] || ['inicio'];
}

export function useRoleAccess(role: UserRole | undefined) {
  return {
    canAccess: (view: AdminView) => canAccessView(role, view),
    allowedViews: getAllowedViews(role),
    isAdmin: role === 'admin',
    isComercial: role === 'comercial',
    isTecnico: role === 'tecnico',
    isProyectista: role === 'proyectista',
    isContable: role === 'contable',
    isAlmacenero: role === 'almacenero',
    isTransportista: role === 'transportista'
  };
}
