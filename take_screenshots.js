import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set to mobile viewport
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  
  // Wait for the app to load
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  // Wait a bit for everything to render
  await new Promise(r => setTimeout(r, 2000));
  
  // Open "Sistema Básico - 1500W"
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('h3'));
    const targetCard = cards.find(h3 => h3.textContent.includes('Sistema Básico - 1500W'));
    if (targetCard) {
      const btn = targetCard.parentElement.parentElement.querySelector('button');
      if (btn) btn.click();
    }
  });
  
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'product_detail_1500w_mobile.png', fullPage: true });
  console.log('Took screenshot of Sistema Básico 1500W');
  
  // Go back
  await page.evaluate(() => {
    const btn = document.querySelector('header button');
    if (btn) btn.click();
  });
  
  await new Promise(r => setTimeout(r, 1500));
  
  // Open "Sistema Premium 10000W"
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('h3'));
    const targetCard = cards.find(h3 => h3.textContent.includes('Sistema Premium 10000W'));
    if (targetCard) {
      const btn = targetCard.parentElement.parentElement.querySelector('button');
      if (btn) btn.click();
    }
  });
  
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'product_detail_10000w_mobile.png', fullPage: true });
  console.log('Took screenshot of Sistema Premium 10000W');
  
  await browser.close();
})();
