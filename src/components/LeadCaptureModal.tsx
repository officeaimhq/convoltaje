import { useState } from "react";
import { X, CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WHATSAPP_NUMBERS } from "@/lib/products";
import { EcoPowerKit } from "@/lib/calculator";
import { generatePDF } from "@/lib/pdf-generator";

interface LeadCaptureModalProps {
  kit: EcoPowerKit;
  dailyConsumption: number;
  onClose: () => void;
}

type ModalStep = "form" | "confirmation";

export default function LeadCaptureModal({
  kit,
  dailyConsumption,
  onClose,
}: LeadCaptureModalProps) {
  const [step, setStep] = useState<ModalStep>("form");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    purchaseType: "unitaria" as "unitaria" | "mayorista",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfExtension, setPdfExtension] = useState<string>("pdf");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      alert("Por favor ingresa tu nombre");
      return false;
    }
    if (!formData.phone.trim()) {
      alert("Por favor ingresa tu teléfono");
      return false;
    }
    if (!formData.email.trim()) {
      alert("Por favor ingresa tu email");
      return false;
    }
    // Basic phone validation
    if (!/^\d{8,}$/.test(formData.phone.replace(/\D/g, ""))) {
      alert("Por favor ingresa un teléfono válido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Generate PDF
      const pdfBlob = await generatePDF({
        clientName: formData.name,
        clientPhone: formData.phone,
        clientEmail: formData.email,
        kit: kit,
        dailyConsumption: dailyConsumption,
        purchaseType: formData.purchaseType,
      });

      // Download PDF
      const isHtml = pdfBlob.type.includes("text/html");
      const extension = isHtml ? "html" : "pdf";
      const url = window.URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setPdfExtension(extension);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `Prefactura_${formData.name}_${new Date().toISOString().split("T")[0]}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Don't revoke immediately so the user can click the "Abrir" button later
      // window.URL.revokeObjectURL(url);

      // Send WhatsApp message
      const message = `Hola, me interesa el sistema: *${kit.name}* - $${kit.price} USD. Mi consumo diario es de ${dailyConsumption.toFixed(2)} kWh. Nombre: ${formData.name}. Teléfono: ${formData.phone}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS.convoltaje.replace(/\D/g, "")}?text=${encodedMessage}`;

      // Show confirmation
      setStep("confirmation");

      // Open WhatsApp after a short delay
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1500);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error al generar el PDF. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="font-display text-xl text-foreground">
            {step === "form" ? "Solicitar Sistema" : "¡Solicitud Enviada!"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Kit Summary */}
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Sistema Seleccionado:
                </p>
                <p className="font-accent text-lg text-primary">
                  {kit.name}
                </p>
                <p className="text-sm text-secondary font-accent mt-2">
                  ${kit.price} USD
                </p>
              </div>

              {/* Form Fields */}
              <div>
                <label className="block text-sm font-accent text-foreground mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-accent text-foreground mb-2">
                  Teléfono (WhatsApp) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+53 5514 4097"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-accent text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-accent text-foreground mb-2">
                  Tipo de Compra
                </label>
                <select
                  name="purchaseType"
                  value={formData.purchaseType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="unitaria">Compra Unitaria</option>
                  <option value="mayorista">Compra Mayorista</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent py-3"
              >
                {isSubmitting ? "Procesando..." : "Enviar Solicitud"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Al enviar, recibirás un PDF con la prefactura y un comercial se
                contactará contigo por WhatsApp.
              </p>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-secondary mx-auto" />
              <h3 className="font-display text-2xl text-foreground">
                ¡Solicitud Enviada!
              </h3>
              <p className="text-muted-foreground">
                Tu prefactura ha sido descargada y un asesor se pondrá en
                contacto contigo por WhatsApp en los próximos minutos.
              </p>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 my-4">
                <p className="text-sm font-accent text-primary mb-2">
                  Próximos pasos:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>✓ Revisa tu PDF descargado</li>
                  <li>✓ Espera contacto por WhatsApp</li>
                  <li>✓ Confirma detalles con nuestro comercial</li>
                  <li>✓ Procede con tu compra</li>
                </ul>
              </div>

              {pdfUrl && (
                <Button
                  onClick={() => window.open(pdfUrl, "_blank")}
                  variant="outline"
                  className="w-full font-accent py-3 mb-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Abrir Prefactura ({pdfExtension.toUpperCase()})
                </Button>
              )}

              <Button
                onClick={onClose}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent py-3"
              >
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
