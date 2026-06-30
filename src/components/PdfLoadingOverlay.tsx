import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface PdfLoadingOverlayProps {
  isVisible: boolean;
  progress: number;
  message?: string;
}

export default function PdfLoadingOverlay({
  isVisible,
  progress,
  message = "Generando prefactura...",
}: PdfLoadingOverlayProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setDisplayProgress(progress);
    }
  }, [progress, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-300">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>

            {/* Animated ring */}
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"
              style={{
                animation: "spin 1s linear infinite",
              }}
            ></div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h3 className="text-center text-lg font-semibold text-foreground mb-2">
          {message}
        </h3>

        {/* Progress text */}
        <p className="text-center text-sm text-muted-foreground mb-4">
          {displayProgress}%
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${displayProgress}%`,
              boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
            }}
          ></div>
        </div>

        {/* Status messages */}
        <div className="mt-6 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${displayProgress >= 30 ? "bg-green-500" : "bg-gray-300"}`}
            ></div>
            <span>Preparando datos</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${displayProgress >= 60 ? "bg-green-500" : "bg-gray-300"}`}
            ></div>
            <span>Generando documento</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${displayProgress >= 90 ? "bg-green-500" : "bg-gray-300"}`}
            ></div>
            <span>Finalizando</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
