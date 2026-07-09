import { useState } from "react";
import { LogOut } from "lucide-react";
import { useLocation } from "wouter";
import CalendarCore from "./calendar/CalendarCore";
import Sidebar, { AdminView } from "./Sidebar";
import OperationsPipeline from "./crm/OperationsPipeline";
import InventoryMain from "./inventory/InventoryMain";
import DashboardWelcome from "./DashboardWelcome";

export default function DashboardPanel() {
  const [, setLocation] = useLocation();
  const [currentView, setCurrentView] = useState<AdminView>('inicio');

  const handleLogout = () => {
    setLocation("/");
  };

  const renderContent = () => {
    switch (currentView) {
      case 'inicio':
        return <DashboardWelcome />;
      case 'calendario':
        return <CalendarCore />;
      case 'pipeline':
        return <OperationsPipeline />;
      case 'almacen':
        return <InventoryMain />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-white/50">
            <h2 className="text-2xl font-bold mb-2 text-white/80">Vista en Construcción</h2>
            <p>El módulo de {currentView} estará disponible pronto.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-[#0d233a] relative overflow-hidden flex font-sans">
      {/* Fondo de tuercas/herramientas (placeholder visual) */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l1.43 1.43-26.686 26.687-1.43-1.43L54.627 0zm-49.254 0L32.06 26.686l-1.43 1.43L3.943 1.43 5.373 0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Sidebar Layout */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden h-screen">
        
        {/* Cabecera Superior Minimalista */}
        <div className="flex items-center justify-end p-4 border-b border-white/5 bg-[#0d233a]/50 backdrop-blur-md">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Salir del Panel</span>
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>
      </div>

    </div>
  );
}
