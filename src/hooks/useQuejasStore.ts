import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type QuejaPriority = 'incendio' | 'instalacion_incompleta' | 'mal_funcionamiento' | 'atencion_inadecuada';

export interface Complaint {
  id: string;
  clientName: string;
  phone: string;
  location: string;
  provincia: string;
  systemType: string;
  installationDate: string; // YYYY-MM-DD
  warrantyMonths: number;
  symptom: string;
  status: "diagnostico" | "visita" | "dictamen" | "resolucion" | "resuelta" | "rechazada";
  assignedTech?: string;
  errorMust?: string;
  priority_category: QuejaPriority;
  checklist: {
    id: string;
    label: string;
    completed: boolean;
  }[];
  isEcoFlow?: boolean;
}

interface QuejasState {
  complaints: Complaint[];
  addComplaint: (complaint: Complaint) => void;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
  deleteComplaint: (id: string) => void;
  toggleChecklistItem: (complaintId: string, checkId: string) => void;
  
  // STRATEGY FOR SPRINT 1 MIGRATION
  mockToSupabase: () => Promise<void>;
}

export const useQuejasStore = create<QuejasState>()(
  persist(
    (set, get) => ({
      complaints: [], // default complaints will be seeded if empty, handled in component for now
      addComplaint: (complaint) => set((state) => ({ complaints: [complaint, ...state.complaints] })),
      updateComplaint: (id, updates) => set((state) => ({
        complaints: state.complaints.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      deleteComplaint: (id) => set((state) => ({
        complaints: state.complaints.filter(c => c.id !== id)
      })),
      toggleChecklistItem: (complaintId, checkId) => set((state) => {
        return {
          complaints: state.complaints.map(c => {
            if (c.id === complaintId) {
              const updatedChecklist = c.checklist.map(item => 
                item.id === checkId ? { ...item, completed: !item.completed } : item
              );
              
              // Auto-update status
              let newStatus = c.status;
              const index = updatedChecklist.findIndex(item => item.id === checkId);
              if (index === 1 && updatedChecklist[1].completed) newStatus = "visita";
              else if (index === 2 && updatedChecklist[2].completed) newStatus = "dictamen";
              else if (index === 3 && updatedChecklist[3].completed) newStatus = "resolucion";
              else if (index === 5 && updatedChecklist[5].completed) newStatus = "resuelta";

              return { ...c, status: newStatus, checklist: updatedChecklist };
            }
            return c;
          })
        };
      }),

      mockToSupabase: async () => {
        console.log("Migrating Quejas to Supabase 'complaints' table...");
        // TODO: Implement actual Supabase insert using the schema
      }
    }),
    {
      name: 'convoltaje_quejas_store',
    }
  )
);
