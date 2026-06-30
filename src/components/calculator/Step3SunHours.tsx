import { Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CALCULATOR_CONSTANTS } from "@/lib/calculator";

interface Step3SunHoursProps {
  sunHours: number;
  onChange: (hours: number) => void;
}

const REGION_PRESETS = [
  {
    name: "Occidente",
    hours: CALCULATOR_CONSTANTS.REGIONAL_SUN_HOURS.occidente,
    description: "Pinar del Río, Artemisa",
  },
  {
    name: "Centro",
    hours: CALCULATOR_CONSTANTS.REGIONAL_SUN_HOURS.centro,
    description: "La Habana, Matanzas, Villa Clara",
  },
  {
    name: "Oriente",
    hours: CALCULATOR_CONSTANTS.REGIONAL_SUN_HOURS.oriente,
    description: "Camagüey, Las Tunas, Holguín, Santiago",
  },
];

const SUN_INTENSITY_LEVELS = [
  {
    range: "1-4h",
    label: "Bajo",
    description: "Días nublados, poca radiación",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    range: "5-8h",
    label: "Medio (Cuba Promedio)",
    description: "Condiciones típicas de Cuba",
    color: "bg-orange-100 border-orange-300",
  },
  {
    range: "9-12h",
    label: "Alto",
    description: "Días soleados, máxima radiación",
    color: "bg-amber-100 border-amber-300",
  },
];

export default function Step3SunHours({
  sunHours,
  onChange,
}: Step3SunHoursProps) {
  const getIntensityLevel = () => {
    if (sunHours <= 4) return 0;
    if (sunHours <= 8) return 1;
    return 2;
  };

  return (
    <div>
      <h3 className="font-display text-2xl text-foreground mb-2">
        Paso 3: Horas de sol disponibles
      </h3>
      <p className="text-muted-foreground mb-8">
        Selecciona tu región o ajusta manualmente las horas de sol promedio que
        recibes diariamente.
      </p>

      {/* Region Presets */}
      <div className="mb-8">
        <h4 className="font-accent text-sm text-primary mb-3">
          Selecciona tu región:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {REGION_PRESETS.map((region) => (
            <Card
              key={region.name}
              onClick={() => onChange(region.hours)}
              className={`p-4 cursor-pointer transition-all border-2 ${
                sunHours === region.hours
                  ? "border-secondary bg-secondary/10"
                  : "border-border hover:border-secondary/50"
              }`}
            >
              <p className="font-accent text-foreground">{region.name}</p>
              <p className="text-sm text-muted-foreground">
                {region.description}
              </p>
              <p className="text-lg font-display text-primary mt-2">
                {region.hours}h/día
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Manual Slider */}
      <div className="mb-8">
        <h4 className="font-accent text-sm text-primary mb-4">
          O ajusta manualmente:
        </h4>
        <div className="space-y-4">
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
            <div className="text-right min-w-20">
              <p className="font-display text-2xl text-primary">
                {sunHours}h
              </p>
              <p className="text-xs text-muted-foreground">horas/día</p>
            </div>
          </div>

          {/* Intensity Level Indicator */}
          <div className="flex gap-2">
            {SUN_INTENSITY_LEVELS.map((level, idx) => (
              <div
                key={level.range}
                className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                  idx === getIntensityLevel()
                    ? level.color
                    : "bg-muted border-border"
                }`}
              >
                <p className="text-xs font-accent text-foreground">
                  {level.label}
                </p>
                <p className="text-xs text-muted-foreground">{level.range}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <Card className="p-4 bg-primary/10 border-primary/20">
        <div className="flex gap-3">
          <Sun className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-accent text-foreground mb-1">
              Horas de sol en Cuba
            </p>
            <p className="text-xs text-muted-foreground">
              Cuba recibe entre 5-7 horas de radiación solar útil promedio. Este
              valor se usa para calcular la potencia requerida de paneles
              solares.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
