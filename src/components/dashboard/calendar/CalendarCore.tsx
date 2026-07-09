import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import CalendarHeader from "./CalendarHeader";
import MonthView from "./MonthView";
import EventModal from "./EventModal";
import { useCalendarStore, CalendarEvent } from "@/hooks/useCalendarStore";

export default function CalendarCore() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { events, addEvent, updateEvent, deleteEvent, exportBackup } = useCalendarStore();

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleAddClick = () => {
    setSelectedEvent(undefined);
    setSelectedDate(new Date());
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

  return (
    <div className="w-full flex flex-col h-full bg-[#0d233a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-20">
      <CalendarHeader 
        currentDate={currentDate} 
        onPrev={handlePreviousMonth} 
        onNext={handleNextMonth} 
        onToday={handleToday}
        onAdd={handleAddClick}
        onExport={exportBackup}
      />
      
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <MonthView 
          currentDate={currentDate} 
          events={events} 
          onDayClick={handleDayClick}
          onEventClick={handleEventClick}
        />
      </div>

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
