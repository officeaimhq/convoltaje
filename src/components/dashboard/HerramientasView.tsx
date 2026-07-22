import { useState } from "react";
import CrmCalculator from "./crm/CrmCalculator";
import ManualsLibrary from "./tech/ManualsLibrary";
import TroubleshootingGuide from "./tech/TroubleshootingGuide";
import { Calculator, BookOpen, AlertTriangle } from "lucide-react";

export default function HerramientasView() {
  const [activeTool, setActiveTool] = useState<"selector" | "calculadora" | "manuales" | "errores">("selector");

  if (activeTool === "calculadora") {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setActiveTool("selector")}
          className="text-xs text-white/50 hover:text-white underline self-start mb-2 font-bold flex items-center gap-1"
        >
          ➔ Volver a Herramientas
        </button>
        <CrmCalculator />
      </div>
    );
  }

  if (activeTool === "manuales") {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setActiveTool("selector")}
          className="text-xs text-white/50 hover:text-white underline self-start mb-2 font-bold flex items-center gap-1"
        >
          ➔ Volver a Herramientas
        </button>
        <ManualsLibrary />
      </div>
    );
  }

  if (activeTool === "errores") {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setActiveTool("selector")}
          className="text-xs text-white/50 hover:text-white underline self-start mb-2 font-bold flex items-center gap-1"
        >
          ➔ Volver a Herramientas
        </button>
        <TroubleshootingGuide />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-sans text-white pb-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Herramientas de Trabajo</h2>
        <p className="text-white/60 text-xs">Utilidades integradas para proyectistas y técnicos en el terreno.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Calculadora Solar */}
        <button
          onClick={() => setActiveTool("calculadora")}
          className="py-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group"
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#00D9FF] group-hover:scale-110 transition-transform">
            <Calculator size={24} />
          </div>
          <span className="text-xs font-bold text-white">Calculadora Solar</span>
        </button>

        {/* Manuales Técnicos */}
        <button
          onClick={() => setActiveTool("manuales")}
          className="py-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group"
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#00D9FF] group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <span className="text-xs font-bold text-white">Manuales de Kits</span>
        </button>

        {/* Errores MUST */}
        <button
          onClick={() => setActiveTool("errores")}
          className="py-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group"
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <AlertTriangle size={24} />
          </div>
          <span className="text-xs font-bold text-white">Errores MUST</span>
        </button>
      </div>
    </div>
  );
}
