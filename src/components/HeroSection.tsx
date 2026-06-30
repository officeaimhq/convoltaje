import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary z-0" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in text-center lg:text-left mt-8 lg:mt-0">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
              Energiza tu vida
            </h1>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6 text-secondary">
              Energía limpia + Creatividad personal
            </h2>
            <p className="text-base md:text-lg mb-8 text-white/90 max-w-md mx-auto lg:mx-0">
              Descubre soluciones de energía solar confiables y merchandising
              personalizado. Dos marcas, una misión: empoderarte.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Button
                onClick={onExploreClick}
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent text-base md:text-lg px-8 py-6 btn-scale-active"
              >
                Explorar Catálogos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={onExploreClick}
                className="w-full sm:w-auto bg-white/90 border-transparent text-primary hover:bg-white font-accent text-base md:text-lg px-8 py-6"
              >
                Saber Más
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm justify-center lg:justify-start">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-3 h-3 rounded-full bg-secondary flex-shrink-0" />
                <span>Instalación en 15 días</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-3 h-3 rounded-full bg-secondary flex-shrink-0" />
                <span>Personalización al instante</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-3 h-3 rounded-full bg-secondary flex-shrink-0" />
                <span>Soporte WhatsApp 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Content - Character */}
          <div className="relative h-64 sm:h-80 lg:h-full flex items-center justify-center animate-slide-up mb-8 lg:mb-0">
            <img
              src="/images/solucionapagon.jpg"
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
