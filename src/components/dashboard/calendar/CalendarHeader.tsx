import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus, Download } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onAdd: () => void;
  onExport: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPrev,
  onNext,
  onToday,
  onAdd,
  onExport,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-white/10 bg-black/20">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <h2 className="text-2xl font-bold text-white capitalize">
          {format(currentDate, "MMMM yyyy", { locale: es })}
        </h2>
        <div className="flex bg-white/10 rounded-lg p-1">
          <button 
            onClick={onPrev}
            className="p-1 hover:bg-white/20 rounded text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onToday}
            className="px-3 py-1 text-sm font-medium hover:bg-white/20 rounded text-white transition-colors"
          >
            Hoy
          </button>
          <button 
            onClick={onNext}
            className="p-1 hover:bg-white/20 rounded text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white transition-all"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Backup</span>
        </button>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#FF6B35] hover:bg-[#e05a2b] rounded-lg text-white transition-all shadow-lg shadow-[#FF6B35]/20"
        >
          <Plus size={18} />
          Nuevo Evento
        </button>
      </div>
    </div>
  );
}
