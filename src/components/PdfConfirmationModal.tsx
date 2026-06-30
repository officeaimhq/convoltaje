import { useState, useEffect } from "react";
import { CheckCircle, Download, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PdfConfirmationModalProps {
  isOpen: boolean;
  quotationNumber: string;
  customerName: string;
  total: number;
  onClose: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

export default function PdfConfirmationModal({
  isOpen,
  quotationNumber,
  customerName,
  total,
  onClose,
  onDownload,
  onShare,
}: PdfConfirmationModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex justify-center mb-4">
              <div
                className={`relative w-16 h-16 ${isAnimating ? "animate-in zoom-in-50 duration-500" : ""}`}
              >
                <CheckCircle className="w-16 h-16 text-green-500 drop-shadow-lg" />
                <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-pulse opacity-30"></div>
              </div>
            </div>
            ¡Prefactura Generada!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 font-medium">
              ✓ Tu prefactura ha sido generada correctamente
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600">Número:</span>
              <span className="text-sm font-semibold text-gray-900">
                {quotationNumber}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600">Cliente:</span>
              <span className="text-sm font-semibold text-gray-900">
                {customerName}
              </span>
            </div>
            <div className="flex justify-between items-start pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="text-lg font-bold text-primary">
                ${(total / 100).toFixed(2)} USD
              </span>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-800">
              <strong>💡 Próximo paso:</strong> Comparte esta prefactura con tu
              equipo comercial o descárgala para enviarla por email.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button
              onClick={onDownload}
              variant="default"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar
            </Button>
            <Button
              onClick={onShare}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </Button>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
