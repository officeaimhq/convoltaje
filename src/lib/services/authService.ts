import { supabase } from '../supabase';
import { UserSession, UserRole } from '../../hooks/useAuthStore';

export const authService = {
  /**
   * Obtiene todos los perfiles activos de la base de datos y los mapea al formato UserSession
   */
  async getProfiles(): Promise<UserSession[]> {
    const { data, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('activo', true);

    if (error) {
      console.error('Error obteniendo perfiles de Supabase:', error);
      throw error;
    }

    return (data || []).map((row) => ({
      id: row.id,
      name: row.nombre,
      role: (row.rol as UserRole) || 'comercial',
      title: row.descripcion_corta || '',
      avatar: row.foto_url || '',
      clientsCount: row.total_instalaciones || 0,
      reviewsCount: row.calificacion_promedio ? Math.round(Number(row.calificacion_promedio)) : 0,
      phone: row.telefono || '',
      // Campos de UI que no están en BD pero la app espera
      avatarOrigin: 'center',
      avatarZoom: 1.0,
    }));
  }
};
