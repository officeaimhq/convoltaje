import { useState, useRef } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const initialReviews = [
  { id: 1, name: "Cliente satisfecho de Convoltaje", neighborhood: "", rating: 5, src: "/images/cliente-01.jpg", text: "Instalación impecable, el equipo fue muy profesional. Ya llevamos 6 meses sin apagones." },
  { id: 2, name: "Cliente satisfecho de Convoltaje", neighborhood: "", rating: 5, src: "/images/cliente-02.jpg", text: "Lo mejor fue que no tuve que pagar nada hasta que el sistema estaba funcionando al 100%." },
  { id: 3, name: "Cliente satisfecho de Convoltaje", neighborhood: "", rating: 5, src: "/images/cliente-03.jpg", text: "En menos de 2 semanas teníamos el sistema instalado y andando. Superó mis expectativas." },
  { id: 4, name: "Cliente satisfecho de Convoltaje", neighborhood: "", rating: 5, src: "/images/cliente-04.jpg", text: "Excelente inversión. El aire acondicionado funciona todo el día sin problema." },
  { id: 5, name: "Cliente satisfecho de Convoltaje", neighborhood: "", rating: 5, src: "/images/cliente-05.jpg", text: "Profesionales de verdad. Me explicaron todo el proceso y quedé muy satisfecho." },
  { id: 6, name: "Cliente satisfecho de Convoltaje", neighborhood: "", rating: 5, src: "/images/cliente-06.jpg", text: "La calculadora me ayudó a elegir exactamente el sistema que necesitaba para mi casa." },
  { id: 7, name: "Cliente satisfecho de Convoltaje", neighborhood: "", rating: 5, src: "/images/cliente-07.jpg", text: "Recomendado al 100%. Trabajo serio, sin cobros por adelantado y resultado garantizado." },
];

export function ReviewSection() {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Define a standard 4:3 aspect ratio size
        canvas.width = 800;
        canvas.height = 600;

        // Background
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw uploaded image (cover behavior)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const x = (canvas.width - drawW) / 2;
        const y = (canvas.height - drawH) / 2;
        ctx.drawImage(img, x, y, drawW, drawH);

        // --- SIMULATED FRAME (To be replaced by the real PNG later) ---
        // 1. Inner border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 10;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
        
        // 2. Outer border
        ctx.strokeStyle = "#00D9FF";
        ctx.lineWidth = 15;
        ctx.strokeRect(7.5, 7.5, canvas.width - 15, canvas.height - 15);

        // 3. Banner
        ctx.fillStyle = "#0A1A3A"; // Dark blue
        ctx.fillRect(0, canvas.height - 90, canvas.width, 90);

        // 4. Text
        ctx.fillStyle = "#00D9FF"; // Cyan text
        ctx.font = "bold 40px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("⭐️ CLIENTE COMPLACIDO ⭐️", canvas.width / 2, canvas.height - 45);

        // Export and set preview
        setPreviewUrl(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating === 0 || !text.trim()) {
      toast.error("Por favor, completa nombre, calificación y reseña.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      neighborhood,
      rating,
      text,
      src: previewUrl || "",
    };

    setReviews([newReview, ...reviews]);
    
    // Reset form
    setName("");
    setNeighborhood("");
    setRating(0);
    setHoverRating(0);
    setText("");
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    toast.success("✅ Reseña lista y publicada — ¡Gracias por tu opinión!");
  };

  return (
    <section id="reviews-section" className="py-24 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">
            ⭐ Clientes — lo que dicen de nosotros
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Conoce la experiencia de quienes ya dieron el paso hacia la independencia energética.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 md:sticky md:top-24">
            <h3 className="text-2xl font-display font-bold text-primary mb-6">Deja tu reseña</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Barrio / Municipio (opcional)</label>
                <input 
                  type="text" 
                  value={neighborhood} 
                  onChange={(e) => setNeighborhood(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Ej. Playa, La Habana"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Calificación *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer transition-colors ${star <= (hoverRating || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tu reseña *</label>
                <textarea 
                  value={text} 
                  onChange={(e) => setText(e.target.value.slice(0, 200))} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none h-24"
                  placeholder="Cuéntanos tu experiencia..."
                  maxLength={200}
                  required
                ></textarea>
                <p className="text-xs text-right text-slate-500 mt-1">{text.length}/200</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Foto de la instalación (opcional)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {previewUrl && (
                  <div className="mt-4 rounded-lg overflow-hidden border">
                    <img src={previewUrl} alt="Preview" className="w-full h-auto object-cover max-h-48" />
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full bg-[#00D9FF] text-black hover:bg-[#00D9FF]/90 font-bold py-6 text-lg mt-2 shadow-md">
                Publicar mi reseña
              </Button>
            </form>
          </div>

          {/* Grid de Reseñas */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                {review.src && (
                  <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={review.src} alt="Instalación" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-4 flex-grow">"{review.text}"</p>
                  <div className="mt-auto">
                    <p className="font-bold text-foreground">{review.name}</p>
                    {review.neighborhood && <p className="text-sm text-slate-500">{review.neighborhood}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
