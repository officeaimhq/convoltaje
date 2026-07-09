import { Search, Zap, Palette, Settings } from "lucide-react";
import { useLocation } from "wouter";

interface DashboardWelcomeProps {
  onSelectBrand?: (brand: "none" | "convoltaje" | "tintaflash") => void;
}

export default function DashboardWelcome({ onSelectBrand }: DashboardWelcomeProps = {}) {
  const [, setLocation] = useLocation();

  const handleConvoltajeClick = () => {
    if (onSelectBrand) {
      onSelectBrand("convoltaje");
    } else {
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b3c8f] to-[#082c6b] text-white flex flex-col items-center justify-center p-4 relative font-sans">
      {/* Fondo con estrellas fijas titilando */}
      <div 
        className="fixed inset-0 opacity-40 pointer-events-none animate-pulse" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 5 Q10 10 5 10 Q10 10 10 15 Q10 10 15 10 Q10 10 10 5 Z' fill='white' opacity='0.8'/%3E%3Cpath d='M40 30 Q40 40 30 40 Q40 40 40 50 Q40 40 50 40 Q40 40 40 30 Z' fill='white' opacity='0.4'/%3E%3Cpath d='M80 15 Q80 20 75 20 Q80 20 80 25 Q80 20 85 20 Q80 20 80 15 Z' fill='white' opacity='0.6'/%3E%3Cpath d='M60 70 Q60 75 55 75 Q60 75 60 80 Q60 75 65 75 Q60 75 60 70 Z' fill='white' opacity='0.3'/%3E%3Cpath d='M20 80 Q20 82 18 82 Q20 82 20 84 Q20 82 22 82 Q20 82 20 80 Z' fill='white' opacity='0.5'/%3E%3C/svg%3E")`, 
          backgroundSize: '150px 150px',
          animationDuration: '4s'
        }} 
      />

      <div className="relative z-10 w-full max-w-[90%] md:max-w-2xl flex flex-col items-center text-center">
        {/* Personaje / Logo principal en blanco */}
        <div className="mb-4 mt-2">
          <img 
            src="/images/rocket-logo.png" 
            alt="Logo" 
            className="w-32 h-32 object-contain" 
            style={{ 
              mixBlendMode: 'lighten',
              WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)',
              maskImage: 'radial-gradient(circle, black 50%, transparent 70%)'
            }}
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight text-white leading-tight">
          Bienvenidos a nuestro<br/>universo digital
        </h1>
        <p className="text-sm md:text-base text-white/90 mb-6 max-w-lg mx-auto">
          Puedes <span className="font-bold">elegir entre nuestros negocios</span> o buscar algo de <span className="font-bold">forma rápida</span>.
        </p>

        {/* Buscador */}
        <div className="w-full relative mb-6">
          <input 
            type="text" 
            placeholder="Ejemplo: Inversor, Vinilo..." 
            className="w-full bg-white/10 border border-white/30 rounded-lg py-3 px-5 pr-10 text-white/80 placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
        </div>

        {/* Tarjetas de Negocios */}
        <div className="w-full max-w-xs mx-auto mb-6">
          {/* Convoltaje */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-between shadow-lg transition-all cursor-pointer min-h-[140px]" onClick={handleConvoltajeClick}>
            <div className="text-center w-full">
              <h2 className="text-lg font-bold mb-1">Convoltaje</h2>
              <p className="text-[11px] text-blue-100/80 mb-3 leading-relaxed">Soluciones de energía solar, inversores y PowerStations.</p>
            </div>
            <button className="w-full bg-[#00d2ff] hover:bg-cyan-400 text-black font-semibold py-2.5 rounded-lg transition-colors mt-auto text-sm">
              Ver Soluciones
            </button>
          </div>

          {/* Tinta Flash (Oculto temporalmente hasta que se retome el desarrollo) 
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-between shadow-lg transition-all cursor-pointer min-h-[140px]">
            <div className="text-center w-full">
              <h2 className="text-lg font-bold mb-1">Tinta Flash</h2>
              <p className="text-[11px] text-blue-100/80 mb-3 leading-relaxed">Servicios de impresión, regalos, ropa y decoración.</p>
            </div>
            <button className="w-full bg-[#ff6b35] hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors mt-auto text-sm">
              Ver Servicios
            </button>
          </div>
          */}
        </div>

        {/* Footer Actions */}
        <p className="text-[10px] text-white/50 mb-4 max-w-md mx-auto leading-tight">
          Al presionar o buscar cualquier elemento, es posible que solicitemos información de registro.
        </p>

        <div className="flex flex-row justify-center w-full gap-4">
          <div className="flex flex-col items-center w-full max-w-[140px]">
            <button className="w-full bg-white/10 hover:bg-white/20 border border-[#4285f4] text-white font-medium py-2 px-3 rounded-lg flex justify-center items-center gap-2 transition-colors text-xs shadow-md">
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[9px] font-bold text-red-500">G</div>
              Registrarte
            </button>
            <span className="text-[10px] text-white/60 mt-1 hover:underline cursor-pointer">Acceder a tu cuenta</span>
          </div>

          <div className="flex flex-col items-center w-full max-w-[140px]">
            <button 
              onClick={() => setLocation("/admin/login")}
              className="w-full bg-white/10 hover:bg-white/20 border border-[#4285f4] text-white font-medium py-2 px-3 rounded-lg flex justify-center items-center gap-2 transition-colors text-xs shadow-md"
            >
              <Settings className="w-3.5 h-3.5 text-white" />
              Administrar
            </button>
            <span className="text-[10px] text-white/60 mt-1 hover:underline cursor-pointer">Solicitar rol</span>
          </div>
        </div>
      </div>
    </div>
  );
}
