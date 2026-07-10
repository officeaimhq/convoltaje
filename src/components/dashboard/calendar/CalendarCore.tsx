import { useState } from "react";
import { format, addMonths, subMonths, addDays, subDays, addWeeks, subWeeks, startOfWeek, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus, Download, Calendar as CalendarIcon, Clock, MapPin, User, FileText } from "lucide-react";
import MonthView from "./MonthView";
import EventModal from "./EventModal";
import { useCalendarStore, CalendarEvent } from "@/hooks/useCalendarStore";

type CalendarViewMode = 'semana' | 'mes' | 'hoy' | 'manana';

export default function CalendarCore() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<CalendarViewMode>('semana');
  const [activeWeekDay, setActiveWeekDay] = useState(new Date()); // Día activo dentro de la vista de semana
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { events, addEvent, updateEvent, deleteEvent, exportBackup } = useCalendarStore();

  const handlePrevious = () => {
    if (viewMode === 'mes') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (viewMode === 'semana') {
      const prevWeek = subWeeks(activeWeekDay, 1);
      setActiveWeekDay(prevWeek);
      setCurrentDate(prevWeek);
    } else if (viewMode === 'hoy' || viewMode === 'manana') {
      const prevDay = subDays(currentDate, 1);
      setCurrentDate(prevDay);
    }
  };

  const handleNext = () => {
    if (viewMode === 'mes') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewMode === 'semana') {
      const nextWeek = addWeeks(activeWeekDay, 1);
      setActiveWeekDay(nextWeek);
      setCurrentDate(nextWeek);
    } else if (viewMode === 'hoy' || viewMode === 'manana') {
      const nextDay = addDays(currentDate, 1);
      setCurrentDate(nextDay);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setActiveWeekDay(today);
  };

  const handleAddClick = () => {
    setSelectedEvent(undefined);
    setSelectedDate(viewMode === 'semana' ? activeWeekDay : currentDate);
    setIsModalOpen(true);
  };

  const handleDayClick = (date: Date) => {
    setSelectedEvent(undefined);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date + "T12:00:00"));
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: any) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    setIsModalOpen(false);
  };

  // Obtener los 7 días de la semana activa
  const getWeekDays = () => {
    const start = startOfWeek(activeWeekDay, { weekStartsOn: 1 }); // Empezar en Lunes
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  };

  const weekDays = getWeekDays();

  // Filtrar eventos para una fecha específica (formato YYYY-MM-DD)
  const getEventsForDate = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    return events.filter(e => e.date === formatted);
  };

  // Renderizar la lista de eventos del día seleccionado
  const renderEventsList = (targetDate: Date) => {
    const dayEvents = getEventsForDate(targetDate);
    
    return (
      <div className="space-y-3 mt-4">
        {dayEvents.length > 0 ? (
          dayEvents.map(event => (
            <button
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="w-full text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col gap-2 group active:scale-[0.99] shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00D9FF] flex items-center gap-1">
                  <Clock size={12} />
                  {event.time || "Todo el día"}
                </span>
                <span className="text-[10px] text-white/30 font-mono">ID: {event.id}</span>
              </div>
              
              <h4 className="text-sm font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                {event.title}
              </h4>
              
              {event.clientName && (
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <User size={12} className="text-white/40" />
                  <span>Cliente: <strong className="text-white/80">{event.clientName}</strong></span>
                </div>
              )}

              {event.location && (
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <MapPin size={12} className="text-white/40" />
                  <span>Lugar: <span className="text-white/80 truncate">{event.location}</span></span>
                </div>
              )}

              {event.description && (
                <p className="text-xs text-white/50 leading-relaxed bg-black/20 rounded-xl p-2.5 border border-white/5 mt-1 font-sans">
                  {event.description}
                </p>
              )}
            </button>
          ))
        ) : (
          <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-white/30 text-xs py-12">
            No hay trabajos agendados para este día.
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      {/* Controles del Cabezal del Calendario */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-0.5">Calendario de Obras</h2>
            <p className="text-white/60 text-xs">Plan de trabajo y logística técnica.</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={exportBackup}
              className="p-2.5 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              title="Backup"
            >
              <Download size={16} />
            </button>
            <button 
              onClick={handleAddClick}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-[#FF6B35] hover:bg-[#e05a2b] rounded-xl text-white transition-all shadow-lg shadow-[#FF6B35]/20"
            >
              <Plus size={14} />
              <span>Nuevo</span>
            </button>
          </div>
        </div>

        {/* Selector de Modos de Vista */}
        <div className="grid grid-cols-4 gap-1 bg-black/25 rounded-2xl p-1 border border-white/5">
          {(['semana', 'mes', 'hoy', 'manana'] as CalendarViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setViewMode(mode);
                if (mode === 'hoy') {
                  setCurrentDate(new Date());
                } else if (mode === 'manana') {
                  setCurrentDate(addDays(new Date(), 1));
                }
              }}
              className={`rounded-xl py-2 text-xs font-bold transition-all capitalize
                ${viewMode === mode 
                  ? 'bg-[#00D9FF] text-[#0b1b33] shadow-md' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
            >
              {mode === 'manana' ? 'Mañana' : mode}
            </button>
          ))}
        </div>

        {/* Navegador de Fecha */}
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
          <button 
            onClick={handlePrevious}
            className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          
          <span className="text-sm font-bold capitalize">
            {viewMode === 'mes' 
              ? format(currentDate, "MMMM yyyy", { locale: es })
              : viewMode === 'semana'
                ? `Semana del ${format(weekDays[0], "d d' de 'MMMM", { locale: es })}`
                : format(viewMode === 'hoy' ? new Date() : viewMode === 'manana' ? addDays(new Date(), 1) : currentDate, "EEEE, d 'de' MMMM", { locale: es })}
          </span>

          <button 
            onClick={handleNext}
            className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Renderizado de Vistas */}
      <div className="space-y-4">
        
        {/* Vista Semanal (Default) */}
        {viewMode === 'semana' && (
          <div className="space-y-4">
            {/* Tiras de días de la semana */}
            <div className="grid grid-cols-7 gap-1 bg-black/10 rounded-2xl p-1 border border-white/5 text-center">
              {weekDays.map((day, idx) => {
                const isActive = isSameDay(activeWeekDay, day);
                const hasEvents = getEventsForDate(day).length > 0;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveWeekDay(day)}
                    className={`rounded-xl py-2 flex flex-col items-center gap-0.5 transition-all
                      ${isActive 
                        ? 'bg-[#00D9FF] text-[#0b1b33] font-bold shadow-md' 
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span className="text-[9px] uppercase font-semibold">
                      {format(day, "eee", { locale: es }).substring(0, 2)}
                    </span>
                    <span className="text-xs font-mono font-bold">{format(day, "d")}</span>
                    {hasEvents && (
                      <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#0b1b33]' : 'bg-[#FF6B35]'}`} />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Lista de eventos para el día seleccionado de la semana */}
            <div>
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">
                Trabajos del {format(activeWeekDay, "EEEE d 'de' MMMM", { locale: es })}
              </h3>
              {renderEventsList(activeWeekDay)}
            </div>
          </div>
        )}

        {/* Vista Mensual */}
        {viewMode === 'mes' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <MonthView 
              currentDate={currentDate} 
              events={events} 
              onDayClick={handleDayClick}
              onEventClick={handleEventClick}
            />
          </div>
        )}

        {/* Vista Hoy */}
        {viewMode === 'hoy' && (
          <div>
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">
              Agenda de Hoy ({format(new Date(), "d 'de' MMMM", { locale: es })})
            </h3>
            {renderEventsList(new Date())}
          </div>
        )}

        {/* Vista Mañana */}
        {viewMode === 'manana' && (
          <div>
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">
              Agenda de Mañana ({format(addDays(new Date(), 1), "d 'de' MMMM", { locale: es })})
            </h3>
            {renderEventsList(addDays(new Date(), 1))}
          </div>
        )}

      </div>

      {/* Modal de edición/adición de evento */}
      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={selectedEvent ? () => { deleteEvent(selectedEvent.id); setIsModalOpen(false); } : undefined}
        initialDate={selectedDate}
        event={selectedEvent}
      />

    </div>
  );
}
