import { useState } from 'react';
import { useCrmStore, DealStage, ClientDeal } from '@/hooks/useCrmStore';
import { MessageSquare, Phone, Search, ArrowRight, User, Calendar, DollarSign, Edit3, Clipboard } from 'lucide-react';
import { toast } from 'sonner';

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
  const [activeStage, setActiveStage] = useState<DealStage>('Contacto');
  const [selectedDeal, setSelectedDeal] = useState<ClientDeal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
                      <p className="text-xs text-white/55 truncate">{deal.company}</p>
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

    </div>
  );
}
