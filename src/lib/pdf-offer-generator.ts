import { Product } from './products';
import html2pdf from 'html2pdf.js';

interface ClientData {
  name: string;
  address?: string;
  phone?: string;
  date: string;
  reference: string;
}

export const generateOfferPdf = async (
  product: Product, 
  client: ClientData,
  isInvoice: boolean = false
) => {
  const container = document.createElement('div');
  
  // Derko-style CSS
  container.innerHTML = `
    <style>
      .pdf-container {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #333;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 0;
        box-sizing: border-box;
      }
      .page {
        padding: 40px 50px;
        position: relative;
        min-height: 1050px;
        page-break-after: always;
      }
      .header-geometric {
        position: absolute;
        top: 0;
        right: 0;
        width: 350px;
        height: 120px;
        background: linear-gradient(135deg, #0F3A7D 0%, #00D9FF 100%);
        clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 40px;
      }
      .header-geometric img {
        height: 60px;
        object-fit: contain;
        filter: brightness(0) invert(1);
      }
      .document-title {
        font-size: 32px;
        font-weight: 800;
        color: #0F3A7D;
        margin-top: 60px;
        margin-bottom: 5px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .meta-data {
        font-size: 14px;
        color: #666;
        margin-bottom: 40px;
      }
      .meta-data p {
        margin: 4px 0;
      }
      .client-section {
        background: #f8fafc;
        border-left: 4px solid #0F3A7D;
        padding: 15px 20px;
        margin-bottom: 40px;
      }
      .client-section h3 {
        margin: 0 0 10px 0;
        font-size: 16px;
        color: #0F3A7D;
      }
      .client-section p {
        margin: 4px 0;
        font-size: 14px;
      }
      .table-container {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 40px;
      }
      .table-container th {
        background-color: #0F3A7D;
        color: white;
        text-align: left;
        padding: 12px 15px;
        font-size: 14px;
      }
      .table-container td {
        padding: 15px;
        border-bottom: 1px solid #e2e8f0;
        font-size: 14px;
      }
      .table-container .price-col {
        text-align: right;
        font-weight: bold;
      }
      .total-row {
        background-color: #f1f5f9;
      }
      .total-row td {
        font-size: 18px;
        font-weight: bold;
        color: #0F3A7D;
        border-bottom: none;
      }
      .footer-badge {
        position: absolute;
        bottom: 40px;
        left: 50px;
        height: 80px;
      }
      
      /* Page 2 specifics */
      .section-title {
        color: #0F3A7D;
        border-bottom: 2px solid #00D9FF;
        padding-bottom: 8px;
        margin-top: 30px;
        margin-bottom: 15px;
        font-size: 18px;
      }
      .terms-list {
        font-size: 14px;
        line-height: 1.6;
        color: #444;
        padding-left: 20px;
      }
      .terms-list li {
        margin-bottom: 8px;
      }
      .highlight-box {
        background: #fff8f1;
        border: 1px solid #fed7aa;
        padding: 15px;
        border-radius: 6px;
        margin-top: 20px;
        font-size: 14px;
        color: #9a3412;
      }
    </style>
    
    <div class="pdf-container">
      <!-- PÁGINA 1: LA OFERTA / FACTURA -->
      <div class="page">
        <div class="header-geometric">
          <!-- Logo en blanco (invertido en css) para contrastar sobre el fondo azul -->
          <img src="/images/Logo-admin.png" alt="ConVoltaje Logo" />
        </div>
        
        <h1 class="document-title">${isInvoice ? 'Factura Comercial' : 'Oferta Comercial'}</h1>
        
        <div class="meta-data">
          <p><strong>Fecha:</strong> ${client.date}</p>
          <p><strong>Referencia:</strong> ${client.reference}</p>
          <p><strong>Validez:</strong> ${isInvoice ? '-' : '15 días'}</p>
        </div>

        <div class="client-section">
          <h3>Datos del Cliente</h3>
          <p><strong>Nombre:</strong> ${client.name}</p>
          ${client.phone ? `<p><strong>Teléfono:</strong> ${client.phone}</p>` : ''}
          ${client.address ? `<p><strong>Dirección:</strong> ${client.address}</p>` : ''}
        </div>

        <table class="table-container">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cant.</th>
              <th class="price-col">Precio Unit.</th>
              <th class="price-col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${product.name}</strong><br>
                <span style="color: #666; font-size: 12px;">Suministro de equipos según catálogo técnico.</span>
              </td>
              <td>1</td>
              <td class="price-col">$${product.price.toLocaleString()}</td>
              <td class="price-col">$${product.price.toLocaleString()}</td>
            </tr>
            <tr>
              <td>
                <strong>Instalación y Puesta en Marcha</strong><br>
                <span style="color: #666; font-size: 12px;">Mano de obra certificada. Incluye cables solares estándar.</span>
              </td>
              <td>1</td>
              <td class="price-col">Incluido</td>
              <td class="price-col">$0.00</td>
            </tr>
            <tr class="total-row">
              <td colspan="3" style="text-align: right;">Total (USD)</td>
              <td class="price-col">$${product.price.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 50px; font-size: 14px; color: #555;">
          <p><strong>Método de pago:</strong> Efectivo (USD) al finalizar la instalación y puesta en marcha del equipo.</p>
          <p>Sin anticipos ni adelantos requeridos.</p>
        </div>

        <!-- Sello de garantía en la esquina inferior izquierda -->
        <img src="/images/Damos garantia.png" alt="Damos Garantía" class="footer-badge" />
      </div>

      <!-- PÁGINA 2: TÉRMINOS Y CONDICIONES -->
      <div class="page">
        <div class="header-geometric" style="height: 60px; clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);"></div>
        
        <h2 style="margin-top: 40px; color: #0F3A7D; font-size: 24px;">Términos y Condiciones Generales</h2>
        
        <h3 class="section-title">1. ¿Qué incluye la oferta?</h3>
        <ul class="terms-list">
          <li>Suministro de los equipos fotovoltaicos detallados en la página anterior.</li>
          <li>Transporte de los equipos hasta el sitio de instalación.</li>
          <li>Instalación mecánica y eléctrica estándar (cableado desde los paneles hasta el inversor y baterías, a una distancia prudencial).</li>
          <li>Configuración del inversor y puesta en marcha del sistema.</li>
        </ul>

        <h3 class="section-title">2. ¿Qué NO está incluido?</h3>
        <ul class="terms-list">
          <li>Obras civiles (construcción de bases de concreto, rotura de paredes, zanjado extenso).</li>
          <li>Acondicionamiento o sustitución del cableado eléctrico existente de la vivienda si se encuentra en mal estado.</li>
          <li>Materiales eléctricos adicionales si la distancia entre paneles e inversor supera lo estándar.</li>
        </ul>

        <h3 class="section-title">3. Condiciones del Espacio</h3>
        <p style="font-size: 14px; color: #444; margin-top: 10px;">Para garantizar el éxito de la instalación, el cliente debe disponer de:</p>
        <ul class="terms-list">
          <li>Una superficie sólida (techo de placa o similar) libre de sombras para los paneles solares.</li>
          <li>Un espacio interior ventilado y protegido de la intemperie para el inversor y las baterías.</li>
          <li>Acometida eléctrica en buenas condiciones para realizar las conexiones de forma segura.</li>
        </ul>

        <h3 class="section-title">4. Garantía</h3>
        <ul class="terms-list">
          <li><strong>Paneles Solares:</strong> 10 años de garantía de producto y 25 años de rendimiento lineal.</li>
          <li><strong>Inversor y Baterías:</strong> 5 años de garantía contra defectos de fábrica.</li>
          <li><strong>Mano de obra:</strong> 1 año de garantía sobre la instalación realizada.</li>
        </ul>

        <div class="highlight-box">
          <strong>Nota importante:</strong> La garantía pierde efecto si los equipos son manipulados por personal no autorizado por ConVoltaje, o si sufren daños por descargas atmosféricas directas o desastres naturales.
        </div>
        
        <div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div style="text-align: center; width: 250px; border-top: 1px solid #000; padding-top: 10px;">
            <p style="margin: 0; font-size: 14px; font-weight: bold;">Por ConVoltaje</p>
            <p style="margin: 0; font-size: 12px; color: #666;">Firma Autorizada</p>
          </div>
          <div style="text-align: center; width: 250px; border-top: 1px solid #000; padding-top: 10px;">
            <p style="margin: 0; font-size: 14px; font-weight: bold;">El Cliente</p>
            <p style="margin: 0; font-size: 12px; color: #666;">Aceptación Conforme</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const opt = {
    margin:       0,
    filename:     `${isInvoice ? 'Factura' : 'Oferta'}_ConVoltaje_${client.name.replace(/\s+/g, '_')}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false },
    jsPDF:        { unit: 'pt', format: 'letter', orientation: 'portrait' }
  };

  await html2pdf().from(container).set(opt).save();
};
