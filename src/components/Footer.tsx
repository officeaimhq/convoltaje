import { Mail, Instagram, Facebook, Youtube, Music } from "lucide-react";
import { CONTACT_INFO, WHATSAPP_NUMBERS } from "@/lib/products";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Social */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://img2.elyerromenu.com/images/convoltaje/logo-c/img.webp"
                alt="Convoltaje Logo"
                className="w-8 h-8 rounded-md object-contain"
              />
              <h3 className="font-display text-lg">Convoltaje</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Energía limpia para tu futuro
            </p>
            <div className="flex gap-3">
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Convoltaje Links */}
          <div>
            <h4 className="font-accent text-lg mb-4">Convoltaje</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Sistemas Solares
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  PowerStations
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Instalación
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Garantía
                </a>
              </li>
            </ul>
          </div>

          {/* Tintaflash Links */}
          <div>
            <h4 className="font-accent text-lg mb-4">Tintaflash</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Ropa Personalizada
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Accesorios
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Regalos
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Decoración
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent text-lg mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_INFO.email}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBERS.convoltaje.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span>📱</span>
                WhatsApp 24/7
              </a>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-secondary/20 rounded-xl p-6 mb-12 text-center border border-secondary/30">
          <h3 className="font-accent text-lg mb-2">¿Necesitas ayuda?</h3>
          <p className="text-sm opacity-90 mb-4">
            Nuestro equipo está disponible para responder tus preguntas
          </p>
          <Button
            onClick={() => {
              const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.convoltaje.replace(/\D/g, "")}?text=${encodeURIComponent("Hola, tengo una pregunta.")}`;
              window.open(whatsappUrl, "_blank");
            }}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent"
          >
            Contactar por WhatsApp
          </Button>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
          <div className="flex items-center gap-3">
            <img
              src="/images/Marca de agua.png"
              alt="Convoltaje Servicios Energéticos"
              className="h-8 md:h-10 w-auto object-contain opacity-40"
            />
            <p>© {currentYear} Convoltaje &amp; Tintaflash. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Política de Privacidad
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
