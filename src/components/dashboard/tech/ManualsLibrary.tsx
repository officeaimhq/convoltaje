import { useState } from 'react';
import { BookOpen, Search, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import { CONVOLTAJE_PRODUCTS } from '@/lib/products';

interface ManualEntry {
  productName: string;
  nombre: string;
  url: string;
}

export default function ManualsLibrary() {
  const [searchTerm, setSearchTerm] = useState('');

  // Compilar la lista de todos los manuales asociados a los productos de Convoltaje
  const allManuals: ManualEntry[] = [];
  CONVOLTAJE_PRODUCTS.forEach(product => {
    if (product.manuals && product.manuals.length > 0) {
      product.manuals.forEach(manual => {
        allManuals.push({
          productName: product.name,
          nombre: manual.nombre,
          url: manual.url
        });
      });
    }
  });

  // Filtrar los manuales según el término de búsqueda
  const filteredManuals = allManuals.filter(manual => 
    manual.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    manual.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Biblioteca de Manuales</h2>
        <p className="text-white/60 text-xs">
          Base de datos interna de manuales y guías técnicas de equipos de Convoltaje.
        </p>
      </div>

      {/* Buscador de Manuales */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
        <input 
          type="text" 
          placeholder="Buscar por equipo o nombre del manual..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D9FF] transition-all w-full backdrop-blur-md"
        />
      </div>

      {/* Listado de Manuales */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Manuales Disponibles ({filteredManuals.length})</span>
        </h3>

        {filteredManuals.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5">
            {filteredManuals.map((manual, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col gap-2 relative overflow-hidden group shadow-md"
              >
                {/* Badge del Equipo */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 rounded-lg border border-[#00D9FF]/15">
                    {manual.productName}
                  </span>
                  <span className="text-[10px] text-white/30 font-mono">PDF</span>
                </div>

                {/* Título del Manual */}
                <h4 className="text-sm font-bold text-white pr-6 group-hover:text-[#00D9FF] transition-colors leading-tight">
                  {manual.nombre}
                </h4>

                {/* Acciones */}
                <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/5">
                  <span className="text-[10px] text-white/40 flex items-center gap-1">
                    <FileText size={10} />
                    Documentación Técnica
                  </span>
                  
                  <button
                    onClick={() => window.open(manual.url, "_blank")}
                    className="flex items-center gap-1 text-xs font-bold text-[#00D9FF] hover:text-[#00D9FF]/80 transition-colors"
                  >
                    <span>Abrir Documento</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-white/30 text-xs py-12">
            No se encontraron manuales con ese criterio de búsqueda.
          </div>
        )}
      </div>

    </div>
  );
}
