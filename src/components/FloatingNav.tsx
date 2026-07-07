import { useState } from "react";
import { Home, Zap, Calculator, Phone, Plus, X } from "lucide-react";

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

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

      {/* FAB Container (Mobile Only) */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-3 md:hidden">
        
        {/* Collapsible Menu */}
        <div 
          className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4 pointer-events-none absolute bottom-16 right-0'}`}
        >
          <button
            onClick={() => scrollTo("inicio")}
            className="bg-white text-primary border border-slate-200 rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
            title="Inicio"
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo("catalogo")}
            className="bg-white text-primary border border-slate-200 rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
            title="Kits Solares"
          >
            <Zap className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo("calculadora")}
            className="bg-white text-primary border border-slate-200 rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
            title="Calculadora"
          >
            <Calculator className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo("contacto")}
            className="bg-white text-primary border border-slate-200 rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors"
            title="Contacto"
          >
            <Phone className="w-5 h-5" />
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
    </>
  );
}
