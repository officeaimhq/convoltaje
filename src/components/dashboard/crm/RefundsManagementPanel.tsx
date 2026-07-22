import { useState } from 'react';
import { 
  RefreshCw, CheckCircle, XCircle, AlertTriangle, 
  Package, DollarSign, User, ShieldAlert, FileText, Check, X 
} from 'lucide-react';
import { useRefundsStore, Refund, MaterialStatus, RefundStatus } from '@/hooks/useRefundsStore';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useInventoryStore } from '@/hooks/useInventoryStore';
import { toast } from 'sonner';

interface RefundsManagementPanelProps {
  onRefundApproved?: (refund: Refund) => void;
}

export default function RefundsManagementPanel({ onRefundApproved }: RefundsManagementPanelProps) {
  const { refunds, approveRefund, rejectRefund } = useRefundsStore();
  const { items: inventoryItems, adjustStock } = useInventoryStore();
  const { currentUser } = useAuthStore();
  const [filter, setFilter] = useState<'todos' | 'pendiente' | 'aprobado' | 'rechazado'>('pendiente');

  // Estado local para dictámenes de material en edición antes de aprobar
  const [materialDecisions, setMaterialDecisions] = useState<Record<string, MaterialStatus>>({});
  const [activeModalRefund, setActiveModalRefund] = useState<Refund | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');

  // Filtrado de lista
  const filteredRefunds = refunds.filter(r => {
    if (filter === 'todos') return true;
    return r.status === filter;
  });

  // Métricas rápidas
  const totalRefundedUSD = refunds
    .filter(r => r.status === 'aprobado' || r.status === 'procesado')
    .reduce((acc, r) => acc + r.amount_to_refund, 0);

  const pendingCount = refunds.filter(r => r.status === 'pendiente').length;
  const reincorporatedCount = refunds.filter(r => r.material_status_decision === 'disponible' && r.status === 'aprobado').length;
  const mermaCount = refunds.filter(r => r.material_status_decision === 'merma' && r.status === 'aprobado').length;

  const handleSelectMaterialStatus = (refundId: string, status: MaterialStatus) => {
    setMaterialDecisions(prev => ({ ...prev, [refundId]: status }));
  };

  const handleOpenActionModal = (refund: Refund, type: 'approve' | 'reject') => {
    setActiveModalRefund(refund);
    setActionType(type);
    setResolutionNote(refund.resolution_notes || '');
  };

  const handleConfirmAction = () => {
    if (!activeModalRefund || !actionType) return;
    const reviewerName = currentUser?.name || "Dirección";
    const chosenMaterialStatus = materialDecisions[activeModalRefund.id] || activeModalRefund.material_status_decision;

    if (actionType === 'approve') {
      approveRefund(activeModalRefund.id, reviewerName, chosenMaterialStatus, resolutionNote);
      
      // Si el material está disponible, reincorporar stock al inventario
      if (chosenMaterialStatus === 'disponible') {
        const sysType = (activeModalRefund.system_type || '').toLowerCase();
        const matchedItem = inventoryItems.find(item => 
          sysType.includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(sysType)
        ) || inventoryItems[0];

        if (matchedItem) {
          adjustStock(matchedItem.id, 1);
          toast.success(`Reintegro APROBADO. Se reincorporó 1 unidad de "${matchedItem.name}" al almacén.`);
        } else {
          toast.success(`Reintegro por $${activeModalRefund.amount_to_refund} APROBADO correctamente.`);
        }
      } else if (chosenMaterialStatus === 'merma') {
        toast.warning(`Reintegro APROBADO. Material asentado como MERMA definitiva.`);
      } else {
        toast.success(`Reintegro por $${activeModalRefund.amount_to_refund} APROBADO.`);
      }
      
      if (onRefundApproved) {
        onRefundApproved({
          ...activeModalRefund,
          status: 'aprobado',
          material_status_decision: chosenMaterialStatus,
          material_decided_by: reviewerName
        });
      }
    } else {
      if (!resolutionNote.trim()) {
        toast.error("Por favor, especifica el motivo del rechazo.");
        return;
      }
      rejectRefund(activeModalRefund.id, reviewerName, resolutionNote);
      toast.error("Solicitud de reintegro rechazada.");
    }

    setActiveModalRefund(null);
    setActionType(null);
    setResolutionNote('');
  };

  return (
    <div className="w-full space-y-6 text-white">
      
      {/* Header con resumen métrico */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
          <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider block mb-1">Pendientes de Dictamen</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black font-mono text-[#00D9FF]">{pendingCount}</span>
            <AlertTriangle className="text-[#00D9FF]/60" size={20} />
          </div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
          <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider block mb-1">Total Devolución (USD)</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black font-mono text-red-400">${totalRefundedUSD.toLocaleString()}</span>
            <DollarSign className="text-red-400/60" size={20} />
          </div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
          <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider block mb-1">Material Reincorporado</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black font-mono text-emerald-400">{reincorporatedCount}</span>
            <Package className="text-emerald-400/60" size={20} />
          </div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
          <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider block mb-1">Mermas Registradas</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black font-mono text-amber-400">{mermaCount}</span>
            <ShieldAlert className="text-amber-400/60" size={20} />
          </div>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {(['pendiente', 'aprobado', 'rechazado', 'todos'] as const).map((tab) => {
            const isActive = filter === tab;
            const count = tab === 'todos' ? refunds.length : refunds.filter(r => r.status === tab).length;
            
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all flex items-center gap-1.5 active:scale-[0.97] ${
                  isActive 
                    ? 'bg-[#00D9FF] text-[#0b1b33] shadow-lg shadow-[#00D9FF]/20 font-black' 
                    : 'bg-white/5 hover:bg-white/10 text-white/60 border border-white/10'
                }`}
              >
                <span>{tab === 'pendiente' ? 'Pendientes' : tab === 'aprobado' ? 'Aprobados' : tab === 'rechazado' ? 'Rechazados' : 'Todos'}</span>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/20 font-mono">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de Reintegros */}
      <div className="space-y-4">
        {filteredRefunds.length > 0 ? (
          filteredRefunds.map(refund => {
            const currentMaterialDecision = materialDecisions[refund.id] || refund.material_status_decision;
            const isPending = refund.status === 'pendiente';

            return (
              <div 
                key={refund.id} 
                className={`p-5 rounded-2xl border backdrop-blur-md transition-all shadow-lg flex flex-col gap-4 ${
                  isPending 
                    ? 'bg-gradient-to-r from-red-500/10 via-white/5 to-white/5 border-red-500/30' 
                    : refund.status === 'aprobado' 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-white/5 border-white/10 opacity-75'
                }`}
              >
                {/* Header de la tarjeta */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        refund.status === 'pendiente' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        refund.status === 'aprobado' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {refund.status}
                      </span>
                      <span className="text-xs text-white/40 font-mono">
                        {new Date(refund.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <User size={16} className="text-[#00D9FF]" />
                      {refund.client_name || "Cliente CRM"}
                    </h4>
                    {refund.system_type && (
                      <p className="text-xs text-white/70 font-medium">{refund.system_type}</p>
                    )}
                    <p className="text-[11px] text-white/40">
                      Solicitado por: <span className="text-white/80 font-semibold">{refund.requested_by}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-white/40 uppercase tracking-wider block mb-0.5">Monto Solicitado</span>
                    <span className="text-2xl font-black font-mono text-red-400">
                      -${refund.amount_to_refund.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                {/* Selección y Dictamen del Material */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                    Dictamen de Estado del Material:
                  </span>

                  {isPending ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectMaterialStatus(refund.id, 'disponible')}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-start gap-2.5 ${
                          currentMaterialDecision === 'disponible'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30'
                            : 'bg-black/20 border-white/10 text-white/60 hover:bg-white/5'
                        }`}
                      >
                        <Package size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">Disponible</div>
                          <div className="text-[10px] font-normal text-white/50">Reingresa al inventario para reventa.</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectMaterialStatus(refund.id, 'merma')}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-start gap-2.5 ${
                          currentMaterialDecision === 'merma'
                            ? 'bg-red-500/20 border-red-500 text-red-300 ring-2 ring-red-500/30'
                            : 'bg-black/20 border-white/10 text-white/60 hover:bg-white/5'
                        }`}
                      >
                        <ShieldAlert size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">Merma / Pérdida</div>
                          <div className="text-[10px] font-normal text-white/50">Daño irreparable. Baja definitiva.</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectMaterialStatus(refund.id, 'revision_tecnica')}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-start gap-2.5 ${
                          currentMaterialDecision === 'revision_tecnica'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/30'
                            : 'bg-black/20 border-white/10 text-white/60 hover:bg-white/5'
                        }`}
                      >
                        <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">Revisión Técnica</div>
                          <div className="text-[10px] font-normal text-white/50">Requiere evaluación en taller.</div>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border capitalize flex items-center gap-2 ${
                        refund.material_status_decision === 'disponible' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' :
                        refund.material_status_decision === 'merma' ? 'bg-red-500/20 border-red-500/30 text-red-300' :
                        'bg-amber-500/20 border-amber-500/30 text-amber-300'
                      }`}>
                        <Package size={14} />
                        Dictamen: {refund.material_status_decision.replace('_', ' ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Notas de Resolución existentes */}
                {refund.resolution_notes && (
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5 text-xs text-white/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-white/40 block">Notas de Auditoría:</span>
                    <p className="leading-relaxed">{refund.resolution_notes}</p>
                    {refund.material_decided_by && (
                      <p className="text-[10px] text-white/40 pt-1 border-t border-white/5">
                        Dictaminado por: <strong className="text-white/70">{refund.material_decided_by}</strong>
                      </p>
                    )}
                  </div>
                )}

                {/* Acciones de Auditoría */}
                {isPending && (
                  <div className="flex justify-end items-center gap-3 pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => handleOpenActionModal(refund, 'reject')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all flex items-center gap-1.5 active:scale-[0.97]"
                    >
                      <XCircle size={14} />
                      Rechazar Solicitud
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenActionModal(refund, 'approve')}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-[#0b1b33] shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 active:scale-[0.97]"
                    >
                      <CheckCircle size={14} />
                      Aprobar Reintegro (${refund.amount_to_refund})
                    </button>
                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center text-white/40 text-xs py-16">
            No se encontraron reintegros para el filtro seleccionado.
          </div>
        )}
      </div>

      {/* Modal de Confirmación / Notas */}
      {activeModalRefund && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0b1b33] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className={`p-4 border-b border-white/10 flex items-center justify-between ${
              actionType === 'approve' ? 'bg-emerald-500/10' : 'bg-red-500/10'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${
                actionType === 'approve' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {actionType === 'approve' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {actionType === 'approve' ? 'Aprobar Reintegro' : 'Rechazar Solicitud'}
              </h3>
              <button 
                onClick={() => setActiveModalRefund(null)}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <p className="text-white/60 mb-0.5">Cliente:</p>
                <p className="font-bold text-white text-sm">{activeModalRefund.client_name || "Cliente CRM"}</p>
                <p className="font-mono text-red-400 font-bold text-base mt-1">
                  -${activeModalRefund.amount_to_refund.toLocaleString()} USD
                </p>
              </div>

              {actionType === 'approve' && (
                <div>
                  <p className="text-white/60 mb-1 font-bold">Dictamen del Material seleccionado:</p>
                  <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-emerald-300 font-bold capitalize">
                    {materialDecisions[activeModalRefund.id] || activeModalRefund.material_status_decision}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-white/70 font-bold block">
                  {actionType === 'approve' ? 'Notas de Aprobación / Auditoría (opcional):' : 'Motivo del Rechazo (obligatorio):'}
                </label>
                <textarea
                  rows={3}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder={actionType === 'approve' ? 'Detalla observaciones adicionales...' : 'Explica la razón del rechazo...'}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#00D9FF]"
                />
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-black/30 flex justify-end gap-2">
              <button
                onClick={() => setActiveModalRefund(null)}
                className="px-4 py-2 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white/60 text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-5 py-2 rounded-xl font-bold text-xs shadow-lg ${
                  actionType === 'approve'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-[#0b1b33]'
                    : 'bg-red-500 hover:bg-red-400 text-white'
                }`}
              >
                {actionType === 'approve' ? 'Confirmar Aprobación' : 'Confirmar Rechazo'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
