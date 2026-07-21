import { supabase } from '../supabase';

export interface OfflinePayload {
  action: 'CREATE_OT' | 'UPDATE_OT' | 'DELETE_OT' | 'MOVE_DEAL' | 'UPDATE_DEAL';
  table: string;
  recordId?: string;
  payload: any;
  timestamp: string;
}

export const offlineService = {
  /**
   * Guarda una acción en la tabla salvas_offline cuando falla la red.
   */
  async saveOfflineAction(userId: string | null, data: OfflinePayload) {
    console.log('Guardando acción offline:', data);
    
    // Si no tenemos ID de usuario, intentamos sacar uno por defecto o nulo
    // En la tabla salvas_offline 'usuario_id' es UUID
    
    // Guardamos en localstorage también como backup de seguridad extrema
    const localQueue = JSON.parse(localStorage.getItem('convoltaje_offline_queue') || '[]');
    localQueue.push(data);
    localStorage.setItem('convoltaje_offline_queue', JSON.stringify(localQueue));

    // Intentamos mandarlo a Supabase si hay algo de red (a veces falla la API principal pero esto entra)
    // O más bien, esto falla si no hay red, así que capturamos el error silenciosamente
    try {
      await supabase.from('salvas_offline').insert({
        // Si no hay userId válido UUID, dejamos null si lo permite, sino generamos o ignoramos
        usuario_id: userId && userId.length === 36 ? userId : null,
        datos_json: data,
        fecha_salva: new Date().toISOString(),
        sincronizada: false
      });
    } catch (e) {
      console.warn('No se pudo guardar la salva offline en Supabase (sin red). Guardado en localStorage.', e);
    }
  },

  /**
   * Intenta vaciar la cola offline cuando vuelve la red.
   */
  async syncOfflineQueue() {
    const localQueue: OfflinePayload[] = JSON.parse(localStorage.getItem('convoltaje_offline_queue') || '[]');
    if (localQueue.length === 0) return;

    console.log(`Intentando sincronizar ${localQueue.length} acciones offline...`);
    const remainingQueue = [];

    for (const item of localQueue) {
      try {
        if (item.action === 'CREATE_OT') {
          await supabase.from(item.table).insert(item.payload);
        } else if (item.action === 'UPDATE_OT' || item.action === 'UPDATE_DEAL' || item.action === 'MOVE_DEAL') {
          await supabase.from(item.table).update(item.payload).eq('id', item.recordId);
        } else if (item.action === 'DELETE_OT') {
          await supabase.from(item.table).delete().eq('id', item.recordId);
        }
      } catch (e) {
        console.error('Error sincronizando item:', item, e);
        remainingQueue.push(item); // Vuelve a la cola si falla
      }
    }

    localStorage.setItem('convoltaje_offline_queue', JSON.stringify(remainingQueue));
    if (remainingQueue.length === 0) {
      console.log('Sincronización offline completada con éxito.');
    }
  }
};

// Listener global de conexión
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Conexión restaurada, ejecutando syncOfflineQueue...');
    offlineService.syncOfflineQueue();
  });
}
