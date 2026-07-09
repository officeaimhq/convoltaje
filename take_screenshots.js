import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Mobile viewport
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  
  // Scroll until the first product card is in view
  await page.evaluate(() => {
    const el = document.querySelector('#convoltaje-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    // Scroll a bit down to show cards clearly
    window.scrollBy(0, 150);
  });
  
  await new Promise(r => setTimeout(r, 1500));
  
  // Take screenshot
  await page.screenshot({ path: 'product_cards_mobile.png' });
  console.log('Took screenshot of Product Cards');
  
  await browser.close();
})();
