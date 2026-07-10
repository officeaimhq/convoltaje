import { useState, useEffect } from "react";
import { LogOut, ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import CalendarCore from "./calendar/CalendarCore";
import OperationsPipeline from "./crm/OperationsPipeline";
import InventoryMain from "./inventory/InventoryMain";
import MobileHomeGrid from "./MobileHomeGrid";
import SalesTemplates from "./crm/SalesTemplates";
import TroubleshootingGuide from "./tech/TroubleshootingGuide";
import CrmCalculator from "./crm/CrmCalculator";
import ManualsLibrary from "./tech/ManualsLibrary";
import { useAuthStore } from "@/hooks/useAuthStore";
import { AdminView } from "./Sidebar";

export default function DashboardPanel() {
  const [, setLocation] = useLocation();
  const { currentUser, logout } = useAuthStore();
  const [currentView, setCurrentView] = useState<AdminView>('inicio');

  // Redireccionar al login si no hay usuario
  useEffect(() => {
    if (!currentUser) {
      setLocation("/admin/login");
    }
  }, [currentUser, setLocation]);

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  const renderContent = () => {
    switch (currentView) {
      case 'inicio':
        return <MobileHomeGrid onSelectView={setCurrentView} />;
      case 'calendario':
        return <CalendarCore />;
      case 'pipeline':
        return <OperationsPipeline />;
      case 'almacen':
        return <InventoryMain />;
      case 'plantillas':
        return <SalesTemplates />;
      case 'errores':
        return <TroubleshootingGuide />;
      case 'calculadora':
        return <CrmCalculator />;
      case 'manuales':
        return <ManualsLibrary />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-white/50 py-12">
            <h2 className="text-xl font-bold mb-2 text-white/80">Módulo en Construcción</h2>
            <p className="text-sm">La sección de "{currentView}" estará disponible pronto.</p>
          </div>
        );
    }
  };

  if (!currentUser) return null;

  return (
    <div className="h-screen w-full bg-[#0b3c8f] text-white flex flex-col font-sans overflow-hidden">
      
      {/* Cabecera Móvil/Escritorio unificada para el Dashboard de Botones */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0b3c8f] relative z-20 shadow-lg">
        {currentView !== 'inicio' ? (
          <button 
            onClick={() => setCurrentView('inicio')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Volver</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50">Sesión: <span className="text-[#00D9FF] font-semibold">{currentUser.name}</span></span>
          </div>
        )}
        
        <h3 className="text-sm font-bold capitalize text-white/80">
          {currentView === 'inicio' ? 'Convoltaje Workspace' : 
           currentView === 'pipeline' ? 'Clientes' : 
           currentView === 'almacen' ? 'Almacén' : 
           currentView === 'plantillas' ? 'Plantillas de Venta' : 
           currentView === 'calculadora' ? 'Calculadora Técnica' : 
           currentView === 'manuales' ? 'Biblioteca de Manuales' : 
           currentView === 'errores' ? 'Errores MUST' : currentView}
        </h3>

        <button 
          onClick={handleLogout}
          className="text-xs text-white/50 hover:text-white transition-colors bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5"
        >
          Salir
        </button>
      </div>

      {/* Contenido Dinámico de la vista (Grid o Módulo activo) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-lg mx-auto w-full flex flex-col">
        {renderContent()}
      </div>

    </div>
  );
}
