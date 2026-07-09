import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  format 
} from "date-fns";
import { es } from "date-fns/locale";
import { CalendarEvent } from "@/hooks/useCalendarStore";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export default function MonthView({ currentDate, events, onDayClick, onEventClick }: MonthViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Semana empieza en Lunes
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center text-sm font-semibold text-white/60 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 flex-1 auto-rows-fr">
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());
          const dateKey = format(day, "yyyy-MM-dd");
          const dayEvents = events.filter(e => e.date === dateKey);

          return (
            <div
              key={i}
              onClick={() => onDayClick(day)}
              className={`
                min-h-[100px] p-2 rounded-xl border border-white/5 transition-all cursor-pointer flex flex-col
                ${!isCurrentMonth ? 'bg-white/5 text-white/30' : 'bg-white/10 text-white hover:bg-white/20'}
                ${isToday ? 'ring-2 ring-[#00D9FF] bg-[#00D9FF]/10' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-sm font-medium ${isToday ? 'text-[#00D9FF]' : ''}`}>
                  {format(day, dateFormat)}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-[10px] bg-[#FF6B35] text-white px-1.5 py-0.5 rounded-full">
                    {dayEvents.length}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar flex-1">
                {dayEvents.map(event => (
                  <div 
                    key={event.id}
                    onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                    className="text-xs bg-[#0F3A7D] hover:bg-[#1a4a96] border border-[#00D9FF]/20 text-white px-2 py-1 rounded truncate transition-colors"
                  >
                    {event.time && <span className="text-[#00D9FF] mr-1">{event.time}</span>}
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
