import { Zap, Tv2, Wind, Refrigerator, Lightbulb, Smartphone, Laptop, Fan } from "lucide-react";
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
    if (s.includes("nevera") || s.includes("refrigerador")) icons.push(<span key="fridge" title="Nevera/Refrigerador"><Refrigerator className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("tv") || s.includes("televisor")) icons.push(<span key="tv" title="Televisor"><Tv2 className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("luces") || s.includes("led")) icons.push(<span key="lights" title="Luces LED"><Lightbulb className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("celular") || s.includes("carga de equipos") || s.includes("celulares") || s.includes("smartphone")) icons.push(<span key="phone" title="Celulares"><Smartphone className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("laptop")) icons.push(<span key="laptop" title="Laptops"><Laptop className="w-5 h-5 text-muted-foreground" /></span>);
    if (s.includes("ventilador")) icons.push(<span key="fan" title="Ventilador"><Fan className="w-5 h-5 text-muted-foreground" /></span>);
    
    if (icons.length === 0) return null;
    
    return (
      <div className="flex gap-2 items-center mt-2 justify-start md:justify-center flex-wrap">
        {icons.slice(0, 4)}
      </div>
    );
  };

  return (
    <div className="card-hover group relative bg-card rounded-xl overflow-hidden shadow-md border border-border transition-all duration-300 flex flex-col h-full">
      {/* Mobile: Horizontal layout (Text left 60%, Image right 40%). Desktop: Vertical stacked */}
      <div className="flex flex-row md:flex-col p-4 md:p-0 flex-grow">
        
        {/* Left Side (Mobile) / Bottom (Desktop) - Texts */}
        <div className="w-[60%] md:w-full flex flex-col justify-center pr-3 md:pr-0 md:p-4 order-1 md:order-2">
          <h3 className="font-accent text-base md:text-lg font-bold text-foreground mb-1 line-clamp-2 text-left md:text-center">
            {product.name}
          </h3>
          
          {/* Appliance Icons */}
          {getSupportIcons()}

          <div className="mt-3 md:mt-4 text-left md:text-center">
            <div className="flex items-baseline justify-start md:justify-center gap-2">
              <span className="text-2xl md:text-3xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs md:text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 uppercase tracking-widest text-left md:text-center">USD</p>
          </div>
        </div>

        {/* Right Side (Mobile) / Top (Desktop) - Image Section */}
        <div className="w-[40%] md:w-full relative flex items-center justify-center bg-muted/5 md:pt-6 md:pb-2 rounded-xl md:rounded-none order-2 md:order-1">
          {/* Mobile: rounded-xl square. Desktop: circular w-48 h-48 */}
          <div className="relative w-full aspect-square md:w-48 md:h-48 rounded-xl md:rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center md:border-4 md:border-muted/20">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-2 md:p-4 group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
                <Zap className="w-8 h-8 md:w-10 md:h-10 mb-1 opacity-20" />
              </div>
            )}
          </div>

          {/* Badges */}
          {product.popular && (
            <div className="absolute top-1 right-1 md:top-3 md:right-3 bg-secondary text-secondary-foreground px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-accent flex items-center gap-1 z-10 shadow-sm">
              <Zap className="w-2 h-2 md:w-3 md:h-3" />
              Popular
            </div>
          )}

          {product.discount && (
            <div className="absolute top-1 left-1 md:top-3 md:left-3 bg-accent text-accent-foreground px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-accent z-10 shadow-sm">
              -{product.discount}%
            </div>
          )}

          {product.outOfStock && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-2 py-1 md:px-4 md:py-1.5 rounded-md text-xs md:text-sm font-bold uppercase tracking-wider z-20 shadow-lg whitespace-nowrap">
              Agotado
            </div>
          )}
        </div>
      </div>

      {/* Bottom Button (100% width) */}
      <div className="px-4 pb-4 md:pt-0 mt-auto">
        <Button
          onClick={() => onViewDetails && onViewDetails(product)}
          className="w-full bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-black font-accent text-sm md:text-base py-4 md:py-5 btn-scale-active shadow-sm font-semibold neon-btn"
        >
          {product.outOfStock ? "Consultar" : "COMPRAR"}
        </Button>
      </div>
    </div>
  );
}
