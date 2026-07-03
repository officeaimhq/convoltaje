import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to mobile 375px wide
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  // Take full page screenshot
  await page.screenshot({ path: 'mobile_fullpage.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshot saved to mobile_fullpage.png');
})();
