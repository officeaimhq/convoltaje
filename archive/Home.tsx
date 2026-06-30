import { useLocation } from "wouter";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ConvoltajeSection from "@/components/ConvoltajeSection";
import TintaflashSection from "@/components/TintaflashSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useRef } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const convoltajeRef = useRef<HTMLElement | null>(null);
  const tintaflashRef = useRef<HTMLElement | null>(null);

  const handleSectionClick = (section: "convoltaje" | "tintaflash") => {
    if (section === "convoltaje") {
      setLocation("/convoltaje");
    } else if (section === "tintaflash") {
      setLocation("/tintaflash");
    }
  };

  const handleExploreClick = () => {
    handleSectionClick("convoltaje");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSectionClick={handleSectionClick} />
      <HeroSection onExploreClick={handleExploreClick} />
      <ConvoltajeSection onRef={(ref) => (convoltajeRef.current = ref)} />
      <TintaflashSection onRef={(ref) => (tintaflashRef.current = ref)} />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
