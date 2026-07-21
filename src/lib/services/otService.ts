import { supabase } from '../supabase';
import { offlineService } from './offlineService';
import { CalendarEvent } from '../../hooks/useCalendarStore';
import { makeService } from './makeService';

const MOCK_EVENTS: CalendarEvent[] = [
  { id: "mock-ot1", title: "Instalación Kit Solar 3kW", date: "2026-07-21", time: "09:00", description: "Instalación completa en casa de José Rodríguez", clientName: "José Rodríguez", location: "Centro Habana, La Habana", workType: "instalacion", status: "pendiente", assignedTecnico: "Carlos" },
  { id: "mock-ot2", title: "Levantamiento para Kit 5kW", date: "2026-07-21", time: "14:00", description: "Medición y presupuesto para Ana María Pérez", clientName: "Ana María Pérez", location: "Vedado, La Habana", workType: "levantamiento", status: "pendiente", assignedTecnico: "Samuel el Panel" },
  { id: "mock-ot3", title: "Mantenimiento preventivo", date: "2026-07-22", time: "10:00", description: "Revisión trimestral de sistema 5kW", clientName: "Carlos Mendoza", location: "Playa, La Habana", workType: "mantenimiento", status: "pendiente", assignedTecnico: "Carlos" },
  { id: "mock-ot4", title: "Instalación Bomba 2HP", date: "2026-07-22", time: "09:00", description: "Instalación de bomba de agua con panel solar", clientName: "Pedro López", location: "Guanabacoa, La Habana", workType: "instalacion", status: "en_curso", assignedTecnico: "Carlos" },
  { id: "mock-ot5", title: "Entrega Kit Solar 10kW", date: "2026-07-23", time: "08:00", description: "Instalación completa sistema 10kW", clientName: "Marta Díaz", location: "San Miguel del Padrón", workType: "instalacion", status: "completado", assignedTecnico: "Carlos" },
  { id: "mock-ot6", title: "Revisión Kit 3kW", date: "2026-07-23", time: "14:00", description: "Cliente reporta baja producción", clientName: "Oscar Hernández", location: "Cerro, La Habana", workType: "mantenimiento", status: "pendiente", assignedTecnico: "Samuel el Panel" },
  { id: "mock-ot7", title: "Levantamiento bomba 1.5HP", date: "2026-07-24", time: "10:00", description: "Evaluación para instalación de bomba", clientName: "Roberto Sánchez", location: "10 de Octubre, La Habana", workType: "levantamiento", status: "pendiente", assignedTecnico: "Carlos" },
  { id: "mock-ot8", title: "Instalación Kit Solar 1kW", date: "2026-07-24", time: "09:00", description: "Sistema pequeño para residencia", clientName: "Diana Rosa Alfonso", location: "Plaza, La Habana", workType: "instalacion", status: "completado", assignedTecnico: "Carlos" },
  { id: "mock-ot9", title: "Facturación mantenimiento", date: "2026-07-25", time: "11:00", description: "Cobro de mantenimiento trimestral", clientName: "Pedro López", location: "Guanabacoa, La Habana", workType: "instalacion", status: "pendiente", assignedTecnico: "María" },
  { id: "mock-ot10", title: "Instalación Kit Solar 3kW", date: "2026-07-25", time: "09:00", description: "Nueva instalación residencial", clientName: "Laura Torres", location: "Marianao, La Habana", workType: "instalacion", status: "pendiente", assignedTecnico: "Carlos" },
  { id: "mock-ot11", title: "Transporte de equipos", date: "2026-07-26", time: "07:00", description: "Carga y traslado de paneles y baterías", clientName: "Logística", location: "Almacén Central, La Habana", workType: "instalacion", status: "pendiente", assignedTecnico: "Pedro" },
  { id: "mock-ot12", title: "Instalación Kit 5kW completo", date: "2026-07-26", time: "09:00", description: "Instalación completa con batería", clientName: "Ana María Pérez", location: "Vedado, La Habana", workType: "instalacion", status: "pendiente", assignedTecnico: "Carlos" },
  { id: "mock-ot13", title: "Revisión final Kit 10kW", date: "2026-07-27", time: "10:00", description: "Verificación de producción y ajustes", clientName: "Marta Díaz", location: "San Miguel del Padrón", workType: "mantenimiento", status: "pendiente", assignedTecnico: "Samuel el Panel" },
  { id: "mock-ot14", title: "Levantamiento Kit 7kW", date: "2026-07-27", time: "14:00", description: "Medición para sistema grande", clientName: "Oscar Hernández", location: "Cerro, La Habana", workType: "levantamiento", status: "pendiente", assignedTecnico: "Samuel el Panel" },
  { id: "mock-ot15", title: "Aplazado: Instalación 3kW", date: "2026-07-21", time: "11:00", description: "Cliente pidió reprogramar", clientName: "José Rodríguez", location: "Centro Habana", workType: "instalacion", status: "aplazado", assignedTecnico: "Carlos" },
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
