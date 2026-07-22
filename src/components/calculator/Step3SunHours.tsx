import { Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CUBA_REGIONS, CubaRegion } from "@/lib/cuba-regions";

interface Step3SunHoursProps {
  sunHours: number;
  onChange: (hours: number) => void;
}

const SUN_INTENSITY_LEVELS = [
  {
    range: "1-4h",
    label: "Bajo",
    description: "Días nublados, poca radiación",
    color: "bg-yellow-500/10 border-yellow-500/40 text-yellow-700 dark:text-yellow-400",
  },
  {
    range: "5-8h",
    label: "Medio (Cuba Promedio)",
    description: "Condiciones típicas de Cuba",
    color: "bg-orange-500/10 border-orange-500/40 text-orange-700 dark:text-orange-400",
  },
  {
    range: "9-12h",
    label: "Alto",
    description: "Días soleados, máxima radiación",
    color: "bg-amber-500/10 border-amber-500/40 text-amber-700 dark:text-amber-400",
  },
];

export default function Step3SunHours({
  sunHours,
  onChange,
}: Step3SunHoursProps) {
  const getSelectedRegionId = (): CubaRegion | null => {
    if (sunHours === 5) return "occidental";
    if (sunHours === 5.5) return "centro";
    if (sunHours === 6.5) return "oriente";
    return null;
  };

  const selectedRegionId = getSelectedRegionId();

  const getIntensityLevel = () => {
    if (sunHours <= 4) return 0;
    if (sunHours <= 8) return 1;
    return 2;
  };

  return (
    <div>
      <h3 className="font-display text-xl sm:text-2xl text-foreground mb-1">
        Paso 3: Horas de sol disponibles
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4">
        Selecciona tu región en el mapa oficial de Cuba o ajusta manualmente las horas de sol promedio diarias.
      </p>

      {/* Mapa Interactivo con la imagen oficial Mapa-cuba.png */}
      <div className="w-full bg-slate-900 dark:bg-slate-950 p-3 sm:p-4 rounded-xl shadow-inner border border-border/40 relative overflow-hidden mb-4">
        <div className="text-[10px] sm:text-xs text-slate-400 mb-2 font-accent font-medium flex items-center justify-between">
          <span>Mapa de Radiación Solar (Cuba)</span>
          <span className="text-secondary font-semibold">Toca una región en el mapa</span>
        </div>

        <div className="relative w-full rounded-lg overflow-hidden border border-white/10 group">
          {/* Imagen real del Mapa de Cuba */}
          <img
            src="/images/fotos-plantilla-convoltaje/Mapa-cuba.png"
            alt="Mapa de Cuba por Regiones"
            className="w-full h-auto object-cover select-none brightness-105 contrast-105"
          />

          {/* Superposición interactiva por regiones (Occidente 0-35%, Centro 35-68%, Oriente 68-100%) */}
          <div className="absolute inset-0 flex">
            {/* Región Occidente */}
            <button
              type="button"
              onClick={() => onChange(5)}
              className={`w-[35%] h-full transition-all duration-300 relative flex flex-col items-center justify-center p-2 group/occ ${
                selectedRegionId === 'occidental'
                  ? "bg-[#22c55e]/25 backdrop-brightness-110 ring-2 ring-inset ring-[#22c55e]"
                  : "hover:bg-[#22c55e]/15"
              }`}
            >
              <div
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-md ${
                  selectedRegionId === 'occidental'
                    ? "bg-[#22c55e] text-white scale-105 ring-2 ring-white"
                    : "bg-black/60 text-white/90 group-hover/occ:bg-[#22c55e] group-hover/occ:text-white"
                }`}
              >
                Occidente • 5.0h
              </div>
            </button>

            {/* Región Centro */}
            <button
              type="button"
              onClick={() => onChange(5.5)}
              className={`w-[33%] h-full transition-all duration-300 relative flex flex-col items-center justify-center p-2 group/cen ${
                selectedRegionId === 'centro'
                  ? "bg-[#3b82f6]/25 backdrop-brightness-110 ring-2 ring-inset ring-[#3b82f6]"
                  : "hover:bg-[#3b82f6]/15"
              }`}
            >
              <div
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-md ${
                  selectedRegionId === 'centro'
                    ? "bg-[#3b82f6] text-white scale-105 ring-2 ring-white"
                    : "bg-black/60 text-white/90 group-hover/cen:bg-[#3b82f6] group-hover/cen:text-white"
                }`}
              >
                Central • 5.5h
              </div>
            </button>

            {/* Región Oriente */}
            <button
              type="button"
              onClick={() => onChange(6.5)}
              className={`w-[32%] h-full transition-all duration-300 relative flex flex-col items-center justify-center p-2 group/ori ${
                selectedRegionId === 'oriente'
                  ? "bg-[#f59e0b]/25 backdrop-brightness-110 ring-2 ring-inset ring-[#f59e0b]"
                  : "hover:bg-[#f59e0b]/15"
              }`}
            >
              <div
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-md ${
                  selectedRegionId === 'oriente'
                    ? "bg-[#f59e0b] text-white scale-105 ring-2 ring-white"
                    : "bg-black/60 text-white/90 group-hover/ori:bg-[#f59e0b] group-hover/ori:text-white"
                }`}
              >
                Oriental • 6.5h
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Region Presets Cards */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {CUBA_REGIONS.map((region) => {
            const isSelected = selectedRegionId === region.id;
            const provList = region.provincias.map((p) => p.nombre).join(", ");

            return (
              <Card
                key={region.id}
                onClick={() => onChange(region.sunHours)}
                style={{
                  borderColor: isSelected ? region.color : `${region.color}40`,
                }}
                className={`p-3 cursor-pointer transition-all duration-200 border-2 rounded-lg ${
                  isSelected
                    ? "shadow-md bg-muted/30"
                    : "hover:bg-muted/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-accent text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                      style={{ backgroundColor: region.color }}
                    />
                    {region.nombre}
                  </span>
                  <span className="font-display text-sm font-bold text-primary">
                    {region.sunHours}h/día
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
                  {provList}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Manual Slider */}
      <div className="mb-4 bg-muted/20 p-3 rounded-lg border border-border/60">
        <h4 className="font-accent text-xs font-semibold text-primary mb-2">
          O ajusta manualmente:
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="12"
              step="0.5"
              value={sunHours}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
            />
            <div className="text-right min-w-16">
              <p className="font-display text-xl text-primary font-bold">
                {sunHours}h
              </p>
              <p className="text-[10px] text-muted-foreground">horas/día</p>
            </div>
          </div>

          {/* Intensity Level Indicator */}
          <div className="flex gap-2">
            {SUN_INTENSITY_LEVELS.map((level, idx) => (
              <div
                key={level.range}
                className={`flex-1 p-2 rounded-md border transition-all text-center ${
                  idx === getIntensityLevel()
                    ? `${level.color} font-semibold border-current`
                    : "bg-muted/50 border-border text-muted-foreground"
                }`}
              >
                <p className="text-xs font-accent">{level.label}</p>
                <p className="text-[10px] opacity-80">{level.range}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <Card className="p-3 bg-primary/10 border-primary/20">
        <div className="flex gap-2.5 items-start">
          <Sun className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-accent text-foreground font-semibold mb-0.5">
              Horas de sol en Cuba
            </p>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Cuba recibe entre 5.0 y 6.5 horas de radiación solar útil promedio según la región. Este valor se utiliza para calcular la potencia fotovoltaica requerida.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
