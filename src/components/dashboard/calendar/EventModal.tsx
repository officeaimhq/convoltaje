import { useState, useEffect } from "react";
import { format } from "date-fns";
import { X, Calendar, Clock, MapPin, User, FileText, Trash2 } from "lucide-react";
import { CalendarEvent } from "@/hooks/useCalendarStore";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  onDelete?: () => void;
  initialDate?: Date;
  event?: CalendarEvent;
}

export default function EventModal({ isOpen, onClose, onSave, onDelete, initialDate, event }: EventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (event) {
        setTitle(event.title);
        setDate(event.date);
        setTime(event.time || "");
        setClientName(event.clientName || "");
        setLocation(event.location || "");
        setDescription(event.description || "");
      } else if (initialDate) {
        setTitle("");
        setDate(format(initialDate, "yyyy-MM-dd"));
        setTime("09:00");
        setClientName("");
        setLocation("");
        setDescription("");
      }
    }
  }, [isOpen, event, initialDate]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    onSave({ title, date, time, clientName, location, description });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0b1b33] border border-[#00D9FF]/30 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <h3 className="text-xl font-bold text-white">
            {event ? "Editar Cita" : "Nueva Cita"}
          </h3>
          <button onClick={onClose} className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Motivo / Título *</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
              placeholder="Ej: Instalación 6KW, Visita Técnica..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-1"><Calendar size={14} /> Fecha *</label>
              <input 
                type="date" 
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D9FF] transition-colors [color-scheme:dark]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-1"><Clock size={14} /> Hora</label>
              <input 
                type="time" 
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D9FF] transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-1"><User size={14} /> Cliente</label>
            <input 
              type="text" 
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
              placeholder="Nombre del cliente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-1"><MapPin size={14} /> Dirección / Ubicación</label>
            <input 
              type="text" 
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
              placeholder="¿Dónde es el trabajo?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-1"><FileText size={14} /> Notas</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D9FF] transition-colors h-24 resize-none"
              placeholder="Materiales necesarios, teléfonos, detalles..."
            />
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            {onDelete ? (
              <button 
                type="button" 
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 size={16} /> Eliminar
              </button>
            ) : (
              <div></div>
            )}
            
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 text-sm font-bold bg-[#00D9FF] hover:bg-[#00b8d9] text-[#0b1b33] rounded-lg transition-all shadow-lg shadow-[#00D9FF]/20"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
