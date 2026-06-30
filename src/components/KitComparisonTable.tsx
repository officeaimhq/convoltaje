import { useState } from "react";
import { Check, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ECOPOWER_KITS } from "@/lib/calculator";
import { WHATSAPP_NUMBERS } from "@/lib/products";
import { getKitWhatsAppLink } from "@/lib/whatsapp-messages";

type ViewMode = "table" | "cards";

export default function KitComparisonTable() {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedKit, setSelectedKit] = useState<string | null>(null);

  const handleWhatsAppClick = (kitId: string) => {
    const whatsappLink = getKitWhatsAppLink(kitId);
    window.open(whatsappLink, "_blank");
  };

  // Specifications for comparison
  const specs = [
    {
      label: "Potencia del Inversor",
      key: "inverter",
      unit: "kW",
      tooltip: "Potencia máxima que puede entregar el sistema",
    },
    {
      label: "Capacidad de Batería",
      key: "battery",
      unit: "kWh",
      tooltip: "Energía que puede almacenar la batería",
    },
    {
      label: "Consumo Diario Recomendado",
      key: "consumption",
      unit: "kWh",
      tooltip: "Rango de consumo diario ideal para este kit",
    },
    {
      label: "Paneles Solares Incluidos",
      key: "panels",
      unit: "unidades",
      tooltip: "Cantidad de paneles en el kit base",
    },
    {
      label: "Garantía de Paneles",
      key: "panelWarranty",
      unit: "años",
      tooltip: "Cobertura de garantía de los paneles solares",
    },
    {
      label: "Garantía de Batería",
      key: "batteryWarranty",
      unit: "años",
      tooltip: "Cobertura de garantía de la batería",
    },
    {
      label: "Tiempo de Instalación",
      key: "installation",
      unit: "días",
      tooltip: "Tiempo promedio de instalación",
    },
    {
      label: "Precio",
      key: "price",
      unit: "USD",
      tooltip: "Precio base del sistema",
    },
  ];

  // Get spec value for a kit
  const getSpecValue = (kit: typeof ECOPOWER_KITS[0], specKey: string) => {
    switch (specKey) {
      case "inverter":
        return kit.inverterPower.toString();
      case "battery":
        return kit.batteryCapacity.toString();
      case "consumption":
        return `${kit.minDailyConsumption}-${kit.maxDailyConsumption}`;
      case "panels":
        // Calculate based on inverter power
        if (kit.inverterPower <= 0.5) return "2";
        if (kit.inverterPower <= 3.6) return "4";
        if (kit.inverterPower <= 7.2) return "6";
        return "8";
      case "panelWarranty":
        return "25";
      case "batteryWarranty":
        return "5";
      case "installation":
        return "10-15";
      case "price":
        return `$${kit.price}`;
      default:
        return "-";
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <Info className="w-12 h-12 text-secondary mx-auto" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">
            Comparativa de Kits Solares
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto mb-8">
            Compara todas las especificaciones, características y precios de
            nuestros sistemas EcoPower para encontrar el perfecto para ti.
          </p>

          {/* View Mode Toggle */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={() => setViewMode("table")}
              variant={viewMode === "table" ? "default" : "outline"}
              className={`font-accent w-full sm:w-auto ${
                viewMode === "table"
                  ? "bg-secondary hover:bg-secondary/90"
                  : ""
              }`}
            >
              📊 Vista Tabla
            </Button>
            <Button
              onClick={() => setViewMode("cards")}
              variant={viewMode === "cards" ? "default" : "outline"}
              className={`font-accent w-full sm:w-auto ${
                viewMode === "cards"
                  ? "bg-secondary hover:bg-secondary/90"
                  : ""
              }`}
            >
              🎴 Vista Tarjetas
            </Button>
          </div>
        </div>

        {/* Table View */}
        {viewMode === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary/10 border-b-2 border-primary">
                  <th className="text-left p-4 font-accent text-foreground sticky left-0 bg-primary/10 z-10">
                    Especificación
                  </th>
                  {ECOPOWER_KITS.map((kit) => (
                    <th
                      key={kit.id}
                      className="p-4 font-accent text-foreground text-center min-w-40"
                    >
                      <div className="mb-2">{kit.name}</div>
                      <div className="text-sm text-secondary font-display">
                        ${kit.price}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, idx) => (
                  <tr
                    key={spec.key}
                    className={`border-b border-border ${
                      idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                  >
                    <td className="p-4 font-accent text-foreground sticky left-0 bg-inherit z-10">
                      <div className="flex items-center gap-2">
                        {spec.label}
                        <div
                          className="group relative cursor-help"
                          title={spec.tooltip}
                        >
                          <Info className="w-4 h-4 text-muted-foreground" />
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded whitespace-nowrap z-20">
                            {spec.tooltip}
                          </div>
                        </div>
                      </div>
                    </td>
                    {ECOPOWER_KITS.map((kit) => (
                      <td
                        key={`${kit.id}-${spec.key}`}
                        className="p-4 text-center text-foreground"
                      >
                        <span className="font-accent">
                          {getSpecValue(kit, spec.key)} {spec.unit}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Features Row */}
                <tr className="bg-secondary/10 border-b-2 border-secondary">
                  <td className="p-4 font-accent text-foreground sticky left-0 bg-secondary/10 z-10">
                    Características Principales
                  </td>
                  {ECOPOWER_KITS.map((kit) => (
                    <td key={`${kit.id}-features`} className="p-4">
                      <ul className="space-y-2 text-sm">
                        {kit.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                {/* CTA Row */}
                <tr>
                  <td className="p-4 font-accent text-foreground sticky left-0 bg-background z-10">
                    Acción
                  </td>
                  {ECOPOWER_KITS.map((kit) => (
                    <td key={`${kit.id}-cta`} className="p-4 text-center">
            <Button
              onClick={() => handleWhatsAppClick(kit.id)}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent"
            >
              💬 Solicitar Información
            </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Cards View */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECOPOWER_KITS.map((kit) => (
              <Card
                key={kit.id}
                className={`p-6 flex flex-col border-2 transition-all ${
                  selectedKit === kit.id
                    ? "border-secondary bg-secondary/5"
                    : "border-border hover:border-secondary/50"
                }`}
                onClick={() => setSelectedKit(selectedKit === kit.id ? null : kit.id)}
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="font-display text-xl text-primary mb-2">
                    {kit.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {kit.description}
                  </p>
                  <div className="text-3xl font-display text-secondary">
                    ${kit.price}
                  </div>
                  <p className="text-xs text-muted-foreground">USD</p>
                </div>

                {/* Key Specs */}
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span className="text-sm text-muted-foreground">
                      Inversor
                    </span>
                    <span className="font-accent text-foreground">
                      {kit.inverterPower} kW
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span className="text-sm text-muted-foreground">
                      Batería
                    </span>
                    <span className="font-accent text-foreground">
                      {kit.batteryCapacity} kWh
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span className="text-sm text-muted-foreground">
                      Consumo Ideal
                    </span>
                    <span className="font-accent text-foreground">
                      {kit.minDailyConsumption}-{kit.maxDailyConsumption} kWh
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <p className="font-accent text-sm text-foreground mb-2">
                    Incluye:
                  </p>
                  <ul className="space-y-2">
                    {kit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  onClick={() => handleWhatsAppClick(kit.id)}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent"
                >
                  Solicitar Información
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Recommendation Section */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-display text-lg text-primary mb-2">
                👨‍👩‍👧 Para Familias Pequeñas
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Apartamentos o casas con consumo bajo a medio.
              </p>
              <p className="font-accent text-secondary">
                Sistema Básico o Medio 3000W
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg text-primary mb-2">
                🏠 Para Casas Medianas
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Casas con consumo moderado, incluyendo aire acondicionado.
              </p>
              <p className="font-accent text-secondary">
                Sistema Aire Acondicionado 3000W o Avanzado 6000W
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg text-primary mb-2">
                🏢 Para Negocios y Casas Grandes
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Consumo alto, múltiples equipos, máxima autonomía.
              </p>
              <p className="font-accent text-secondary">
                Sistema 6K PLUS o Premium 10000W
              </p>
            </div>
          </div>
        </Card>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            ¿No estás seguro cuál elegir? Usa nuestra calculadora solar o
            habla con un experto.
          </p>
          <Button
            onClick={() => {
              const message =
                "Hola, necesito ayuda para elegir el kit solar adecuado.";
              const encodedMessage = encodeURIComponent(message);
              const whatsappUrl = `https://wa.me/5355507913?text=${encodedMessage}`;
              window.open(whatsappUrl, "_blank");
            }}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent px-8 py-3"
          >
            💬 Hablar con un Experto
          </Button>
        </div>
      </div>
    </section>
  );
}
