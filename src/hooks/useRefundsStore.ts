import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Database } from '@/lib/supabase/schema';

type Refund = Database['public']['Tables']['refunds']['Row'];
type RefundInsert = Omit<Refund, 'id' | 'created_at'>;

interface RefundsState {
  refunds: Refund[];
  addRefund: (refund: RefundInsert) => void;
  processRefund: (id: string, materialDecisionBy: string) => void;
  
  // Mapeo a Supabase
  mockToSupabase: () => Promise<void>;
}

const mockRefunds: Refund[] = [
  {
    id: "ref-101",
    created_at: new Date().toISOString(),
    payment_id: "pay-101",
    deal_id: "deal-001",
    requested_by: "Comercial",
    amount_to_refund: 500,
    status: "pendiente",
    material_status_decision: "revision_tecnica",
    material_decided_by: null
  }
];

export const useRefundsStore = create<RefundsState>()(
  persist(
    (set, get) => ({
      refunds: mockRefunds,

      addRefund: (refund) => {
        const newRefund: Refund = {
          ...refund,
          id: `ref-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        set((state) => ({ refunds: [newRefund, ...state.refunds] }));
      },

      processRefund: (id, materialDecisionBy) => {
        set((state) => ({
          refunds: state.refunds.map((r) => 
            r.id === id ? { ...r, status: 'procesado', material_decided_by: materialDecisionBy } : r
          )
        }));
      },

      mockToSupabase: async () => {
        console.log("Migrando reintegros a Supabase (No implementado aún)");
        // TODO: Migrar a Supabase
      }
    }),
    {
      name: 'convoltaje-refunds-store'
    }
  )
);
