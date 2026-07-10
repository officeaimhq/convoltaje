import { useState } from 'react';
import { Package, Search, AlertTriangle, TrendingUp, DollarSign, Calendar, Layers, ShieldAlert, ArrowRight } from 'lucide-react';
import { useInventoryStore, InventoryItem, ProductCategory } from '@/hooks/useInventoryStore';
import { useCrmStore } from '@/hooks/useCrmStore';

const CATEGORIES: ProductCategory[] = ['Inversores', 'Paneles Solares', 'Baterías', 'Estructuras', 'Accesorios'];

interface RequiredItem {
  code: string;
  qty: number;
}

// Función auxiliar para deducir qué materiales lleva cada tipo de proyecto
const getRequiredItems = (projectType: string): RequiredItem[] => {
  const clean = projectType.toLowerCase();
  
  if (clean.includes('kit solar 3kw')) {
    return [
      { code: 'INV-GROW-3KW', qty: 1 },
      { code: 'PAN-SUNP-400', qty: 6 },
      { code: 'BAT-ENPH-3', qty: 1 },
      { code: 'EST-ALU-COPLANAR', qty: 2 }
    ];
  }
  if (clean.includes('kit solar 5kw') || clean.includes('kit solar 6kw')) {
    return [
      { code: 'INV-DEYE-5KW', qty: 1 },
      { code: 'PAN-JA-500', qty: 10 },
      { code: 'BAT-PYLON-4.8', qty: 1 },
      { code: 'EST-ALU-COPLANAR', qty: 3 }
    ];
  }
  if (clean.includes('kit solar 10kw') || clean.includes('kit solar 8kw')) {
    return [
      { code: 'INV-SMA-10KW', qty: 1 },
      { code: 'PAN-TRINA-600', qty: 16 },
      { code: 'BAT-PYLON-4.8', qty: 2 },
      { code: 'EST-ALU-COPLANAR', qty: 4 }
    ];
  }
  if (clean.includes('kit solar 15kw')) {
    return [
      { code: 'INV-FRON-10KW', qty: 1 },
      { code: 'PAN-JINKO-550', qty: 24 },
      { code: 'BAT-LITH-10', qty: 2 },
      { code: 'EST-TRI-30DEG', qty: 6 }
    ];
  }
  if (clean.includes('inversor híbrido 5kw') || clean.includes('inversor solax 5kw')) {
    return [{ code: 'INV-DEYE-5KW', qty: 1 }];
  }
  if (clean.includes('inversor híbrido 8kw') || clean.includes('inversor huawei 8kw')) {
    return [{ code: 'INV-HUA-8KW', qty: 1 }];
  }
  if (clean.includes('inversor off-grid 3kw')) {
    return [{ code: 'INV-GROW-3KW', qty: 1 }];
  }
  if (clean.includes('inversor off-grid 5kw')) {
    return [{ code: 'INV-DEYE-5KW', qty: 1 }];
  }
  if (clean.includes('batería litio 48v') || clean.includes('batería pylontech')) {
    return [{ code: 'BAT-PYLON-4.8', qty: 1 }];
  }
  if (clean.includes('batería gel 12v x4')) {
    return [{ code: 'BAT-ENPH-3', qty: 4 }];
  }
  if (clean.includes('batería litio 10kwh')) {
    return [{ code: 'BAT-LITH-10', qty: 1 }];
  }
  if (clean.includes('paneles solares 500w x10')) {
    return [{ code: 'PAN-JA-500', qty: 10 }];
  }
  if (clean.includes('paneles solares 500w x12')) {
    return [{ code: 'PAN-JA-500', qty: 12 }];
  }
  if (clean.includes('paneles solares 500w x8')) {
    return [{ code: 'PAN-JA-500', qty: 8 }];
  }
  if (clean.includes('paneles solares 450w x20')) {
    return [{ code: 'PAN-CAN-450', qty: 20 }];
  }
  if (clean.includes('estructura montaje x20')) {
    return [{ code: 'EST-ALU-COPLANAR', qty: 5 }];
  }
  if (clean.includes('estructura montaje x15')) {
    return [{ code: 'EST-ALU-COPLANAR', qty: 4 }];
  }
  if (clean.includes('estructura montaje x10')) {
    return [{ code: 'EST-ALU-COPLANAR', qty: 3 }];
  }
  
  return [];
};

export default function InventoryMain() {
  const { items } = useInventoryStore();
  const { deals } = useCrmStore();
  
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('Inversores');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar ítems del almacén por categoría y término de búsqueda
  const categoryItems = items.filter(i => i.category === activeCategory);
  const filteredItems = categoryItems.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener compromisos de inventario basados en el plan de trabajo (clientes activos)
  // Contamos clientes en fase "Contacto" (planificados) y "En Producción" (en instalación)
  const activeDeals = deals.filter(d => d.stage === 'Contacto' || d.stage === 'En Producción');

  const getCommittedStock = (itemCode: string) => {
    let total = 0;
    const committedClients: Array<{ name: string; stage: string; date: string; qty: number }> = [];

    activeDeals.forEach(deal => {
      const requirements = getRequiredItems(deal.company);
      const req = requirements.find(r => r.code === itemCode);
      if (req) {
        total += req.qty;
        committedClients.push({
          name: deal.name,
          stage: deal.stage,
          date: deal.expectedDate,
          qty: req.qty
        });
      }
    });

    return { total, clients: committedClients };
  };

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Almacén e Inventario</h2>
        <p className="text-white/60 text-xs">
          Control de existencias y compromisos de material según obras activas.
        </p>
      </div>

      {/* Input de Búsqueda */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
        <input 
          type="text" 
          placeholder="Buscar por código o nombre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D9FF] transition-all w-full backdrop-blur-md"
        />
      </div>

      {/* Selector de Categorías (Pills/Tabs) */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 mb-6">
        {CATEGORIES.map((cat) => {
          const count = items.filter(i => i.category === cat).length;
          const isActive = activeCategory === cat;
          
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedItem(null); // Resetear detalle
              }}
              className={`rounded-xl py-2 px-1 text-center border transition-all flex flex-col items-center justify-center gap-0.5
                ${isActive 
                  ? 'bg-[#00D9FF] text-[#0b1b33] border-transparent font-bold shadow-lg shadow-black/20' 
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
            >
              <span className="text-[10px] font-semibold truncate max-w-full px-1">{cat === 'Paneles Solares' ? 'Paneles' : cat}</span>
              <span className="text-[10px] font-mono opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Stack de Lista y Detalles */}
      <div className="space-y-6">
        
        {/* Lista de productos de la categoría seleccionada */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Categoría: {activeCategory}</span>
            <span className="font-mono">{filteredItems.length} de {categoryItems.length}</span>
          </h3>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {filteredItems.map((item) => {
                const commitment = getCommittedStock(item.code);
                const available = item.stock - commitment.total;
                const isLow = item.stock <= item.minStock;
                const isShortage = available < 0;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between group active:scale-[0.99] h-[135px] relative overflow-hidden backdrop-blur-sm
                      ${selectedItem?.id === item.id
                        ? 'bg-gradient-to-br from-[#00D9FF]/20 to-transparent border-[#00D9FF] text-white shadow-lg shadow-[#00D9FF]/5'
                        : 'bg-white/5 border-white/10 text-white/85 hover:bg-white/10 hover:border-white/20'
                      }`}
                  >
                    {/* Header: Stock Counter Badge with Icon */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono border
                        ${isShortage 
                          ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                          : isLow 
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
                            : 'bg-white/10 text-white/80 border-white/10'
                        }`}
                      >
                        <Package size={10} className="flex-shrink-0" />
                        {isShortage ? `Déficit` : `${item.stock} uds`}
                      </span>
                    </div>

                    {/* Middle: Name & SKU */}
                    <div className="min-w-0 flex-1 flex flex-col justify-center mb-2">
                      <h4 className="text-xs font-bold leading-tight line-clamp-2 group-hover:text-[#00D9FF] transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[9px] text-white/40 font-mono mt-0.5 truncate">
                        {item.code}
                      </span>
                    </div>

                    {/* Footer: Price & Status */}
                    <div className="flex items-end justify-between w-full mt-auto pt-1 border-t border-white/5">
                      <span className="text-xs font-mono font-semibold text-white/90">
                        ${item.salePrice}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full 
                        ${isShortage ? 'bg-red-500 shadow-md shadow-red-500/50' : 
                          isLow ? 'bg-yellow-500 shadow-md shadow-yellow-500/50' : 
                          'bg-[#00FF66] shadow-md shadow-[#00FF66]/50'}`} 
                        title={isShortage ? 'Déficit' : isLow ? 'Stock Bajo' : 'Disponible'}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-white/30 text-xs">
              Sin productos registrados en esta categoría.
            </div>
          )}
        </div>

        {/* Detalle del producto seleccionado (Plan de Trabajo & Dependencias) */}
        {selectedItem && (() => {
          const commitment = getCommittedStock(selectedItem.code);
          const available = selectedItem.stock - commitment.total;
          const profit = selectedItem.salePrice - selectedItem.costPrice;
          const roi = ((profit / selectedItem.costPrice) * 100).toFixed(1);
          const isLow = selectedItem.stock <= selectedItem.minStock;
          const isShortage = available < 0;

          return (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-5 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Encabezado del Detalle */}
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="w-9 h-9 rounded-xl bg-[#00D9FF]/10 flex items-center justify-center text-[#00D9FF] flex-shrink-0">
                  <Package size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white leading-tight mb-0.5 truncate">{selectedItem.name}</h3>
                  <span className="text-[10px] text-white/40 font-mono">{selectedItem.code} ({selectedItem.category})</span>
                </div>
              </div>

              {/* Métricas Financieras rápidas */}
              <div className="grid grid-cols-3 gap-3 text-xs bg-black/10 rounded-2xl p-3 border border-white/5">
                <div className="text-center">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-0.5">Costo</span>
                  <span className="font-mono font-bold text-white/80">${selectedItem.costPrice}</span>
                </div>
                <div className="text-center border-x border-white/10">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-0.5">Venta</span>
                  <span className="font-mono font-bold text-white/90">${selectedItem.salePrice}</span>
                </div>
                <div className="text-center">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-0.5">Rentabilidad</span>
                  <span className="font-mono font-bold text-[#00FF66]">{roi}%</span>
                </div>
              </div>

              {/* Diagnóstico de Existencias Dependiendo de la Planificación */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert size={12} className="text-[#00D9FF]" />
                  Estado de Disponibilidad Técnica
                </h4>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  
                  {/* Stock físico real */}
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <span className="text-[9px] text-white/40 block mb-0.5">Stock Real</span>
                    <span className="text-base font-bold font-mono text-white">{selectedItem.stock}</span>
                  </div>

                  {/* Comprometido en la semana/mes */}
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <span className="text-[9px] text-white/40 block mb-0.5">Comprometido</span>
                    <span className="text-base font-bold font-mono text-[#FFB800]">{commitment.total}</span>
                  </div>

                  {/* Disponible Neto */}
                  <div className={`rounded-xl p-2.5 border ${isShortage ? 'bg-red-500/10 border-red-500/20' : 'bg-[#00FF66]/5 border-[#00FF66]/20'}`}>
                    <span className="text-[9px] text-white/40 block mb-0.5">Disponible</span>
                    <span className={`text-base font-bold font-mono ${isShortage ? 'text-red-400' : 'text-[#00FF66]'}`}>
                      {available}
                    </span>
                  </div>

                </div>

                {isShortage && (
                  <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/25 rounded-xl p-3 text-red-300 text-xs">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>¡Atención: Stock Insuficiente!</strong> La cantidad comprometida en la planificación supera el stock físico actual. Debes reabastecer {Math.abs(available)} unidades.
                    </p>
                  </div>
                )}
              </div>

              {/* Desglose de Clientes que Planificaron este Producto */}
              <div>
                <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#00D9FF]" />
                  Demanda por Plan de Trabajo
                </h4>

                {commitment.clients.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {commitment.clients.map((c, idx) => (
                      <div 
                        key={idx} 
                        className="bg-black/15 border border-white/5 rounded-xl p-2.5 flex items-center justify-between text-xs hover:bg-black/25 transition-colors"
                      >
                        <div className="min-w-0">
                          <span className="font-bold text-white block truncate">{c.name}</span>
                          <span className="text-[9px] text-white/40 font-mono flex items-center gap-1 mt-0.5">
                            Fase: {c.stage} · Fecha: {c.date}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0 pl-2">
                          <span className="font-bold font-mono text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 rounded-lg border border-[#00D9FF]/15">
                            {c.qty} ud{c.qty > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center text-white/40 text-xs py-6">
                    Ningún cliente activo tiene planificado este componente para esta semana o mes.
                  </div>
                )}
              </div>

            </div>
          );
        })()}

      </div>

    </div>
  );
}
