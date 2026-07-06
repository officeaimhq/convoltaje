import { Zap, Tv2, Wind, Refrigerator, Lightbulb, Smartphone, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  onWhatsappClick: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
}: ProductCardProps) {

  // Parse supports to icons
  const getSupportIcons = () => {
    if (!product.supports) return null;
    const s = product.supports.toLowerCase();
    const icons = [];
    if (s.includes("aire acondicionado")) icons.push(<span key="wind" title="Aire acondicionado"><Wind className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("nevera") || s.includes("refrigerador")) icons.push(<span key="fridge" title="Nevera"><Refrigerator className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("tv") || s.includes("televisor")) icons.push(<span key="tv" title="Televisor"><Tv2 className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("luces") || s.includes("led")) icons.push(<span key="lights" title="Luces LED"><Lightbulb className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("celular") || s.includes("carga de equipos") || s.includes("celulares")) icons.push(<span key="phone" title="Celulares"><Smartphone className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("laptop")) icons.push(<span key="laptop" title="Laptops"><Laptop className="w-5 h-5 text-muted-foreground" /></span>);
    
    if (icons.length === 0) return null;
    
    return (
      <div className="flex gap-3 items-center mt-3 justify-center">
        {icons}
      </div>
    );
  };

  return (
    <div className="card-hover group relative bg-card rounded-xl overflow-hidden shadow-md border border-border transition-all duration-300 flex flex-col h-full text-center">
      {/* Image Section */}
      <div className="relative pt-6 pb-2 flex items-center justify-center bg-muted/5">
        {/* Circular Image Container */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center border-4 border-muted/20">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
              <Zap className="w-10 h-10 mb-1 opacity-20" />
            </div>
          )}
        </div>

        {/* Popular Badge */}
        {product.popular && (
          <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-accent flex items-center gap-1 z-10 shadow-sm">
            <Zap className="w-3 h-3" />
            Popular
          </div>
        )}

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-accent z-10 shadow-sm">
            -{product.discount}%
          </div>
        )}
        {/* Out of Stock Badge */}
        {product.outOfStock && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider z-20 shadow-lg whitespace-nowrap">
            Agotado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow items-center">
        <div className="w-full">
          <h3 className="font-accent text-lg font-bold text-foreground mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          {/* Appliance Icons */}
          {getSupportIcons()}
        </div>

        <div className="mt-4 w-full">
          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">USD</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => onViewDetails && onViewDetails(product)}
              className="w-full bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-black font-accent text-base py-5 btn-scale-active shadow-sm font-semibold"
            >
              {product.outOfStock ? "Consultar disponibilidad" : "COMPRAR"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
