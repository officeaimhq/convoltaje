import { useAssignmentAlerts } from "@/hooks/useAssignmentAlerts";
import { useCalendarStore } from "@/hooks/useCalendarStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Phone, MapPin, Calendar, ArrowRight, Bell, AlertTriangle } from "lucide-react";
import { AdminView } from "./Sidebar";
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";

interface AsignacionesViewProps {
  onSelectView: (view: AdminView) => void;
  onSelectEventForValidation?: (eventId: string) => void;
}

export default function AsignacionesView({ onSelectView, onSelectEventForValidation }: AsignacionesViewProps) {
  const alerts = useAssignmentAlerts();
  const { events } = useCalendarStore();
  const { currentUser } = useAuthStore();

  if (!currentUser) return null;

  // Filtrar todos los eventos de trabajo pendientes asignados al técnico
  const myAssignedJobs = events.filter((e) => {
    const isAssigned = e.assignedTecnico?.toLowerCase().includes(currentUser.name.toLowerCase());
    const isPending = e.status !== "completado" && !e.validated;
    return isAssigned && isPending;
  });

  const getWorkTypeBadgeColor = (type?: string) => {
    switch (type) {
      case "levantamiento":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "mantenimiento":
        return "bg-cyan-500/20 text-[#00D9FF] border-[#00D9FF]/30";
      case "defectacion":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    }
  };

  const formatEventDate = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      return format(date, "EEEE dd 'de' MMMM", { locale: es });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full flex flex-col font-sans text-white pb-8">
      
      {/* Cabecera / Sección de Alertas */}
      {alerts.length > 0 && (
        <div className="flex flex-col gap-2.5 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-1">
            <Bell size={14} className="animate-bounce" />
            <span>Alertas del Sistema ({alerts.length})</span>
          </div>
          
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3.5 rounded-2xl border flex items-start gap-3 backdrop-blur-md transition-all
                ${alert.type === "today" 
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-200" 
                  : alert.type === "pending" 
                  ? "bg-red-500/10 border-red-500/20 text-red-200"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-200"
                }`}
            >
              <AlertTriangle className="flex-shrink-0 mt-0.5" size={16} />
              <div className="flex-1 text-xs">
                <span className="font-semibold block mb-0.5">{alert.title}</span>
                <span className="font-bold">{alert.clientName}</span> ({alert.date})
              </div>
              {onSelectEventForValidation && (
                <button
                  onClick={() => onSelectEventForValidation(alert.eventId)}
                  className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-white/10 hover:bg-white/20 transition-all uppercase self-center"
                >
                  <span>Validar</span>
                  <ArrowRight size={10} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Título de la sección principal */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Mis Trabajos Asignados</h2>
        <p className="text-white/60 text-xs">Listado de obras, levantamientos y asistencias pendientes.</p>
      </div>

      {/* Lista de Trabajos */}
      {myAssignedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-center">
          <Calendar size={32} className="mb-2 text-white/20" />
          <span className="text-xs font-semibold">No tienes trabajos asignados pendientes</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {myAssignedJobs.map((job) => (
            <div key={job.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden flex flex-col gap-3">
              {/* Top Row / Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-white/50">
                  {job.time || "Sin hora especificada"}
                </span>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${getWorkTypeBadgeColor(job.workType)}`}>
                  {job.workType || "instalación"}
                </span>
              </div>

              {/* Client Info */}
              <div>
                <h3 className="text-sm font-bold text-white mb-0.5">{job.clientName || "Cliente sin nombre"}</h3>
                <p className="text-xs text-[#00D9FF] font-medium mb-2">{job.title}</p>
                <div className="flex flex-col gap-1.5 text-xs text-white/70">
                  <div className="flex items-start gap-1.5">
                    <MapPin size={13} className="text-white/40 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight text-[11px]">{job.location || "Sin dirección"}</span>
                  </div>
                  {job.description && (
                    <p className="text-[11px] text-white/50 italic pl-5 mt-1 border-l border-white/10">
                      "{job.description}"
                    </p>
                  )}
                </div>
              </div>

              {/* Footer / Action Buttons */}
              <div className="flex items-center gap-2 mt-2 pt-3 border-t border-white/5">
                {/* Botón de llamada al cliente */}
                <a
                  href={`tel:${job.description?.match(/\+53\d+/)?.[0] || ""}`}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 transition-colors"
                >
                  <Phone size={14} />
                </a>

                {/* Botón de Validar Cierre */}
                {onSelectEventForValidation && (
                  <button
                    onClick={() => onSelectEventForValidation(job.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-[#00D9FF] hover:bg-[#00c5e6] text-[#0b1b33] text-xs font-bold transition-all"
                  >
                    <span>Validar Trabajo</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
