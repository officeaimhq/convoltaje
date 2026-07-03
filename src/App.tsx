import { useRef } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ConvoltajeSection from "./components/ConvoltajeSection";
import FAQSection from "./components/FAQSection";
import KitComparisonTable from "./components/KitComparisonTable";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import SolarCalculator from "./components/calculator/SolarCalculator";

import { Toaster } from "sonner";

function App() {
  const convoltajeRef = useRef<HTMLElement | null>(null);
  const calculatorRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSectionClick={handleSectionClick} />
      <HeroSection onExploreClick={handleExploreClick} />
      <ConvoltajeSection 
        onRef={(ref) => (convoltajeRef.current = ref)} 
        onCalculatorClick={handleCalculatorClick}
      />
      <div className="container mx-auto px-4 py-16" ref={calculatorRef}>
        <SolarCalculator />
      </div>
      <KitComparisonTable />
      <FAQSection />
      <Footer />
      <FloatingWhatsApp />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
