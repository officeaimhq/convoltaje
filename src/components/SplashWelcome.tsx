import { Button } from "./ui/button";

interface SplashWelcomeProps {
  onSelectBrand: (brand: "convoltaje" | "tintaflash") => void;
}

export default function SplashWelcome({ onSelectBrand }: SplashWelcomeProps) {
  return (
    <div className="min-h-screen bg-[#0b3c8f] flex flex-col items-center justify-center p-4 relative font-sans text-white">
      
      {/* Top Access Bar for Team Members */}
      <div className="absolute top-4 right-4 z-20">
        <a
          href="/admin/login"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 backdrop-blur-md"
        >
          <span>Acceso Equipo</span>
          <span>🔒</span>
        </a>
      </div>

      <div className="max-w-4xl w-full text-center animate-fade-in mt-[-2rem] md:mt-0">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
          ¡Bienvenido a nuestra web!
        </h1>
        <p className="text-sm md:text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
          ¿Te interesa conocer <span className="font-bold text-[#00D9FF]">Convoltaje</span> y sus soluciones de energía o <span className="font-bold text-[#FF6B35]">Tinta Flash</span> con sus servicios de personalización?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Convoltaje Option */}
          <div 
            onClick={() => onSelectBrand("convoltaje")}
            className="group cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl p-5 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Convoltaje</h2>
            <p className="text-xs md:text-base text-primary-foreground/80 mb-4">Soluciones de energía solar, inversores y PowerStations para combatir los apagones.</p>
            <Button className="w-full bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-black font-bold text-base py-4 md:py-6 h-auto">
              Ver Soluciones de Energía
            </Button>
          </div>

          {/* Tintaflash Option */}
          <div 
            onClick={() => onSelectBrand("tintaflash")}
            className="group cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl p-5 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-coral-500/20 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Tinta Flash</h2>
            <p className="text-xs md:text-base text-primary-foreground/80 mb-4">Servicios de impresión, personalización, regalos, ropa y decoración.</p>
            <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-bold text-base py-4 md:py-6 h-auto">
              Ver Servicios de Impresión
            </Button>
          </div>
        </div>

        {/* Panel Admin / Equipo Access Bar */}
        <div className="mt-6 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-4 md:px-6 border border-white/15 text-left">
          <div>
            <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
              <span>🔒</span>
              <span>¿Sos miembro del equipo Convoltaje?</span>
            </h3>
            <p className="text-xs text-white/70">
              Accedé a tu panel de control, CRM de ventas, gestión de inventario y levantamientos.
            </p>
          </div>
          <a
            href="/admin/login"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00D9FF] hover:bg-[#00c5e6] text-[#0b1b33] text-xs font-black transition-all shadow-lg text-center whitespace-nowrap active:scale-95"
          >
            Acceder al Panel de Control ➔
          </a>
        </div>

      </div>
    </div>
  );
}
