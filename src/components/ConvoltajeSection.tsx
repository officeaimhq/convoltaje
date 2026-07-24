import { useState, useRef, useEffect } from "react";
import { CONVOLTAJE_PRODUCTS, WHATSAPP_NUMBERS, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Calculator, Download, X } from "lucide-react";
import { generateKitComparisonPDF } from "@/lib/pdf-comparison-generator";
import { toast } from "sonner";

interface ConvoltajeSectionProps {
  onRef?: (ref: HTMLElement | null) => void;
  onCalculatorClick?: () => void;
  onViewDetails?: (product: Product) => void;
}

export default function ConvoltajeSection({ onRef, onCalculatorClick, onViewDetails }: ConvoltajeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const systemsProducts = CONVOLTAJE_PRODUCTS.filter(
    (p) => p.category === "Sistemas Solares Completos"
  );
  const powerstationProducts = CONVOLTAJE_PRODUCTS.filter(
    (p) => p.category === "PowerStations"
  );

  useEffect(() => {
    if (onRef) {
      onRef(sectionRef.current);
    }
  }, [onRef]);

  const handleWhatsappClick = (product: Product) => {
    const message = `Hola, me interesa el producto: *${product.name}* - $${product.price} USD. ¿Puedes darme más información?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.convoltaje.replace(/\D/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleToggleCompare = (product: Product) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 3) {
        toast.error("Máximo 3 kits para comparar en PDF. Desmarca uno primero.");
        return prev;
      }
      return [...prev, product.id];
    });
  };

  const handleDownloadComparisonPdf = async () => {
    const selectedProducts = CONVOLTAJE_PRODUCTS.filter((p) => selectedCompareIds.includes(p.id));
    if (selectedProducts.length === 0) return;

    try {
      setIsGeneratingPdf(true);
      toast.info("📄 Generando PDF comparativo...");
      const blob = await generateKitComparisonPDF(selectedProducts);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Comparativa-Kits-Convoltaje.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("✅ PDF comparativo descargado exitosamente.");
    } catch (err) {
      console.error("Error al generar PDF comparativo:", err);
      toast.error("Error al generar el PDF comparativo.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <section
      id="catalogo"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30 scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">
            ☀️ Convoltaje
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Energía confiable y personalizada. Paneles solares, baterías e
            inversores de última generación para tu hogar o negocio.
          </p>
          <div className="mt-6 inline-block bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-2">
            <p className="text-sm font-accent text-secondary">
              ⏱️ Instalación en 15 días (sujeta a disponibilidad del almacén)
            </p>
          </div>
        </div>

        {/* Sistemas Solares Completos */}
        <div className="mb-16">
          <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-8">
            Sistemas Solares Completos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemsProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={WHATSAPP_NUMBERS.convoltaje}
                onWhatsappClick={handleWhatsappClick}
                onViewDetails={onViewDetails}
                isComparing={selectedCompareIds.includes(product.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        </div>

        {/* PowerStations */}
        <div className="mb-12">
          <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-8">
            Plantas Eléctricas por Baterías (PowerStations)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {powerstationProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={WHATSAPP_NUMBERS.convoltaje}
                onWhatsappClick={handleWhatsappClick}
                onViewDetails={onViewDetails}
                isComparing={selectedCompareIds.includes(product.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Imagen de Samuel el Panel (Solo en Desktop - Lado Izquierdo) */}
          <div className="hidden lg:col-span-5 lg:flex justify-center items-center">
            <img 
              src="/images/como te ayudo.png" 
              alt="Samuel el Panel - ¿Cómo te ayudo?" 
              className="max-h-[350px] w-auto object-contain hover:scale-[1.03] transition-transform duration-300 drop-shadow-2xl"
            />
          </div>

          {/* Card Recuadro (Lado Derecho en Desktop) */}
          <div className="lg:col-span-7 bg-gradient-to-r from-primary to-primary/80 rounded-[24px] p-6 md:p-8 lg:p-10 text-center lg:text-left text-white flex flex-col justify-center shadow-lg border border-white/5 h-full">
            {/* Imagen de Samuel el Panel (Incrustada en Móvil - Parte Superior) */}
            <div className="block lg:hidden flex justify-center mb-6">
              <img 
                src="/images/como te ayudo.png" 
                alt="Samuel el Panel - ¿Cómo te ayudo?" 
                className="max-h-[220px] w-auto object-contain drop-shadow-xl"
              />
            </div>

            <h3 className="font-display text-2xl lg:text-3xl mb-4">
              ¿Necesitas una solución personalizada?
            </h3>
            <p className="text-base lg:text-lg mb-6 max-w-2xl opacity-90 leading-relaxed">
              Usa nuestra Calculadora Solar Inteligente y descubre en minutos qué sistema se ajusta exactamente a tus necesidades.
            </p>
            <div>
              <Button
                onClick={onCalculatorClick}
                className="w-full sm:w-auto font-accent text-base md:text-lg px-8 py-6 neon-btn"
              >
                <Calculator className="w-5 h-5 mr-2 flex-shrink-0" />
                Usar Calculadora Solar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bar para Descargar Comparativa PDF (Mobile-First) */}
      {selectedCompareIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F3A7D]/95 text-white border border-[#00D9FF]/40 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-[95vw] sm:max-w-md w-full justify-between animate-fade-in">
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#00D9FF]">
              Comparando {selectedCompareIds.length} kit{selectedCompareIds.length > 1 ? "s" : ""}
            </span>
            <span className="text-[10px] text-white/70 truncate">
              {CONVOLTAJE_PRODUCTS.filter((p) => selectedCompareIds.includes(p.id)).map((p) => p.name).join(" vs ")}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              disabled={isGeneratingPdf || selectedCompareIds.length < 2}
              onClick={handleDownloadComparisonPdf}
              className="bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-black text-xs font-bold px-3 py-1.5 h-auto rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Download size={14} />
              <span>{isGeneratingPdf ? "Generando..." : selectedCompareIds.length < 2 ? "Selecciona 2 o 3" : "Descargar PDF"}</span>
            </Button>

            <button
              onClick={() => setSelectedCompareIds([])}
              className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
              title="Limpiar selección"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
