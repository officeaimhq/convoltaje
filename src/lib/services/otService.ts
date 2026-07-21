import { supabase } from '../supabase';
import { offlineService } from './offlineService';
import { CalendarEvent } from '../../hooks/useCalendarStore';
import { makeService } from './makeService';

export const otService = {
  /**
   * Obtiene todas las órdenes de trabajo mapeadas a CalendarEvent
   */
  async getOTs(): Promise<CalendarEvent[]> {
    const { data, error } = await supabase
      .from('ordenes_trabajo')
      .select('*');

    if (error) {
      console.error('Error obteniendo OTs:', error);
      throw error;
    }

    return (data || []).map(mapOTtoEvent);
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
