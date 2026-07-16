import { useState, useEffect } from "react";

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

const STORAGE_KEY = "convoltaje_calendar_events_v3";

const defaultEvents: CalendarEvent[] = [
  // 6 de Julio
  { id: "e1", title: "Levantamiento técnico - María Gómez", date: "2026-07-06", time: "09:00", description: "Verificar espacio en tejado para paneles Canadian 450W", clientName: "María Gómez", location: "San José, Mayabeque" },
  { id: "e2", title: "Entrega de Inversor Deye 5kW", date: "2026-07-06", time: "12:00", description: "Entrega del inversor y cuadro de protección DC", clientName: "María Gómez", location: "San José, Mayabeque" },
  { id: "e3", title: "Revisión de cableado y tierras", date: "2026-07-06", time: "15:00", description: "Inspección post-instalación", clientName: "Pedro Ramírez", location: "La Habana" },
  
  // 7 de Julio
  { id: "e4", title: "Instalación Kit Solar 10kW - Carlos López", date: "2026-07-07", time: "09:00", description: "Inicio de montaje de 16 paneles Trina Solar", clientName: "Carlos López", location: "Pinar del Río" },
  { id: "e5", title: "Inspección de Baterías Litio 48V", date: "2026-07-07", time: "13:00", description: "Verificar balance de celdas", clientName: "Ana Martínez", location: "Artemisa" },
  { id: "e6", title: "Firma de contrato de servicios", date: "2026-07-07", time: "16:00", description: "Coordinación final", clientName: "Diego Sánchez", location: "La Habana" },

  // 8 de Julio
  { id: "e7", title: "Montaje de estructura triángulo - Diego Sánchez", date: "2026-07-08", time: "08:30", description: "Fijar estructura triángulo 30° en cubierta plana", clientName: "Diego Sánchez", location: "Mariel, Artemisa" },
  { id: "e8", title: "Diagnóstico MUST Error 03", date: "2026-07-08", time: "11:00", description: "Inversor se apaga por temperatura", clientName: "Juan Pérez", location: "Bejucal, Mayabeque" },
  { id: "e9", title: "Entrega de cables y MC4", date: "2026-07-08", time: "14:00", description: "Llevar rollos de cable 6mm y conectores", clientName: "Luis Fernández", location: "La Habana" },

  // 9 de Julio
  { id: "e10", title: "Levantamiento de sombras - Laura Torres", date: "2026-07-09", time: "09:00", description: "Medición con heliómetro para 6 paneles SunPower", clientName: "Laura Torres", location: "Matanzas" },
  { id: "e11", title: "Instalación de inversor Growatt 3kW", date: "2026-07-09", time: "12:00", description: "Fijación mural y cableado AC", clientName: "Laura Torres", location: "Matanzas" },
  { id: "e12", title: "Mantenimiento preventivo anual", date: "2026-07-09", time: "15:00", description: "Limpieza de disipador y test de baterías", clientName: "Carmen Ruiz", location: "La Habana" },

  // 10 de Julio
  { id: "e13", title: "Obra Kit Solar 6kW - Juan Pérez", date: "2026-07-10", time: "08:00", description: "Anclaje de paneles y tendido de cable solar", clientName: "Juan Pérez", location: "Bejucal, Mayabeque" },
  { id: "e14", title: "Montaje de Baterías Pylontech", date: "2026-07-10", time: "11:30", description: "Conectar cables y configurar parámetros de Bulk/Float", clientName: "Juan Pérez", location: "Bejucal, Mayabeque" },
  { id: "e15", title: "Pruebas de carga y transferencia AC", date: "2026-07-10", time: "14:30", description: "Test de corte de red y arranque de planta", clientName: "Juan Pérez", location: "Bejucal, Mayabeque" },
  { id: "e16", title: "Firma de acta y garantía", date: "2026-07-10", time: "17:00", description: "Entrega oficial de manuales de usuario", clientName: "Juan Pérez", location: "Bejucal, Mayabeque" },

  // 11 de Julio
  { id: "e17", title: "Visita de factibilidad - Elena Vargas", date: "2026-07-11", time: "09:00", description: "Presupuesto para Kit 5kW", clientName: "Elena Vargas", location: "La Habana" },
  { id: "e18", title: "Entrega de propuesta comercial", date: "2026-07-11", time: "11:30", description: "Reunión explicativa sobre amortización solar", clientName: "Roberto Medina", location: "Mayabeque" },
  { id: "e19", title: "Asistencia Técnica - Error 07", date: "2026-07-11", time: "14:00", description: "Reset de sobrecargas de inversor", clientName: "Carlos López", location: "Pinar del Río" },

  // 12 de Julio (HOY) - Datos para probar Módulos Nuevos
  { id: "e20", title: "Entrega de Inversor Deye 5kW", date: "2026-07-12", time: "09:00", description: "Suministro de equipos", clientName: "Roberto Medina", location: "Mayabeque", workType: "instalacion", assignedTecnico: "Yasiel", assignedComercial: "Anabel", status: "pendiente" },
  { id: "e21", title: "Montaje de Estructura Coplanar", date: "2026-07-12", time: "12:30", description: "Montaje de 3 estructuras de aluminio", clientName: "Roberto Medina", location: "Mayabeque", workType: "instalacion", assignedTecnico: "Daniel", assignedComercial: "Isabel", status: "pendiente" },
  { id: "e22", title: "Instalación Kit 6kW - Pago Online", date: "2026-07-12", time: "14:00", description: "Instalación terminada, el cliente pagará online.", clientName: "Luis Felipe", location: "San José", workType: "instalacion", assignedTecnico: "Yasiel", assignedComercial: "Anabel", status: "completado", validated: false, paymentInfo: { method: "online", amount: 2500, isPartial: false, validatedBy: "", needsOnlineValidation: true } },
  { id: "e22b", title: "Mantenimiento Preventivo", date: "2026-07-12", time: "16:00", description: "Limpieza de paneles. Pago online pendiente.", clientName: "Carlos Pérez", location: "Artemisa", workType: "mantenimiento", assignedTecnico: "Daniel", assignedComercial: "Isabel", status: "completado", validated: false, paymentInfo: { method: "online", amount: 150, isPartial: false, validatedBy: "", needsOnlineValidation: true } },
  
  // 13 de Julio
  { id: "e23", title: "Obra Paneles 500W x12 - Patricia Rojas", date: "2026-07-13", time: "08:30", description: "Montar 12 paneles en tejado inclinado", clientName: "Patricia Rojas", location: "San Juan, Pinar del Río", workType: "instalacion", assignedTecnico: "Daniel", assignedComercial: "Isabel", status: "pendiente" },
  { id: "e24", title: "Conexión de strings DC", date: "2026-07-13", time: "12:00", description: "Tendido de cables y ponchado de MC4", clientName: "Patricia Rojas", location: "San Juan, Pinar del Río", workType: "instalacion", assignedTecnico: "Daniel", assignedComercial: "Isabel", status: "pendiente" },
  { id: "e25", title: "Instalación de módulo WiFi", date: "2026-07-13", time: "15:00", description: "Configuración en app móvil", clientName: "Patricia Rojas", location: "San Juan, Pinar del Río", workType: "mantenimiento", assignedTecnico: "Daniel", assignedComercial: "Isabel", status: "pendiente" },

  // 14 de Julio
  { id: "e26", title: "Entrega de Batería Litio - Miguel Castro", date: "2026-07-14", time: "09:00", description: "Transporte y fijación de batería", clientName: "Miguel Castro", location: "Artemisa", workType: "instalacion", assignedTecnico: "Yasiel", assignedComercial: "Anabel", status: "pendiente" },
  { id: "e27", title: "Conexión de comunicaciones CAN", date: "2026-07-14", time: "12:00", description: "Cable RJ45 de datos batería-inversor", clientName: "Miguel Castro", location: "Artemisa", workType: "instalacion", assignedTecnico: "Yasiel", assignedComercial: "Anabel", status: "pendiente" },
  { id: "e28", title: "Pruebas de descarga profunda", date: "2026-07-14", time: "15:00", description: "Validar corte en 44V", clientName: "Miguel Castro", location: "Artemisa", workType: "mantenimiento", assignedTecnico: "Yasiel", assignedComercial: "Anabel", status: "pendiente" }
];

export function useCalendarStore() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Cargar eventos iniciales desde localStorage o usar por defecto
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed);
        } else {
          setEvents(defaultEvents);
        }
      } catch (e) {
        console.error("Error cargando eventos:", e);
        setEvents(defaultEvents);
      }
    } else {
      setEvents(defaultEvents);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
    }
  }, []);

  // Guardar eventos cuando cambian
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  }, [events]);

  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, updatedEvent: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, ...updatedEvent } : ev))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const getEventsByDate = (date: string) => {
    return events.filter((ev) => ev.date === date);
  };

  const exportBackup = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `convoltaje_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importBackup = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            setEvents(parsed);
            resolve();
          } else {
            reject(new Error("Formato de archivo inválido"));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
    exportBackup,
    importBackup,
  };
}
