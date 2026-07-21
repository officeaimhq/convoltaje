import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { crmService } from '@/lib/services/crmService';

export type DealStage = 'Contacto' | 'En Producción' | 'Terminado' | 'Facturado' | 'Feedback';

export interface ClientDeal {
  id: string;
  name: string;
  company: string; // Tipo de Proyecto (ej. 'Kit Solar 6kW')
  phone: string;
  email: string;
  value: number;
  stage: DealStage;
  expectedDate: string; // Fecha de inicio
  source: string; // Notas adicionales
}

interface CrmState {
  deals: ClientDeal[];
  fetchDeals: () => Promise<void>;
  addDeal: (deal: Omit<ClientDeal, 'id'>) => void;
  updateDeal: (id: string, updates: Partial<ClientDeal>) => void;
  deleteDeal: (id: string) => void;
  moveDeal: (id: string, newStage: DealStage) => Promise<void>;
}

export const useCrmStore = create<CrmState>()(
  persist(
    (set, get) => ({
      deals: [],
      
      fetchDeals: async () => {
        try {
          const deals = await crmService.fetchDeals();
          set({ deals });
        } catch (error) {
          console.error("Error al cargar deals desde Supabase", error);
        }
      },

      addDeal: (deal) => set((state) => ({
        deals: [...state.deals, { ...deal, id: Date.now().toString() }] // TODO: Implementar addDeal en backend si se requiere
      })),
      
      updateDeal: (id, updates) => set((state) => ({
        deals: state.deals.map(d => d.id === id ? { ...d, ...updates } : d)
      })),
      
      deleteDeal: (id) => set((state) => ({
        deals: state.deals.filter(d => d.id !== id)
      })),
      
      moveDeal: async (id, newStage) => {
        // Optimistic update
        set((state) => ({
          deals: state.deals.map(d => d.id === id ? { ...d, stage: newStage } : d)
        }));

        try {
          await crmService.updateDealStage(id, newStage);
        } catch (error) {
          // El rollback o reintento se manejará o guardará en salvas_offline
        }
      }
    }),
    {
      name: 'convoltaje-crm-storage',
    }
  )
);

