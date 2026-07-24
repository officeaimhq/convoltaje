import { useState, useEffect } from "react";
import { 
  ClipboardCheck, Zap, Home, Cpu, CheckCircle2, 
  AlertTriangle, Calculator, Save, User, ShieldCheck, ArrowRight 
} from "lucide-react";
import { toast } from "sonner";
import { useCrmStore, ClientDeal, TechnicalSurvey } from "@/hooks/useCrmStore";
import { useAuthStore } from "@/hooks/useAuthStore";

import { makeService } from "@/lib/services/makeService";

// Catalog for Smart Load Calculator inside the survey
interface SurveyAppliance {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
}

const COMMON_APPLIANCES = [
  { name: "Split Aire Acondicionado ❄️", defaultWatts: 1200, defaultHours: 8 },
  { name: "Refrigerador / Freezer 🧊", defaultWatts: 250, defaultHours: 24 },
  { name: "Ventilador 💨", defaultWatts: 75, defaultHours: 12 },
  { name: "Televisor LED 📺", defaultWatts: 100, defaultHours: 6 },
  { name: "Luces LED 💡", defaultWatts: 10, defaultHours: 8 },
  { name: "Bomba de Agua (Motor) 💧", defaultWatts: 500, defaultHours: 1 },
  { name: "Carga Moto Eléctrica 🛵", defaultWatts: 800, defaultHours: 5 },
  { name: "Cocina Inducción 🔥", defaultWatts: 2200, defaultHours: 1 },
  { name: "Microondas ⏲️", defaultWatts: 1000, defaultHours: 0.5 },
  { name: "Lavadora 🧺", defaultWatts: 400, defaultHours: 1.5 },
];

export default function LevantamientoForm() {
  const { deals, updateDeal, logOtActivity } = useCrmStore();
  const { currentUser } = useAuthStore();

  const [selectedDealId, setSelectedDealId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"infraestructura" | "cargas" | "dictamen">("infraestructura");

  // Tab 1: Infraestructura de Terreno
  const [roofType, setRoofType] = useState<TechnicalSurvey['roofType']>("Placa de Hormigón");
  const [availableAreaM2, setAvailableAreaM2] = useState<number>(25);
  const [electricalGrid, setElectricalGrid] = useState<TechnicalSurvey['electricalGrid']>("110V Monofásico");
  const [groundingStatus, setGroundingStatus] = useState<TechnicalSurvey['groundingStatus']>("OK - Varilla Existente");
  const [cableDistanceMeters, setCableDistanceMeters] = useState<number>(12);

  // Tab 2: Dimensionamiento de Cargas (Calculadora Integrada)
  const [appliances, setAppliances] = useState<SurveyAppliance[]>([
    { id: "1", name: "Refrigerador / Freezer 🧊", watts: 250, quantity: 1, hoursPerDay: 24 },
    { id: "2", name: "Luces LED 💡", watts: 10, quantity: 8, hoursPerDay: 8 },
    { id: "3", name: "Ventilador 💨", watts: 75, quantity: 2, hoursPerDay: 12 },
  ]);

  // Tab 3: Dictamen & Notas
  const [technicalNotes, setTechnicalNotes] = useState<string>("");
  const [customSuggestedPrice, setCustomSuggestedPrice] = useState<string>("");

  const selectedDeal = deals.find(d => d.id === selectedDealId);

  // Cargar borrador offline guardado cuando se selecciona una OT
  useEffect(() => {
    if (!selectedDealId) return;
    try {
      const savedDraft = localStorage.getItem(`convoltaje_survey_draft_${selectedDealId}`);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.roofType) setRoofType(parsed.roofType);
        if (parsed.availableAreaM2) setAvailableAreaM2(parsed.availableAreaM2);
        if (parsed.electricalGrid) setElectricalGrid(parsed.electricalGrid);
        if (parsed.groundingStatus) setGroundingStatus(parsed.groundingStatus);
        if (parsed.cableDistanceMeters) setCableDistanceMeters(parsed.cableDistanceMeters);
        if (parsed.appliances) setAppliances(parsed.appliances);
        if (parsed.technicalNotes !== undefined) setTechnicalNotes(parsed.technicalNotes);
        if (parsed.customSuggestedPrice !== undefined) setCustomSuggestedPrice(parsed.customSuggestedPrice);
        toast.info("📑 Borrador offline recuperado automáticamente para esta OT.");
      }
    } catch (e) {
      console.error("Error al cargar borrador de levantamiento:", e);
    }
  }, [selectedDealId]);

  // Guardar borrador en tiempo real en localStorage
  useEffect(() => {
    if (!selectedDealId) return;
    const draftData = {
      roofType,
      availableAreaM2,
      electricalGrid,
      groundingStatus,
      cableDistanceMeters,
      appliances,
      technicalNotes,
      customSuggestedPrice,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`convoltaje_survey_draft_${selectedDealId}`, JSON.stringify(draftData));
  }, [selectedDealId, roofType, availableAreaM2, electricalGrid, groundingStatus, cableDistanceMeters, appliances, technicalNotes, customSuggestedPrice]);

  // Auto-cálculos de Cargas
  const grossKwh = appliances.reduce((sum, a) => sum + (a.watts * a.quantity * a.hoursPerDay) / 1000, 0);
  const safetyKwh = grossKwh * 1.3;
  const peakKw = appliances.reduce((sum, a) => sum + (a.watts * a.quantity * 0.7), 0) / 1000;

  // Auto-mapeo del Kit Sugerido
  const getAutoKit = (kwh: number) => {
    if (kwh <= 2.0) return { name: "Sistema Básico - 1500W (Explorer 500)", price: 1745 };
    if (kwh <= 5.0) return { name: "Sistema Solar - Medio 3000W (Home 3600)", price: 2750 };
    if (kwh <= 8.0) return { name: "Sistema Solar Aire Acondicionado 3000W", price: 3950 };
    if (kwh <= 12.0) return { name: "Sistema Avanzado 6000W (Flex 7200 Pro)", price: 5950 };
    if (kwh <= 15.0) return { name: "Sistema 6K PLUS", price: 6950 };
    return { name: "Sistema Premium 10000W (Titan 12000)", price: 9850 };
  };

  const autoKit = getAutoKit(safetyKwh);
  const finalPrice = customSuggestedPrice ? parseFloat(customSuggestedPrice) : autoKit.price;

  const handleAddAppliance = (item: typeof COMMON_APPLIANCES[0]) => {
    setAppliances(prev => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString().slice(2, 5),
        name: item.name,
        watts: item.defaultWatts,
        quantity: 1,
        hoursPerDay: item.defaultHours
      }
    ]);
  };

  const handleRemoveAppliance = (id: string) => {
    setAppliances(prev => prev.filter(a => a.id !== id));
  };

  const handleSaveSurvey = () => {
    if (!selectedDeal) {
      toast.error("Por favor, selecciona el cliente u Orden de Trabajo (OT).");
      return;
    }

    const proyectista = currentUser?.name || "Samuel (Proyectista)";
    const fromSubstage = selectedDeal.substage || "pendiente_levantamiento";
    const toSubstage = "levantamiento_completado";

    const survey: TechnicalSurvey = {
      completedAt: new Date().toISOString(),
      proyectistaName: proyectista,
      roofType,
      availableAreaM2,
      electricalGrid,
      groundingStatus,
      cableDistanceMeters,
      grossKwhPerDay: Number(grossKwh.toFixed(2)),
      safetyKwhPerDay: Number(safetyKwh.toFixed(2)),
      peakPowerKw: Number(peakKw.toFixed(2)),
      recommendedKit: autoKit.name,
      suggestedFinalPrice: finalPrice,
      technicalNotes: technicalNotes || "Levantamiento físico completado sin objeciones adicionales.",
      appliancesSummary: appliances.map(a => `${a.quantity}x ${a.name} (${a.hoursPerDay}h/día)`).join(', ')
    };

    // Actualizar el Deal en useCrmStore:
    updateDeal(selectedDeal.id, {
      technicalSurvey: survey,
      company: autoKit.name,
      value: finalPrice,
      substage: toSubstage,
      source: `${selectedDeal.source ? selectedDeal.source + '\n\n' : ''}📋 LEVANTAMIENTO COMPLETADO (${survey.proyectistaName}):\n• Techo: ${roofType} (${availableAreaM2}m²)\n• Red: ${electricalGrid} | Aterramiento: ${groundingStatus}\n• Kit Ajustado: ${autoKit.name} ($${finalPrice} USD)\n• Notas: ${survey.technicalNotes}`
    });

    // Registrar en Activity Log
    logOtActivity(
      selectedDeal.id,
      "Completó el levantamiento técnico en terreno",
      `Techo: ${roofType}, Kit sugerido: ${autoKit.name} ($${finalPrice} USD)`,
      toSubstage,
      proyectista,
      "proyectista"
    );

    // Disparar Webhook / Make Dispatch Event
    makeService.dispatchOtSubstageEvent(
      selectedDeal.otRef || selectedDeal.id,
      fromSubstage,
      toSubstage,
      proyectista
    );

    localStorage.removeItem(`convoltaje_survey_draft_${selectedDeal.id}`);
    toast.success(`Levantamiento de terreno guardado en OT (${selectedDeal.otRef || selectedDeal.name}). ¡Notificado a Comercial!`);
  };

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <ClipboardCheck size={20} className="text-[#00D9FF]" />
          Formulario de Levantamiento Técnico (Terreno)
        </h2>
        <p className="text-xs text-white/60">
          Evaluación técnica en casa del cliente. Los datos se sincronizan con la OT para la asesora comercial.
        </p>
      </div>

      {/* Selector de Cliente / OT */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
        <label className="text-[10px] font-bold text-[#00D9FF] uppercase tracking-wider block mb-1">
          1. Seleccionar Cliente / OT *
        </label>
        <select
          value={selectedDealId}
          onChange={(e) => {
            setSelectedDealId(e.target.value);
            const deal = deals.find(d => d.id === e.target.value);
            if (deal?.technicalSurvey) {
              const ts = deal.technicalSurvey;
              setRoofType(ts.roofType);
              setAvailableAreaM2(ts.availableAreaM2);
              setElectricalGrid(ts.electricalGrid);
              setGroundingStatus(ts.groundingStatus);
              setCableDistanceMeters(ts.cableDistanceMeters);
              setTechnicalNotes(ts.technicalNotes);
              setCustomSuggestedPrice(String(ts.suggestedFinalPrice));
            }
          }}
          className="w-full bg-black/30 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
        >
          <option value="">-- Elige la Orden de Trabajo en curso --</option>
          {deals.map(d => (
            <option key={d.id} value={d.id}>
              {d.otRef ? `[${d.otRef}] ` : ''}{d.name} — {d.company} (${d.stage})
            </option>
          ))}
        </select>

        {selectedDeal?.technicalSurvey && (
          <div className="mt-2 text-[10px] text-[#00FF66] font-bold flex items-center gap-1">
            <ShieldCheck size={12} />
            <span>Este cliente ya tiene un levantamiento registrado por {selectedDeal.technicalSurvey.proyectistaName}. Podés editarlo abajo.</span>
          </div>
        )}
      </div>

      {/* Tabs del Levantamiento */}
      <div className="grid grid-cols-3 gap-1 bg-black/25 rounded-2xl p-1 border border-white/5 mb-5">
        {[
          { id: "infraestructura", label: "1. Terreno/Techo" },
          { id: "cargas", label: "2. Cargas/Kits" },
          { id: "dictamen", label: "3. Dictamen Final" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`rounded-xl py-2 text-[10px] font-bold transition-all text-center
              ${activeTab === tab.id 
                ? 'bg-[#00D9FF] text-[#0b1b33] shadow-md' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Infraestructura */}
      {activeTab === "infraestructura" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Home size={14} />
            Evaluación de Infraestructura Física
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[10px] text-white/50 uppercase font-bold block mb-1">Tipo de Cubierta / Techo</label>
              <select
                value={roofType}
                onChange={(e) => setRoofType(e.target.value as any)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white focus:outline-none"
              >
                <option value="Placa de Hormigón">Placa de Hormigón</option>
                <option value="Teja">Teja (Criolla / Francesa)</option>
                <option value="Zinc/Cinc">Zinc / Cinc Metálico</option>
                <option value="Fibrocemento">Fibrocemento / Teja Asfáltica</option>
                <option value="Estructura Elevada Requerida">Estructura Elevada Requerida</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-white/50 uppercase font-bold block mb-1">Superficie Libre en Techo (m²)</label>
              <input
                type="number"
                value={availableAreaM2}
                onChange={(e) => setAvailableAreaM2(Number(e.target.value))}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] text-white/50 uppercase font-bold block mb-1">Red Eléctrica de la Vivienda</label>
              <select
                value={electricalGrid}
                onChange={(e) => setElectricalGrid(e.target.value as any)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white focus:outline-none"
              >
                <option value="110V Monofásico">110V Monofásico</option>
                <option value="220V Bifásico">220V Bifásico (2 Fases + Neutro)</option>
                <option value="220V Trifásico">220V Trifásico</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-white/50 uppercase font-bold block mb-1">Estado de Aterramiento (Tierra)</label>
              <select
                value={groundingStatus}
                onChange={(e) => setGroundingStatus(e.target.value as any)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white focus:outline-none"
              >
                <option value="OK - Varilla Existente">OK - Varilla Existente instalada</option>
                <option value="Requiere Kit Aterramiento ($350 USD)">Requiere Kit Aterramiento ($350 USD)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] text-white/50 uppercase font-bold block mb-1">Distancia Cableado Paneles ➔ Inversor (metros)</label>
              <input
                type="number"
                value={cableDistanceMeters}
                onChange={(e) => setCableDistanceMeters(Number(e.target.value))}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-white font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Dimensionamiento de Cargas (Auto-inyectado) */}
      {activeTab === "cargas" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Calculator size={14} />
            Cómputo Automático de Cargas en Terreno
          </h3>

          {/* Botones de Cargas Comunes */}
          <div>
            <span className="text-[10px] text-white/40 font-bold block mb-2">Agregar Cargas Frecuentes:</span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_APPLIANCES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddAppliance(item)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] font-bold text-white transition-all active:scale-95"
                >
                  + {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Listado de Cargas */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {appliances.map(app => (
              <div key={app.id} className="bg-black/20 border border-white/5 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{app.name}</span>
                  <span className="text-[10px] text-white/50 font-mono">{app.watts}W × {app.quantity} unid × {app.hoursPerDay}h/día</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#00D9FF]">
                    {((app.watts * app.quantity * app.hoursPerDay)/1000).toFixed(2)} kWh
                  </span>
                  <button onClick={() => handleRemoveAppliance(app.id)} className="text-red-400 hover:text-red-300 text-xs px-1">✕</button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen Inyectado Automático */}
          <div className="bg-black/40 border border-[#00D9FF]/20 rounded-xl p-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[9px] text-white/40 block">Consumo Bruto</span>
              <span className="font-mono font-bold text-white">{grossKwh.toFixed(2)} kWh</span>
            </div>
            <div>
              <span className="text-[9px] text-white/40 block">+30% Seguridad</span>
              <span className="font-mono font-bold text-[#00D9FF]">{safetyKwh.toFixed(2)} kWh</span>
            </div>
            <div>
              <span className="text-[9px] text-white/40 block">Pico Simultáneo</span>
              <span className="font-mono font-bold text-yellow-400">{peakKw.toFixed(2)} kW</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dictamen & Notas */}
      {activeTab === "dictamen" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Zap size={14} />
            Dictamen del Proyectista & Kit Sugerido
          </h3>

          <div className="bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-xl p-3">
            <span className="text-[9px] text-[#00D9FF] font-bold uppercase tracking-wider block">Kit Solar Calculado Automáticamente</span>
            <h4 className="text-sm font-bold text-white mt-0.5">{autoKit.name}</h4>
            <span className="text-xs font-mono font-bold text-[#00FF66] mt-1 block">
              Precio Base Catálogo: ${autoKit.price} USD
            </span>
          </div>

          <div>
            <label className="text-[10px] text-white/50 uppercase font-bold block mb-1">Precio Final Sugerido para Factura (USD)</label>
            <input
              type="number"
              placeholder={String(autoKit.price)}
              value={customSuggestedPrice}
              onChange={(e) => setCustomSuggestedPrice(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#00D9FF]"
            />
            <span className="text-[9px] text-white/40 mt-1 block">Dejar vacío si coincide con el precio de catálogo (${autoKit.price} USD).</span>
          </div>

          <div>
            <label className="text-[10px] text-white/50 uppercase font-bold block mb-1">Notas Técnicas para la Comercial</label>
            <textarea
              rows={3}
              value={technicalNotes}
              onChange={(e) => setTechnicalNotes(e.target.value)}
              placeholder="Ej: Techo en buen estado. Se sugiere kit de aterramiento extra. Comercial debe re-validar con el cliente si desea incluir 1 panel solar extra."
              className="w-full bg-black/20 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00D9FF] resize-none"
            />
          </div>
        </div>
      )}

      {/* Botón Final de Guardado */}
      <div className="mt-5">
        <button
          onClick={handleSaveSurvey}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00D9FF] to-[#0088FF] text-[#0b1b33] font-black text-xs hover:opacity-90 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Save size={16} />
          <span>Guardar Levantamiento en OT y Notificar a Comercial</span>
        </button>
      </div>

    </div>
  );
}
