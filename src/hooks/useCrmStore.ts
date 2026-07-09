import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DealStage = 'Contacto' | 'En Producción' | 'Terminado' | 'Facturado' | 'Feedback';

export interface ClientDeal {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  value: number;
  stage: DealStage;
  expectedDate: string;
  source: string;
}

interface CrmState {
  deals: ClientDeal[];
  addDeal: (deal: Omit<ClientDeal, 'id'>) => void;
  updateDeal: (id: string, updates: Partial<ClientDeal>) => void;
  deleteDeal: (id: string) => void;
  moveDeal: (id: string, newStage: DealStage) => void;
}

const mockDeals: ClientDeal[] = [
  { id: "d1", name: "Juan Pérez", company: "Particular", phone: "555-0101", email: "", value: 4500, stage: "Contacto", expectedDate: "2026-07-10", source: "Interesado en financiamiento" },
  { id: "d2", name: "María Gómez", company: "Particular", phone: "555-0102", email: "", value: 1200, stage: "En Producción", expectedDate: "2026-07-05", source: "Esperando entrega" },
  { id: "d3", name: "Carlos López", company: "Particular", phone: "555-0103", email: "", value: 7800, stage: "Terminado", expectedDate: "2026-06-20", source: "Instalación exitosa" },
  { id: "d4", name: "Ana Martínez", company: "Particular", phone: "555-0104", email: "", value: 1500, stage: "Facturado", expectedDate: "2026-06-15", source: "Pago recibido" },
  { id: "d5", name: "Pedro Ramírez", company: "Particular", phone: "555-0105", email: "", value: 2000, stage: "Feedback", expectedDate: "2026-06-01", source: "Cliente muy satisfecho" },
  { id: "d6", name: "Laura Torres", company: "Particular", phone: "555-0106", email: "", value: 2500, stage: "Contacto", expectedDate: "2026-07-09", source: "Requiere visita técnica" },
  { id: "d7", name: "Diego Sánchez", company: "Particular", phone: "555-0107", email: "", value: 800, stage: "En Producción", expectedDate: "2026-07-08", source: "Preparando envío" },
  { id: "d8", name: "Sofía Díaz", company: "Particular", phone: "555-0108", email: "", value: 4500, stage: "Terminado", expectedDate: "2026-06-25", source: "Garantía activada" },
  { id: "d9", name: "Luis Fernández", company: "Particular", phone: "555-0109", email: "", value: 600, stage: "Facturado", expectedDate: "2026-06-10", source: "Pendiente de pago" },
  { id: "d10", name: "Carmen Ruiz", company: "Particular", phone: "555-0110", email: "", value: 7800, stage: "Feedback", expectedDate: "2026-05-20", source: "Solicita mantenimiento preventivo" }
];

export const useCrmStore = create<CrmState>()(
  persist(
    (set) => ({
      deals: mockDeals, // Iniciamos con mock data para ver algo visualmente al inicio
      
      addDeal: (deal) => set((state) => ({
        deals: [...state.deals, { ...deal, id: Date.now().toString() }]
      })),
      
      updateDeal: (id, updates) => set((state) => ({
        deals: state.deals.map(d => d.id === id ? { ...d, ...updates } : d)
      })),
      
      deleteDeal: (id) => set((state) => ({
        deals: state.deals.filter(d => d.id !== id)
      })),
      
      moveDeal: (id, newStage) => set((state) => ({
        deals: state.deals.map(d => d.id === id ? { ...d, stage: newStage } : d)
      }))
    }),
    {
      name: 'convoltaje-crm-storage',
    }
  )
);
