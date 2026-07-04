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
import { CONVOLTAJE_PRODUCTS, TINTAFLASH_PRODUCTS, WHATSAPP_NUMBERS } from "./lib/products";

import { Toaster } from "sonner";

function App() {
  const convoltajeRef = useRef<HTMLElement | null>(null);
  const calculatorRef = useRef<HTMLDivElement | null>(null);
  
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {selectedProduct ? (
        <ProductDetailPage 
          product={selectedProduct} 
          onClose={() => setSelectedProductSlug(null)}
          onWhatsappClick={handleWhatsappClick}
          onCalculatorClick={() => {
            setSelectedProductSlug(null);
            setTimeout(() => {
              handleCalculatorClick();
            }, 300);
          }}
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
          <KitComparisonTable />
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
