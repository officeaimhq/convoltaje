import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  // Capture Product cards section
  console.log('Capturing product cards...');
  const productSection = await page.$('#catalogo');
  if (productSection) {
    await productSection.screenshot({ path: 'mobile_products.png' });
  } else {
    // Scroll a bit down to capture
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.screenshot({ path: 'mobile_products.png' });
  }
  
  // Capture Carousel section
  console.log('Waiting for carousel...');
  await page.evaluate(() => window.scrollTo(0, 3000)); // Scroll to carousel
  
  // Wait to see quotes and images
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'carousel_test.png' });
  
  await browser.close();
  console.log('Screenshots saved');
})();
