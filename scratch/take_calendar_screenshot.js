import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  
  // Login: hacer clic en "Ángel Eduardo"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const userButton = buttons.find(b => b.textContent.trim().includes('Ángel Eduardo'));
    if (userButton) userButton.click();
  });
  
  await new Promise(r => setTimeout(r, 1500));
  
  // Clic en "Calendario"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, div[role="button"]'));
    const calButton = buttons.find(b => b.textContent.includes('Calendario'));
    if (calButton) calButton.click();
  });
  
  await new Promise(r => setTimeout(r, 1500));
  
  // Tomar captura de pantalla
  await page.screenshot({ path: '/Users/rodyfigueroa/.gemini/antigravity-ide/brain/e05e54cc-76f3-4f99-b781-2f4dd070c1dd/calendar_fixed.png' });
  console.log('Captura del calendario guardada.');
  
  await browser.close();
})();
