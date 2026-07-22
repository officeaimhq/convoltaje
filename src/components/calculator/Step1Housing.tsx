import { Home, Building2, Store } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HousingType, HOUSING_BASE_CONSUMPTION } from "@/lib/calculator";

interface Step1HousingProps {
  selected: HousingType | null;
  onSelect: (type: HousingType) => void;
}

const HOUSING_OPTIONS: Array<{
  type: HousingType;
  label: string;
  icon: React.ReactNode;
  description: string;
  baseConsumption: number;
}> = [
  {
    type: "apartamento",
    label: "Apartamento",
    icon: <Building2 className="w-8 h-8 shrink-0" />,
    description: "Vivienda en edificio o complejo",
    baseConsumption: HOUSING_BASE_CONSUMPTION.apartamento,
  },
  {
    type: "casa",
    label: "Casa",
    icon: <Home className="w-8 h-8 shrink-0" />,
    description: "Casa unifamiliar o residencia",
    baseConsumption: HOUSING_BASE_CONSUMPTION.casa,
  },
  {
    type: "negocio",
    label: "Negocio",
    icon: <Store className="w-8 h-8 shrink-0" />,
    description: "Comercio o pequeña empresa",
    baseConsumption: HOUSING_BASE_CONSUMPTION.negocio,
  },
];

export default function Step1Housing({ selected, onSelect }: Step1HousingProps) {
  return (
    <div>
      <h3 className="font-display text-xl sm:text-2xl text-foreground mb-1">
        Paso 1: ¿Qué tipo de vivienda tienes?
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        El consumo base incluye iluminación general y pequeños electrodomésticos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {HOUSING_OPTIONS.map((option) => (
          <Card
            key={option.type}
            onClick={() => onSelect(option.type)}
            className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
              selected === option.type
                ? "border-secondary bg-secondary/10 shadow-md"
                : "border-border hover:border-secondary/50"
            }`}
          >
            <div className="flex flex-row items-center gap-3 text-left">
              <div
                className={`shrink-0 ${
                  selected === option.type ? "text-secondary" : "text-primary"
                }`}
              >
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-accent text-base font-semibold text-foreground leading-tight">
                  {option.label}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {option.description}
                </p>
                <div className="mt-1.5 bg-primary/10 rounded px-2.5 py-0.5 inline-block">
                  <p className="text-xs font-accent text-primary font-medium">
                    Consumo base: {option.baseConsumption} kWh/día
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
