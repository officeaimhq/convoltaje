import { useState } from 'react';
import { useCrmStore, DealStage, ClientDeal } from '@/hooks/useCrmStore';
import { MoreHorizontal, Plus, Search } from 'lucide-react';

const STAGES: DealStage[] = ['Contacto', 'En Producción', 'Terminado', 'Facturado', 'Feedback'];

const STAGE_COLORS: Record<DealStage, string> = {
  'Contacto': 'bg-[#00D9FF] text-[#0b1b33]',
  'En Producción': 'bg-[#FFB800] text-[#0b1b33]',
  'Terminado': 'bg-[#00FF66] text-[#0b1b33]',
  'Facturado': 'bg-[#FF6B35] text-white',
  'Feedback': 'bg-white/20 text-white'
};

export default function OperationsPipeline() {
  const { deals, addDeal } = useCrmStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeals = deals.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col font-sans">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Pipeline de Operaciones</h2>
          <p className="text-white/60 text-sm">Gestiona el ciclo de vida de los clientes y proyectos.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00D9FF] transition-colors w-full md:w-64"
            />
          </div>
          <button className="bg-[#00D9FF] hover:bg-[#00b8d9] text-[#0b1b33] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-[#00D9FF]/20">
            <Plus size={16} />
            <span className="hidden sm:inline">Nuevo Cliente</span>
          </button>
        </div>
      </div>

      {/* Pipeline Container (Estilo Monday agrupado verticalmente) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-6 pb-20">
        
        {STAGES.map(stage => {
          const stageDeals = filteredDeals.filter(d => d.stage === stage);
          
          return (
            <div key={stage} className="flex flex-col gap-2">
              {/* Encabezado del Grupo */}
              <div className="flex items-center gap-2 mb-2">
                <div className={`px-3 py-1 rounded text-xs font-bold ${STAGE_COLORS[stage]}`}>
                  {stage}
                </div>
                <span className="text-white/40 text-sm font-medium">{stageDeals.length} Cliente{stageDeals.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Contenedor de la tabla del grupo */}
              {stageDeals.length > 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-white/50 text-xs uppercase font-semibold">
                          <th className="p-3 w-10"></th>
                          <th className="p-3 w-[25%]">Cliente / Proyecto</th>
                          <th className="p-3 w-[15%]">Estado</th>
                          <th className="p-3 w-[20%]">Contacto</th>
                          <th className="p-3 w-[15%]">Fecha Esperada</th>
                          <th className="p-3 w-[15%]">Valor (USD)</th>
                          <th className="p-3 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {stageDeals.map((deal, idx) => (
                          <tr key={deal.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                            <td className="p-3 text-white/30 text-xs text-center">{idx + 1}</td>
                            <td className="p-3">
                              <div className="flex flex-col">
                                <span className="text-white font-medium text-sm truncate">{deal.name}</span>
                                <span className="text-[#00D9FF]/70 text-xs truncate">{deal.company}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${STAGE_COLORS[stage]}`}>
                                {deal.stage}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex flex-col">
                                <span className="text-white/80 text-xs">{deal.phone}</span>
                                <span className="text-white/40 text-xs truncate">{deal.email}</span>
                              </div>
                            </td>
                            <td className="p-3 text-white/80 text-sm">
                              {deal.expectedDate}
                            </td>
                            <td className="p-3 text-white font-mono font-medium">
                              ${deal.value.toLocaleString()}
                            </td>
                            <td className="p-3">
                              <button className="text-white/30 hover:text-white p-1 rounded transition-colors opacity-0 group-hover:opacity-100">
                                <MoreHorizontal size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="w-full border border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center text-white/30 text-sm">
                  Sin clientes en esta fase
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}
