import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const clients = [
  { id: 1, src: "/images/cliente-01.jpg", alt: "Cliente satisfecho de Convoltaje 1", quote: "Instalación impecable, el equipo fue muy profesional. Ya llevamos 6 meses sin apagones." },
  { id: 2, src: "/images/cliente-02.jpg", alt: "Cliente satisfecho de Convoltaje 2", quote: "Lo mejor fue que no tuve que pagar nada hasta que el sistema estaba funcionando al 100%." },
  { id: 3, src: "/images/cliente-03.jpg", alt: "Cliente satisfecho de Convoltaje 3", quote: "En menos de 2 semanas teníamos el sistema instalado y andando. Superó mis expectativas." },
  { id: 4, src: "/images/cliente-04.jpg", alt: "Cliente satisfecho de Convoltaje 4", quote: "Excelente inversión. El aire acondicionado funciona todo el día sin problema." },
  { id: 5, src: "/images/cliente-05.jpg", alt: "Cliente satisfecho de Convoltaje 5", quote: "Profesionales de verdad. Me explicaron todo el proceso y quedé muy satisfecho." },
  { id: 6, src: "/images/cliente-06.jpg", alt: "Cliente satisfecho de Convoltaje 6", quote: "La calculadora me ayudó a elegir exactamente el sistema que necesitaba para mi casa." },
  { id: 7, src: "/images/cliente-07.jpg", alt: "Cliente satisfecho de Convoltaje 7", quote: "Recomendado al 100%. Trabajo serio, sin cobros por adelantado y resultado garantizado." },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? clients.length - 1 : prevIndex - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">
            Clientes Satisfechos
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Más de 500 familias cubanas ya disfrutan de energía continua y limpia con nuestros sistemas.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Carousel Track Container */}
          <div className="relative flex items-center justify-center">
            {/* The wrapper that masks overflow */}
            <div className="w-full overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)` 
                }}
              >
                {clients.map((client, index) => (
                  <div 
                    key={client.id} 
                    className="w-full shrink-0 flex flex-col items-center px-2"
                  >
                    <div className="w-full aspect-[4/3] md:aspect-[16/10] bg-white rounded-2xl overflow-hidden border border-slate-200 mb-6 drop-shadow-xl">
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="w-full h-full object-contain bg-slate-100"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Testimonial Quote */}
                    <p 
                      className={`text-[15px] md:text-lg text-foreground italic text-center max-w-2xl px-4 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                      "{client.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-[-16px] md:left-[-48px] z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:text-primary transition-all text-slate-700 hidden md:flex"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Anterior</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-[-16px] md:right-[-48px] z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:text-primary transition-all text-slate-700 hidden md:flex"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex ? "bg-primary w-8" : "bg-slate-300 hover:bg-slate-400"}
                `}
                aria-label={`Ir a la foto ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
