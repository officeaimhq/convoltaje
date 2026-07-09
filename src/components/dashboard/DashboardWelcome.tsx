import { LayoutDashboard, PlayCircle, BookOpen, Settings } from 'lucide-react';

export default function DashboardWelcome() {
  return (
    <div className="w-full h-full flex flex-col font-sans">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">¡Bienvenido de vuelta, Rody!</h2>
        <p className="text-white/60">Aquí tienes un resumen de cómo va el negocio hoy.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Banner / Getting Started */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#00D9FF]/20 to-[#0d233a] border border-[#00D9FF]/30 rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-[#00D9FF]/5">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#00D9FF]/20 text-[#00D9FF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-[#00D9FF]/30">
              <PlayCircle size={14} />
              Capacitación
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Aprende a usar el CRM Convoltaje</h3>
            <p className="text-white/70 max-w-md mb-6 leading-relaxed text-sm">
              Descubre cómo gestionar proyectos, agendar citas técnicas y controlar el inventario de manera eficiente. Todo diseñado para ahorrarte tiempo.
            </p>
            <button className="bg-[#00D9FF] hover:bg-[#00b8d9] text-[#0b1b33] px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#00D9FF]/20 hover:scale-105">
              Comenzar Entrenamiento
            </button>
          </div>
          
          {/* Decoración abstracta */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00D9FF]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Quick Stats / Widgets temporales */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-white/50 text-sm font-semibold mb-1">Proyectos Activos</h4>
            <p className="text-4xl font-bold text-white">12</p>
            <div className="mt-2 text-xs text-[#00FF66] flex items-center gap-1">
              <span>+3 esta semana</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-white/50 text-sm font-semibold mb-1">Alertas de Inventario</h4>
            <p className="text-4xl font-bold text-[#FFB800]">2</p>
            <div className="mt-2 text-xs text-white/40">
              Baterías y Estructuras bajas
            </div>
          </div>
        </div>

      </div>

      {/* Secciones Adicionales */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
          <BookOpen className="text-[#00D9FF] mb-4 group-hover:scale-110 transition-transform" size={28} />
          <h4 className="text-white font-bold mb-2">Manual de Operaciones</h4>
          <p className="text-white/50 text-sm">Documentación sobre procesos de instalación y normativas de seguridad.</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
          <Settings className="text-white/60 mb-4 group-hover:scale-110 transition-transform group-hover:text-white" size={28} />
          <h4 className="text-white font-bold mb-2">Configuración del Sistema</h4>
          <p className="text-white/50 text-sm">Administra usuarios, permisos y preferencias de la aplicación.</p>
        </div>
      </div>
      
    </div>
  );
}
