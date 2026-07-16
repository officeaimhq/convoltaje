import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Database } from '@/lib/supabase/schema';

type Payment = Database['public']['Tables']['payments']['Row'];
type PaymentInsert = Omit<Payment, 'id' | 'created_at'>;

interface PaymentsState {
  payments: Payment[];
  addPayment: (payment: PaymentInsert) => void;
  confirmPayment: (id: string, reviewerId: string, confirmedScreenshotUrl: string) => void;
  rejectPayment: (id: string, reviewerId: string, notes?: string) => void;
  
  // SPRINT 1: Requerimiento de migración futura
  mockToSupabase: () => Promise<void>;
}

const mockPayments: Payment[] = [
  {
    id: "pay-101",
    created_at: new Date().toISOString(),
    deal_id: "deal-001",
    amount: 2500,
    currency: "MLC",
    payment_method: "transferencia",
    status: "en_revision",
    screenshot_url: "mock_transfer_1.jpg",
    reviewer_id: null,
    confirmed_screenshot_url: null,
    notes: "Abono inicial cliente Juan Pérez"
  }
];

export const usePaymentsStore = create<PaymentsState>()(
  persist(
    (set, get) => ({
      payments: mockPayments,

      addPayment: (payment) => {
        const newPayment: Payment = {
          ...payment,
          id: `pay-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        set((state) => ({ payments: [newPayment, ...state.payments] }));
      },

      confirmPayment: (id, reviewerId, confirmedScreenshotUrl) => {
        set((state) => ({
          payments: state.payments.map((p) => 
            p.id === id ? { ...p, status: 'confirmado', reviewer_id: reviewerId, confirmed_screenshot_url: confirmedScreenshotUrl } : p
          )
        }));
      },

      rejectPayment: (id, reviewerId, notes) => {
        set((state) => ({
          payments: state.payments.map((p) => 
            p.id === id ? { ...p, status: 'rechazado', reviewer_id: reviewerId, notes: notes || p.notes } : p
          )
        }));
      },

      mockToSupabase: async () => {
        console.log("Migrando pagos a Supabase (No implementado aún)");
        // TODO: Mapear `get().payments` a `supabase.from('payments').insert(...)`
      }
    }),
    {
      name: 'convoltaje-payments-store'
    }
  )
);
