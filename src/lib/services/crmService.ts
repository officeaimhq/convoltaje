import { supabase } from '../supabase';
import { ClientDeal, DealStage } from '@/hooks/useCrmStore';
import { makeService } from './makeService';

const MOCK_DEALS: ClientDeal[] = [
  { id: "mock-d1", name: "José Rodríguez", company: "Kit Solar 3kW", phone: "+5355112233", email: "jose@email.com", value: 2450, stage: "Contacto", expectedDate: "2026-07-24", source: "Referido Niurki" },
  { id: "mock-d2", name: "Ana María Pérez", company: "Kit Solar 5kW", phone: "+5355223344", email: "ana@email.com", value: 3800, stage: "En Producción", expectedDate: "2026-07-28", source: "Web" },
  { id: "mock-d3", name: "Pedro López", company: "Bomba de Agua 2HP", phone: "+5355334455", email: "pedro@email.com", value: 1200, stage: "En Producción", expectedDate: "2026-07-25", source: "WhatsApp" },
  { id: "mock-d4", name: "Marta Díaz", company: "Kit Solar 10kW", phone: "+5355445566", email: "marta@email.com", value: 7200, stage: "Terminado", expectedDate: "2026-07-23", source: "Facebook" },
  { id: "mock-d5", name: "Carlos Mendoza", company: "Mantenimiento 5kW", phone: "+5355556677", email: "carlos@email.com", value: 450, stage: "Facturado", expectedDate: "2026-07-22", source: "Cliente recurrente" },
  { id: "mock-d6", name: "Laura Torres", company: "Kit Solar 3kW", phone: "+5355667788", email: "laura@email.com", value: 2100, stage: "Contacto", expectedDate: "2026-07-26", source: "Instagram" },
  { id: "mock-d7", name: "Roberto Sánchez", company: "Bomba 1.5HP + Panel", phone: "+5355778899", email: "roberto@email.com", value: 1800, stage: "Feedback", expectedDate: "2026-07-21", source: "Referido Samuel" },
  { id: "mock-d8", name: "Diana Rosa Alfonso", company: "Kit Solar 1kW", phone: "+5355889900", email: "diana.r@email.com", value: 950, stage: "Facturado", expectedDate: "2026-07-19", source: "Familiar" },
  { id: "mock-d9", name: "Oscar Hernández", company: "Kit Solar 7kW", phone: "+5355990011", email: "oscar@email.com", value: 4900, stage: "En Producción", expectedDate: "2026-08-01", source: "Google" },
  { id: "mock-d10", name: "Niurki Castillo", company: "Sistema Completo 5kW", phone: "+5355100112", email: "niurki.c@email.com", value: 3500, stage: "Terminado", expectedDate: "2026-07-20", source: "Interno" },
];

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
    try {
      const { data, error } = await supabase
        .from('ordenes_trabajo')
        .select(`
          *,
          perfil:perfiles!cliente_id (nombre, telefono, email)
        `);

      if (error) {
        console.warn("Error fetching deals, usando mocks:", error);
        return MOCK_DEALS;
      }

      if (!data || data.length === 0) {
        console.warn("Supabase sin datos de deals, usando mocks.");
        return MOCK_DEALS;
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
    } catch (err) {
      console.warn("Excepción al consultar Supabase en deals, usando mocks:", err);
      return MOCK_DEALS;
    }
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
