import { useRef, useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ConvoltajeSection from "./components/ConvoltajeSection";
import FAQSection from "./components/FAQSection";
import KitComparisonTable from "./components/KitComparisonTable";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import SolarCalculator from "./components/calculator/SolarCalculator";
import { TestimonialsCarousel } from "./components/TestimonialsCarousel";
import ProductDetailPage from "./components/ProductDetailPage";
import KitComparison from "./components/KitComparison";
import { ECOPOWER_KITS } from "./lib/calculator";
import { CONVOLTAJE_PRODUCTS, TINTAFLASH_PRODUCTS, WHATSAPP_NUMBERS } from "./lib/products";

import { Toaster } from "sonner";

function App() {
  const convoltajeRef = useRef<HTMLElement | null>(null);
  const calculatorRef = useRef<HTMLDivElement | null>(null);
  
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [comparisonSlugs, setComparisonSlugs] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Sync scrolling to top when entering product detail page
  useEffect(() => {
    if (selectedProductSlug) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProductSlug]);

  const handleSectionClick = (section: "convoltaje" | "tintaflash") => {
    if (section === "convoltaje" && convoltajeRef.current) {
      convoltajeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreClick = () => {
    handleSectionClick("convoltaje");
  };

  const handleCalculatorClick = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsappClick = (product: any) => {
    const message = `Hola, me interesa el producto: *${product.name}* - $${product.price} USD. ¿Puedes darme más información?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.convoltaje.replace(/\D/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const allProducts = [...CONVOLTAJE_PRODUCTS, ...TINTAFLASH_PRODUCTS];
  const selectedProduct = selectedProductSlug ? allProducts.find(p => p.slug === selectedProductSlug) : null;
  
  const comparisonProducts = comparisonSlugs.map(slug => {
    const kit = ECOPOWER_KITS.find(k => k.id === slug);
    return kit ? allProducts.find(p => p.name === kit.name) : null;
  }).filter(Boolean) as any[];

  const handleToggleCompare = (slug: string) => {
    setComparisonSlugs(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      }
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {selectedProduct ? (
        <ProductDetailPage 
          product={selectedProduct!} 
          onClose={() => {
            setSelectedProductSlug(null);
            setTimeout(() => {
              const catalogSection = document.getElementById('catalogo') || document.querySelector('[data-section="catalogo"]');
              if (catalogSection) {
                catalogSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }}
          onWhatsappClick={handleWhatsappClick}
          onCalculatorClick={() => {
            setSelectedProductSlug(null);
            setTimeout(() => {
              handleCalculatorClick();
            }, 300);
          }}
        />
      ) : showComparison && comparisonProducts.length >= 2 ? (
        <KitComparison 
          products={comparisonProducts}
          onBack={() => {
            setShowComparison(false);
            setTimeout(() => {
              const catalogSection = document.getElementById('catalogo') || document.querySelector('[data-section="catalogo"]');
              if (catalogSection) {
                catalogSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }}
          onViewDetails={(product) => {
            setShowComparison(false);
            setSelectedProductSlug(product.slug);
          }}
          onWhatsappClick={handleWhatsappClick}
        />
      ) : (
        <>
          <Header onSectionClick={handleSectionClick} />
          <HeroSection onExploreClick={handleExploreClick} />
          <ConvoltajeSection 
            onRef={(ref) => (convoltajeRef.current = ref)} 
            onCalculatorClick={handleCalculatorClick}
            onViewDetails={(product) => setSelectedProductSlug(product.slug)}
          />
          <div className="container mx-auto px-4 py-16" ref={calculatorRef}>
            <SolarCalculator />
          </div>
          <TestimonialsCarousel />
          <KitComparisonTable 
            comparisonSlugs={comparisonSlugs}
            onToggleCompare={handleToggleCompare}
            onCompareNow={() => setShowComparison(true)}
          />
          <FAQSection />
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
