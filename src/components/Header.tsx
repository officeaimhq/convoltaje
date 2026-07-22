import { useState, useEffect } from "react";

export default function Header() {
  const [activeTab, setActiveTab] = useState<string>("inicio");

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sections = ["inicio", "nosotros", "catalogo", "calculadora", "reviews-section", "contacto"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        {/* Mobile: Logo + Access Button */}
        <div className="md:hidden py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("inicio")}>
            <img
              src="https://img2.elyerromenu.com/images/convoltaje/logo-c/img.webp"
              alt="Convoltaje Logo"
              className="w-9 h-9 object-contain rounded-md"
            />
            <div className="flex flex-col text-left">
              <h1 className="font-display text-base text-primary font-bold leading-none">Convoltaje</h1>
              <p className="text-[9px] text-muted-foreground leading-none">Energía Solar</p>
            </div>
          </div>
          <a
            href="/admin/login"
            className="px-3 py-1.5 rounded-xl bg-[#0b3c8f] text-white text-[11px] font-bold shadow-sm flex items-center gap-1"
          >
            <span>Acceso Equipo</span>
            <span>➔</span>
          </a>
        </div>

        {/* Desktop: Logo + Tabs + Acceso Equipo */}
        <div className="hidden md:flex items-center justify-between py-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("inicio")}>
            <img
              src="https://img2.elyerromenu.com/images/convoltaje/logo-c/img.webp"
              alt="Convoltaje Logo"
              className="w-10 h-10 object-contain rounded-md"
            />
            <div className="flex flex-col">
              <h1 className="font-display text-xl text-primary font-bold">Convoltaje</h1>
              <p className="text-xs text-muted-foreground leading-none">& Tintaflash</p>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => scrollTo("nosotros")}
              className={`pb-1 transition-colors font-medium border-b-2 ${activeTab === 'nosotros' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-foreground hover:text-cyan-500'}`}
            >
              Quiénes somos
            </button>
            <button
              onClick={() => scrollTo("catalogo")}
              className={`pb-1 transition-colors font-medium border-b-2 ${activeTab === 'catalogo' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-foreground hover:text-cyan-500'}`}
            >
              Kits Solares
            </button>
            <button
              onClick={() => scrollTo("calculadora")}
              className={`pb-1 transition-colors font-medium border-b-2 ${activeTab === 'calculadora' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-foreground hover:text-cyan-500'}`}
            >
              Calculadora
            </button>
            <button
              onClick={() => scrollTo("contacto")}
              className={`pb-1 transition-colors font-medium border-b-2 ${activeTab === 'contacto' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-foreground hover:text-cyan-500'}`}
            >
              Contáctanos
            </button>
            <a
              href="/admin/login"
              className="px-4 py-2 rounded-xl bg-[#0b3c8f] hover:bg-[#092d6e] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Acceso Equipo</span>
              <span>🔒</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
