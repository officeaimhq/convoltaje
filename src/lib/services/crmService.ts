import { supabase } from '../supabase';
import { ClientDeal, DealStage } from '@/hooks/useCrmStore';
import { makeService } from './makeService';

const MOCK_DEALS: ClientDeal[] = [
  { 
    id: "deal-ot-3141", 
    name: "Juan Pérez 2", 
    company: "Sistema 6K PLUS", 
    phone: "+5352849102", 
    email: "juanperez2@gmail.com", 
    value: 6950, 
    stage: "Contacto", 
    substage: "lead_nuevo",
    expectedDate: "2026-07-31", 
    source: "Niurki — Calle 23 #456, Vedado, La Habana",
    otRef: "OT-3141",
    salesAgent: "Niurki",
    address: "Calle 23 #456, Vedado, La Habana",
    activityLog: [
      {
        id: "log-3141-1",
        timestamp: "2026-07-23T09:00:00.000Z",
        actorName: "Sistema / Cliente",
        actorRole: "comercial",
        action: "Creó la Orden de Trabajo (OT-3141) desde la web",
        details: "Sistema 6K PLUS ($6,950 USD) — Dirección: Calle 23 #456, Vedado",
        toSubstage: "lead_nuevo"
      }
    ]
  },
  { id: "mock-d1", name: "Heidy", company: "6K Plus Oferta", phone: "", email: "", value: 3200, stage: "En Producción", expectedDate: "2026-07-21", source: "Niurki — Santiago de las Vegas" },
  { id: "mock-d2", name: "Reinier", company: "10K + Alarma", phone: "", email: "", value: 7200, stage: "En Producción", expectedDate: "2026-07-21", source: "Railyn — Lawton. Pte levantamiento" },
  { id: "mock-d3", name: "Madeline", company: "3K 110v", phone: "", email: "", value: 1800, stage: "Contacto", expectedDate: "2026-07-21", source: "Niurki — Arroyo Naranjo" },
  { id: "mock-d4", name: "Laritza", company: "Servicio de Aterramiento", phone: "", email: "", value: 350, stage: "Contacto", expectedDate: "2026-07-21", source: "Railyn — Vedado" },
  { id: "mock-d5", name: "Yhovani", company: "Inst 4 paneles a AIO 3k/7k", phone: "", email: "", value: 1800, stage: "Contacto", expectedDate: "2026-07-21", source: "DC1 — Playa de la Revolución" },
  { id: "mock-d6", name: "Luisa", company: "6K", phone: "", email: "", value: 3800, stage: "En Producción", expectedDate: "2026-07-22", source: "Niurki — Guanabacoa" },
  { id: "mock-d7", name: "Julián", company: "3K 110v", phone: "", email: "", value: 1800, stage: "En Producción", expectedDate: "2026-07-22", source: "Niurki — Santa Cruz del Norte" },
  { id: "mock-d8", name: "Elizabeth", company: "3K Plus", phone: "", email: "", value: 2200, stage: "En Producción", expectedDate: "2026-07-22", source: "Niurki — Boyeros" },
  { id: "mock-d9", name: "Lydia", company: "Inst 2 paneles a Estación Oscal", phone: "", email: "", value: 1200, stage: "En Producción", expectedDate: "2026-07-22", source: "Railyn — Arroyo Naranjo" },
  { id: "mock-d10", name: "Leticia", company: "Inst 8 paneles a sistema 6k/15k", phone: "", email: "", value: 2500, stage: "En Producción", expectedDate: "2026-07-22", source: "Railyn — Arroyo Naranjo" },
  { id: "mock-d11", name: "Adelaida", company: "10K", phone: "", email: "", value: 7200, stage: "En Producción", expectedDate: "2026-07-23", source: "Niurki — Cerro" },
  { id: "mock-d12", name: "Thais", company: "6K Plus", phone: "", email: "", value: 4200, stage: "En Producción", expectedDate: "2026-07-23", source: "DC1 — Playa" },
  { id: "mock-d13", name: "Luis", company: "Inst 6 paneles a AIO 6k/15kw", phone: "", email: "", value: 1800, stage: "En Producción", expectedDate: "2026-07-23", source: "Diana — Centro Habana" },
  { id: "mock-d14", name: "Yati", company: "Inst 1 panel a EcoFlow Delta 4", phone: "", email: "", value: 600, stage: "En Producción", expectedDate: "2026-07-23", source: "Niurki — La Lisa" },
  { id: "mock-d15", name: "Leivis", company: "M.O + Batería Oliter", phone: "", email: "", value: 1500, stage: "En Producción", expectedDate: "2026-07-23", source: "Niurki — Arroyo Naranjo" },
  { id: "mock-d16", name: "Antonio", company: "6K", phone: "", email: "", value: 3800, stage: "Contacto", expectedDate: "2026-07-24", source: "Niurki — Playa. Efectivo + Paypal" },
  { id: "mock-d17", name: "Yudith", company: "6K Plus Oferta", phone: "", email: "", value: 3200, stage: "Contacto", expectedDate: "2026-07-24", source: "Niurki — Alamar" },
  { id: "mock-d18", name: "Brian", company: "Inst 8 paneles estructura elevada", phone: "", email: "", value: 2200, stage: "Contacto", expectedDate: "2026-07-24", source: "DC1 — Playa" },
  { id: "mock-d19", name: "Ernesto", company: "Inst 2 baterías 15kw", phone: "", email: "", value: 3000, stage: "Contacto", expectedDate: "2026-07-24", source: "Diana — Cojímar" },
  { id: "mock-d20", name: "Rafael", company: "Inst 2 paneles a Estación de Energía", phone: "", email: "", value: 800, stage: "Contacto", expectedDate: "2026-07-24", source: "Niurki — Cotorro" },
  { id: "mock-d21", name: "Ronnie", company: "6K Plus Oferta", phone: "", email: "", value: 3200, stage: "Contacto", expectedDate: "2026-07-25", source: "Diana — Playa" },
  { id: "mock-d22", name: "Libertad", company: "3K 110v", phone: "", email: "", value: 1800, stage: "Contacto", expectedDate: "2026-07-25", source: "Niurki — Miramar" },
  { id: "mock-d23", name: "Yanelis", company: "3K 110v", phone: "", email: "", value: 1800, stage: "Contacto", expectedDate: "2026-07-25", source: "Niurki — Habana del Este" },
  { id: "mock-d24", name: "Fidel", company: "Integración EcoFlow + 3 paneles", phone: "", email: "", value: 2000, stage: "Contacto", expectedDate: "2026-07-25", source: "Railyn — Arroyo Naranjo" },
  { id: "mock-d25", name: "Daniel", company: "Inst 2 paneles del cliente", phone: "", email: "", value: 600, stage: "Contacto", expectedDate: "2026-07-25", source: "Niurki — Guanabacoa" },
  { id: "mock-d26", name: "Teresa", company: "3K Plus", phone: "", email: "", value: 2200, stage: "Contacto", expectedDate: "2026-07-26", source: "DC1 — La Lisa" },
  { id: "mock-d27", name: "Arelys", company: "Inst 2 paneles a EcoFlow Delta 3 Ultra", phone: "", email: "", value: 1000, stage: "Contacto", expectedDate: "2026-07-26", source: "Railyn — Guanabacoa" },
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

  createDeal: async (deal: ClientDeal): Promise<ClientDeal> => {
    try {
      // 1. Intentar registrar el perfil/cliente en Supabase
      const { data: perfilData } = await supabase
        .from('perfiles')
        .insert([{
          nombre: deal.name,
          telefono: deal.phone,
          email: deal.email,
          direccion: deal.address,
          rol: 'cliente'
        }])
        .select()
        .single();

      const clienteId = perfilData?.id || null;

      // 2. Insertar la OT en ordenes_trabajo
      const { error } = await supabase
        .from('ordenes_trabajo')
        .insert([{
          cliente_id: clienteId,
          kit_id: deal.company,
          monto_estimado: deal.value,
          estado: deal.stage,
          substage: deal.substage || 'lead_nuevo',
          fecha_instalacion: deal.expectedDate,
          descripcion_trabajo: deal.source,
          ot_ref: deal.otRef,
          agente_comercial: deal.salesAgent,
          direccion_entrega: deal.deliveryAddress || deal.address
        }]);

      if (error) {
        console.warn("Supabase no pudo guardar la OT directamente, manteniendo en almacenamiento local:", error);
      }
    } catch (err) {
      console.warn("Excepción al intentar guardar OT en Supabase:", err);
    }
    return deal;
  }
};
