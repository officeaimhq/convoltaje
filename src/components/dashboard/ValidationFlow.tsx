import { useState } from "react";
import { useCalendarStore, CalendarEvent } from "@/hooks/useCalendarStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import PhotoCapture from "./PhotoCapture";
import SignaturePad from "./SignaturePad";
import { Check, Calendar, ArrowRight, CornerDownRight, Plus, Minus, DollarSign, Wallet } from "lucide-react";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface ValidationFlowProps {
  selectedEventId?: string;
  onFinished: () => void;
}

// Catálogo básico de materiales extra comunes
const MOCK_MATERIALS = [
  { id: "cableMeters", label: "Cable Solar (Metros)" },
  { id: "breakersCount", label: "Breaker Adicional (Uds)" },
  { id: "tubingMeters", label: "Canalización / Tubo (Metros)" },
  { id: "mc4Pairs", label: "Conectores MC4 (Pares)" }
];

export default function ValidationFlow({ selectedEventId, onFinished }: ValidationFlowProps) {
  const { events, updateEvent } = useCalendarStore();
  const { currentUser } = useAuthStore();

  const [manualJobId, setManualJobId] = useState<string | null>(null);

  // El trabajo activo será el que el usuario haya seleccionado manualmente en esta pantalla,
  // o el que venga por props (selectedEventId) si no ha hecho ninguna selección manual.
  const activeJobId = manualJobId !== null ? manualJobId : selectedEventId;
  const selectedJob = activeJobId ? (events.find((e) => e.id === activeJobId) || null) : null;

  const [validationType, setValidationType] = useState<"listo" | "aplazado" | null>(null);

  // Estados del formulario "Listo"
  const [photos, setPhotos] = useState<string[]>([]);
  const [signature, setSignature] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "online" | "derivado">("efectivo");
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [isPartialPayment, setIsPartialPayment] = useState(false);
  const [paymentReference, setPaymentReference] = useState("");
  
  // Contadores de materiales extra
  const [materials, setMaterials] = useState<Record<string, number>>({
    cableMeters: 0,
    breakersCount: 0,
    tubingMeters: 0,
    mc4Pairs: 0
  });

  // Estados del formulario "Aplazado"
  const [delayReason, setDelayReason] = useState("");
  const [newProposedDate, setNewProposedDate] = useState("");
  const [delayPaymentAmount, setDelayPaymentAmount] = useState("");

  if (!currentUser) return null;

  // Filtrar trabajos del técnico, o todos si es contable/admin (jerarquía de permisos)
  const isHigherRole = currentUser.role === "admin" || currentUser.role === "contable";
  const pendingJobs = events.filter((e) => {
    const isAssigned = isHigherRole || e.assignedTecnico?.toLowerCase().includes(currentUser.name.toLowerCase()) || e.assignedComercial?.toLowerCase().includes(currentUser.name.toLowerCase());
    const isPending = e.status !== "completado" && !e.validated;
    return isAssigned && isPending;
  });

  const handleSelectJob = (eventId: string) => {
    setManualJobId(eventId);
    setValidationType(null);
    clearForm();
  };

  const clearForm = () => {
    setPhotos([]);
    setSignature(null);
    setPaymentMethod("efectivo");
    setPaymentAmount("");
    setIsPartialPayment(false);
    setPaymentReference("");
    setMaterials({
      cableMeters: 0,
      breakersCount: 0,
      tubingMeters: 0,
      mc4Pairs: 0
    });
    setDelayReason("");
    setNewProposedDate("");
    setDelayPaymentAmount("");
  };

  const handleMaterialChange = (id: string, factor: number) => {
    setMaterials((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + factor)
    }));
  };

  const handleSubmitListo = () => {
    if (!selectedJob) return;

    // Validación de firma para técnicos
    if (currentUser.role === "tecnico" && !signature) {
      toast.error("Por favor, tome la firma de entrega del cliente.");
      return;
    }

    // Validación de fotos para técnicos
    if (currentUser.role === "tecnico" && photos.length === 0) {
      toast.error("Por favor, tome al menos una foto de evidencia técnica.");
      return;
    }

    const payload: Partial<CalendarEvent> = {
      validated: true,
      validatedBy: currentUser.name,
      validatedAt: new Date().toISOString(),
      status: "completado" as const,
      photos,
      signature: signature || undefined,
      paymentInfo: {
        method: paymentMethod === "derivado" ? "online" : (paymentMethod as 'efectivo' | 'online'),
        amount: Number(paymentAmount) || 0,
        isPartial: isPartialPayment,
        reference: paymentReference || undefined,
        validatedBy: currentUser.name,
        needsOnlineValidation: paymentMethod === "derivado"
      },
      extraMaterials: {
        cableMeters: materials.cableMeters || undefined,
        breakersCount: materials.breakersCount || undefined,
        tubingMeters: materials.tubingMeters || undefined,
        mc4Pairs: materials.mc4Pairs || undefined
      }
    };

    updateEvent(selectedJob.id, payload);
    toast.success("Trabajo validado y finalizado correctamente.");
    onFinished();
  };

  const handleSubmitAplazado = () => {
    if (!selectedJob) return;
    if (!delayReason.trim()) {
      toast.error("Por favor, describa el motivo del aplazamiento.");
      return;
    }

    const payload: Partial<CalendarEvent> = {
      status: "aplazado" as const,
      validatedBy: currentUser.name,
      validatedAt: new Date().toISOString(),
      newProposedDate: newProposedDate || undefined,
      description: `${selectedJob.description || ""}\n[Aplazamiento: ${delayReason}]`,
      paymentInfo: delayPaymentAmount ? {
        method: "efectivo",
        amount: Number(delayPaymentAmount) || 0,
        isPartial: true,
        validatedBy: currentUser.name
      } : undefined
    };

    updateEvent(selectedJob.id, payload);
    toast.success("Trabajo marcado como aplazado.");
    onFinished();
  };

  return (
    <div className="w-full flex flex-col font-sans text-white pb-8">
      
      {/* Selector de Trabajo (si no viene pre-seleccionado o si se deseleccionó) */}
      {!selectedJob && (
        <div className="flex flex-col gap-3">
          <div className="mb-2">
            <h2 className="text-lg font-bold">Validación del Trabajo</h2>
            <p className="text-white/60 text-xs">Seleccione la orden técnica que desea validar.</p>
          </div>

          {pendingJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-center">
              <Check size={32} className="mb-2 text-[#00D9FF]" />
              <span className="text-xs font-semibold">Todos tus trabajos están validados</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {pendingJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => handleSelectJob(job.id)}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between text-[10px] text-[#00D9FF] font-bold mb-1">
                    <span>{job.date}</span>
                    <span className="uppercase">{job.workType || "obra"}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white mb-0.5">{job.clientName}</h3>
                  <p className="text-[11px] text-white/60 truncate">{job.title}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Flujo de Validación Activo */}
      {selectedJob && (
        <div className="flex flex-col gap-5">
          {/* Ficha Resumida */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] text-[#00D9FF] font-bold uppercase">{selectedJob.workType || "obra"}</span>
              <button 
                onClick={() => setManualJobId("")}
                className="text-[10px] text-white/40 hover:text-white underline"
              >
                Cambiar Orden
              </button>
            </div>
            <h3 className="text-sm font-bold text-white mb-0.5">{selectedJob.clientName}</h3>
            <p className="text-xs text-white/70 mb-1">{selectedJob.title}</p>
            <p className="text-[11px] text-white/40 leading-tight">{selectedJob.location}</p>
          </div>

          {/* Selector Listo / Aplazado */}
          {validationType === null && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => setValidationType("listo")}
                className="py-6 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Check size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-200">¡TRABAJO LISTO!</span>
              </button>
              <button
                onClick={() => setValidationType("aplazado")}
                className="py-6 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Calendar size={20} />
                </div>
                <span className="text-xs font-bold text-amber-200">APLAZADO / RE-AGENDA</span>
              </button>
            </div>
          )}

          {/* Formulario TRABAJO LISTO */}
          {validationType === "listo" && (
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider">Flujo de Entrega del Trabajo</h4>
              
              {/* Fotos Evidencia */}
              <PhotoCapture onPhotosChange={setPhotos} maxPhotos={3} />

              {/* Firma digital del cliente */}
              <SignaturePad onSignatureChange={setSignature} />

              {/* Selector de Materiales Extra */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
                <label className="text-xs font-bold text-white/70 uppercase">Materiales Consumidos Adicionales</label>
                
                <div className="flex flex-col gap-2.5">
                  {MOCK_MATERIALS.map((material) => (
                    <div key={material.id} className="flex items-center justify-between gap-4">
                      <span className="text-xs text-white/80">{material.label}</span>
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/15 p-1">
                        <button
                          type="button"
                          onClick={() => handleMaterialChange(material.id, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold w-6 text-center">{materials[material.id]}</span>
                        <button
                          type="button"
                          onClick={() => handleMaterialChange(material.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/50"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cobros y Validación de Pagos */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
                <label className="text-xs font-bold text-white/70 uppercase">Información de Pago Recibido</label>

                {/* Métodos de Pago según rol */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {currentUser.role !== "comercial" && (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("efectivo")}
                      className={`py-2 border rounded-xl font-bold flex flex-col items-center gap-1.5 transition-all
                        ${paymentMethod === "efectivo" 
                          ? "bg-[#00D9FF] text-[#0b1b33] border-transparent" 
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"}`}
                    >
                      <DollarSign size={14} />
                      <span>Efectivo</span>
                    </button>
                  )}

                  {currentUser.role !== "tecnico" && (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("online")}
                      className={`py-2 border rounded-xl font-bold flex flex-col items-center gap-1.5 transition-all
                        ${paymentMethod === "online" 
                          ? "bg-[#00D9FF] text-[#0b1b33] border-transparent" 
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"}`}
                    >
                      <Wallet size={14} />
                      <span>Pago Online</span>
                    </button>
                  )}

                  {currentUser.role === "tecnico" && (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("derivado")}
                      className={`py-2 border rounded-xl font-bold flex flex-col items-center gap-1.5 transition-all col-span-2
                        ${paymentMethod === "derivado" 
                          ? "bg-amber-500 text-white border-transparent" 
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"}`}
                    >
                      <CornerDownRight size={14} />
                      <span>Derivar a Comercial (Pago Online)</span>
                    </button>
                  )}
                </div>

                {/* Inputs de Pago */}
                {paymentMethod !== "derivado" && (
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 px-3 py-1 text-xs">
                      <span className="text-white/40">Monto Cobrado (CUP):</span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="bg-transparent border-none text-white text-right focus:outline-none flex-1 font-bold text-sm"
                      />
                    </div>

                    {paymentMethod === "online" && (
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 px-3 py-2 text-xs">
                        <span className="text-white/40">Ref. Transf:</span>
                        <input
                          type="text"
                          placeholder="Número de Comprobante"
                          value={paymentReference}
                          onChange={(e) => setPaymentReference(e.target.value)}
                          className="bg-transparent border-none text-white text-right focus:outline-none flex-1 font-semibold"
                        />
                      </div>
                    )}

                    <label className="flex items-center gap-2 text-xs text-white/60 cursor-pointer select-none mt-1">
                      <input
                        type="checkbox"
                        checked={isPartialPayment}
                        onChange={(e) => setIsPartialPayment(e.target.checked)}
                        className="rounded bg-white/5 border-white/15 text-[#00D9FF] focus:ring-0"
                      />
                      <span>¿Es un Pago Parcial? (Abono)</span>
                    </label>
                  </div>
                )}

                {paymentMethod === "derivado" && (
                  <p className="text-[11px] text-amber-200/80 leading-normal italic px-1">
                    ➔ Al cerrar, el trabajo quedará bloqueado de cierre técnico, y la comercial recibirá una alerta para verificar el cobro en pesos (CUP) online.
                  </p>
                )}
              </div>

              {/* Botones de Envío */}
              <div className="grid grid-cols-3 gap-2.5 mt-2">
                <button
                  type="button"
                  onClick={() => setValidationType(null)}
                  className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleSubmitListo}
                  className="col-span-2 py-2.5 rounded-xl bg-[#00D9FF] hover:bg-[#00c5e6] text-[#0b1b33] text-xs font-bold shadow-lg"
                >
                  Confirmar y Validar
                </button>
              </div>
            </div>
          )}

          {/* Formulario APLAZADO */}
          {validationType === "aplazado" && (
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Reportar Incidencia / Aplazar</h4>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-white/50 uppercase font-bold">Motivo del Aplazamiento / Notas *</label>
                  <textarea
                    placeholder="Describa qué impidió completar el trabajo hoy (ej. falta de cubiertas, lluvia, ausencia del cliente)..."
                    value={delayReason}
                    onChange={(e) => setDelayReason(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B35] h-24 resize-none leading-relaxed"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-white/50 uppercase font-bold">Nueva fecha propuesta (Opcional)</label>
                  <input
                    type="date"
                    value={newProposedDate}
                    onChange={(e) => setNewProposedDate(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 mt-1">
                  <label className="text-xs font-bold text-white/70 uppercase">Abono Recibido en Terreno (Opcional)</label>
                  <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 px-3 py-1 text-xs">
                    <span className="text-white/40">Monto CUP en efectivo:</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={delayPaymentAmount}
                      onChange={(e) => setDelayPaymentAmount(e.target.value)}
                      className="bg-transparent border-none text-white text-right focus:outline-none flex-1 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Botones de Envío */}
              <div className="grid grid-cols-3 gap-2.5 mt-2">
                <button
                  type="button"
                  onClick={() => setValidationType(null)}
                  className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAplazado}
                  className="col-span-2 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#e05f2f] text-white text-xs font-bold shadow-lg"
                >
                  Guardar y Re-agendar
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
