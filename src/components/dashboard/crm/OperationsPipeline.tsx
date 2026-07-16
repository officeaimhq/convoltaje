import { useState } from 'react';
import { useCrmStore, DealStage, ClientDeal } from '@/hooks/useCrmStore';
import { MessageSquare, Phone, Search, ArrowRight, User, Calendar, DollarSign, Edit3, Clipboard, RefreshCw, X } from 'lucide-react';
import { toast } from 'sonner';
import { useRefundsStore } from '@/hooks/useRefundsStore';
import { useAuthStore } from '@/hooks/useAuthStore';
import { generateOfferPdf } from '@/lib/pdf-offer-generator';
import { CONVOLTAJE_PRODUCTS as products } from '@/lib/products';
import { FileText } from 'lucide-react';

const STAGES: DealStage[] = ['Contacto', 'En Producción', 'Terminado', 'Facturado', 'Feedback'];

const STAGE_COLORS: Record<DealStage, string> = {
  'Contacto': 'bg-[#00D9FF] text-[#0b1b33]',
  'En Producción': 'bg-[#FFB800] text-[#0b1b33]',
  'Terminado': 'bg-[#00FF66] text-[#0b1b33]',
  'Facturado': 'bg-[#FF6B35] text-white',
  'Feedback': 'bg-white/20 text-white'
};

export default function OperationsPipeline() {
  const { deals, moveDeal } = useCrmStore();
  const { addRefund } = useRefundsStore();
  const { currentUser } = useAuthStore();
  const [activeStage, setActiveStage] = useState<DealStage>('Contacto');
  const [selectedDeal, setSelectedDeal] = useState<ClientDeal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para el Modal de Reintegro
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundMaterialStatus, setRefundMaterialStatus] = useState<'disponible' | 'merma' | 'revision_tecnica'>('disponible');

  // Filtrar clientes por etapa activa y término de búsqueda
  const stageDeals = deals.filter(d => d.stage === activeStage);
  const filteredDeals = stageDeals.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.phone.includes(searchTerm)
  );

  const handleStageChange = (dealId: string, newStage: DealStage) => {
    moveDeal(dealId, newStage);
    
    // Actualizar el cliente seleccionado en el estado local
    if (selectedDeal && selectedDeal.id === dealId) {
      setSelectedDeal({ ...selectedDeal, stage: newStage });
    }
    toast.success(`Cliente movido a ${newStage}`);
  };

  const getFeedbackStatus = (dateString: string) => {
    const installDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - installDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const daysLeft = 7 - diffDays;
    
    if (daysLeft > 0) {
      return { status: 'waiting', text: `⏳ En prueba (${daysLeft} días)` };
    }
    return { status: 'ready', text: '🟢 Pedir Reseña' };
  };

  const handleCreateRefund = () => {
    if (!selectedDeal || !currentUser) return;
    if (Number(refundAmount) <= 0) {
      toast.error("El monto debe ser mayor a 0");
      return;
    }

    addRefund({
      payment_id: "pay-unknown", // En un sistema real esto vendría de un pago seleccionado
      deal_id: selectedDeal.id,
      requested_by: currentUser.name,
      amount_to_refund: Number(refundAmount),
      status: 'pendiente',
      material_status_decision: refundMaterialStatus,
      material_decided_by: null
    });

    toast.success("Solicitud de reintegro enviada a la dirección.");
    setShowRefundModal(false);
    setRefundAmount('');
  };

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Pipeline de Clientes</h2>
        <p className="text-white/60 text-xs">
          Visualiza y organiza tus proyectos según su fase de progreso.
        </p>
      </div>

      {/* Input de Búsqueda */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
        <input 
          type="text" 
          placeholder="Buscar por nombre, proyecto o telf..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D9FF] transition-all w-full backdrop-blur-md"
        />
      </div>

      {/* Grid de Selector de Etapas (Cápsulas) */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {STAGES.map((stage) => {
          const count = deals.filter(d => d.stage === stage).length;
          const isActive = activeStage === stage;
          
          return (
            <button
              key={stage}
              onClick={() => {
                setActiveStage(stage);
                setSelectedDeal(null); // Resetear detalle
              }}
              className={`rounded-xl py-2.5 px-1 text-center border transition-all flex flex-col items-center justify-center gap-1
                ${isActive 
                  ? `${STAGE_COLORS[stage]} border-transparent font-bold shadow-lg shadow-black/20` 
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
            >
              <span className="text-[10px] uppercase tracking-wider font-semibold truncate max-w-full px-1">{stage}</span>
              <span className="text-xs font-mono font-bold bg-black/15 px-2 py-0.5 rounded-full">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Stack de Lista y Detalles */}
      <div className="space-y-6">
        
        {/* Lista de clientes para la etapa seleccionada */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Fase: {activeStage}</span>
            <span className="font-mono">{filteredDeals.length} de {stageDeals.length}</span>
          </h3>

          {filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {filteredDeals.map((deal) => (
                <button
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group active:scale-[0.99]
                    ${selectedDeal?.id === deal.id
                      ? 'bg-gradient-to-r from-[#00D9FF]/20 to-transparent border-[#00D9FF] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/80 font-bold text-sm flex-shrink-0">
                      {deal.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold truncate group-hover:text-[#00D9FF] transition-colors">{deal.name}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-white/55 truncate">{deal.company}</p>
                        {deal.stage === 'Feedback' && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                            getFeedbackStatus(deal.expectedDate).status === 'ready' 
                              ? 'bg-[#00FF66]/20 text-[#00FF66]' 
                              : 'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {getFeedbackStatus(deal.expectedDate).text}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 pl-2">
                    <span className="text-xs font-mono font-bold text-[#00FF66]">${deal.value.toLocaleString()}</span>
                    <p className="text-[9px] text-white/40 font-mono mt-0.5">{deal.expectedDate}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-white/30 text-xs">
              Sin clientes en esta fase.
            </div>
          )}
        </div>

        {/* Detalle del cliente seleccionado */}
        {selectedDeal && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#00D9FF]/10 flex items-center justify-center text-[#00D9FF] flex-shrink-0">
                  <User size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate leading-none mb-1">{selectedDeal.name}</h3>
                  <span className="text-xs text-white/55 font-mono">{selectedDeal.phone}</span>
                </div>
              </div>
              
              {/* Enlace directo a WhatsApp */}
              <a 
                href={`https://wa.me/${selectedDeal.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] rounded-xl hover:bg-[#25D366]/30 transition-all flex-shrink-0 active:scale-[0.97]"
              >
                <MessageSquare size={13} />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Detalles rápidos */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-white/40 block mb-0.5">Proyecto / Equipo</span>
                <span className="font-semibold text-white/90 block truncate">{selectedDeal.company}</span>
              </div>
              <div>
                <span className="text-white/40 block mb-0.5">Valor Estimado</span>
                <span className="font-mono font-bold text-[#00FF66]">${selectedDeal.value.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-white/40 block mb-0.5">Fecha de Inicio</span>
                <span className="font-mono font-semibold text-white/90 flex items-center gap-1">
                  <Calendar size={12} className="text-white/40" />
                  {selectedDeal.expectedDate}
                </span>
              </div>
              <div>
                <span className="text-white/40 block mb-0.5">Fase de Pipeline</span>
                <div className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mt-1 ${STAGE_COLORS[selectedDeal.stage]}`}>
                  {selectedDeal.stage}
                </div>
              </div>
            </div>

            {/* Notas del proyecto */}
            <div>
              <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Notas del Proyecto</span>
              <p className="text-xs text-white/80 leading-relaxed bg-black/20 rounded-xl p-3 border border-white/5 whitespace-pre-wrap">
                {selectedDeal.source || 'Sin notas adicionales.'}
              </p>
            </div>

            {/* Acciones Adicionales */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 justify-end">
              <button
                onClick={async () => {
                  // Buscar el producto en base al deal.company o usar uno por defecto para la demo
                  const product = products.find(p => p.name.includes(selectedDeal.company)) || products[0];
                  const clientData = {
                    name: selectedDeal.name,
                    phone: selectedDeal.phone,
                    date: new Date().toLocaleDateString('es-ES'),
                    reference: `REF-${Math.floor(Math.random() * 10000)}`
                  };
                  
                  try {
                    await generateOfferPdf(product, clientData, selectedDeal.stage === 'Terminado' || selectedDeal.stage === 'Facturado');
                    toast.success("Documento generado correctamente");
                  } catch (error) {
                    console.error("Failed to generate PDF:", error);
                    toast.error("Error al generar el documento");
                  }
                }}
                className="px-3 py-2 text-[10px] font-bold rounded-xl border border-[#00D9FF]/30 bg-[#00D9FF]/10 hover:bg-[#00D9FF]/20 text-[#00D9FF] transition-all flex items-center gap-1.5 active:scale-[0.96]"
              >
                <FileText size={12} />
                {selectedDeal.stage === 'Terminado' || selectedDeal.stage === 'Facturado' ? 'Generar Factura' : 'Generar Oferta'}
              </button>

              <button
                onClick={() => setShowRefundModal(true)}
                className="px-3 py-2 text-[10px] font-bold rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all flex items-center gap-1.5 active:scale-[0.96]"
              >
                <RefreshCw size={12} />
                Iniciar Reintegro
              </button>
            </div>

            {/* Cambiar etapa (Acción rápida) */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Cambiar fase del cliente:</span>
              <div className="flex flex-wrap gap-1.5">
                {STAGES.filter(s => s !== selectedDeal.stage).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => handleStageChange(selectedDeal.id, stage)}
                    className="px-2.5 py-1.5 text-[10px] font-bold rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-1 active:scale-[0.96]"
                  >
                    <span>Mover a {stage}</span>
                    <ArrowRight size={10} className="text-white/40" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL DE REINTEGRO */}
      {showRefundModal && selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0b1b33] border border-white/10 rounded-3xl w-full max-w-md flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-red-500/10">
              <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
                <RefreshCw size={16} /> Solicitar Reintegro
              </h3>
              <button 
                onClick={() => setShowRefundModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-white/60">Cliente:</p>
                <p className="text-sm font-bold text-white">{selectedDeal.name}</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-1">Monto a Devolver (CUP/USD)</label>
                <input 
                  type="number" 
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  placeholder="Ej. 1500"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono font-bold focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-1">Estado del Material Involucrado</label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setRefundMaterialStatus('disponible')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      refundMaterialStatus === 'disponible' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-white/60'
                    }`}
                  >
                    Disponible (Se puede revender inmediatamente)
                  </button>
                  <button
                    onClick={() => setRefundMaterialStatus('merma')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      refundMaterialStatus === 'merma' ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-white/60'
                    }`}
                  >
                    Merma (Daño irreparable, no revendible)
                  </button>
                  <button
                    onClick={() => setRefundMaterialStatus('revision_tecnica')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      refundMaterialStatus === 'revision_tecnica' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-white/5 border-white/10 text-white/60'
                    }`}
                  >
                    Revisión Técnica (Requiere diagnóstico antes de decidir)
                  </button>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end gap-3">
              <button 
                onClick={() => setShowRefundModal(false)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white/5 hover:bg-white/10 text-white/70"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateRefund}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-red-500 hover:bg-red-400 text-white shadow-lg flex items-center gap-2"
              >
                <RefreshCw size={14} /> Enviar Solicitud
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
