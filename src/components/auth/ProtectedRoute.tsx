import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore, UserRole } from '@/hooks/useAuthStore';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { currentUser } = useAuthStore();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Si no está logueado, forzar redirección al login simulado
    if (!currentUser) {
      if (location !== '/admin/login') {
        setLocation('/admin/login');
      }
      return;
    }

    // Si tiene un rol que no está en la lista de permitidos
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      // Mandarlo a la ruta raíz del panel
      setLocation('/admin');
    }
  }, [currentUser, location, setLocation, allowedRoles]);

  if (!currentUser) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return null;
  }

  return <>{children}</>;
}
