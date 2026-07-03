import { useState } from "react";
import { Zap, TrendingUp, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONVOLTAJE_PRODUCTS, WHATSAPP_NUMBERS } from "@/lib/products";

interface UpsellRecommendationsProps {
  dailyConsumption: number;
  kitPrice: number;
  onProductClick: (productId: string) => void;
}

export default function UpsellRecommendations({
  dailyConsumption,
  kitPrice,
  onProductClick,
}: UpsellRecommendationsProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((prev) => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    onProductClick(productId);
  };
  // Find complementary products based on consumption
  const getRecommendations = () => {
    const recommendations: typeof CONVOLTAJE_PRODUCTS = [];

    // If high consumption, recommend additional battery
    if (dailyConsumption > 8) {
      const batteryProducts = CONVOLTAJE_PRODUCTS.filter(
        (p) => p.category === "PowerStations"
      );
      recommendations.push(...batteryProducts.slice(0, 2));
    }

    // If medium consumption, recommend portable power station
    if (dailyConsumption > 3 && dailyConsumption <= 8) {
      const portableProducts = CONVOLTAJE_PRODUCTS.filter(
        (p) => p.category === "PowerStations" && p.price < 1500
      );
      recommendations.push(...portableProducts.slice(0, 1));
    }

    // Always recommend at least one PowerStation for emergencies
    if (recommendations.length === 0) {
      const basicPowerStation = CONVOLTAJE_PRODUCTS.find(
        (p) => p.id === "conv-7"
      );
      if (basicPowerStation) recommendations.push(basicPowerStation);
    }

    return recommendations.slice(0, 3); // Max 3 recommendations
  };

  const recommendations = getRecommendations();
  
  const selectedProducts = recommendations.filter(p => selectedProductIds.includes(p.id));
  const totalValue = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = Math.round((totalValue * 0.15) * 100) / 100; // 15% bundle discount

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-accent" />
        <h4 className="font-accent text-lg text-foreground">
          Productos Recomendados
        </h4>
      </div>

      <p className="text-sm text-muted-foreground">
        Complementa tu sistema con estos productos para mayor eficiencia:
      </p>

      <div className="space-y-3">
        {recommendations.map((product) => (
          <Card
            key={product.id}
            className="p-4 border-secondary/30 hover:border-secondary/60 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h5 className="font-accent text-foreground mb-1">
                  {product.name}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Zap className="w-3 h-3 text-secondary" />
                  <span className="text-xs text-secondary font-accent">
                    ${product.price} USD
                  </span>
                </div>
              </div>
              <Button
                onClick={() => toggleProduct(product.id)}
                variant={selectedProductIds.includes(product.id) ? "default" : "outline"}
                size="sm"
                className={selectedProductIds.includes(product.id) ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : "text-secondary hover:bg-secondary/10"}
              >
                {selectedProductIds.includes(product.id) ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Agregado
                  </>
                ) : (
                  "Agregar"
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Bundle Offer - Only show if something is selected */}
      {selectedProducts.length > 0 && (
        <Card className="p-4 bg-accent/10 border-accent/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-accent text-foreground mb-1">
              Oferta de Paquete
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Obtén un descuento del 15% si compras estos productos juntos:
            </p>
            <div className="space-y-1 text-sm mb-3">
              <div className="flex justify-between">
                <span>Precio del Sistema:</span>
                <span className="font-accent">${kitPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Productos Complementarios:</span>
                <span className="font-accent">${totalValue}</span>
              </div>
              <div className="border-t border-accent/30 pt-1 flex justify-between font-accent text-accent">
                <span>Descuento (15%):</span>
                <span>-${bundleDiscount}</span>
              </div>
              <div className="flex justify-between font-display text-lg text-accent">
                <span>Total:</span>
                <span>${(kitPrice + totalValue - bundleDiscount).toFixed(2)}</span>
              </div>
            </div>
            <Button
              onClick={() => {
                const message = `Hola, me interesa el paquete completo con descuento de 15%. Sistema + productos complementarios. Total: $${(kitPrice + totalValue - bundleDiscount).toFixed(2)}`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.convoltaje.replace(/\D/g, "")}?text=${encodedMessage}`;
                window.open(whatsappUrl, "_blank");
              }}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-accent"
            >
              Solicitar Paquete Completo
            </Button>
          </div>
        </div>
      </Card>
      )}
    </div>
  );
}
