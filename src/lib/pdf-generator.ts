import { EcoPowerKit } from "@/lib/calculator";

interface PDFGeneratorOptions {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  kit: EcoPowerKit;
  dailyConsumption: number;
  purchaseType: "unitaria" | "mayorista";
}

export async function generatePDF(options: PDFGeneratorOptions): Promise<Blob> {
  const {
    clientName,
    clientPhone,
    clientEmail,
    kit,
    dailyConsumption,
    purchaseType,
  } = options;

  // Create HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          color: #1A1F2E;
          line-height: 1.6;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
        }
        .header {
          border-bottom: 3px solid #0F3A7D;
          padding-bottom: 20px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header h1 {
          color: #0F3A7D;
          font-size: 28px;
        }
        .header .date {
          text-align: right;
          color: #6B7280;
          font-size: 12px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          background-color: #0F3A7D;
          color: white;
          padding: 10px 15px;
          font-weight: bold;
          margin-bottom: 15px;
          border-radius: 4px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .info-item {
          background-color: #F8F9FA;
          padding: 15px;
          border-radius: 4px;
        }
        .info-label {
          color: #6B7280;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .info-value {
          color: #1A1F2E;
          font-size: 16px;
          font-weight: bold;
        }
        .kit-details {
          background-color: #00D9FF;
          background: linear-gradient(135deg, #0F3A7D 0%, #00D9FF 100%);
          color: white;
          padding: 20px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        .kit-details h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .kit-specs {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 15px;
          margin-top: 15px;
        }
        .kit-spec {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 10px;
          border-radius: 4px;
          text-align: center;
        }
        .kit-spec-label {
          font-size: 12px;
          opacity: 0.9;
        }
        .kit-spec-value {
          font-size: 18px;
          font-weight: bold;
          margin-top: 5px;
        }
        .features {
          list-style: none;
          margin-top: 15px;
        }
        .features li {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 14px;
        }
        .features li:before {
          content: "✓ ";
          margin-right: 10px;
          font-weight: bold;
        }
        .consumption-summary {
          background-color: #FF6B35;
          color: white;
          padding: 20px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        .consumption-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 15px;
        }
        .consumption-item {
          text-align: center;
        }
        .consumption-label {
          font-size: 12px;
          opacity: 0.9;
        }
        .consumption-value {
          font-size: 24px;
          font-weight: bold;
          margin-top: 5px;
        }
        .footer {
          border-top: 2px solid #0F3A7D;
          padding-top: 20px;
          margin-top: 40px;
          text-align: center;
          color: #6B7280;
          font-size: 12px;
        }
        .footer-contact {
          margin-top: 10px;
          font-size: 13px;
          color: #0F3A7D;
          font-weight: bold;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #E0E4E8;
        }
        th {
          background-color: #F8F9FA;
          font-weight: bold;
          color: #0F3A7D;
        }
        .price-row {
          background-color: #F8F9FA;
          font-weight: bold;
        }
        .price-row td:last-child {
          color: #00D9FF;
          font-size: 18px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div>
            <h1>PREFACTURA</h1>
            <p style="color: #6B7280; font-size: 14px; margin-top: 5px;">Convoltaje - Energía Solar</p>
          </div>
          <div class="date">
            <p>Fecha: ${new Date().toLocaleDateString("es-ES")}</p>
            <p>Ref: PRE-${Date.now()}</p>
          </div>
        </div>

        <!-- Client Info -->
        <div class="section">
          <div class="section-title">Información del Cliente</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nombre</div>
              <div class="info-value">${clientName}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Teléfono</div>
              <div class="info-value">${clientPhone}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">${clientEmail}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Tipo de Compra</div>
              <div class="info-value">${purchaseType === "unitaria" ? "Unitaria" : "Mayorista"}</div>
            </div>
          </div>
        </div>

        <!-- Kit Details -->
        <div class="section">
          <div class="kit-details">
            <h3>${kit.name}</h3>
            <p style="font-size: 14px; margin-bottom: 10px;">${kit.description}</p>
            <div class="kit-specs">
              <div class="kit-spec">
                <div class="kit-spec-label">Inversor</div>
                <div class="kit-spec-value">${kit.inverterPower} kW</div>
              </div>
              <div class="kit-spec">
                <div class="kit-spec-label">Batería</div>
                <div class="kit-spec-value">${kit.batteryCapacity} kWh</div>
              </div>
              <div class="kit-spec">
                <div class="kit-spec-label">Precio</div>
                <div class="kit-spec-value">$${kit.price}</div>
              </div>
            </div>
            <ul class="features">
              ${kit.features.map((f) => `<li>${f}</li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- Consumption Summary -->
        <div class="section">
          <div class="consumption-summary">
            <h3 style="margin-bottom: 10px;">Resumen de Consumo Energético</h3>
            <div class="consumption-grid">
              <div class="consumption-item">
                <div class="consumption-label">Consumo Diario</div>
                <div class="consumption-value">${dailyConsumption.toFixed(2)} kWh</div>
              </div>
              <div class="consumption-item">
                <div class="consumption-label">Consumo Mensual</div>
                <div class="consumption-value">${(dailyConsumption * 30).toFixed(2)} kWh</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pricing -->
        <div class="section">
          <div class="section-title">Detalles de Precio</div>
          <table>
            <tr>
              <th>Concepto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>${kit.name}</td>
              <td>1</td>
              <td>$${kit.price}</td>
              <td>$${kit.price}</td>
            </tr>
            <tr class="price-row">
              <td colspan="3" style="text-align: right;">TOTAL:</td>
              <td>$${kit.price}</td>
            </tr>
          </table>
          <p style="margin-top: 15px; font-size: 12px; color: #6B7280;">
            * Precios sujetos a cambios. Esta es una prefactura y no constituye una factura definitiva.
          </p>
        </div>

        <!-- Next Steps -->
        <div class="section">
          <div class="section-title">Próximos Pasos</div>
          <ol style="margin-left: 20px; color: #1A1F2E;">
            <li>Un asesor comercial se contactará contigo por WhatsApp en los próximos minutos</li>
            <li>Confirmaremos los detalles de tu solicitud y disponibilidad</li>
            <li>Procederemos con la factura definitiva y coordinación de instalación</li>
            <li>Instalación profesional en 15 días (sujeto a disponibilidad)</li>
          </ol>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>Convoltaje - Energía Solar Confiable</p>
          <div class="footer-contact">
            📱 WhatsApp: +53 5514 4097 | 📧 Email: convoltaje@gmail.com
          </div>
          <p style="margin-top: 15px;">Esta prefactura fue generada automáticamente el ${new Date().toLocaleString("es-ES")}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Convert HTML to PDF using html2pdf library
  // Since we're in a browser environment, we'll use a simple approach with canvas
  try {
    // Import html2pdf dynamically
    const html2pdf = (await import("html2pdf.js")).default;

    const element = document.createElement("div");
    element.innerHTML = htmlContent;
    
    // Crucial for html2canvas: element MUST be in the DOM to render its layout
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.style.top = "0";
    element.style.width = "800px";
    document.body.appendChild(element);

    const options: any = {
      margin: 0,
      filename: `Prefactura_${clientName}_${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    return new Promise((resolve, reject) => {
      html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .output("blob")
        .then((blob: Blob) => {
          document.body.removeChild(element);
          resolve(blob);
        })
        .catch((error: any) => {
          if (document.body.contains(element)) {
            document.body.removeChild(element);
          }
          reject(error);
        });
    });
  } catch (error) {
    // Fallback: Return the HTML content as a file
    console.warn("html2pdf failed or not available, using HTML fallback", error);
    
    // Create an HTML blob
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    return blob;
  }
}
