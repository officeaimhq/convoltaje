import { useState } from "react";
import { CheckCircle, Download, RotateCcw, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EcoPowerKit } from "@/lib/calculator";
import { generatePDF } from "@/lib/pdf-generator";
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

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    if (!recommendedKit) return;
    setIsGenerating(true);
    try {
      const pdfBlob = await generatePDF({
        clientName: "Cliente",
        clientPhone: "No especificado",
        clientEmail: "No especificado",
        kit: recommendedKit,
        dailyConsumption,
        purchaseType: "unitaria",
      });

      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Prefactura_Estimada_${recommendedKit.name.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <h3 className="font-display text-2xl text-foreground mb-2">
        Paso 4: Resultados y Recomendación
      </h3>
      <p className="text-muted-foreground mb-8">
        Aquí está el sistema solar perfecto para ti.
      </p>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6 bg-secondary/10 border-secondary/20">
          <p className="text-sm text-muted-foreground mb-1">
            Consumo Diario
          </p>
          <p className="font-display text-3xl text-secondary">
            {dailyConsumption.toFixed(2)} kWh
          </p>
        </Card>

        <Card className="p-6 bg-primary/10 border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">
            Consumo Mensual
          </p>
          <p className="font-display text-3xl text-primary">
            {monthlyConsumption.toFixed(2)} kWh
          </p>
        </Card>

        <Card className="p-6 bg-accent/10 border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">
            Potencia Requerida
          </p>
          <p className="font-display text-3xl text-accent">
            {requiredPower.toFixed(2)} kW
          </p>
        </Card>

        <Card className="p-6 bg-muted/50 border-border">
          <p className="text-sm text-muted-foreground mb-1">
            Horas de Sol Usadas
          </p>
          <p className="font-display text-3xl text-foreground">
            {sunHours}h/día
          </p>
        </Card>
      </div>

      {/* Recommended Kit */}
      {recommendedKit && (
        <Card className="p-6 mb-8 border-2 border-secondary bg-secondary/5">
          <div className="flex items-start gap-4 mb-4">
            <CheckCircle className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-display text-2xl text-foreground mb-1">
                {recommendedKit.name}
              </h4>
              <p className="text-muted-foreground mb-4">
                {recommendedKit.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Inversor</p>
                  <p className="font-accent text-lg text-primary">
                    {recommendedKit.inverterPower} kW
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Batería</p>
                  <p className="font-accent text-lg text-primary">
                    {recommendedKit.batteryCapacity} kWh
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Precio</p>
                  <p className="font-accent text-lg text-secondary">
                    ${recommendedKit.price}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-accent text-foreground mb-2">
                  Características:
                </p>
                <ul className="space-y-1">
                  {recommendedKit.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Zap className="w-3 h-3 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 mb-8">
        <Button
          onClick={() => setShowLeadModal(true)}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent text-lg py-6"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Solicitar este Sistema
        </Button>

        <Button
          onClick={handleGeneratePDF}
          variant="outline"
          className="w-full font-accent text-lg py-6"
          disabled={isGenerating || !recommendedKit}
        >
          <Download className="w-5 h-5 mr-2" />
          {isGenerating ? "Generando PDF..." : "Descargar Prefactura PDF"}
        </Button>

        <Button
          onClick={onReset}
          variant="ghost"
          className="w-full font-accent text-lg py-6"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reiniciar Cálculo
        </Button>
      </div>

      {/* Upsell Recommendations */}
      {recommendedKit && (
        <UpsellRecommendations
          dailyConsumption={dailyConsumption}
          kitPrice={recommendedKit.price}
          onProductClick={(productId) => {
            console.log("Product clicked:", productId);
          }}
        />
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
