import { Plus, Minus, X } from "lucide-react";
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
  return (
    <div>
      <h3 className="font-display text-2xl text-foreground mb-2">
        Paso 2: Selecciona tus equipos
      </h3>
      <p className="text-muted-foreground mb-8">
        Agrega los equipos que usas en tu hogar. Puedes ajustar la cantidad y
        horas de uso.
      </p>

      {/* Appliance Selection Grid */}
      <div className="mb-8 space-y-6">
        {APPLIANCE_CATEGORIES.map((category) => (
          <div key={category.name}>
            <h4 className="font-accent text-sm text-primary mb-3">
              {category.name}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {category.items.map((key) => {
                const appliance = DEFAULT_APPLIANCES[key];
                const isAdded = appliances.some(
                  (app) => app.name === appliance.name
                );

                return (
                  <Button
                    key={key}
                    onClick={() => onAdd(key)}
                    disabled={isAdded}
                    variant={isAdded ? "secondary" : "outline"}
                    className="justify-start text-left h-auto py-4 px-4 btn-scale-active"
                  >
                    <div className="flex flex-col gap-1 w-full">
                      <span className="font-accent text-sm">
                        {appliance.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {appliance.watts}W
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Appliances */}
      {appliances.length > 0 && (
        <div className="mb-8">
          <h4 className="font-accent text-lg text-foreground mb-4">
            Equipos Seleccionados
          </h4>
          <div className="space-y-3">
            {appliances.map((appliance) => {
              const dailyUsage =
                (appliance.watts *
                  appliance.quantity *
                  appliance.hoursPerDay) /
                1000;

              return (
                <Card
                  key={appliance.id}
                  className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="font-accent text-foreground">
                      {appliance.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appliance.watts}W × {appliance.quantity} × {appliance.hoursPerDay}h = {dailyUsage.toFixed(2)} kWh/día
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-muted rounded p-1">
                      <button
                        onClick={() =>
                          onUpdate(appliance.id, {
                            quantity: Math.max(1, appliance.quantity - 1),
                          })
                        }
                        className="hover:bg-primary/10 text-foreground transition-colors p-2 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-base font-accent">
                        {appliance.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdate(appliance.id, {
                            quantity: appliance.quantity + 1,
                          })
                        }
                        className="hover:bg-primary/10 text-foreground transition-colors p-2 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Hours Controls */}
                    {!appliance.locked && (
                      <div className="flex items-center gap-1 bg-muted rounded p-1">
                        <button
                          onClick={() =>
                            onUpdate(appliance.id, {
                              hoursPerDay: Math.max(
                                0.5,
                                appliance.hoursPerDay - 0.5
                              ),
                            })
                          }
                          className="hover:bg-primary/10 text-foreground transition-colors p-2 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-base font-accent">
                          {appliance.hoursPerDay}h
                        </span>
                        <button
                          onClick={() =>
                            onUpdate(appliance.id, {
                              hoursPerDay: Math.min(
                                24,
                                appliance.hoursPerDay + 0.5
                              ),
                            })
                          }
                          className="hover:bg-primary/10 text-foreground transition-colors p-2 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Remove Button */}
                    <Button
                      onClick={() => onRemove(appliance.id)}
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 h-10 w-10 shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Consumption Summary */}
      <Card className="p-4 bg-secondary/10 border-secondary/20">
        <p className="text-sm text-muted-foreground mb-1">
          Consumo diario calculado:
        </p>
        <p className="font-display text-2xl text-primary">
          {dailyConsumption.toFixed(2)} kWh/día
        </p>
      </Card>
    </div>
  );
}
