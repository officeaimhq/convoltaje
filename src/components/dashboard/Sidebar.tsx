import { Calendar, LayoutDashboard, Package, PieChart, Users, Menu, X } from "lucide-react";
import { useState } from "react";

export type AdminView = 'inicio' | 'calendario' | 'pipeline' | 'almacen' | 'finanzas';

interface SidebarProps {
  currentView: AdminView;
  onChangeView: (view: AdminView) => void;
}

export default function Sidebar({ currentView, onChangeView }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: <LayoutDashboard size={20} /> },
    { id: 'pipeline', label: 'Pipeline CRM', icon: <Users size={20} /> },
    { id: 'calendario', label: 'Calendario', icon: <Calendar size={20} /> },
    { id: 'almacen', label: 'Almacén', icon: <Package size={20} /> },
    { id: 'finanzas', label: 'Finanzas', icon: <PieChart size={20} /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-[#00D9FF] text-[#0b1b33] p-3 rounded-full shadow-lg shadow-[#00D9FF]/20"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 
        w-64 bg-[#0d233a]/90 backdrop-blur-xl border-r border-white/10 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <img 
            src="/images/Logo-admin.png" 
            alt="Logo Admin" 
            className="w-10 h-10 object-contain [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
            style={{ mixBlendMode: 'screen' }}
          />
          <div>
            <h1 className="font-bold text-white tracking-wide">Convoltaje</h1>
            <p className="text-[10px] text-[#00D9FF] uppercase tracking-wider font-semibold">Workspace</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id as AdminView);
                  setIsOpen(false);
                }}
                className={`
                  flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all font-medium text-sm
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#00D9FF]/20 to-transparent text-[#00D9FF] border-l-2 border-[#00D9FF]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                  }
                `}
              >
                <div className={`${isActive ? 'text-[#00D9FF]' : 'text-white/40'}`}>
                  {item.icon}
                </div>
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
