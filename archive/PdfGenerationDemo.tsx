import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { usePdfGeneration } from "@/hooks/usePdfGeneration";
import PdfLoadingOverlay from "./PdfLoadingOverlay";
import PdfConfirmationModal from "./PdfConfirmationModal";
import type { QuotationData } from "@/lib/pdf-templates";

/**
 * Demo component showing PDF generation flow
 * This can be integrated into the calculator results or product pages
 */
export default function PdfGenerationDemo() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastQuotation, setLastQuotation] = useState<QuotationData | null>(null);

  const { isLoading, progress, generateAndDownloadPDF } = usePdfGeneration({
    onSuccess: () => {
      setShowConfirmation(true);
    },
  });

  const handleGeneratePDF = async () => {
    // Example quotation data
    const quotationData: QuotationData = {
      quotationNumber: `CONV-${new Date().getTime()}`,
      customerName: "Juan Pérez García",
      customerEmail: "juan@example.com",
      customerPhone: "+53 55 14 40 97",
      kitName: "EcoPower Sistema Básico",
      kitPrice: 5000,
      kitSpecs: {
        inverterPower: 3,
        batteryCapacity: 10,
        minConsumption: 15,
        maxConsumption: 25,
      },
      complementaryProducts: [
        {
          name: "Panel Solar Adicional 400W",
          price: 800,
          quantity: 2,
        },
        {
          name: "Batería LiFePO4 5kWh",
          price: 2000,
          quantity: 1,
        },
      ],
      subtotal: 1000000, // $10,000 en centavos
      discount: 150000, // $1,500 en centavos
      discountPercentage: 15,
      total: 850000, // $8,500 en centavos
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    setLastQuotation(quotationData);
    await generateAndDownloadPDF(
      quotationData,
      `prefactura-${quotationData.quotationNumber}.html`
    );
  };

  const handleShare = () => {
    if (!lastQuotation) return;

    const message = `Hola, te comparto mi prefactura: ${lastQuotation.quotationNumber}. Total: $${(lastQuotation.total / 100).toFixed(2)} USD`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5355144097?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Loading Overlay */}
      <PdfLoadingOverlay
        isVisible={isLoading}
        progress={progress}
        message="Generando prefactura profesional..."
      />

      {/* Confirmation Modal */}
      {lastQuotation && (
        <PdfConfirmationModal
          isOpen={showConfirmation}
          quotationNumber={lastQuotation.quotationNumber}
          customerName={lastQuotation.customerName}
          total={lastQuotation.total}
          onClose={() => setShowConfirmation(false)}
          onDownload={handleGeneratePDF}
          onShare={handleShare}
        />
      )}

      {/* Demo Card */}
      <Card className="p-6 border-2 border-dashed border-primary/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <FileText className="w-6 h-6 text-primary" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              Generar Prefactura
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Haz clic en el botón para generar una prefactura profesional con
              identidad de marca Convoltaje. Se mostrará una animación de carga
              y un mensaje de confirmación al completarse.
            </p>

            <Button
              onClick={handleGeneratePDF}
              disabled={isLoading}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              {isLoading ? "Generando..." : "Generar PDF Demo"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Features List */}
      <Card className="p-6">
        <h4 className="font-semibold text-foreground mb-4">
          Características Incluidas:
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Animación de carga con barra de progreso
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Modal de confirmación con detalles
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Descarga automática del PDF
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Compartir por WhatsApp
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Diseño profesional con branding
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Manejo de errores con mensajes claros
          </li>
        </ul>
      </Card>
    </div>
  );
}
