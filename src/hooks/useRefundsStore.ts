import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RefundStatus = 'pendiente' | 'aprobado' | 'rechazado' | 'procesado';
export type MaterialStatus = 'disponible' | 'merma' | 'revision_tecnica';

export interface Refund {
  id: string;
  created_at: string;
  payment_id: string;
  deal_id: string;
  requested_by: string;
  amount_to_refund: number;
  status: RefundStatus;
  material_status_decision: MaterialStatus;
  material_decided_by: string | null;
  client_name?: string;
  phone?: string;
  system_type?: string;
  resolution_notes?: string;
  resolved_at?: string;
}

export type RefundInsert = Omit<Refund, 'id' | 'created_at'>;

interface RefundsState {
  refunds: Refund[];
  addRefund: (refund: RefundInsert) => void;
  approveRefund: (id: string, decidedBy: string, finalMaterialStatus: MaterialStatus, notes?: string) => void;
  rejectRefund: (id: string, decidedBy: string, reason: string) => void;
  processRefund: (id: string, materialDecisionBy: string) => void;
  
  // Mapeo a Supabase
  mockToSupabase: () => Promise<void>;
}

const mockRefunds: Refund[] = [
  {
    id: "ref-101",
    created_at: "2026-07-20T14:30:00Z",
    payment_id: "pay-101",
    deal_id: "deal-001",
    requested_by: "Niurki (Comercial Habana)",
    client_name: "Juan Pérez",
    phone: "+5352849102",
    system_type: "Sistema Básico 3kW",
    amount_to_refund: 500,
    status: "pendiente",
    material_status_decision: "revision_tecnica",
    material_decided_by: null,
    resolution_notes: "Cliente solicitó devolución parcial por cambio de especificación."
  },
  {
    id: "ref-102",
    created_at: "2026-07-18T10:15:00Z",
    payment_id: "pay-102",
    deal_id: "deal-002",
    requested_by: "Diana (Comercial Matanzas)",
    client_name: "María Gómez",
    phone: "+5353910293",
    system_type: "Panel Solar Jinko 550W (x2)",
    amount_to_refund: 440,
    status: "aprobado",
    material_status_decision: "disponible",
    material_decided_by: "Angel (CEO)",
    resolution_notes: "Equipos devueltos en sellado original. Reincorporados al inventario de Matanzas.",
    resolved_at: "2026-07-19T09:00:00Z"
  },
  {
    id: "ref-103",
    created_at: "2026-07-15T16:00:00Z",
    payment_id: "pay-103",
    deal_id: "deal-003",
    requested_by: "Railyn (Comercial Artemisa)",
    client_name: "Carlos López",
    phone: "+5354112233",
    system_type: "Cableado y Protecciones AC",
    amount_to_refund: 120,
    status: "aprobado",
    material_status_decision: "merma",
    material_decided_by: "Yasiel (Dir. Técnico)",
    resolution_notes: "Cable cortado a medida durante instalación previa. Registrado como merma de obra.",
    resolved_at: "2026-07-16T11:20:00Z"
  },
  {
    id: "ref-104",
    created_at: "2026-07-12T11:00:00Z",
    payment_id: "pay-104",
    deal_id: "deal-004",
    requested_by: "Niurki (Comercial Habana)",
    client_name: "Héctor Valdés",
    phone: "+5355667788",
    system_type: "Sistema 6K PLUS",
    amount_to_refund: 1500,
    status: "rechazado",
    material_status_decision: "revision_tecnica",
    material_decided_by: "Angel (CEO)",
    resolution_notes: "Rechazado: El equipo fue instalado y operó más de 30 días sin reporte de avería.",
    resolved_at: "2026-07-13T15:00:00Z"
  }
];

export const useRefundsStore = create<RefundsState>()(
  persist(
    (set) => ({
      refunds: mockRefunds,

      addRefund: (refund) => {
        const newRefund: Refund = {
          ...refund,
          id: `ref-${Date.now()}`,
          created_at: new Date().toISOString(),
          status: 'pendiente',
        };
        set((state) => ({ refunds: [newRefund, ...state.refunds] }));
      },

      approveRefund: (id, decidedBy, finalMaterialStatus, notes) => {
        set((state) => ({
          refunds: state.refunds.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status: 'aprobado',
                  material_status_decision: finalMaterialStatus,
                  material_decided_by: decidedBy,
                  resolution_notes: notes || r.resolution_notes,
                  resolved_at: new Date().toISOString(),
                }
              : r
          ),
        }));
      },

      rejectRefund: (id, decidedBy, reason) => {
        set((state) => ({
          refunds: state.refunds.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status: 'rechazado',
                  material_decided_by: decidedBy,
                  resolution_notes: reason,
                  resolved_at: new Date().toISOString(),
                }
              : r
          ),
        }));
      },

      processRefund: (id, materialDecisionBy) => {
        set((state) => ({
          refunds: state.refunds.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status: 'procesado',
                  material_decided_by: materialDecisionBy,
                  resolved_at: new Date().toISOString(),
                }
              : r
          ),
        }));
      },

      mockToSupabase: async () => {
        console.log("Migrando reintegros a Supabase (No implementado aún)");
      },
    }),
    {
      name: 'convoltaje-refunds-store',
    }
  )
);

