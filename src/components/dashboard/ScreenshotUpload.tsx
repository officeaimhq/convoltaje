import { useState, useRef } from "react";
import { Upload, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ScreenshotUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
  title?: string;
}

export default function ScreenshotUpload({
  photos,
  onPhotosChange,
  maxPhotos = 4,
  title = "Captura de Ruta / Maps.me"
}: ScreenshotUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToWebP = (file: File, maxWidth = 1200, quality = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("No se pudo obtener el contexto 2D del canvas"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          // Conversión obligatoria a WebP para sincronización offline liviana
          const webpDataUrl = canvas.toDataURL("image/webp", quality);
          resolve(webpDataUrl);
        };
        img.onerror = () => reject(new Error("Error al cargar la imagen seleccionada"));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Error al leer el archivo de captura"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length + files.length > maxPhotos) {
      toast.error(`Solo se permiten un máximo de ${maxPhotos} capturas.`);
      return;
    }

    setIsProcessing(true);
    const newPhotos = [...photos];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const webpDataUrl = await convertToWebP(file);
        newPhotos.push(webpDataUrl);
      }
      onPhotosChange(newPhotos);
      toast.success("Captura(s) convertida(s) a WebP y guardada(s).");
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar la captura de pantalla.");
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
          <ImageIcon size={14} className="text-[#00D9FF]" />
          {title} ({photos.length}/{maxPhotos})
        </label>
        {isProcessing && (
          <div className="flex items-center gap-1 text-xs text-[#00D9FF]">
            <Loader2 className="animate-spin" size={14} />
            <span>Convirtiendo a WebP...</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {/* Previsualización de imágenes guardadas */}
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/20 bg-black/40 group shadow-md"
          >
            <img
              src={photo}
              alt={`Captura de ruta ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-red-400 hover:text-red-300"
              title="Eliminar captura"
            >
              <Trash2 size={18} />
            </button>
            <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white/90 px-1 rounded font-mono">
              WebP
            </span>
          </div>
        ))}

        {/* Botón para seleccionar captura de pantalla */}
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="w-24 h-24 rounded-xl border-2 border-dashed border-[#00D9FF]/40 hover:border-[#00D9FF] bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1.5 transition-all text-white/70 hover:text-white disabled:opacity-50"
          >
            <Upload size={20} className="text-[#00D9FF]" />
            <span className="text-[10px] font-semibold text-center leading-tight">
              Subir Captura
            </span>
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
