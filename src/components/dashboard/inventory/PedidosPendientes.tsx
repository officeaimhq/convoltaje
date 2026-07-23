import { useState } from "react";
import {
  PackageCheck, CheckCircle2, AlertCircle, MapPin, Phone, Calendar,
  Box, ShieldCheck, ArrowRight, Clock
} from "lucide-react";
import { useCrmStore, ClientDeal } from "@/hooks/useCrmStore";
import { useInventoryStore } from "@/hooks/useInventoryStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import { makeService } from "@/lib/services/makeService";
import { toast } from "sonner";

export default function PedidosPendientes() {
  const { deals, updateDeal, logOtActivity } = useCrmStore();
  const { items, reserveStock } = useInventoryStore();
  const { currentUser } = useAuthStore();
  const [filter, setFilter] = useState<'pending' | 'prepared'>('pending');

  // Filtrar OTs que estén listas para almacén o en producción
  const pendingOrders = deals.filter(
    (d) => d.stage === 'En Producción' && (d.substage === 'pendiente_almacen' || d.substage === 'levantamiento_completado' || !d.substage)
  );

  const preparedOrders = deals.filter(
    (d) => d.substage === 'almacen_preparado' || d.substage === 'en_transporte'
  );

  const currentList = filter === 'pending' ? pendingOrders : preparedOrders;

  const handlePrepareOrder = (deal: ClientDeal) => {
    try {
      const fromSubstage = deal.substage || 'pendiente_almacen';
      const toSubstage = 'almacen_preparado';
      const actorName = currentUser?.name || 'Almacenero';

      // 1. Reservar stock tentativo en almacén (sin descontar físico)
      if (deal.company) {
        const lowerName = deal.company.toLowerCase();
        items.forEach((item) => {
          if (lowerName.includes("inversor") && item.category === "Inversores") {
            reserveStock(item.id, 1);
          } else if (lowerName.includes("batería") && item.category === "Baterías") {
            reserveStock(item.id, 1);
          } else if (lowerName.includes("kit") && (item.category === "Accesorios" || item.category === "Estructuras")) {
            reserveStock(item.id, 2);
          }
        });
      }

      // 2. Actualizar la OT en el store del CRM
      updateDeal(deal.id, {
        substage: toSubstage,
      });

      // 3. Registrar en la línea de tiempo (Activity Log)
      logOtActivity(
        deal.id,
        "Preparó el pedido en Almacén (Stock Reservado)",
        `Insumos embalados y listos para la entrega del cliente ${deal.name}`,
        toSubstage,
        actorName,
        "almacenero"
      );

      // 4. Disparar webhook de automatizaciones (Make.com)
      makeService.dispatchOtSubstageEvent(
        deal.otRef || deal.id,
        fromSubstage,
        toSubstage,
        actorName
      );

      toast.success(`¡Pedido para ${deal.name} marcado como Preparado y Reservado!`);
    } catch (error) {
      console.error("Error preparando el pedido:", error);
      toast.error("Hubo un error al procesar la reserva en almacén.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Dynamic Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
            <Box size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Despacho de Pedidos por OT
            </h2>
            <p className="text-xs text-white/60">
              Vista exclusiva para Almacenero: prepara insumos y reserva stock antes de la salida.
            </p>
          </div>
        </div>

        <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'pending'
                ? "bg-[#00D9FF] text-[#0b1b33] shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Por Preparar ({pendingOrders.length})
          </button>
          <button
            onClick={() => setFilter('prepared')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'prepared'
                ? "bg-[#00D9FF] text-[#0b1b33] shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Preparados ({preparedOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {currentList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 bg-white/5 border border-white/10 rounded-xl text-center">
          <PackageCheck size={44} className="text-white/30 mb-2" />
          <h3 className="text-base font-bold text-white">
            {filter === 'pending' ? "No hay pedidos pendientes por preparar" : "Sin historial de pedidos preparados"}
          </h3>
          <p className="text-xs text-white/50 max-w-xs mt-1">
            {filter === 'pending'
              ? "Todas las órdenes de producción han sido atendidas por el almacén."
              : "No se han preparado paquetes de insumos recientemente."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentList.map((deal) => {
            const isPrepared = deal.substage === 'almacen_preparado' || deal.substage === 'en_transporte';
            const survey = deal.technicalSurvey;

            return (
              <div
                key={deal.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden backdrop-blur-md"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                        {deal.otRef || `OT-${deal.id.slice(0, 6)}`}
                      </span>
                      <span className="text-xs text-white/50 flex items-center gap-1">
                        <Calendar size={12} />
                        {deal.expectedDate || 'Sin fecha'}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">
                      {deal.name}
                    </h4>
                    <p className="text-xs text-[#00D9FF] font-semibold">
                      {deal.company} (${deal.value} USD)
                    </p>
                  </div>

                  <a
                    href={`tel:${deal.phone}`}
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all text-xs font-semibold flex items-center gap-1"
                  >
                    <Phone size={13} />
                    <span className="hidden sm:inline">Llamar</span>
                  </a>
                </div>

                {/* Delivery Address & Tech Survey Info */}
                <div className="text-xs text-white/80 space-y-1.5 bg-black/30 p-3 rounded-lg border border-white/5">
                  <div className="flex items-start gap-1.5">
                    <MapPin size={14} className="text-[#00D9FF] shrink-0 mt-0.5" />
                    <span className="break-words font-medium">
                      {deal.deliveryAddress || deal.address || "Dirección de instalación no especificada"}
                    </span>
                  </div>

                  {survey && (
                    <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-white/70 flex flex-wrap gap-x-3 gap-y-1">
                      <span><strong>Techo:</strong> {survey.roofType}</span>
                      <span><strong>Red:</strong> {survey.electricalGrid}</span>
                      <span><strong>Cable:</strong> {survey.cableDistanceMeters}m</span>
                    </div>
                  )}
                </div>

                {/* Status & Prepare Action */}
                {!isPrepared ? (
                  <button
                    onClick={() => handlePrepareOrder(deal)}
                    className="w-full py-2.5 rounded-lg bg-[#00D9FF] hover:bg-[#00c5e6] text-[#0b1b33] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md mt-1"
                  >
                    <PackageCheck size={16} />
                    <span>Marcar Pedido Preparado (Reservar Stock)</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold mt-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} />
                      <span>Insumos Reservados y Embalados</span>
                    </div>
                    <span className="text-[10px] text-green-300 font-mono">
                      {deal.substage}
                    </span>
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
