import { supabase } from '../supabase';
import { UserSession, UserRole } from '../../hooks/useAuthStore';

const MOCK_PROFILES: UserSession[] = [
  { id: "1", name: "Admin", role: "admin", title: "Administrador", avatar: "", phone: "+5355144097", clientsCount: 0, reviewsCount: 0 },
  { id: "2", name: "Niurki", role: "comercial", title: "Asesora Comercial", avatar: "", phone: "+5355144097", clientsCount: 15, reviewsCount: 45 },
  { id: "3", name: "Diana Rosa", role: "comercial", title: "Asesora Comercial", avatar: "", phone: "+5355144097", clientsCount: 12, reviewsCount: 38 },
  { id: "4", name: "Carlos", role: "tecnico", title: "Técnico Instalador", avatar: "", phone: "+5355144098", clientsCount: 8, reviewsCount: 22 },
  { id: "5", name: "María", role: "contable", title: "Contable", avatar: "", phone: "+5355144099", clientsCount: 0, reviewsCount: 0 },
  { id: "6", name: "Pedro", role: "transportista", title: "Transportista", avatar: "", phone: "+5355144100", clientsCount: 6, reviewsCount: 12 },
  { id: "7", name: "Samuel el Panel", role: "proyectista", title: "Proyectista", avatar: "", phone: "+5355144101", clientsCount: 10, reviewsCount: 30 },
  { id: "8", name: "Yosvany", role: "almacenero", title: "Almacenero", avatar: "", phone: "+5355144102", clientsCount: 0, reviewsCount: 0 }
];

export const authService = {
  /**
   * Obtiene todos los perfiles activos de la base de datos y los mapea al formato UserSession
   */
  async getProfiles(): Promise<UserSession[]> {
    try {
      const { data, error } = await supabase
        .from('perfiles')
        .select('*')
        .eq('activo', true);

      if (error) {
        console.warn('Error obteniendo perfiles de Supabase, usando mocks:', error);
        return MOCK_PROFILES;
      }

      if (!data || data.length === 0) {
        console.warn('Supabase no devolvió perfiles, usando mocks.');
        return MOCK_PROFILES;
      }

      return data.map((row) => ({
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
    } catch (err) {
      console.warn('Excepción al consultar Supabase, usando mocks:', err);
      return MOCK_PROFILES;
    }
  }
};
