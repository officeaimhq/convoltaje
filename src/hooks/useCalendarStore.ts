import { useState, useEffect } from "react";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Formato YYYY-MM-DD
  time?: string; // Formato HH:MM
  description?: string;
  clientName?: string;
  location?: string;
}

const STORAGE_KEY = "convoltaje_calendar_events";

export function useCalendarStore() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Cargar eventos iniciales desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        console.error("Error cargando eventos:", e);
      }
    }
  }, []);

  // Guardar eventos cuando cambian
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
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
