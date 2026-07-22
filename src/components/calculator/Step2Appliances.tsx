import { useState } from "react";
import { Plus, Minus, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Appliance, DEFAULT_APPLIANCES } from "@/lib/calculator";

interface Step2AppliancesProps {
  appliances: Appliance[];
  onAdd: (key: string) => void;
  onUpdate: (id: string, updates: any) => void;
  onRemove: (id: string) => void;
  dailyConsumption: number;
}

const APPLIANCE_CATEGORIES = [
  {
    name: "Iluminación",
    items: ["led"],
  },
  {
    name: "Entretenimiento",
    items: ["tv"],
  },
  {
    name: "Climatización",
    items: ["fan", "ac"],
  },
  {
    name: "Electrodomésticos",
    items: ["fridge", "washer", "oven", "moto", "bomba"],
  },
  {
    name: "Tecnología",
    items: ["laptop", "phone", "router"],
  },
];

export default function Step2Appliances({
  appliances,
  onAdd,
  onUpdate,
  onRemove,
  dailyConsumption,
}: Step2AppliancesProps) {
  // Estado local para trackear categorías abiertas. Por defecto "Iluminación" abierta.
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    Iluminación: true,
  });

  const toggleCategory = (name: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div>
      <h3 className="font-display text-xl sm:text-2xl text-foreground mb-1">
        Paso 2: Selecciona tus equipos
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4">
        Agrega los equipos que usas en tu hogar. Puedes ajustar la cantidad y horas de uso.
      </p>

      {/* Appliance Selection Grid / Accordions */}
      <div className="mb-4 space-y-2">
        {APPLIANCE_CATEGORIES.map((category) => {
          const isOpen = !!openCategories[category.name];
          const addedCount = category.items.filter((key) => {
            const item = DEFAULT_APPLIANCES[key];
            return appliances.some((app) => app.name === item?.name);
          }).length;

          return (
            <div key={category.name} className="border border-border/80 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between p-2.5 bg-muted/40 hover:bg-muted/70 text-left transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-accent text-xs sm:text-sm font-semibold text-primary">
                    {category.name}
                  </span>
                  {addedCount > 0 && (
                    <span className="text-[10px] bg-secondary/20 text-secondary font-medium px-2 py-0.5 rounded-full">
                      {addedCount} {addedCount === 1 ? "agregado" : "agregados"}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-2.5 pt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-background">
                  {category.items.map((key) => {
                    const appliance = DEFAULT_APPLIANCES[key];
                    if (!appliance) return null;

                    const isAdded = appliances.some(
                      (app) => app.name === appliance.name
                    );

                    return (
                      <Button
                        key={key}
                        onClick={() => onAdd(key)}
                        disabled={isAdded}
                        variant={isAdded ? "secondary" : "outline"}
                        className="justify-between text-left h-auto py-2 px-3 btn-scale-active border"
                      >
                        <span className="font-accent text-xs font-medium truncate">
                          {appliance.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground shrink-0 ml-1">
                          {appliance.watts}W
                        </span>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Appliances */}
      {appliances.length > 0 && (
        <div className="mb-4">
          <h4 className="font-accent text-sm font-semibold text-foreground mb-2">
            Equipos Seleccionados ({appliances.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {appliances.map((appliance) => {
              const dailyUsage =
                (appliance.watts *
                  appliance.quantity *
                  appliance.hoursPerDay) /
                1000;

              return (
                <Card
                  key={appliance.id}
                  className="p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-border/80"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-accent text-xs sm:text-sm font-semibold text-foreground truncate">
                      {appliance.name}
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">
                      {appliance.watts}W × {appliance.quantity} × {appliance.hoursPerDay}h = <span className="font-medium text-primary">{dailyUsage.toFixed(2)} kWh/día</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-muted/60 rounded p-1">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdate(appliance.id, {
                            quantity: Math.max(1, appliance.quantity - 1),
                          })
                        }
                        className="hover:bg-primary/10 text-foreground transition-colors p-1 rounded"
                        title="Disminuir cantidad"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-xs font-accent font-semibold">
                        {appliance.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdate(appliance.id, {
                            quantity: appliance.quantity + 1,
                          })
                        }
                        className="hover:bg-primary/10 text-foreground transition-colors p-1 rounded"
                        title="Aumentar cantidad"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Hours Controls */}
                    {!appliance.locked && (
                      <div className="flex items-center gap-1 bg-muted/60 rounded p-1">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdate(appliance.id, {
                              hoursPerDay: Math.max(
                                0.5,
                                appliance.hoursPerDay - 0.5
                              ),
                            })
                          }
                          className="hover:bg-primary/10 text-foreground transition-colors p-1 rounded"
                          title="Disminuir horas"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-xs font-accent font-semibold">
                          {appliance.hoursPerDay}h
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdate(appliance.id, {
                              hoursPerDay: Math.min(
                                24,
                                appliance.hoursPerDay + 0.5
                              ),
                            })
                          }
                          className="hover:bg-primary/10 text-foreground transition-colors p-1 rounded"
                          title="Aumentar horas"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Remove Button */}
                    <Button
                      onClick={() => onRemove(appliance.id)}
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 h-7 w-7 shrink-0"
                      title="Eliminar equipo"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Consumption Summary */}
      <Card className="p-3 bg-secondary/10 border-secondary/20 flex items-center justify-between">
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          Consumo diario calculado:
        </span>
        <span className="font-display text-lg sm:text-xl text-primary font-bold">
          {dailyConsumption.toFixed(2)} kWh/día
        </span>
      </Card>
    </div>
  );
}
