import { supabase } from '../supabase';
import { ClientDeal, DealStage } from '@/hooks/useCrmStore';
import { makeService } from './makeService';

// Mapeo entre los estados de Supabase y los del CRM local
export const mapEstadoToStage = (estado: string): DealStage => {
  switch (estado?.toLowerCase()) {
    case 'contacto': return 'Contacto';
    case 'en producción':
    case 'en produccion': return 'En Producción';
    case 'terminado': return 'Terminado';
    case 'facturado': return 'Facturado';
    case 'feedback': return 'Feedback';
    default: return 'Contacto'; // Fallback
  }
};

export const mapStageToEstado = (stage: DealStage): string => {
  return stage; // Podríamos ajustarlo si los valores en BD son diferentes
};

export const crmService = {
  fetchDeals: async (): Promise<ClientDeal[]> => {
    const { data, error } = await supabase
      .from('ordenes_trabajo')
      .select(`
        *,
        perfil:perfiles!cliente_id (nombre, telefono, email)
      `);

    if (error) {
      console.error("Error fetching deals from CRM service:", error);
      throw error;
    }

    return (data || []).map((ot: any) => ({
      id: ot.id,
      name: ot.perfil?.nombre || 'Desconocido',
      company: ot.kit_id || ot.tipo_trabajo || 'Sin especificar',
      phone: ot.perfil?.telefono || '',
      email: ot.perfil?.email || '',
      value: Number(ot.monto_estimado || 0),
      stage: mapEstadoToStage(ot.estado),
      expectedDate: ot.fecha_instalacion ? ot.fecha_instalacion.split('T')[0] : (ot.fecha_creacion?.split('T')[0] || ''),
      source: ot.descripcion_trabajo || ''
    }));
  },

  updateDealStage: async (id: string, newStage: DealStage): Promise<void> => {
    const estado = mapStageToEstado(newStage);
    const { error } = await supabase
      .from('ordenes_trabajo')
      .update({ estado })
      .eq('id', id);

    if (error) {
      console.error("Error updating deal stage:", error);
      // Aquí registraríamos en salvas_offline en caso de fallo,
      // para que cuando vuelva la conexión se sincronice.
      const { error: offlineError } = await supabase
        .from('salvas_offline')
        .insert([{
          tabla: 'ordenes_trabajo',
          accion: 'UPDATE',
          payload: { id, estado },
          timestamp: new Date().toISOString()
        }]);
      
      if (offlineError) {
         console.error("Error guardando fallback offline:", offlineError);
      }
      throw error;
    }

    // Si todo salió bien, notificamos a Make
    makeService.notify({
      eventType: 'DEAL_STAGE_CHANGED',
      data: {
        dealId: id,
        newStage: newStage
      }
    });
  },

  // Operaciones completas de CRM (crear, actualizar info) podrían implementarse aquí 
  // insertando tanto el perfil como la OT. Por ahora lo mantenemos alineado a la OT.
};
