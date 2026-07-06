import { Zap, Palette } from "lucide-react";
import { Button } from "./ui/button";

interface SplashWelcomeProps {
  onSelectBrand: (brand: "convoltaje" | "tintaflash") => void;
}

export default function SplashWelcome({ onSelectBrand }: SplashWelcomeProps) {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
          ¡Bienvenido a nuestra web!
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
          ¿Te interesa conocer <span className="font-bold">Convoltaje</span> y sus soluciones de energía o <span className="font-bold">Tinta Flash</span> con sus servicios de personalización?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Convoltaje Option */}
          <div 
            onClick={() => onSelectBrand("convoltaje")}
            className="group cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-10 h-10 text-[#00D9FF]" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Convoltaje</h2>
            <p className="text-primary-foreground/80 mb-8">Soluciones de energía solar, inversores y PowerStations para combatir los apagones.</p>
            <Button className="w-full bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-black font-bold text-lg py-6">
              Ver Soluciones de Energía
            </Button>
          </div>

          {/* Tintaflash Option */}
          <div 
            onClick={() => onSelectBrand("tintaflash")}
            className="group cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-coral-500/20 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-[#FF6B35]/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Palette className="w-10 h-10 text-[#FF6B35]" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Tinta Flash</h2>
            <p className="text-primary-foreground/80 mb-8">Servicios de impresión, personalización, regalos, ropa y decoración.</p>
            <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-bold text-lg py-6">
              Ver Servicios de Impresión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
