import { X, Star, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SalesRep {
  id: string;
  name: string;
  title: string;
  avatar: string;
  phone: string;
  clientsCount: number;
  reviewsCount: number;
  rating: number;
  description: string;
}

const SALES_REPS: SalesRep[] = [
  {
    id: "rep-1",
    name: "Niurki",
    title: "Comercial Principal",
    avatar: "/images/fotos-plantilla-convoltaje/Niurki Comercial.jpg",
    phone: "5353097058",
    clientsCount: 580,
    reviewsCount: 90,
    rating: 4.9,
    description: "Experta en sistemas residenciales de alta potencia. Te guiará paso a paso para encontrar la solución perfecta para tu hogar sin complicaciones."
  },
  {
    id: "rep-2",
    name: "Diana Rosa",
    title: "Comercial",
    avatar: "/images/fotos-plantilla-convoltaje/Diana Rosa comercial.jpg",
    phone: "5355507913",
    clientsCount: 320,
    reviewsCount: 45,
    rating: 4.8,
    description: "Especialista en negocios y sistemas híbridos. Destaca por su atención rápida y su capacidad para adaptar los equipos a tu presupuesto."
  }
];

interface SalesRepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export function SalesRepsModal({ isOpen, onClose, productName }: SalesRepsModalProps) {
  if (!isOpen) return null;

  const handleContact = (phone: string, name: string) => {
    const text = productName 
      ? `Hola ${name}, estoy interesado en el ${productName} que vi en la página web.`
      : `Hola ${name}, me gustaría recibir asesoría sobre los sistemas solares de ConVoltaje.`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="p-6 pb-4 border-b border-border flex justify-between items-center bg-muted/30">
          <div>
            <h2 className="text-2xl font-bold font-display text-foreground">Elige tu Asesora</h2>
            <p className="text-muted-foreground text-sm mt-1">Selecciona la comercial que prefieras para tu atención personalizada.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SALES_REPS.map((rep) => (
              <div key={rep.id} className="border border-border rounded-xl p-5 hover:border-primary/50 transition-colors bg-card shadow-sm flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                    <img 
                      src={rep.avatar} 
                      alt={rep.name} 
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center 22%", transform: "scale(2.2)" }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{rep.name}</h3>
                    <p className="text-primary text-sm font-medium">{rep.title}</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  "{rep.description}"
                </p>

                <div className="flex justify-between items-center mb-6 px-4 py-3 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold">{rep.rating}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{rep.reviewsCount} Reseñas</span>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-foreground mb-1">
                      <Users className="w-4 h-4" />
                      <span className="font-bold">{rep.clientsCount}+</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Clientes</span>
                  </div>
                </div>

                <Button 
                  onClick={() => handleContact(rep.phone, rep.name)}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-6 shadow-md"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar a {rep.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
