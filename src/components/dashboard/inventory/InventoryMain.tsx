import { Package, Search, Plus, Filter, AlertTriangle, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useInventoryStore } from '@/hooks/useInventoryStore';

export default function InventoryMain() {
  const { items } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col font-sans">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Almacén e Inventario</h2>
          <p className="text-white/60 text-sm">Control de stock, equipos e insumos.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por código o nombre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00D9FF] transition-colors w-full md:w-64"
            />
          </div>
          <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
            <Filter size={18} />
          </button>
          <button className="bg-[#00D9FF] hover:bg-[#00b8d9] text-[#0b1b33] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-[#00D9FF]/20">
            <Plus size={16} />
            <span className="hidden sm:inline">Añadir Producto</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Tabla de Inventario */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm flex flex-col pb-16">
        <div className="overflow-x-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 bg-[#0d233a] z-10 shadow-md shadow-black/20">
              <tr className="border-b border-white/10 text-white/50 text-xs uppercase font-semibold">
                <th className="p-4 w-[15%]">Código / SKU</th>
                <th className="p-4 w-[30%]">Producto</th>
                <th className="p-4 w-[15%]">Categoría</th>
                <th className="p-4 w-[10%] text-center">Stock</th>
                <th className="p-4 w-[15%] text-right">Precio Venta</th>
                <th className="p-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => {
                const isLowStock = item.stock <= item.minStock;
                return (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 text-white/60 font-mono text-sm">{item.code}</td>
                    <td className="p-4 text-white font-medium text-sm">{item.name}</td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`font-mono font-bold text-sm ${isLowStock ? 'text-[#FFB800]' : 'text-[#00FF66]'}`}>
                          {item.stock}
                        </span>
                        {isLowStock && <AlertTriangle size={14} className="text-[#FFB800]" />}
                      </div>
                    </td>
                    <td className="p-4 text-right text-white font-mono text-sm">
                      ${item.salePrice.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <button className="text-white/30 hover:text-white p-1 rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/40 text-sm">
                    No se encontraron productos en el almacén.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
