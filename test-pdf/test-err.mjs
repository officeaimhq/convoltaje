import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/');

  // 1. Tintaflash Toast
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const tintaBtn = btns.find(b => b.textContent.includes('Tintaflash'));
    if (tintaBtn) {
      tintaBtn.click();
    }
  });
  
  await new Promise(r => setTimeout(r, 500));
  
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log("HTML has 'Próximamente':", html.includes('Próximamente'));
  
  await browser.close();
})();
