import { MessageCircle, Star } from "lucide-react";
import { WHATSAPP_NUMBERS } from "@/lib/products";

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.convoltaje.replace(/\D/g, "")}?text=${encodeURIComponent("Hola, me gustaría más información sobre Convoltaje.")}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleReviewClick = () => {
    document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-auto md:right-6 z-50 flex flex-col gap-3 items-center">
      <button
        onClick={handleReviewClick}
        className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-full p-3 shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center"
        aria-label="Dejar reseña"
        title="Dejar una reseña"
      >
        <Star className="w-5 h-5 fill-current" />
      </button>
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 md:p-4 shadow-lg pulse-glow transition-all duration-300 active:scale-95 flex items-center justify-center"
        aria-label="Chat with WhatsApp"
        title="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
