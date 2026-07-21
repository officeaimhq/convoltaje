export type MakeEventType = 
  | 'OT_CREATED'
  | 'OT_UPDATED'
  | 'OT_DELETED'
  | 'DEAL_STAGE_CHANGED'
  | 'PAYMENT_PROCESSED'
  | 'REFUND_REQUESTED';

export interface MakeEventPayload {
  eventType: MakeEventType;
  timestamp: string;
  data: Record<string, any>;
  userId?: string;
}

export const makeService = {
  /**
   * Envía un evento al webhook de Make.com
   * No bloquea la ejecución (fire and forget), pero registra errores si falla.
   */
  notify: async (payload: Omit<MakeEventPayload, 'timestamp'>) => {
    const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.warn('VITE_MAKE_WEBHOOK_URL no está definido. Ignorando notificación a Make.');
      return;
    }

    const fullPayload: MakeEventPayload = {
      ...payload,
      timestamp: new Date().toISOString()
    };

    try {
      // Usamos fetch sin esperar confirmación bloqueante en la UI
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullPayload)
      }).catch(error => {
        console.error('Error enviando notificación a Make:', error);
      });
    } catch (error) {
      console.error('Error al intentar notificar a Make:', error);
    }
  }
};
