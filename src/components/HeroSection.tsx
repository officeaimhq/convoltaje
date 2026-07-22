import { ArrowRight, Users, Calendar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";


interface HeroSectionProps {
  onExploreClick: () => void;
  onCalculatorClick: () => void;
}

export default function HeroSection({ onExploreClick, onCalculatorClick }: HeroSectionProps) {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fallback Dark Background */}
      <div className="absolute inset-0 bg-[#050510] z-[-1]" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/40 shadow-2xl text-slate-900 animate-fade-in text-center lg:text-left mt-8 lg:mt-0">
            <h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight text-white font-bold"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
            >
              Energiza tu vida
            </h1>
            <h2 
              className="font-display text-2xl md:text-3xl lg:text-4xl mb-6 text-primary font-bold drop-shadow-sm"
            >
              La solución al apagón que ya funciona en más de 500 hogares cubanos
            </h2>
            <p 
              className="text-base md:text-lg mb-8 text-[#009bc2] font-semibold max-w-md mx-auto lg:mx-0 drop-shadow-sm"
            >
              Sistemas solares completos, instalación profesional y pago solo cuando tu hogar tenga luz. Sin adelantos. Sin sorpresas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start flex-wrap">
              <Button
                onClick={onExploreClick}
                className="w-full sm:w-auto font-accent text-base md:text-lg px-6 py-6 neon-btn"
              >
                Explorar Catálogo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={onCalculatorClick}
                className="w-full sm:w-auto bg-[#ff4500] hover:bg-[#ff4500]/90 text-white border-none shadow-lg shadow-[#ff4500]/30 font-semibold font-accent text-base md:text-lg px-6 py-6 transition-all hover:scale-105"
              >
                Calculadora Solar
              </Button>
              <a
                href="/admin/login"
                className="w-full sm:w-auto bg-[#0b3c8f] hover:bg-[#092d6e] text-white border border-white/20 font-bold font-sans text-sm px-5 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Acceso Equipo / CRM</span>
                <span>🔒</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm justify-center lg:justify-start">
              <div className="flex items-center gap-2 justify-center text-primary font-semibold">
                <Users className="w-5 h-5 text-[#00D9FF] flex-shrink-0" />
                <span>+500 familias con luz continua</span>
              </div>
              <div className="flex items-center gap-2 justify-center text-primary font-semibold">
                <Calendar className="w-5 h-5 text-[#00D9FF] flex-shrink-0" />
                <span>Instalación en 10-15 días</span>
              </div>
              <div className="flex items-center gap-2 justify-center text-primary font-semibold">
                <ShieldCheck className="w-5 h-5 text-[#00D9FF] flex-shrink-0" />
                <span>Pagas solo cuando funciona</span>
              </div>
            </div>
          </div>

          {/* Right Content - Character */}
          <div className="relative h-64 sm:h-80 lg:h-full flex items-center justify-center animate-slide-up mb-8 lg:mb-0">
            <img
              src="/images/solucion-apagon.jpg"
              alt="Samuel el Panel - Mascota de Convoltaje"
              className="max-h-full w-auto max-w-sm lg:max-w-md drop-shadow-2xl object-contain rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
