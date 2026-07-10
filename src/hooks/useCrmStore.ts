import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  addDeal: (deal: Omit<ClientDeal, 'id'>) => void;
  updateDeal: (id: string, updates: Partial<ClientDeal>) => void;
  deleteDeal: (id: string) => void;
  moveDeal: (id: string, newStage: DealStage) => void;
}

const mockDeals: ClientDeal[] = [
  { id: "d1", name: "Juan Pérez", company: "Kit Solar 6kW", phone: "555-0101", email: "", value: 4500, stage: "Contacto", expectedDate: "2026-07-10", source: "Interesado en financiamiento" },
  { id: "d2", name: "María Gómez", company: "Inversor Híbrido 5kW", phone: "555-0102", email: "", value: 1200, stage: "En Producción", expectedDate: "2026-07-05", source: "Esperando entrega" },
  { id: "d3", name: "Carlos López", company: "Kit Solar 10kW", phone: "555-0103", email: "", value: 7800, stage: "Terminado", expectedDate: "2026-06-20", source: "Instalación exitosa" },
  { id: "d4", name: "Ana Martínez", company: "Batería Litio 48V", phone: "555-0104", email: "", value: 1500, stage: "Facturado", expectedDate: "2026-06-15", source: "Pago recibido" },
  { id: "d5", name: "Pedro Ramírez", company: "Paneles Solares 500W x10", phone: "555-0105", email: "", value: 2000, stage: "Feedback", expectedDate: "2026-06-01", source: "Cliente muy satisfecho" },
  { id: "d6", name: "Laura Torres", company: "Kit Solar 3kW", phone: "555-0106", email: "", value: 2500, stage: "Contacto", expectedDate: "2026-07-09", source: "Requiere visita técnica" },
  { id: "d7", name: "Diego Sánchez", company: "Inversor Off-Grid 3kW", phone: "555-0107", email: "", value: 800, stage: "En Producción", expectedDate: "2026-07-08", source: "Preparando envío" },
  { id: "d8", name: "Sofía Díaz", company: "Kit Solar 6kW", phone: "555-0108", email: "", value: 4500, stage: "Terminado", expectedDate: "2026-06-25", source: "Garantía activada" },
  { id: "d9", name: "Luis Fernández", company: "Estructura Montaje x20", phone: "555-0109", email: "", value: 600, stage: "Facturado", expectedDate: "2026-06-10", source: "Pendiente de pago" },
  { id: "d10", name: "Carmen Ruiz", company: "Kit Solar 10kW", phone: "555-0110", email: "", value: 7800, stage: "Feedback", expectedDate: "2026-05-20", source: "Solicita mantenimiento preventivo" },
  { id: "d11", name: "Elena Vargas", company: "Kit Solar 5kW", phone: "555-0111", email: "", value: 3800, stage: "Contacto", expectedDate: "2026-07-11", source: "Pide presupuesto detallado" },
  { id: "d12", name: "Roberto Medina", company: "Inversor Híbrido 5kW", phone: "555-0112", email: "", value: 1200, stage: "En Producción", expectedDate: "2026-07-12", source: "Materiales en camino" },
  { id: "d13", name: "Patricia Rojas", company: "Paneles Solares 500W x12", phone: "555-0113", email: "", value: 2400, stage: "Terminado", expectedDate: "2026-07-13", source: "Instalación sin problemas" },
  { id: "d14", name: "Miguel Castro", company: "Batería Litio 48V", phone: "555-0114", email: "", value: 1500, stage: "Facturado", expectedDate: "2026-07-14", source: "Pago confirmado" },
  { id: "d15", name: "Lucía Herrera", company: "Kit Solar 10kW", phone: "555-0115", email: "", value: 7800, stage: "Feedback", expectedDate: "2026-07-15", source: "Recomienda el servicio" },
  { id: "d16", name: "Javier Navarro", company: "Estructura Montaje x15", phone: "555-0116", email: "", value: 450, stage: "Contacto", expectedDate: "2026-07-16", source: "Duda sobre permisos" },
  { id: "d17", name: "Rosa Silva", company: "Inversor Off-Grid 5kW", phone: "555-0117", email: "", value: 1300, stage: "En Producción", expectedDate: "2026-07-17", source: "Programando instalación" },
  { id: "d18", name: "Alejandro Ortiz", company: "Kit Solar 3kW", phone: "555-0118", email: "", value: 2500, stage: "Terminado", expectedDate: "2026-07-18", source: "Todo correcto" },
  { id: "d19", name: "Marta Domínguez", company: "Kit Solar 6kW", phone: "555-0119", email: "", value: 4500, stage: "Facturado", expectedDate: "2026-07-19", source: "Factura enviada" },
  { id: "d20", name: "Fernando Morales", company: "Paneles Solares 450W x20", phone: "555-0120", email: "", value: 3600, stage: "Feedback", expectedDate: "2026-07-20", source: "Encuesta completada" },
  { id: "d21", name: "Clara Jiménez", company: "Batería Gel 12V x4", phone: "555-0121", email: "", value: 800, stage: "Contacto", expectedDate: "2026-07-21", source: "Interés en baterías extra" },
  { id: "d22", name: "Andrés Reyes", company: "Kit Solar 15kW", phone: "555-0122", email: "", value: 11500, stage: "En Producción", expectedDate: "2026-07-22", source: "Revisión técnica pendiente" },
  { id: "d23", name: "Isabel Cruz", company: "Inversor Híbrido 8kW", phone: "555-0123", email: "", value: 1800, stage: "Terminado", expectedDate: "2026-07-23", source: "Cliente satisfecho" },
  { id: "d24", name: "Ricardo Mendoza", company: "Kit Solar 5kW", phone: "555-0124", email: "", value: 3800, stage: "Facturado", expectedDate: "2026-07-24", source: "Esperando transferencia" },
  { id: "d25", name: "Paula Flores", company: "Estructura Montaje x10", phone: "555-0125", email: "", value: 300, stage: "Feedback", expectedDate: "2026-07-25", source: "Sugerencia de mejora" },
  { id: "d26", name: "Gabriel Aguilar", company: "Kit Solar 8kW", phone: "555-0126", email: "", value: 6200, stage: "Contacto", expectedDate: "2026-07-26", source: "Consulta de financiamiento" },
  { id: "d27", name: "Valeria Castillo", company: "Paneles Solares 500W x8", phone: "555-0127", email: "", value: 1600, stage: "En Producción", expectedDate: "2026-07-27", source: "Preparando componentes" },
  { id: "d28", name: "Hugo Romero", company: "Batería Litio 48V", phone: "555-0128", email: "", value: 1500, stage: "Terminado", expectedDate: "2026-07-28", source: "Proyecto cerrado" },
  { id: "d29", name: "Daniela Paredes", company: "Kit Solar 3kW", phone: "555-0129", email: "", value: 2500, stage: "Facturado", expectedDate: "2026-07-29", source: "Pago fraccionado" },
  { id: "d30", name: "Sergio Guzmán", company: "Inversor Off-Grid 3kW", phone: "555-0130", email: "", value: 800, stage: "Feedback", expectedDate: "2026-07-30", source: "Muy contento con el equipo" }
];

export const useCrmStore = create<CrmState>()(
  persist(
    (set) => ({
      deals: mockDeals,
      
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
