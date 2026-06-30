import { useRef } from "react";
import Header from "@/components/Header";
import TintaflashHeroSection from "@/components/tintaflash/HeroSection";
import TintaflashSection from "@/components/TintaflashSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function TintaflashPage() {
  const tintaflashRef = useRef<HTMLElement | null>(null);

  const handleSectionClick = (section: string) => {
    if (section === "tintaflash" && tintaflashRef.current) {
      tintaflashRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSectionClick={handleSectionClick} />
      <TintaflashHeroSection />
      <TintaflashSection onRef={(ref) => (tintaflashRef.current = ref)} />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
