import { useState } from "react";
import { CheckCircle, Download, RotateCcw, MessageCircle, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EcoPowerKit } from "@/lib/calculator";
import LeadCaptureModal from "../LeadCaptureModal";
import UpsellRecommendations from "../UpsellRecommendations";

interface Step4ResultsProps {
  dailyConsumption: number;
  monthlyConsumption: number;
  requiredPower: number;
  recommendedKit: EcoPowerKit | null;
  sunHours: number;
  onReset: () => void;
}

export default function Step4Results({
  dailyConsumption,
  monthlyConsumption,
  requiredPower,
  recommendedKit,
  sunHours,
  onReset,
}: Step4ResultsProps) {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showKitDetails, setShowKitDetails] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  return (
    <div>
      <h3 className="font-display text-xl md:text-2xl text-foreground mb-1 md:mb-2">
        Paso 4: Resultados y Recomendación
      </h3>
      <p className="text-xs md:text-base text-muted-foreground mb-3 md:mb-8">
        Aquí está el sistema solar perfecto para ti.
      </p>

      {/* Results Grid (2x2 on mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-8">
        <Card className="p-3 md:p-6 bg-secondary/10 border-secondary/20">
          <p className="text-xs md:text-sm text-muted-foreground mb-0.5 md:mb-1">
            Consumo Diario
          </p>
          <p className="font-display text-xl md:text-3xl text-secondary font-bold">
            {dailyConsumption.toFixed(2)} kWh
          </p>
        </Card>

        <Card className="p-3 md:p-6 bg-primary/10 border-primary/20">
          <p className="text-xs md:text-sm text-muted-foreground mb-0.5 md:mb-1">
            Consumo Mensual
          </p>
          <p className="font-display text-xl md:text-3xl text-primary font-bold">
            {monthlyConsumption.toFixed(2)} kWh
          </p>
        </Card>

        <Card className="p-3 md:p-6 bg-accent/10 border-accent/20">
          <p className="text-xs md:text-sm text-muted-foreground mb-0.5 md:mb-1">
            Potencia Requerida
          </p>
          <p className="font-display text-xl md:text-3xl text-accent font-bold">
            {requiredPower.toFixed(2)} kW
          </p>
        </Card>

        <Card className="p-3 md:p-6 bg-muted/50 border-border">
          <p className="text-xs md:text-sm text-muted-foreground mb-0.5 md:mb-1">
            Horas de Sol Usadas
          </p>
          <p className="font-display text-xl md:text-3xl text-foreground font-bold">
            {sunHours}h/día
          </p>
        </Card>
      </div>

      {/* Recommended Kit */}
      {recommendedKit && (
        <Card className="p-3 md:p-6 mb-3 md:mb-8 border-2 border-secondary bg-secondary/5">
          <div className="flex items-start gap-2.5 md:gap-4">
            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-secondary flex-shrink-0 mt-0.5 md:mt-1" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="font-display text-base md:text-2xl text-foreground font-bold truncate">
                  {recommendedKit.name}
                </h4>
                <span className="font-accent text-base md:text-2xl text-secondary font-bold shrink-0">
                  ${recommendedKit.price}
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 line-clamp-2 md:line-clamp-none">
                {recommendedKit.description}
              </p>

              {/* Technical specs & Features: Collapsible on mobile, always visible on desktop */}
              <div className={showKitDetails ? "block" : "hidden md:block"}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4 pt-2 md:pt-0 border-t md:border-t-0 border-border/50">
                  <div>
                    <p className="text-[11px] md:text-xs text-muted-foreground">Inversor</p>
                    <p className="font-accent text-sm md:text-lg text-primary font-semibold">
                      {recommendedKit.inverterPower} kW
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] md:text-xs text-muted-foreground">Batería</p>
                    <p className="font-accent text-sm md:text-lg text-primary font-semibold">
                      {recommendedKit.batteryCapacity} kWh
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs text-muted-foreground">Precio</p>
                    <p className="font-accent text-lg text-secondary font-semibold">
                      ${recommendedKit.price}
                    </p>
                  </div>
                </div>

                <div className="mb-2 md:mb-4">
                  <p className="text-xs md:text-sm font-accent text-foreground mb-1.5 md:mb-2 font-semibold">
                    Características:
                  </p>
                  <ul className="space-y-1">
                    {recommendedKit.features.map((feature, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                        <Zap className="w-3 h-3 text-secondary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile toggle for details */}
              <button
                type="button"
                onClick={() => setShowKitDetails(!showKitDetails)}
                className="md:hidden text-xs text-secondary hover:underline font-accent font-semibold flex items-center gap-1 mt-1"
              >
                {showKitDetails ? (
                  <>Ocultar detalles técnicos <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>Ver detalles técnicos <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 md:space-y-3 mb-3 md:mb-8">
        <Button
          onClick={() => setShowLeadModal(true)}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent text-sm md:text-lg py-3 md:py-6"
        >
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 shrink-0" />
          Solicitar este Sistema
        </Button>

        <Button
          onClick={() => setShowLeadModal(true)}
          variant="outline"
          className="w-full font-accent text-xs md:text-lg py-3 md:py-6"
        >
          <Download className="w-4 h-4 md:w-5 md:h-5 text-primary mr-2 shrink-0" />
          <span className="truncate">Descargar oferta generada por la calculadora</span>
        </Button>

        <Button
          onClick={onReset}
          variant="ghost"
          className="w-full font-accent text-xs md:text-lg py-3 md:py-6"
        >
          <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-2 shrink-0" />
          Reiniciar Cálculo
        </Button>
      </div>

      {/* Upsell Recommendations (Collapsible on Mobile) */}
      {recommendedKit && (
        <div className="mb-3 md:mb-8">
          <button
            type="button"
            onClick={() => setShowUpsell(!showUpsell)}
            className="md:hidden w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg text-xs font-accent font-semibold text-primary mb-2 transition-colors"
          >
            <span>{showUpsell ? "Ocultar recomendaciones adicionales" : "Ver recomendaciones adicionales"}</span>
            {showUpsell ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div className={showUpsell ? "block" : "hidden md:block"}>
            <UpsellRecommendations
              dailyConsumption={dailyConsumption}
              kitPrice={recommendedKit.price}
              onProductClick={(productId) => {
                console.log("Product clicked:", productId);
              }}
            />
          </div>
        </div>
      )}

      {/* Lead Capture Modal */}
      {showLeadModal && recommendedKit && (
        <LeadCaptureModal
          kit={recommendedKit}
          dailyConsumption={dailyConsumption}
          onClose={() => setShowLeadModal(false)}
        />
      )}
    </div>
  );
}

