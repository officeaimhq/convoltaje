const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = '/Users/rodyfigueroa/.gemini/antigravity-ide/brain/5b6728a6-f3cd-42da-932c-d34f364a6b7d';
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

(async () => {
  console.log("🚀 Starting Puppeteer browser session for OT Demo Journey...");

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();

  // Helper for setting logged in user in localStorage
  async function setUser(userObj) {
    await page.evaluate((u) => {
      localStorage.setItem('convoltaje-auth-storage-v3', JSON.stringify({
        state: { currentUser: u },
        version: 0
      }));
    }, userObj);
  }

  // User Objects
  const niurki = { id: "6", name: "Niurki", role: "comercial", title: "Asesora Comercial" };
  const samuel = { id: "4", name: "Samuel", role: "proyectista", title: "Proyectista Técnico" };
  const almacenero = { id: "8", name: "Almacenero", role: "almacenero", title: "Gestión de Almacén" };
  const transportista = { id: "9", name: "Transportista", role: "transportista", title: "Transporte y Logística" };
  const yasiel = { id: "5", name: "Yasiel", role: "tecnico", title: "Director Técnico" };
  const jose = { id: "3", name: "José Luis", role: "contable", title: "Contador / Marketing" };

  try {
    // 1. Landing Page & Product Catalog / Comparison
    console.log("📸 1. Capturing Landing Page & Catalog...");
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      window.scrollTo(0, 800);
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_landing_catalog.png') });

    // 2. Commercial View - CRM Pipeline (Niurki)
    console.log("📸 2. Capturing CRM Pipeline (Commercial View - Niurki)...");
    await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle2' });
    await setUser(niurki);
    await page.goto('http://localhost:5173/admin/panel', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_crm_pipeline_niurki.png') });

    // 3. Proyectista View - Levantamiento Técnico (Samuel)
    console.log("📸 3. Capturing Levantamiento Técnico (Proyectista View - Samuel)...");
    await setUser(samuel);
    await page.goto('http://localhost:5173/admin/panel', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_levantamiento_samuel.png') });

    // 4. Almacén View - Pedidos Pendientes & Stock Validation (Almacenero)
    console.log("📸 4. Capturing Pedidos Pendientes & Inventory (Almacenero View)...");
    await setUser(almacenero);
    await page.goto('http://localhost:5173/admin/panel', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_almacen_pedidos.png') });

    // 5. Transportista View - Rutas & Maps.me (Transportista)
    console.log("📸 5. Capturing Entregas & Maps.me (Transportista View)...");
    await setUser(transportista);
    await page.goto('http://localhost:5173/admin/panel', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '05_entregas_transportista.png') });

    // 6. Técnico View - Instalaciones & Checklist (Yasiel)
    console.log("📸 6. Capturing Instalaciones (Director Técnico View - Yasiel)...");
    await setUser(yasiel);
    await page.goto('http://localhost:5173/admin/panel', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '06_instalaciones_yasiel.png') });

    // 7. Admin / Contable View - Verificación de Pago & RBAC (José)
    console.log("📸 7. Capturing Finanzas & Verificación de Pago (Contable View - José)...");
    await setUser(jose);
    await page.goto('http://localhost:5173/admin/panel', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '07_finanzas_jose.png') });

    console.log("✅ All 7 OT Journey Screenshots successfully captured and saved!");

  } catch (err) {
    console.error("❌ Error during screenshot capture:", err);
  } finally {
    await browser.close();
  }
})();
