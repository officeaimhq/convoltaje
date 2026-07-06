import { useState } from "react";
import { MessageCircle, Star, Home, Zap, Calculator, Phone, Plus, X } from "lucide-react";
import { WHATSAPP_NUMBERS } from "@/lib/products";

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.convoltaje.replace(/\D/g, "")}?text=${encodeURIComponent("Hola, me gustaría más información sobre Convoltaje.")}`;
    window.open(whatsappUrl, "_blank");
  };

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Overlay for mobile when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* FAB Container */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-center gap-3">
        
        {/* Desktop View: Just WhatsApp & Review (Always visible) */}
        <div className="hidden md:flex flex-col gap-3">
          <button
            onClick={() => scrollTo("reviews-section")}
            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-full p-3 shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center"
            title="Dejar una reseña"
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg pulse-glow transition-all duration-300 active:scale-95 flex items-center justify-center"
            title="Contactar por WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile View: Collapsible Menu */}
        <div className="flex md:hidden flex-col items-center gap-3">
          <div 
            className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4 pointer-events-none absolute bottom-16 right-0'}`}
          >
            <button
              onClick={() => scrollTo("inicio")}
              className="bg-white text-primary border border-slate-200 rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo("catalogo")}
              className="bg-white text-primary border border-slate-200 rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Zap className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo("calculadora")}
              className="bg-white text-primary border border-slate-200 rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Calculator className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo("contacto")}
              className="bg-white text-primary border border-slate-200 rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo("reviews-section")}
              className="bg-yellow-400 text-slate-900 rounded-full p-3 shadow-lg flex items-center justify-center"
            >
              <Star className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center z-50"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </>
  );
}
