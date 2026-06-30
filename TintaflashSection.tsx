import { useRef, useEffect } from "react";
import { TINTAFLASH_PRODUCTS, WHATSAPP_NUMBERS, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { MessageCircle, Palette, Zap, Gift } from "lucide-react";

interface TintaflashSectionProps {
  onRef?: (ref: HTMLElement | null) => void;
}

export default function TintaflashSection({ onRef }: TintaflashSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onRef) {
      onRef(sectionRef.current);
    }
  }, [onRef]);

  const handleWhatsappClick = (product: Product) => {
    const message = `Hola, me interesa el producto: *${product.name}* - $${product.price} USD. ¿Puedes darme más información?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.tintaflash.replace(/\D/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-accent/5 relative"
      style={{
        backgroundImage: "url('/manus-storage/tintaflash-section-bg_633b31c7.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="text-5xl">🎨</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-accent mb-4">
            Tintaflash
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto mb-6">
            Personalización sin límites. Transforma tus ideas en productos
            únicos. Ropa, accesorios, decoración y regalos personalizados.
          </p>
          <div className="inline-block bg-accent/10 border border-accent/20 rounded-lg px-4 py-2">
            <p className="text-sm font-accent text-accent">
              ✨ Diseña y personaliza en minutos
            </p>
          </div>
        </div>

        {/* Features Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-border text-center">
            <Palette className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-accent text-lg text-foreground mb-2">
              Diseño Ilimitado
            </h3>
            <p className="text-sm text-muted-foreground">
              Crea con tus colores, fotos y mensajes favoritos
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-border text-center">
            <Zap className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-accent text-lg text-foreground mb-2">
              Entrega Rápida
            </h3>
            <p className="text-sm text-muted-foreground">
              Recibe tu pedido personalizado en poco tiempo
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-border text-center">
            <Gift className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-accent text-lg text-foreground mb-2">
              Regalos Perfectos
            </h3>
            <p className="text-sm text-muted-foreground">
              Sorprende con algo único y memorable
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-8">
            Nuestros Productos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TINTAFLASH_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={WHATSAPP_NUMBERS.tintaflash}
                onWhatsappClick={handleWhatsappClick}
              />
            ))}
          </div>
        </div>

        {/* Store Locations */}
        <div className="mb-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-border">
          <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-8 text-center">
            Ubicaciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="font-accent text-lg text-foreground mb-2">
                Tienda Principal
              </h4>
              <p className="text-muted-foreground">
                La Habana, Cuba
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Visítanos para ver nuestros productos en persona
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-accent text-lg text-foreground mb-2">
                Compra en Línea
              </h4>
              <p className="text-muted-foreground">
                Disponible en toda Cuba
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Entrega a domicilio en todo el país
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-8 lg:p-12 text-center text-white shadow-lg">
          <h3 className="font-display text-2xl lg:text-3xl mb-4">
            ¿Listo para personalizar?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Nuestro equipo de diseño está aquí para ayudarte a crear algo
            especial. Consulta sin compromiso.
          </p>
          <Button
            onClick={() => {
              const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.tintaflash.replace(/\D/g, "")}?text=${encodeURIComponent("Hola, me gustaría conocer más sobre los productos personalizados de Tintaflash.")}`;
              window.open(whatsappUrl, "_blank");
            }}
            className="bg-white hover:bg-white/90 text-accent font-accent text-lg px-8 py-6 btn-scale-active"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contactar Ahora por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
