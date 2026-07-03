import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  // Wait a bit to ensure everything is rendered
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_full_page.png', fullPage: true });

  await browser.close();
})();
