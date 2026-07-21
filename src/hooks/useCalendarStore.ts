import { create } from 'zustand';
import { otService } from '../lib/services/otService';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Formato YYYY-MM-DD
  time?: string; // Formato HH:MM
  description?: string;
  clientName?: string;
  location?: string;
  workType?: 'levantamiento' | 'instalacion' | 'mantenimiento' | 'defectacion';
  assignedTecnico?: string;
  assignedComercial?: string;
  validated?: boolean;
  validatedBy?: string;
  validatedAt?: string;
  status?: 'pendiente' | 'en_curso' | 'completado' | 'aplazado';
  photos?: string[];
  signature?: string;
  paymentInfo?: {
    method: 'efectivo' | 'online';
    amount: number;
    isPartial: boolean;
    reference?: string;
    validatedBy: string;
    needsOnlineValidation?: boolean;
  };
  extraMaterials?: {
    cableMeters?: number;
    breakersCount?: number;
    tubingMeters?: number;
    mc4Pairs?: number;
  };
  newProposedDate?: string;
}

interface CalendarState {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, "id">) => Promise<void>;
  updateEvent: (id: string, updatedEvent: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEventsByDate: (date: string) => CalendarEvent[];
  exportBackup: () => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  events: [],
  isLoading: false,
  error: null,

  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await otService.getOTs();
      set({ events: data, isLoading: false });
    } catch (error: any) {
      console.error("Error cargando eventos desde Supabase:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  addEvent: async (event) => {
    // Optimistic Update
    const tempId = `temp-${Date.now()}`;
    const newEvent = { ...event, id: tempId } as CalendarEvent;
    set((state) => ({ events: [...state.events, newEvent] }));

    try {
      const createdEvent = await otService.createOT(event);
      // Reemplazar el tempId con el ID real devuelto por la BD
      set((state) => ({
        events: state.events.map((e) => (e.id === tempId ? createdEvent : e)),
      }));
    } catch (error) {
      // El servicio ya maneja el fallback offline, no revertimos la UI
      // a menos que queramos mostrar un error. En este caso confiamos en la cola offline.
    }
  },

  updateEvent: async (id, updatedEvent) => {
    // Optimistic Update
    set((state) => ({
      events: state.events.map((ev) => (ev.id === id ? { ...ev, ...updatedEvent } : ev)),
    }));

    try {
      await otService.updateOT(id, updatedEvent as CalendarEvent);
    } catch (error) {
      // Fallback offline manejado en otService
    }
  },

  deleteEvent: async (id) => {
    // Optimistic Update
    set((state) => ({
      events: state.events.filter((ev) => ev.id !== id),
    }));

    try {
      await otService.deleteOT(id);
    } catch (error) {
      // Fallback offline manejado en otService
    }
  },

  getEventsByDate: (date: string) => {
    return get().events.filter((ev) => ev.date === date);
  },

  exportBackup: () => {
    const dataStr = JSON.stringify(get().events, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `convoltaje_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}));
