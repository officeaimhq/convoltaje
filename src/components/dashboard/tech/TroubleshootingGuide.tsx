import { useState } from 'react';
import { AlertOctagon, HelpCircle, RefreshCw, Thermometer, ShieldAlert } from 'lucide-react';

interface ErrorItem {
  code: string;
  title: string;
  cause: string;
  solution: string;
  isCritical: boolean;
}

const errorCodes: ErrorItem[] = [
  {
    code: '01',
    title: 'Ventilador Bloqueado (Fan Locked)',
    cause: 'Polvo acumulado o aspas obstruidas en los ventiladores del disipador.',
    solution: 'Desconectar la alimentación (PV/Baterías). Limpiar con cuidado las aspas de los extractores usando aire comprimido o una brocha suave.',
    isCritical: true
  },
  {
    code: '03',
    title: 'Sobrecalentamiento del Transformador',
    cause: 'Temperatura interna extrema. Típico en climas cálidos (Cuba) por falta de ventilación en el cuarto técnico.',
    solution: 'Dejar enfriar el inversor. Instalar un extractor de aire en el local o mejorar el flujo de aire libre alrededor del chasis.',
    isCritical: true
  },
  {
    code: '04',
    title: 'Voltaje de Batería Alto',
    cause: 'Los parámetros de carga del inversor exceden el límite superior de la batería.',
    solution: 'Verificar los límites de voltaje (Menús 17, 18) y comprobar si el balanceador de celdas está operando correctamente.',
    isCritical: false
  },
  {
    code: '05',
    title: 'Voltaje de Batería Bajo (Deep Discharge)',
    cause: 'Las baterías se descargaron por debajo del umbral mínimo de seguridad.',
    solution: 'Desconectar consumos pesados. Cargar el banco usando la red eléctrica o un grupo electrógeno hasta recuperar el voltaje mínimo.',
    isCritical: false
  },
  {
    code: '06',
    title: 'Cortocircuito en Salida AC',
    cause: 'Un electrodoméstico o el cableado interno de la casa presenta un cortocircuito.',
    solution: 'Bajar todos los breakers de salida AC del inversor. Encender el inversor y subir uno a uno los breakers para identificar en qué circuito de la casa está la falla.',
    isCritical: true
  },
  {
    code: '07',
    title: 'Voltaje de Salida Alto / Sobrecarga',
    cause: 'El consumo instantáneo de la vivienda superó el límite de Watts del inversor.',
    solution: 'Desconectar los equipos de alto consumo. Apagar el interruptor rojo debajo del inversor, esperar 10 segundos, y volver a encender.',
    isCritical: true
  },
  {
    code: '08',
    title: 'Sobrecarga por Tiempo Límite',
    cause: 'Se mantuvo un consumo elevado cercano al límite durante varios minutos (ej. bomba de agua + plancha).',
    solution: 'Apagar las cargas pesadas. Apagar el interruptor rojo del inversor por 10 segundos para resetear la alerta y encender de nuevo.',
    isCritical: true
  },
  {
    code: '27',
    title: 'Sobrecalentamiento del Radiador',
    cause: 'El disipador de aluminio superó la temperatura máxima segura debido a calor externo elevado.',
    solution: 'Apagar cargas, dejar enfriar. Verificar que el inversor no esté expuesto a la luz solar directa ni en un espacio cerrado sin rejillas.',
    isCritical: true
  }
];

export default function TroubleshootingGuide() {
  const [selectedError, setSelectedError] = useState<ErrorItem | null>(null);

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Diagnóstico de Errores MUST</h2>
        <p className="text-white/60 text-xs">
          Guía rápida de códigos de fallo frecuentes de inversores en climas cálidos.
        </p>
      </div>

      {/* Grid of Error Codes (Buttons) */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {errorCodes.map((item) => (
          <button
            key={item.code}
            onClick={() => setSelectedError(item)}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center font-bold transition-all border 
              ${selectedError?.code === item.code 
                ? 'bg-[#00D9FF] text-[#0b1b33] border-[#00D9FF]' 
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
          >
            <span className="text-lg">F{item.code}</span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selectedError ? (
        <div className="bg-white/5 border border-[#00D9FF]/20 rounded-2xl p-5 backdrop-blur-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider 
              ${selectedError.isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
              {selectedError.isCritical ? 'Crítico' : 'Advertencia'}
            </span>
            <span className="text-white/40 text-xs font-mono">Error Code: {selectedError.code}</span>
          </div>

          <h3 className="text-base font-bold text-white">
            {selectedError.title}
          </h3>

          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldAlert size={12} className="text-[#00D9FF]" />
              Causa del Fallo
            </h4>
            <p className="text-xs text-white/80 leading-relaxed bg-black/20 rounded-xl p-3 border border-white/5">
              {selectedError.cause}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <RefreshCw size={12} className="text-[#00FF66]" />
              Instrucciones de Solución
            </h4>
            <p className="text-xs text-white/90 leading-relaxed bg-[#00FF66]/5 rounded-xl p-3 border border-[#00FF66]/20">
              {selectedError.solution}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-white/40 text-xs flex flex-col items-center justify-center py-12">
          <HelpCircle size={32} className="mb-2 text-white/30" />
          Selecciona un código de error de arriba para ver el diagnóstico y los pasos de solución.
        </div>
      )}

    </div>
  );
}
