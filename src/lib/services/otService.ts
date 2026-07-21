import { supabase } from '../supabase';
import { offlineService } from './offlineService';
import { CalendarEvent } from '../../hooks/useCalendarStore';
import { makeService } from './makeService';

const MOCK_EVENTS: CalendarEvent[] = [
  // ── LUNES 21 ──────────────────────────────────────────
  { id: "mock-ot1", title: "Instalación 6K Plus Oferta", date: "2026-07-21", time: "09:00", description: "OT-0107 — Sistema 6K Plus Oferta", clientName: "Heidy", location: "Santiago de las Vegas, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "FIDE/FELIX" },
  { id: "mock-ot2", title: "Instalación 10K + Alarma", date: "2026-07-21", time: "09:00", description: "OT-4007 — Sistema 10K + Alarma. Pte Levantamiento para bases de cemento", clientName: "Reinier", location: "Lawton, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Railyn", assignedTecnico: "FIDE/FELIX" },
  { id: "mock-ot3", title: "Instalación 3K 110v", date: "2026-07-21", time: "09:00", description: "OT-4207 — Sistema 3K 110v", clientName: "Madeline", location: "Arroyo Naranjo, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "TOMY" },
  { id: "mock-ot4", title: "Servicio de Aterramiento", date: "2026-07-21", time: "09:00", description: "OT-3207 — Servicio de Aterramiento", clientName: "Laritza", location: "Vedado, La Habana", workType: "mantenimiento", status: "pendiente", assignedComercial: "Railyn", assignedTecnico: "WILLIAM" },
  { id: "mock-ot5", title: "Instalación 4 paneles a AIO 3k/7k", date: "2026-07-21", time: "09:00", description: "OT-3807 — Inst de 4 paneles de la empresa a AIO de 3k/7k", clientName: "Yhovani", location: "Playa de la Revolución, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "DC1", assignedTecnico: "CAMILO" },
  // ── MARTES 22 ─────────────────────────────────────────
  { id: "mock-ot6", title: "Instalación 6K", date: "2026-07-22", time: "09:00", description: "OT-1707 — Sistema 6K", clientName: "Luisa", location: "Guanabacoa, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "FIDE/FELIX" },
  { id: "mock-ot7", title: "Instalación 3K 110v", date: "2026-07-22", time: "09:00", description: "OT-1807 — Sistema 3K 110v", clientName: "Julián", location: "Santa Cruz del Norte, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki" },
  { id: "mock-ot8", title: "Instalación 3K Plus", date: "2026-07-22", time: "09:00", description: "OT-2007 — Sistema 3K Plus", clientName: "Elizabeth", location: "Boyeros, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "LEO" },
  { id: "mock-ot9", title: "Instalación 2 paneles a Estación Oscal", date: "2026-07-22", time: "09:00", description: "OT-3307 — Inst 2 paneles solares nuestros a Estación de Energía Oscal", clientName: "Lydia", location: "Arroyo Naranjo, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Railyn", assignedTecnico: "TOMY" },
  { id: "mock-ot10", title: "Instalación 8 paneles a sistema 6k/15k", date: "2026-07-22", time: "09:00", description: "OT-3707 — Instalación de 8 paneles nuestros a sistema 6k/15k", clientName: "Leticia", location: "Arroyo Naranjo, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Railyn", assignedTecnico: "FIDE/FÉLIX" },
  // ── MIÉRCOLES 23 ──────────────────────────────────────
  { id: "mock-ot11", title: "Instalación 10K", date: "2026-07-23", time: "09:00", description: "OT-2307 — Sistema 10K", clientName: "Adelaida", location: "Cerro, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "FIDE/FELIX" },
  { id: "mock-ot12", title: "Instalación 6K Plus", date: "2026-07-23", time: "09:00", description: "OT-2507 — Sistema 6K Plus", clientName: "Thais", location: "Playa, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "DC1", assignedTecnico: "FIDE/FELIX" },
  { id: "mock-ot13", title: "Instalación 6 paneles a AIO 6k/15kw", date: "2026-07-23", time: "09:00", description: "OT-2207 — Inst de 6 paneles nuestros a AIO de 6k/15kw del cliente", clientName: "Luis", location: "Centro Habana, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Diana", assignedTecnico: "LEO" },
  { id: "mock-ot14", title: "Instalación 1 panel a EcoFlow Delta 4", date: "2026-07-23", time: "09:00", description: "OT-4507 — Inst de 1 panel de la empresa a EcoFlow Delta 4 Classic", clientName: "Yati", location: "La Lisa, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "CAMILO" },
  { id: "mock-ot15", title: "Mano de Obra + Batería Oliter", date: "2026-07-23", time: "09:00", description: "OT-1405 — M.O para instalar sistema de la cliente + batería Oliter", clientName: "Leivis", location: "Arroyo Naranjo, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "TOMY" },
  // ── JUEVES 24 ─────────────────────────────────────────
  { id: "mock-ot16", title: "Instalación 6K", date: "2026-07-24", time: "09:00", description: "OT-3007 — Sistema 6K. Pago: efectivo + Paypal", clientName: "Antonio", location: "Playa, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "TOMY" },
  { id: "mock-ot17", title: "Instalación 6K Plus Oferta", date: "2026-07-24", time: "09:00", description: "OT-3107 — Sistema 6K Plus Oferta", clientName: "Yudith", location: "Alamar, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "FIDE/FELIX" },
  { id: "mock-ot18", title: "Instalación 8 paneles estructura elevada", date: "2026-07-24", time: "09:00", description: "OT-1907 — Inst de 8 paneles de la empresa con estructura elevada", clientName: "Brian", location: "Playa, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "DC1", assignedTecnico: "FIDE/FELIX" },
  { id: "mock-ot19", title: "Instalación 2 baterías 15kw a sistema 10k", date: "2026-07-24", time: "09:00", description: "OT-2607 — Inst de 2 baterías de 15kw a sistema 10k instalado por nosotros", clientName: "Ernesto", location: "Cojímar, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Diana", assignedTecnico: "LEO" },
  { id: "mock-ot20", title: "Instalación 2 paneles a Estación de Energía", date: "2026-07-24", time: "09:00", description: "OT-3407 — Inst de 2 paneles solares del cliente a Estación de Energía", clientName: "Rafael", location: "Cotorro, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "CAMILO" },
  // ── VIERNES 25 ────────────────────────────────────────
  { id: "mock-ot21", title: "Instalación 6K Plus Oferta", date: "2026-07-25", time: "09:00", description: "OT-2807 — Sistema 6K Plus Oferta", clientName: "Ronnie", location: "Playa, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Diana", assignedTecnico: "FIDE/FELIX" },
  { id: "mock-ot22", title: "Instalación 3K 110v", date: "2026-07-25", time: "09:00", description: "OT-3507 — Sistema 3K 110v", clientName: "Libertad", location: "Miramar, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "CAMILO" },
  { id: "mock-ot23", title: "Instalación 3K 110v", date: "2026-07-25", time: "09:00", description: "OT-4607 — Sistema 3K 110v", clientName: "Yanelis", location: "Habana del Este, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki", assignedTecnico: "TOMY" },
  { id: "mock-ot24", title: "Instalación 6 paneles a sistema 6K", date: "2026-07-25", time: "09:00", description: "OT-2707 — Inst de 6 paneles de la empresa a sistema 6K del cliente", clientName: "Ernesto", location: "Cojímar, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Diana", assignedTecnico: "FIDE/FELIX" },
  { id: "mock-ot25", title: "Integración EcoFlow + 3 paneles", date: "2026-07-25", time: "09:00", description: "OT-3907 — Integración de EcoFlow + Inst de 3 paneles de la empresa", clientName: "Fidel", location: "Arroyo Naranjo, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Railyn", assignedTecnico: "LEO" },
  { id: "mock-ot26", title: "Instalación 2 paneles del cliente", date: "2026-07-25", time: "09:00", description: "OT-4307 — Inst de 2 paneles del cliente", clientName: "Daniel", location: "Guanabacoa, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Niurki" },
  // ── SÁBADO 26 ─────────────────────────────────────────
  { id: "mock-ot27", title: "Instalación 3K 110v + 5k batería + 4 paneles", date: "2026-07-26", time: "09:00", description: "Sistema 3K 110v con 5k de batería y 4 paneles solares. Pago: Zelle", clientName: "Cliente Railyn", location: "Santa Cruz del Norte, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Railyn" },
  { id: "mock-ot28", title: "Instalación 3K 110v + 5k batería + 4 paneles", date: "2026-07-26", time: "09:00", description: "Sistema 3K 110v con 5k de batería y 4 paneles solares. Pago: Zelle", clientName: "Cliente Railyn", location: "Santa Cruz del Norte, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Railyn", assignedTecnico: "JAVIER" },
  { id: "mock-ot29", title: "Instalación 3K Plus", date: "2026-07-26", time: "09:00", description: "OT-4707 — Sistema 3K Plus", clientName: "Teresa", location: "La Lisa, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "DC1", assignedTecnico: "TOMY" },
  { id: "mock-ot30", title: "Instalación 2 paneles a EcoFlow Delta 3 Ultra", date: "2026-07-26", time: "09:00", description: "OT-4107 — Inst 2 paneles de la empresa a EcoFlow Delta 3 Ultra", clientName: "Arelys", location: "Guanabacoa, La Habana", workType: "instalacion", status: "pendiente", assignedComercial: "Railyn", assignedTecnico: "LEO" },
];

export const otService = {
  /**
   * Obtiene todas las órdenes de trabajo mapeadas a CalendarEvent
   */
  async getOTs(): Promise<CalendarEvent[]> {
    try {
      const { data, error } = await supabase
        .from('ordenes_trabajo')
        .select('*');

      if (error) {
        console.warn('Error obteniendo OTs, usando mocks:', error);
        return MOCK_EVENTS;
      }

      if (!data || data.length === 0) {
        console.warn('Supabase sin OTs, usando mocks.');
        return MOCK_EVENTS;
      }

      return (data || []).map(mapOTtoEvent);
    } catch (err) {
      console.warn('Excepción al consultar Supabase en OTs, usando mocks:', err);
      return MOCK_EVENTS;
    }
  },

  async createOT(event: Omit<CalendarEvent, 'id'>) {
    const payload = mapEventToOT(event);
    try {
      const { data, error } = await supabase.from('ordenes_trabajo').insert(payload).select().single();
      if (error) throw error;
      
      const newEvent = mapOTtoEvent(data);
      makeService.notify({
        eventType: 'OT_CREATED',
        data: newEvent
      });
      return newEvent;
    } catch (error) {
      console.warn('Fallo red o BD en createOT, guardando offline...', error);
      await offlineService.saveOfflineAction(null, {
        action: 'CREATE_OT',
        table: 'ordenes_trabajo',
        payload,
        timestamp: new Date().toISOString()
      });
      // Retornar un evento optimista con un id temporal
      return { ...event, id: 'temp-' + Date.now() } as CalendarEvent;
    }
  },

  async updateOT(id: string, updates: Partial<CalendarEvent>) {
    // Si es un ID temporal (creado offline hace poco y no sincronizado aún), 
    // solo lo modificaremos en el store, o lo marcamos offline
    if (id.startsWith('temp-')) {
       // Idealmente actualizar en localQueue, pero por ahora delegamos al store
       console.log('Update de OT temporal omitido de API principal, debe actualizarse en el store.');
       return;
    }

    const payload = mapEventToOT(updates as CalendarEvent);
    try {
      const { error } = await supabase.from('ordenes_trabajo').update(payload).eq('id', id);
      if (error) throw error;
      
      makeService.notify({
        eventType: 'OT_UPDATED',
        data: { id, updates }
      });
    } catch (error) {
      console.warn('Fallo red o BD en updateOT, guardando offline...', error);
      await offlineService.saveOfflineAction(null, {
        action: 'UPDATE_OT',
        table: 'ordenes_trabajo',
        recordId: id,
        payload,
        timestamp: new Date().toISOString()
      });
    }
  },

  async deleteOT(id: string) {
    if (id.startsWith('temp-')) return;
    try {
      const { error } = await supabase.from('ordenes_trabajo').delete().eq('id', id);
      if (error) throw error;
      
      makeService.notify({
        eventType: 'OT_DELETED',
        data: { id }
      });
    } catch (error) {
      console.warn('Fallo red o BD en deleteOT, guardando offline...', error);
      await offlineService.saveOfflineAction(null, {
        action: 'DELETE_OT',
        table: 'ordenes_trabajo',
        recordId: id,
        payload: { id },
        timestamp: new Date().toISOString()
      });
    }
  }
};

// Utilidades de mapeo
function mapOTtoEvent(row: any): CalendarEvent {
  return {
    id: row.id,
    title: row.descripcion_trabajo || 'Sin título',
    date: row.fecha_instalacion ? row.fecha_instalacion.split('T')[0] : new Date().toISOString().split('T')[0],
    time: row.fecha_instalacion ? new Date(row.fecha_instalacion).toTimeString().substring(0, 5) : '09:00',
    description: row.descripcion_trabajo,
    clientName: row.cliente_id || 'Cliente no asignado', // Habría que hacer JOIN para el nombre real
    location: `${row.municipio || ''}, ${row.provincia || ''}`.trim(),
    workType: row.tipo_trabajo,
    status: row.estado,
    paymentInfo: row.monto_final ? {
      method: row.forma_pago,
      amount: row.monto_final,
      isPartial: row.monto_pagado < row.monto_final,
      validatedBy: row.pago_validado ? 'Validado' : ''
    } : undefined
  };
}

function mapEventToOT(ev: Partial<CalendarEvent>): any {
  const payload: any = {};
  if (ev.description || ev.title) payload.descripcion_trabajo = ev.description || ev.title;
  if (ev.workType) payload.tipo_trabajo = ev.workType;
  if (ev.status) payload.estado = ev.status;
  
  if (ev.date && ev.time) {
    const dt = new Date(`${ev.date}T${ev.time}:00`);
    payload.fecha_instalacion = dt.toISOString();
  } else if (ev.date) {
    payload.fecha_instalacion = new Date(`${ev.date}T00:00:00`).toISOString();
  }

  // Si tiene info de pago
  if (ev.paymentInfo) {
    payload.forma_pago = ev.paymentInfo.method;
    payload.monto_final = ev.paymentInfo.amount;
    payload.pago_validado = !!ev.paymentInfo.validatedBy;
  }
  
  return payload;
}
