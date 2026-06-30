import { useRef } from "react";
import Header from "@/components/Header";
import ConvoltajeHeroSection from "@/components/convoltaje/HeroSection";
import SolarCalculator from "@/components/SolarCalculator";
import FAQSection from "@/components/FAQSection";
import KitComparisonTable from "@/components/KitComparisonTable";
import ConvoltajeSection from "@/components/ConvoltajeSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function ConvoltajePage() {
  const convoltajeRef = useRef<HTMLElement | null>(null);

  const handleSectionClick = (section: string) => {
    if (section === "convoltaje" && convoltajeRef.current) {
      convoltajeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSectionClick={handleSectionClick} />
      <ConvoltajeHeroSection />
      <SolarCalculator />
      <FAQSection />
      <KitComparisonTable />
      <ConvoltajeSection onRef={(ref) => (convoltajeRef.current = ref)} />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
