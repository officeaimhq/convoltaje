import { MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  onWhatsappClick: (product: Product) => void;
}

export default function ProductCard({
  product,
  onWhatsappClick,
}: ProductCardProps) {

  return (
    <div className="card-hover group relative bg-card rounded-xl overflow-hidden shadow-md border border-border transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative pt-6 pb-4 flex items-center justify-center bg-muted/5">
        {/* Circular Image Container */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center border-4 border-muted/20">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-accent text-lg text-foreground mb-2 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="mt-auto">
          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">USD</p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => onWhatsappClick(product)}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent text-base py-6 btn-scale-active"
          >
            <MessageCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            {product.outOfStock ? "Consultar disponibilidad" : "Comprobar disponibilidad"}
          </Button>
        </div>
      </div>
    </div>
  );
}
