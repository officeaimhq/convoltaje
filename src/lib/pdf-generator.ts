import { EcoPowerKit } from "@/lib/calculator";

interface PDFGeneratorOptions {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  kit: EcoPowerKit;
  dailyConsumption: number;
  purchaseType: "unitaria" | "mayorista";
  installationAddress: string;
  installationDate: string;
  salesAgent: string;
}

export async function generatePDF(options: PDFGeneratorOptions): Promise<Blob> {
  const {
    clientName,
    clientPhone,
    clientEmail,
    kit,
    dailyConsumption,
    purchaseType,
    installationAddress,
    installationDate,
    salesAgent,
  } = options;

  const refId = `OT-${Math.floor(1000 + Math.random() * 9000)}`;

  // Create HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; color: #1A1F2E; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; padding: 40px; }
        .header {
          border-bottom: 3px solid #0F3A7D;
          padding-bottom: 20px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header h1 { color: #0F3A7D; font-size: 26px; }
        .header h2 { color: #FF6B35; font-size: 16px; margin-top: 5px; font-weight: normal; }
        .header .date { text-align: right; color: #6B7280; font-size: 12px; }
        
        .section { margin-bottom: 25px; }
        .section-title {
          background-color: #0F3A7D;
          color: white;
          padding: 8px 12px;
          font-weight: bold;
          margin-bottom: 12px;
          border-radius: 4px;
          font-size: 14px;
          text-transform: uppercase;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          background-color: #F8F9FA;
          padding: 15px;
          border-radius: 4px;
        }
        .info-item { margin-bottom: 5px; }
        .info-label { color: #6B7280; font-size: 11px; font-weight: bold; text-transform: uppercase; }
        .info-value { color: #1A1F2E; font-size: 14px; font-weight: bold; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #E0E4E8; }
        th { background-color: #F8F9FA; font-weight: bold; color: #0F3A7D; font-size: 13px; }
        td { font-size: 14px; }
        
        .totals-box {
          margin-top: 20px;
          background-color: #F8F9FA;
          padding: 20px;
          border-radius: 4px;
          border-left: 4px solid #00D9FF;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          font-size: 20px;
          font-weight: bold;
          color: #0F3A7D;
          margin-bottom: 15px;
        }
        
        .conditions-list {
          list-style: none;
          font-size: 13px;
          color: #1A1F2E;
        }
        .conditions-list li {
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }
        .conditions-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #FF6B35;
          font-weight: bold;
        }
        
        .footer {
          border-top: 2px solid #0F3A7D;
          padding-top: 20px;
          margin-top: 40px;
          text-align: center;
          color: #6B7280;
          font-size: 12px;
        }
        .footer-contact { margin-top: 10px; font-size: 13px; color: #0F3A7D; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div style="display: flex; align-items: center; gap: 15px;">
            <img src="https://img2.elyerromenu.com/images/convoltaje/logo-c/img.webp" 
                 style="width:80px; height:80px; object-fit:contain; border-radius:50%;" 
                 alt="Convoltaje Logo"/>
            <div>
              <h1>PREFACTURA / FICHA DE INSTALACIÓN</h1>
              <h2>Convoltaje - Energía Solar</h2>
            </div>
          </div>
          <div class="date">
            <p>Fecha: ${new Date().toLocaleDateString("es-ES")}</p>
            <p><b>ID Orden: ${refId}</b></p>
          </div>
        </div>

        <!-- Section 1: Client Info -->
        <div class="section">
          <div class="section-title">1. Datos del Cliente</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nombre Completo</div>
              <div class="info-value">${clientName || "-"}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Teléfono</div>
              <div class="info-value">${clientPhone || "-"}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">${clientEmail || "-"}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Fecha Preferida</div>
              <div class="info-value">${installationDate || "A coordinar"}</div>
            </div>
            <div class="info-item" style="grid-column: span 2;">
              <div class="info-label">Dirección de Instalación</div>
              <div class="info-value">${installationAddress || "A confirmar"}</div>
            </div>
          </div>
        </div>

        <!-- Section 2: Comercial -->
        <div class="section">
          <div class="section-title">2. Asesor Comercial</div>
          <div style="background-color: #F8F9FA; padding: 15px; border-radius: 4px;">
            <div class="info-label">Nombre del Comercial</div>
            <div class="info-value">${salesAgent || "Ninguno / Vía Web"}</div>
          </div>
        </div>

        <!-- Section 3 & 4: System Details and Consumption -->
        <div class="section">
          <div class="section-title">3. Sistema Seleccionado y 4. Consumo</div>
          <table>
            <tr>
              <th>Sistema</th>
              <th>Descripción Técnica</th>
              <th style="text-align: right;">Consumo Diario</th>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #0F3A7D;">${kit.name}</td>
              <td style="font-size: 13px;">
                ${kit.description}<br/><br/>
                <b>Inversor:</b> ${kit.inverterPower} kW<br/>
                <b>Batería:</b> ${kit.batteryCapacity} kWh
              </td>
              <td style="text-align: right;">
                <b>${dailyConsumption.toFixed(2)} kWh</b><br/>
                <span style="font-size: 11px; color: #6B7280;">(${(dailyConsumption * 30).toFixed(2)} kWh/mes)</span>
              </td>
            </tr>
          </table>
        </div>

        <!-- Section 5: Totals and Conditions -->
        <div class="section">
          <div class="section-title">5. Total y Condiciones</div>
          <div class="totals-box">
            <div class="total-row">
              <span>TOTAL A PAGAR:</span>
              <span style="color: #00D9FF;">$${kit.price} USD</span>
            </div>
            <div class="info-label" style="margin-bottom: 10px;">Método de Pago: Efectivo / Transferencia</div>
            <ul class="conditions-list">
              <li>Pago al finalizar la instalación. Sin cobros por adelantado.</li>
              <li>Garantía de 90 días sobre la instalación.</li>
              <li>Incluye todos los materiales, cableado solar certificado y puesta en marcha.</li>
            </ul>
          </div>
        </div>

        <div class="footer">
          <p>Convoltaje - Energía Solar Confiable</p>
          <div class="footer-contact">
            📱 WhatsApp: 5355144097 | 📧 Email: convoltaje@gmail.com
          </div>
          <p style="margin-top: 15px;">Esta prefactura fue generada automáticamente el ${new Date().toLocaleString("es-ES")}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Convert HTML to PDF using html2pdf library
  try {
    // Import html2pdf dynamically
    const html2pdf = (await import("html2pdf.js")).default;

    const options: any = {
      margin: 0,
      filename: `Prefactura_${clientName}_${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: false, logging: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    return new Promise((resolve, reject) => {
      html2pdf()
        .set(options)
        .from(htmlContent)
        .toPdf()
        .output("blob")
        .then((blob: Blob) => resolve(blob))
        .catch(reject);
    });
  } catch (error) {
    // Fallback: Return the HTML content as a file
    console.warn("html2pdf failed or not available, using HTML fallback", error);
    
    // Create an HTML blob
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    return blob;
  }
}
