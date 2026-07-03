const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  
  // Try to load the local dev server
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    // Find the product card
    const card = await page.$('.card-hover');
    if (card) {
      await card.screenshot({ path: 'product-card-bug.png' });
      console.log('Screenshot saved to product-card-bug.png');
    } else {
      console.log('Card not found');
    }
  } catch (error) {
    console.error('Failed to load page', error);
  }

  await browser.close();
})();
