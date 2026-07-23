import { useState } from "react";
import {
  Truck, Navigation, CheckCircle2, MapPin, Phone, PackageCheck,
  ChevronLeft, FileText, Check, ShieldCheck
} from "lucide-react";
import { useCrmStore, ClientDeal } from "@/hooks/useCrmStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import { makeService } from "@/lib/services/makeService";
import ScreenshotUpload from "./ScreenshotUpload";
import { toast } from "sonner";
import { AdminView } from "./Sidebar";

interface EntregasViewProps {
  onSelectView?: (view: AdminView) => void;
}

export default function EntregasView({ onSelectView }: EntregasViewProps) {
  const { deals, updateDeal, logOtActivity } = useCrmStore();
  const { currentUser } = useAuthStore();
  const [filterStage, setFilterStage] = useState<'pending' | 'completed'>('pending');

  // Estado local para capturas de ruta y km por deal
  const [dealProofs, setDealProofs] = useState<Record<string, string[]>>({});
  const [dealKms, setDealKms] = useState<Record<string, number>>({});

  // Filtrar deals para la vista de transportista
  const pendingDeals = deals.filter(
    (d) => d.stage === "En Producción"
  );
  
  const completedDeals = deals.filter(
    (d) => d.stage === "Terminado" && (d.deliveryProof || d.deliveryKm !== undefined)
  );

  const displayedDeals = filterStage === 'pending' ? pendingDeals : completedDeals;

  const handleOpenMapsMe = (address: string) => {
    if (!address) {
      toast.error("Este cliente no tiene una dirección registrada.");
      return;
    }
    // Enlace directo compatible con Maps.me u Organic Maps para Cuba
    const mapsUrl = `https://maps.me/search?query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  const handlePhotosChange = (dealId: string, photos: string[]) => {
    setDealProofs((prev) => ({
      ...prev,
      [dealId]: photos,
    }));
  };

  const handleKmChange = (dealId: string, km: number) => {
    setDealKms((prev) => ({
      ...prev,
      [dealId]: km,
    }));
  };

  const handleMarkAsDelivered = async (deal: ClientDeal) => {
    const proofs = dealProofs[deal.id] || deal.deliveryProof || [];
    const km = dealKms[deal.id] !== undefined ? dealKms[deal.id] : deal.deliveryKm;
    const fromSubstage = deal.substage || 'almacen_preparado';
    const toSubstage = 'en_instalacion';
    const actorName = currentUser?.name || 'Transportista';

    try {
      await updateDeal(deal.id, {
        stage: "Terminado",
        substage: toSubstage,
        deliveryProof: proofs,
        deliveryKm: km,
      });

      logOtActivity(
        deal.id,
        "Completó la ruta de transporte y entrega de insumos",
        `Km reportados: ${km || 0} km. Evidencias WebP adjuntas: ${proofs.length}`,
        toSubstage,
        actorName,
        "transportista"
      );

      makeService.dispatchOtSubstageEvent(
        deal.otRef || deal.id,
        fromSubstage,
        toSubstage,
        actorName
      );

      toast.success(`¡Entrega completada para ${deal.name}! (OT: ${deal.otRef || deal.id})`);
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar la entrega.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0b3c8f] text-white p-4 md:p-6 font-sans">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          {onSelectView && (
            <button
              onClick={() => onSelectView('inicio')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div className="p-2.5 rounded-xl bg-[#00D9FF]/20 border border-[#00D9FF]/30 text-[#00D9FF]">
            <Truck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">Rutas y Entregas</h1>
            <p className="text-xs text-white/60">
              Control de transportista: rutas en Maps.me, capturas WebP y reporte de Km
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-black/30 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setFilterStage('pending')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStage === 'pending'
                ? "bg-[#00D9FF] text-[#0b1b33] shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Pendientes ({pendingDeals.length})
          </button>
          <button
            onClick={() => setFilterStage('completed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStage === 'completed'
                ? "bg-[#00D9FF] text-[#0b1b33] shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Completadas ({completedDeals.length})
          </button>
        </div>
      </div>

      {/* Main List */}
      {displayedDeals.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-2xl text-center">
          <PackageCheck size={48} className="text-white/30 mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">
            {filterStage === 'pending' ? "Sin entregas pendientes" : "Sin historial de entregas"}
          </h3>
          <p className="text-xs text-white/50 max-w-sm">
            {filterStage === 'pending'
              ? "Actualmente no hay órdenes en producción asignadas para despacho."
              : "No hay entregas completadas registradas con prueba de ruta."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayedDeals.map((deal) => {
            const address = deal.deliveryAddress || deal.address || "Dirección no especificada";
            const currentPhotos = dealProofs[deal.id] || deal.deliveryProof || [];
            const currentKm = dealKms[deal.id] !== undefined ? dealKms[deal.id] : (deal.deliveryKm || 0);

            return (
              <div
                key={deal.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col gap-4 relative overflow-hidden shadow-lg"
              >
                {/* Header Info */}
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30 font-mono">
                        {deal.otRef || `OT-${deal.id.slice(0, 6)}`}
                      </span>
                      <span className="text-xs font-semibold text-white/60">
                        {deal.expectedDate}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {deal.name}
                    </h3>
                    <p className="text-xs text-[#00D9FF] font-semibold">
                      {deal.company} (${deal.value} USD)
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/53${deal.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 flex items-center gap-1.5 text-xs font-bold transition-all shrink-0"
                  >
                    <Phone size={14} />
                    <span>Llamar</span>
                  </a>
                </div>

                {/* Address Section & Maps.me Button */}
                <div className="bg-black/30 p-3.5 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <MapPin size={18} className="text-[#00D9FF] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[11px] text-white/50 font-semibold uppercase tracking-wider">
                        Dirección de Entrega
                      </p>
                      <p className="text-xs text-white font-medium break-words">
                        {address}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenMapsMe(address)}
                    className="px-3.5 py-2 rounded-xl bg-[#00D9FF]/20 hover:bg-[#00D9FF]/30 text-[#00D9FF] border border-[#00D9FF]/40 flex items-center justify-center gap-2 text-xs font-bold transition-all shrink-0"
                  >
                    <Navigation size={14} />
                    <span>Abrir en Maps.me</span>
                  </button>
                </div>

                {/* Screenshot Upload Component */}
                <div className="bg-black/20 p-3.5 rounded-xl border border-white/10">
                  <ScreenshotUpload
                    photos={currentPhotos}
                    onPhotosChange={(photos) => handlePhotosChange(deal.id, photos)}
                    maxPhotos={4}
                  />
                </div>

                {/* Reported KM Input */}
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <FileText size={16} className="text-[#00D9FF] shrink-0" />
                  <label className="text-xs font-semibold text-white/80 shrink-0">
                    Km Recorridos (según Maps.me):
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Ej. 18.5"
                    value={currentKm || ""}
                    onChange={(e) => handleKmChange(deal.id, parseFloat(e.target.value) || 0)}
                    className="flex-1 bg-black/40 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D9FF]"
                  />
                  <span className="text-xs text-white/60 font-semibold">km</span>
                </div>

                {/* Action Button */}
                {deal.stage === "En Producción" ? (
                  <button
                    onClick={() => handleMarkAsDelivered(deal)}
                    className="w-full py-3 rounded-xl bg-[#00D9FF] hover:bg-[#00c5e6] text-[#0b1b33] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <CheckCircle2 size={16} />
                    <span>Marcar como Entregado</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <ShieldCheck size={16} />
                    <span>Entrega registrada con éxito</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
