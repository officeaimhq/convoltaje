import { useMemo } from "react";
import { format, parseISO, isSameDay, isBefore, startOfDay } from "date-fns";
import { useCalendarStore } from "@/hooks/useCalendarStore";
import { useAuthStore } from "@/hooks/useAuthStore";

export interface AssignmentAlert {
  id: string;
  type: "today" | "tomorrow" | "pending";
  title: string;
  clientName: string;
  date: string;
  eventId: string;
}

export function useAssignmentAlerts() {
  const { events } = useCalendarStore();
  const { currentUser } = useAuthStore();

  const alerts = useMemo(() => {
    if (!currentUser) return [];

    const tecnicoName = currentUser.name;
    const today = startOfDay(new Date());
    const tomorrow = startOfDay(new Date(Date.now() + 24 * 60 * 60 * 1000));
    
    const results: AssignmentAlert[] = [];

    events.forEach((event) => {
      // Filtrar eventos asignados a este técnico que no estén completados
      const isAssigned = event.assignedTecnico?.toLowerCase().includes(tecnicoName.toLowerCase());
      if (!isAssigned) return;

      const eventDate = startOfDay(parseISO(event.date));
      const isCompleted = event.status === "completado" || event.validated;

      if (isCompleted) return;

      if (isSameDay(eventDate, today)) {
        results.push({
          id: `alert-today-${event.id}`,
          type: "today",
          title: `¡Tenés una asignación hoy!`,
          clientName: event.clientName || "Cliente Desconocido",
          date: event.date,
          eventId: event.id
        });
      } else if (isSameDay(eventDate, tomorrow)) {
        results.push({
          id: `alert-tomorrow-${event.id}`,
          type: "tomorrow",
          title: `Mañana tenés asignación con`,
          clientName: event.clientName || "Cliente Desconocido",
          date: event.date,
          eventId: event.id
        });
      } else if (isBefore(eventDate, today)) {
        results.push({
          id: `alert-pending-${event.id}`,
          type: "pending",
          title: `Pendiente de validar desde el ${format(eventDate, "dd/MM")}:`,
          clientName: event.clientName || "Cliente Desconocido",
          date: event.date,
          eventId: event.id
        });
      }
    });

    return results;
  }, [events, currentUser]);

  return alerts;
}
