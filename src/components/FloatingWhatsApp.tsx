import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBERS } from "@/lib/products";

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.convoltaje.replace(/\D/g, "")}?text=${encodeURIComponent("Hola, me gustaría más información sobre Convoltaje y Tintaflash.")}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 md:p-4 shadow-lg pulse-glow transition-all duration-300 active:scale-95"
      aria-label="Chat with WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
