import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const clients = [
  { id: 1, src: "/images/cliente-01.jpg", alt: "Cliente satisfecho de Convoltaje 1" },
  { id: 2, src: "/images/cliente-02.jpg", alt: "Cliente satisfecho de Convoltaje 2" },
  { id: 3, src: "/images/cliente-03.jpg", alt: "Cliente satisfecho de Convoltaje 3" },
  { id: 4, src: "/images/cliente-04.jpg", alt: "Cliente satisfecho de Convoltaje 4" },
  { id: 5, src: "/images/cliente-05.jpg", alt: "Cliente satisfecho de Convoltaje 5" },
  { id: 6, src: "/images/cliente-06.jpg", alt: "Cliente satisfecho de Convoltaje 6" },
  { id: 7, src: "/images/cliente-07.jpg", alt: "Cliente satisfecho de Convoltaje 7" },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === clients.length - 1 ? 0 : prevIndex + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? clients.length - 1 : prevIndex - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

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

        <div className="relative max-w-[1400px] mx-auto">
          {/* Carousel Track Container */}
          <div className="relative flex items-center justify-center">
            {/* The wrapper that masks overflow */}
            <div className="w-full overflow-hidden px-4 md:px-0 py-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex > 0 ? currentIndex * 16 : 0}px))` 
                }}
              >
                {clients.map((client, index) => (
                  <div 
                    key={client.id} 
                    className={`
                      shrink-0 w-full md:w-[60%] lg:w-[50%] mr-4 md:mr-4
                      transition-all duration-500 ease-in-out
                      ${index === currentIndex ? 'scale-100 opacity-100 drop-shadow-2xl z-10' : 'scale-90 opacity-40 drop-shadow-none z-0'}
                    `}
                    style={{
                      // In desktop, to center the active slide since they are 60% or 50% width:
                      // We need to offset the track based on window width, but a simpler CSS approach is letting the flex track slide,
                      // and using marginLeft magic or just accepting the left-aligned slide on mobile, but centered on desktop.
                      // Wait, the translateX above assumes full width. If slides are 50%, translateX needs to account for that.
                    }}
                  >
                    <div className="aspect-[4/3] md:aspect-[16/10] bg-white rounded-2xl overflow-hidden border border-slate-200">
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="w-full h-full object-contain bg-slate-100"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-2 md:left-8 z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:text-primary transition-all text-slate-700 hidden md:flex"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Anterior</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-2 md:right-8 z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg hover:bg-white hover:text-primary transition-all text-slate-700 hidden md:flex"
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
