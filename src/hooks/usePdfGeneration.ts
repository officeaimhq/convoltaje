import { useState, useCallback } from "react";
import { toast } from "sonner";
import { generateQuotationHTML } from "@/lib/pdf-templates";
import type { QuotationData } from "@/lib/pdf-templates";

interface UsePdfGenerationOptions {
  onSuccess?: (pdfUrl: string) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for generating and downloading PDFs with loading states
 */
export function usePdfGeneration(options?: UsePdfGenerationOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateAndDownloadPDF = useCallback(
    async (data: QuotationData, filename?: string) => {
      try {
        setIsLoading(true);
        setProgress(10);

        // Simulate generation delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProgress(30);

        // Generate HTML
        const htmlContent = generateQuotationHTML(data);
        setProgress(60);

        // Convert HTML to Blob
        const blob = new Blob([htmlContent], { type: "text/html" });
        setProgress(80);

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename || `prefactura-${data.quotationNumber}.html`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup
        URL.revokeObjectURL(url);
        setProgress(100);

        // Show success message
        toast.success("✅ Prefactura generada correctamente", {
          description: `Descargada como ${link.download}`,
          duration: 4000,
        });

        // Call success callback
        options?.onSuccess?.(url);

        // Reset after delay
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 1000);
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Error desconocido");

        console.error("PDF Generation Error:", err);

        // Show error message
        toast.error("❌ Error al generar la prefactura", {
          description: err.message,
          duration: 4000,
        });

        // Call error callback
        options?.onError?.(err);

        setIsLoading(false);
        setProgress(0);
      }
    },
    [options]
  );

  const generatePDFAsDataURL = useCallback(
    async (data: QuotationData): Promise<string> => {
      try {
        setIsLoading(true);
        setProgress(10);

        await new Promise((resolve) => setTimeout(resolve, 300));
        setProgress(50);

        const htmlContent = generateQuotationHTML(data);
        setProgress(80);

        // Convert to data URL
        const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;

        setProgress(100);

        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 500);

        return dataUrl;
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Error desconocido");
        console.error("PDF Generation Error:", err);

        toast.error("❌ Error al generar la prefactura", {
          description: err.message,
        });

        setIsLoading(false);
        setProgress(0);

        throw err;
      }
    },
    []
  );

  return {
    isLoading,
    progress,
    generateAndDownloadPDF,
    generatePDFAsDataURL,
  };
}
