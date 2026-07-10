import { useState } from 'react';
import { Calculator, Package, AlertTriangle, Cpu, BatteryCharging, Zap, Info, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Definición ampliada de electrodomésticos para uso interno basados en Obsidian
interface InternalApplianceConfig {
  name: string;
  defaultWatts: number;
  minWatts: number;
  maxWatts: number;
  defaultHours: number;
  category: string;
  icon: string;
}

const APPLIANCE_CATALOG: Record<string, InternalApplianceConfig> = {
  // Tecnología y Entretenimiento
  laptop: { name: "Laptop", defaultWatts: 65, minWatts: 50, maxWatts: 100, defaultHours: 4, category: "Tecnología", icon: "💻" },
  pc: { name: "PC de Escritorio", defaultWatts: 300, minWatts: 200, maxWatts: 500, defaultHours: 5, category: "Tecnología", icon: "🖥️" },
  tv: { name: "Televisor LED 55\"", defaultWatts: 100, minWatts: 60, maxWatts: 150, defaultHours: 6, category: "Tecnología", icon: "📺" },
  console: { name: "Consola de Videojuegos", defaultWatts: 150, minWatts: 70, maxWatts: 200, defaultHours: 3, category: "Tecnología", icon: "🎮" },
  phone: { name: "Carga de Celular", defaultWatts: 15, minWatts: 5, maxWatts: 25, defaultHours: 3, category: "Tecnología", icon: "📱" },
  moto: { name: "Carga de Moto Eléctrica 🛵", defaultWatts: 800, minWatts: 300, maxWatts: 1500, defaultHours: 5, category: "Tecnología", icon: "🛵" },

  // Hogar y Climatización
  ac_split: { name: "Split Aire Acondicionado ❄️", defaultWatts: 1200, minWatts: 900, maxWatts: 3500, defaultHours: 8, category: "Climatización", icon: "❄️" },
  ac_window: { name: "Aire de Ventana", defaultWatts: 1500, minWatts: 1000, maxWatts: 2000, defaultHours: 8, category: "Climatización", icon: "🔲" },
  fan: { name: "Ventilador 💨", defaultWatts: 75, minWatts: 50, maxWatts: 100, defaultHours: 12, category: "Climatización", icon: "💨" },
  fridge: { name: "Refrigerador (Freezer) 🧊", defaultWatts: 250, minWatts: 150, maxWatts: 400, defaultHours: 24, category: "Hogar", icon: "🧊" },
  led: { name: "Luces LED 💡", defaultWatts: 10, minWatts: 5, maxWatts: 20, defaultHours: 8, category: "Hogar", icon: "💡" },

  // Cocina y Alimentos
  induction: { name: "Cocina de Inducción 🔥", defaultWatts: 2200, minWatts: 2000, maxWatts: 3500, defaultHours: 1, category: "Cocina", icon: "🔥" },
  microwave: { name: "Microondas ⏲️", defaultWatts: 1000, minWatts: 800, maxWatts: 1200, defaultHours: 0.5, category: "Cocina", icon: "⏲️" },
  rice_cooker: { name: "Olla Arrocera 🍚", defaultWatts: 450, minWatts: 300, maxWatts: 600, defaultHours: 0.5, category: "Cocina", icon: "🍚" },
  multicooker: { name: "Olla Multiusos 🍲", defaultWatts: 800, minWatts: 500, maxWatts: 1000, defaultHours: 1, category: "Cocina", icon: "🍲" },
  blender: { name: "Batidora 🥤", defaultWatts: 400, minWatts: 300, maxWatts: 800, defaultHours: 0.2, category: "Cocina", icon: "🥤" },

  // Lavandería y Aseo
  washer: { name: "Lavadora 🧺", defaultWatts: 400, minWatts: 300, maxWatts: 500, defaultHours: 1.5, category: "Aseo", icon: "🧺" },
  iron: { name: "Plancha de Ropa 👔", defaultWatts: 1400, minWatts: 1000, maxWatts: 1800, defaultHours: 0.5, category: "Aseo", icon: "👔" },
  hairdryer: { name: "Secador de Pelo 💇‍♀️", defaultWatts: 1600, minWatts: 1000, maxWatts: 2000, defaultHours: 0.2, category: "Aseo", icon: "💇‍♀️" },
  hair_iron: { name: "Plancha de Pelo", defaultWatts: 100, minWatts: 50, maxWatts: 150, defaultHours: 0.5, category: "Aseo", icon: "💇‍♀️" },

  // Agua y Sistema Hidráulico
  water_heater: { name: "Calentador de Agua 🚿", defaultWatts: 2500, minWatts: 1500, maxWatts: 4000, defaultHours: 1, category: "Hidráulico", icon: "🚿" },
  water_pump: { name: "Motor de Agua (Bomba) 💧", defaultWatts: 500, minWatts: 250, maxWatts: 750, defaultHours: 1, category: "Hidráulico", icon: "💧" },
  pressurizer: { name: "Presurizador ⚡", defaultWatts: 400, minWatts: 200, maxWatts: 600, defaultHours: 2, category: "Hidráulico", icon: "⚡" }
};

interface SelectedAppliance {
  id: string;
  key: string;
  name: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
  category: string;
  icon: string;
}

export default function CrmCalculator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tecnología");
  const [appliances, setAppliances] = useState<SelectedAppliance[]>([]);

  // Categorías de electrodomésticos
  const categories = Array.from(new Set(Object.values(APPLIANCE_CATALOG).map(a => a.category)));

  // Agregar un equipo del catálogo al listado activo
  const handleAdd = (key: string) => {
    const config = APPLIANCE_CATALOG[key];
    const isAdded = appliances.some(a => a.key === key);
    if (isAdded) return;

    const newApp: SelectedAppliance = {
      id: Date.now().toString() + Math.random().toString().substring(2, 6),
      key,
      name: config.name,
      watts: config.defaultWatts,
      quantity: 1,
      hoursPerDay: config.defaultHours,
      category: config.category,
      icon: config.icon
    };
    setAppliances(prev => [...prev, newApp]);
  };

  const handleUpdate = (id: string, updates: Partial<SelectedAppliance>) => {
    setAppliances(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleRemove = (id: string) => {
    setAppliances(prev => prev.filter(a => a.id !== id));
  };

  const clearAll = () => setAppliances([]);

  // Cálculos de potencia y consumo
  const totalDailyKwh = appliances.reduce((sum, a) => {
    return sum + (a.watts * a.quantity * a.hoursPerDay) / 1000;
  }, 0);

  const totalKwhWithSafety = totalDailyKwh * 1.3; // 30% factor de seguridad

  const peakConcurrentPowerWatts = appliances.reduce((sum, a) => {
    // Estimación empírica: sumamos el 100% de la carga base y el 70% de las cargas pesadas que suelen coincidir
    const factor = (a.category === "Climatización" || a.category === "Hidráulico") ? 0.8 : 0.5;
    return sum + (a.watts * a.quantity * factor);
  }, 0);

  // Mapeo automático de Kits basados en Convoltaje Catalog
  const getRecommendedKit = (kwh: number) => {
    if (kwh === 0) return null;
    if (kwh <= 2.0) return { name: "Sistema Básico - 1500W (Explorer 500)", price: 1745, details: "Inversor 500W, Batería 1kWh" };
    if (kwh <= 5.0) return { name: "Sistema Solar - Medio 3000W (Home 3600)", price: 2750, details: "Inversor 3.6kW, Batería 5.1kWh" };
    if (kwh <= 8.0) return { name: "Sistema Solar Aire Acondicionado 3000W", price: 3950, details: "Inversor 7.2kW, Batería 10.2kWh (Litio)" };
    if (kwh <= 12.0) return { name: "Sistema Avanzado 6000W (Flex 7200 Pro)", price: 5950, details: "Inversor 7.2kW, Batería 15.4kWh (Litio)" };
    if (kwh <= 15.0) return { name: "Sistema 6K PLUS", price: 6950, details: "Inversor 7.2kW, Batería 16.1kWh, 8 Paneles solares" };
    return { name: "Sistema Premium 10000W (Titan 12000)", price: 9850, details: "Inversor 12kW, Batería 15.4kWh, 12 Paneles solares" };
  };

  const recommendedKit = getRecommendedKit(totalKwhWithSafety);

  // Escanear cargas críticas para dar avisos comerciales
  const getCriticalAlerts = () => {
    const alerts: string[] = [];
    appliances.forEach(a => {
      if (a.key === 'moto') {
        alerts.push("🛵 Carga de Moto: Consume ~3-4kWh por recarga. Aconsejar al cliente cargarla SOLO de día con radiación solar directa para no drenar el banco de baterías.");
      }
      if (a.key === 'ac_split' || a.key === 'ac_window') {
        alerts.push("❄️ Aire Acondicionado: Requiere arranque pesado. Para uso nocturno continuo, aconsejar mínimo 10kWh de almacenamiento en Litio.");
      }
      if (a.key === 'induction' || a.key === 'water_heater') {
        alerts.push("🔥 Carga de Alto Consumo Calórico: Cocinas de inducción y calentadores térmicos demandan picos de 2kW-3.5kW de golpe. Requiere inversor Híbrido de 5kW o superior.");
      }
    });
    return alerts;
  };

  const criticalAlerts = getCriticalAlerts();

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Calculadora Técnica CRM</h2>
        <p className="text-white/60 text-xs">
          Herramienta interna de dimensionamiento técnico para comerciales de Convoltaje Cuba.
        </p>
      </div>

      {/* Selector de Categoría del Catálogo */}
      <div className="grid grid-cols-3 gap-1 bg-black/25 rounded-2xl p-1 border border-white/5 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl py-1.5 text-[10px] font-bold transition-all truncate
              ${selectedCategory === cat 
                ? 'bg-[#00D9FF] text-[#0b1b33] shadow-md' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Botones para agregar equipos del catálogo */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {Object.entries(APPLIANCE_CATALOG)
          .filter(([_, config]) => config.category === selectedCategory)
          .map(([key, config]) => {
            const isAdded = appliances.some(a => a.key === key);
            return (
              <button
                key={key}
                disabled={isAdded}
                onClick={() => handleAdd(key)}
                className={`py-2 px-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between group active:scale-[0.98]
                  ${isAdded 
                    ? 'bg-white/5 border-white/5 text-white/30 cursor-not-allowed' 
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/15 hover:border-white/20'
                  }`}
              >
                <div className="min-w-0 pr-1">
                  <p className="font-bold truncate">{config.icon} {config.name}</p>
                  <p className="text-[9px] text-white/50">{config.defaultWatts}W</p>
                </div>
                {!isAdded && <span className="text-[#00D9FF] text-xs font-bold">+</span>}
              </button>
            );
          })}
      </div>

      {/* Equipos Seleccionados */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">
            Equipos del Cliente ({appliances.length})
          </h3>
          {appliances.length > 0 && (
            <button 
              onClick={clearAll} 
              className="text-[10px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
            >
              <Trash2 size={10} />
              Limpiar todo
            </button>
          )}
        </div>

        {appliances.length > 0 ? (
          <div className="space-y-2">
            {appliances.map((app) => {
              const config = APPLIANCE_CATALOG[app.key];
              const dailyUsage = (app.watts * app.quantity * app.hoursPerDay) / 1000;

              return (
                <div 
                  key={app.id} 
                  className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{app.icon}</span>
                      {app.name}
                    </span>
                    <button 
                      onClick={() => handleRemove(app.id)}
                      className="text-white/40 hover:text-red-400 p-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Fila de controles de Potencia manual */}
                  <div className="grid grid-cols-2 gap-3 text-[10px] bg-black/20 p-2 rounded-xl border border-white/5">
                    
                    {/* Input Potencia Manual (W) */}
                    <div>
                      <span className="text-white/40 block mb-0.5">Potencia Ajustable</span>
                      <div className="flex items-center gap-1 font-mono">
                        <input 
                          type="number" 
                          min={config.minWatts}
                          max={config.maxWatts}
                          value={app.watts}
                          onChange={(e) => handleUpdate(app.id, { watts: Math.max(1, parseInt(e.target.value) || 0) })}
                          className="bg-white/10 border border-white/15 rounded-lg text-white font-bold px-1.5 py-0.5 text-center w-14 focus:outline-none focus:border-[#00D9FF]"
                        />
                        <span>W</span>
                        <span className="text-white/30 text-[8px]">({config.minWatts}-{config.maxWatts}W)</span>
                      </div>
                    </div>

                    {/* Consumo Calculado del Ítem */}
                    <div className="text-right">
                      <span className="text-white/40 block mb-0.5">Consumo Unitario</span>
                      <span className="font-mono text-white/90 font-bold">{dailyUsage.toFixed(2)} kWh/día</span>
                    </div>

                  </div>

                  {/* Fila de Controles de Cantidad y Horas */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    
                    {/* Control Cantidad */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/50">Cant:</span>
                      <div className="flex items-center bg-white/10 rounded-lg p-0.5">
                        <button 
                          onClick={() => handleUpdate(app.id, { quantity: Math.max(1, app.quantity - 1) })}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono">{app.quantity}</span>
                        <button 
                          onClick={() => handleUpdate(app.id, { quantity: app.quantity + 1 })}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>

                    {/* Control Horas */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/50">Uso:</span>
                      <div className="flex items-center bg-white/10 rounded-lg p-0.5">
                        <button 
                          onClick={() => handleUpdate(app.id, { hoursPerDay: Math.max(0.5, app.hoursPerDay - 0.5) })}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-10 text-center text-xs font-bold font-mono">{app.hoursPerDay}h</span>
                        <button 
                          onClick={() => handleUpdate(app.id, { hoursPerDay: Math.min(24, app.hoursPerDay + 0.5) })}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-white/30 text-xs py-12">
            No has seleccionado ningún electrodoméstico aún. Utiliza el catálogo de arriba para agregar los consumos del cliente.
          </div>
        )}
      </div>

      {/* Bloque de Resumen Técnico */}
      {appliances.length > 0 && (
        <div className="space-y-4">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3.5 backdrop-blur-md">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu size={12} className="text-[#00D9FF]" />
              Diagnóstico de Carga del Cliente
            </h4>

            {/* Métricas Rápidas */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/20 border border-white/5 rounded-xl p-3">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-0.5">Consumo Bruto</span>
                <span className="font-mono text-white/90 font-bold">{totalDailyKwh.toFixed(2)} kWh/día</span>
              </div>
              
              <div className="bg-black/20 border border-white/5 rounded-xl p-3">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-0.5">Consumo (+30% Seg)</span>
                <span className="font-mono text-[#00D9FF] font-bold">{totalKwhWithSafety.toFixed(2)} kWh/día</span>
              </div>
            </div>

            <div className="bg-black/20 border border-white/5 rounded-xl p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-[9px] uppercase tracking-wider">Pico de Potencia Simultáneo (Estimado)</span>
                <span className="font-mono text-yellow-400 font-bold">{(peakConcurrentPowerWatts / 1000).toFixed(2)} kW</span>
              </div>
              <p className="text-[9px] text-white/30 mt-1">Calculado con coeficientes de coincidencia comercial estándar de Convoltaje.</p>
            </div>
          </div>

          {/* Recomendación del Kit Comercial */}
          {recommendedKit && (
            <div className="bg-gradient-to-r from-[#00D9FF]/20 to-transparent border border-[#00D9FF]/30 rounded-2xl p-4 flex items-start gap-3">
              <Zap size={18} className="text-[#00D9FF] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] text-[#00D9FF] font-bold uppercase tracking-wider">Sistema Recomendado</span>
                <h4 className="text-sm font-bold text-white mt-0.5 leading-tight">{recommendedKit.name}</h4>
                <p className="text-[10px] text-white/60 mt-0.5">{recommendedKit.details}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-mono font-bold text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded-lg border border-[#00FF66]/15">
                    Ref: ${recommendedKit.price} USD
                  </span>
                  <span className="text-[9px] text-white/40">FOB Cuba</span>
                </div>
              </div>
            </div>
          )}

          {/* Alertas Críticas Comerciales */}
          {criticalAlerts.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-[9px] font-bold text-yellow-400/80 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={10} />
                Alertas Críticas de Operación
              </h5>
              <div className="space-y-1.5">
                {criticalAlerts.map((alert, idx) => (
                  <div key={idx} className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-2.5 text-yellow-300/90 text-[10px] leading-relaxed flex gap-2">
                    <span className="text-yellow-400 select-none">!</span>
                    <p>{alert}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
