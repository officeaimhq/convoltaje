import CalendarCore from "./calendar/CalendarCore";
import { LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function DashboardPanel() {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    // Aquí luego agregaremos la lógica real de Firebase Auth,
    // por ahora solo lo mandamos al inicio
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-[#0d233a] relative overflow-hidden flex flex-col font-sans">
      {/* Fondo de tuercas/herramientas (placeholder visual) */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l1.43 1.43-26.686 26.687-1.43-1.43L54.627 0zm-49.254 0L32.06 26.686l-1.43 1.43L3.943 1.43 5.373 0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Cabecera del Panel */}
      <div className="relative z-10 flex items-center justify-between p-4 border-b border-white/10 bg-[#0d233a]/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <img 
            src="/images/Logo-admin.png" 
            alt="Logo Admin" 
            className="w-10 h-10 object-contain [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
            style={{ mixBlendMode: 'screen' }}
          />
          <h1 className="text-xl font-bold text-white tracking-wide">Panel de Operaciones</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>

      {/* Contenedor principal del calendario */}
      <div className="relative z-10 flex-1 p-4 lg:p-8 flex flex-col items-center">
        <div className="w-full max-w-5xl h-[80vh] min-h-[600px]">
          <CalendarCore />
        </div>
      </div>
    </div>
  );
}
