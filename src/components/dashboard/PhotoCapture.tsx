import { useState, useRef } from "react";
import { Camera, Image as ImageIcon, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PhotoCaptureProps {
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

export default function PhotoCapture({ onPhotosChange, maxPhotos = 3 }: PhotoCaptureProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File, maxWidth = 800, quality = 0.65): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = maxWidth / img.width;
          
          if (img.width > maxWidth) {
            canvas.width = maxWidth;
            canvas.height = img.height * scale;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("No se pudo obtener el contexto 2D"));
            return;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error("Error al cargar la imagen"));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Error al leer el archivo"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length + files.length > maxPhotos) {
      toast.error(`Solo se permiten un máximo de ${maxPhotos} fotos.`);
      return;
    }

    setIsProcessing(true);
    const newPhotos = [...photos];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await compressImage(file);
        newPhotos.push(compressed);
      }
      setPhotos(newPhotos);
      onPhotosChange(newPhotos);
      toast.success("Foto(s) agregada(s) y optimizada(s).");
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar la imagen.");
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
          Evidencia de Trabajo ({photos.length}/{maxPhotos})
        </label>
        {isProcessing && (
          <div className="flex items-center gap-1 text-xs text-[#00D9FF]">
            <Loader2 className="animate-spin" size={14} />
            <span>Optimizando...</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Render pre-existing photos */}
        {photos.map((photo, index) => (
          <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 group">
            <img src={photo} alt={`Trabajo ${index + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-red-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {/* Action Button */}
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="w-20 h-20 rounded-xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1.5 transition-all text-white/50 hover:text-white disabled:opacity-50"
          >
            <Camera size={20} className="text-[#00D9FF]" />
            <span className="text-[10px] font-semibold">Cámara</span>
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
}
