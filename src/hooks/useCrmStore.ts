import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { crmService } from '@/lib/services/crmService';

export type DealStage = 'Contacto' | 'En Producción' | 'Terminado' | 'Facturado' | 'Feedback';

export interface TechnicalSurvey {
  completedAt: string; // ISO timestamp
  proyectistaName: string;
  roofType: 'Placa de Hormigón' | 'Teja' | 'Zinc/Cinc' | 'Fibrocemento' | 'Estructura Elevada Requerida';
  availableAreaM2: number;
  electricalGrid: '110V Monofásico' | '220V Bifásico' | '220V Trifásico';
  groundingStatus: 'OK - Varilla Existente' | 'Requiere Kit Aterramiento ($350 USD)';
  cableDistanceMeters: number;
  grossKwhPerDay: number;
  safetyKwhPerDay: number;
  peakPowerKw: number;
  recommendedKit: string;
  suggestedFinalPrice: number;
  technicalNotes: string;
  appliancesSummary?: string;
}

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
  otRef?: string; // Número de OT/Referencia que vincula oferta y factura
  salesAgent?: string; // Comercial asignado o elegido por el cliente
  address?: string; // Dirección de instalación
  technicalSurvey?: TechnicalSurvey; // Levantamiento Técnico en Terreno por Samuel
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
          const fetchedDeals = await crmService.fetchDeals();
          const currentDeals = get().deals;
          // Preservar los deals locales que no estén en fetchedDeals
          const localDeals = currentDeals.filter(d => !fetchedDeals.some(fd => fd.id === d.id));
          set({ deals: [...localDeals, ...fetchedDeals] });
        } catch (error) {
          console.error("Error al cargar deals desde Supabase", error);
        }
      },

      addDeal: (deal) => set((state) => ({
        deals: [{ ...deal, id: `deal-${Date.now()}` }, ...state.deals]
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

