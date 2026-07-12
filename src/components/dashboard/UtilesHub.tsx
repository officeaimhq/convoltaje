import { useState } from "react";
import { useAuthStore } from "@/hooks/useAuthStore";
import {
  Calculator, BookOpen, MessageSquare, AlertOctagon,
  ClipboardList, ChevronLeft, Wrench
} from "lucide-react";
import { AdminView } from "./Sidebar";
import CrmCalculator from "./crm/CrmCalculator";
import ManualsLibrary from "./tech/ManualsLibrary";
import SalesTemplates from "./crm/SalesTemplates";
import TroubleshootingGuide from "./tech/TroubleshootingGuide";

// ─── Definición de útiles por rol ─────────────────────────────────────
type ToolId = "calculadora" | "manuales" | "plantillas" | "errores" | "historial";

interface ToolDef {
  id: ToolId;
  label: string;
  description: string;
  icon: React.ElementType;
  roles: string[];
}

const TOOLS: ToolDef[] = [
  {
    id: "calculadora",
    label: "Calculadora Solar",
    description: "Dimensionado de kits según consumo",
    icon: Calculator,
    roles: ["admin", "comercial", "contable", "tecnico"],
  },
  {
    id: "plantillas",
    label: "Plantillas WhatsApp",
    description: "Mensajes prediseñados para clientes",
    icon: MessageSquare,
    roles: ["admin", "comercial"],
  },
  {
    id: "errores",
    label: "Errores MUST",
    description: "Guía de resolución de problemas técnicos",
    icon: AlertOctagon,
    roles: ["admin", "comercial", "contable"],
  },
  {
    id: "historial",
    label: "Historial",
    description: "Registro de actividad y operaciones",
    icon: ClipboardList,
    roles: ["admin", "comercial", "contable"],
  },
  {
    id: "manuales",
    label: "Manuales de Kits",
    description: "Documentación técnica de instalación",
    icon: BookOpen,
    roles: ["admin", "comercial", "contable", "tecnico"],
  },
];

interface UtilesHubProps {
  onSelectView: (view: AdminView) => void;
}

export default function UtilesHub({ onSelectView }: UtilesHubProps) {
  const { currentUser } = useAuthStore();
  const role = currentUser?.role ?? "admin";
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);

  const availableTools = TOOLS.filter((t) => t.roles.includes(role));

  // ─── Render tool inline ─────────────────────────────────────
  if (activeTool) {
    const backBtn = (
      <button
        onClick={() => setActiveTool(null)}
        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white mb-4 transition-colors"
      >
        <ChevronLeft size={14} />
        <span>Volver a Útiles</span>
      </button>
    );

    if (activeTool === "calculadora") return <div className="flex flex-col">{backBtn}<CrmCalculator /></div>;
    if (activeTool === "manuales")    return <div className="flex flex-col">{backBtn}<ManualsLibrary /></div>;
    if (activeTool === "plantillas")  return <div className="flex flex-col">{backBtn}<SalesTemplates /></div>;
    if (activeTool === "errores")     return <div className="flex flex-col">{backBtn}<TroubleshootingGuide /></div>;
    if (activeTool === "historial") {
      return (
        <div className="flex flex-col">
          {backBtn}
          <div className="flex flex-col items-center justify-center py-16 text-white/40 gap-3">
            <ClipboardList size={36} />
            <p className="text-sm">Historial en construcción</p>
          </div>
        </div>
      );
    }
  }

  // ─── Selector de útiles ────────────────────────────────────
  return (
    <div className="w-full flex flex-col font-sans text-white pb-8">
      {/* Encabezado */}
      <div className="mb-6 flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#00D9FF]/10 flex items-center justify-center text-[#00D9FF] flex-shrink-0 mt-0.5">
          <Wrench size={20} />
        </div>
        <div>
          <h2 className="text-base font-bold leading-tight">Herramientas y Útiles</h2>
          <p className="text-white/50 text-xs mt-0.5">
            Recursos y herramientas de apoyo para tu rol.
          </p>
        </div>
      </div>

      {/* Grid de herramientas */}
      <div className="grid grid-cols-2 gap-3">
        {availableTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 py-7 px-3 text-center transition-all active:scale-95 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#00D9FF] group-hover:scale-110 transition-transform">
                <Icon size={22} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white leading-tight">{tool.label}</span>
                <span className="text-[9px] text-white/40 leading-tight">{tool.description}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
