import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  // Capture FAQ section
  console.log('Capturing FAQ section...');
  await page.evaluate(() => window.scrollTo(0, 4500)); // Scroll to FAQ approximately
  
  // Wait to render
  await new Promise(r => setTimeout(r, 2000));
  
  const faqSection = await page.$('#faq');
  if (faqSection) {
    await faqSection.screenshot({ path: 'mobile_faq.png' });
  } else {
    await page.screenshot({ path: 'mobile_faq.png' });
  }
  
  await browser.close();
  console.log('Screenshot saved');
})();
