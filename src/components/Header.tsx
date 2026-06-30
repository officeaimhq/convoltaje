import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HeaderProps {
  onSectionClick: (section: "convoltaje" | "tintaflash") => void;
}

export default function Header({ onSectionClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <img
            src="https://img2.elyerromenu.com/images/convoltaje/logo-c/img.webp"
            alt="Convoltaje Logo"
            className="w-10 h-10 object-contain rounded-md"
          />
          <div className="hidden sm:block">
            <h1 className="font-display text-xl text-primary">Convoltaje</h1>
            <p className="text-xs text-muted-foreground">& Tintaflash</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onSectionClick("convoltaje")}
            className="text-foreground hover:text-primary transition-colors font-accent"
          >
            ☀️ Energía Solar
          </button>
          <button
            onClick={() => toast.info("Próximamente: Tintaflash", { description: "Nuestra sección de personalización está en construcción." })}
            className="text-foreground hover:text-accent transition-colors font-accent"
          >
            🎨 Tintaflash
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Button
              onClick={() => {
                onSectionClick("convoltaje");
                setMobileMenuOpen(false);
              }}
              variant="ghost"
              className="w-full justify-start"
            >
              ☀️ Energía Solar
            </Button>
            <Button
              onClick={() => {
                toast.info("Próximamente: Tintaflash", { description: "Nuestra sección de personalización está en construcción." });
                setMobileMenuOpen(false);
              }}
              variant="ghost"
              className="w-full justify-start"
            >
              🎨 Tintaflash
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
