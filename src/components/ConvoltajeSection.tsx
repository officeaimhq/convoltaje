import { useRef, useEffect } from "react";
import { CONVOLTAJE_PRODUCTS, WHATSAPP_NUMBERS, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface ConvoltajeSectionProps {
  onRef?: (ref: HTMLElement | null) => void;
  onCalculatorClick?: () => void;
  onViewDetails?: (product: Product) => void;
}

export default function ConvoltajeSection({ onRef, onCalculatorClick, onViewDetails }: ConvoltajeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  return (
    <section
      id="catalogo"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30"
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
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 md:p-8 lg:p-12 text-center text-white">
          <h3 className="font-display text-2xl lg:text-3xl mb-4">
            ¿Necesitas una solución personalizada?
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Usa nuestra Calculadora Solar Inteligente y descubre en minutos qué sistema se ajusta exactamente a tus necesidades.
          </p>
          <Button
            onClick={onCalculatorClick}
            className="w-full sm:w-auto font-accent text-base md:text-lg px-8 py-6 neon-btn"
          >
            <Calculator className="w-5 h-5 mr-2 flex-shrink-0" />
            Usar Calculadora Solar
          </Button>
        </div>
      </div>
    </section>
  );
}
