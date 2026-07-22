import { useState } from "react";
import CrmCalculator from "./crm/CrmCalculator";
import ManualsLibrary from "./tech/ManualsLibrary";
import TroubleshootingGuide from "./tech/TroubleshootingGuide";
import LevantamientoForm from "./tech/LevantamientoForm";
import { Calculator, BookOpen, AlertTriangle, ClipboardCheck } from "lucide-react";

export default function HerramientasView() {
  const [activeTool, setActiveTool] = useState<"selector" | "levantamiento" | "calculadora" | "manuales" | "errores">("selector");

  if (activeTool === "levantamiento") {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setActiveTool("selector")}
          className="text-xs text-white/50 hover:text-white underline self-start mb-2 font-bold flex items-center gap-1"
        >
          ➔ Volver a Herramientas
        </button>
        <LevantamientoForm />
      </div>
    );
  }

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

      <div className="space-y-4">
        {/* Levantamiento Técnico de Campo (Destacado) */}
        <button
          onClick={() => setActiveTool("levantamiento")}
          className="w-full p-5 rounded-2xl bg-gradient-to-r from-[#00D9FF]/20 via-white/5 to-transparent border border-[#00D9FF]/30 flex items-center justify-between gap-4 transition-all hover:border-[#00D9FF] active:scale-[0.98] group"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#00D9FF]/15 text-[#00D9FF] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <ClipboardCheck size={24} />
            </div>
            <div>
              <span className="text-[10px] text-[#00D9FF] font-black uppercase tracking-wider block">Ficha de Campo</span>
              <h3 className="text-sm font-bold text-white leading-tight">Levantamiento Técnico de Terreno</h3>
              <p className="text-[10px] text-white/60 mt-0.5">Evalúa techo, red eléctrica, aterramiento y cargas del cliente. Sincroniza con la OT.</p>
            </div>
          </div>
          <span className="text-xs font-black text-[#00D9FF] group-hover:translate-x-1 transition-transform">Abrir ➔</span>
        </button>

        {/* Módulos Secundarios */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Calculadora Solar */}
          <button
            onClick={() => setActiveTool("calculadora")}
            className="py-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00D9FF] group-hover:scale-110 transition-transform">
              <Calculator size={20} />
            </div>
            <span className="text-xs font-bold text-white">Calculadora Solar</span>
          </button>

          {/* Manuales Técnicos */}
          <button
            onClick={() => setActiveTool("manuales")}
            className="py-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00D9FF] group-hover:scale-110 transition-transform">
              <BookOpen size={20} />
            </div>
            <span className="text-xs font-bold text-white">Manuales de Kits</span>
          </button>

          {/* Errores MUST */}
          <button
            onClick={() => setActiveTool("errores")}
            className="py-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <AlertTriangle size={20} />
            </div>
            <span className="text-xs font-bold text-white">Errores MUST</span>
          </button>
        </div>
      </div>
    </div>
  );
}
