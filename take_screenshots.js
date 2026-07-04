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
  
  // SCENARIO: Kit Comparison Flow
  try {
    console.log('Capturing Kit Comparison Flow...');
    
    // Navigate to the table view by clicking the catalog button or scrolling
    // Let's just reload the page and scroll down to the table
    await page.goto('http://localhost:5173');
    await new Promise(r => setTimeout(r, 2000));
    
    // Scroll down to the table
    await page.evaluate(() => {
      window.scrollBy(0, 3500);
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // Click "Comparar" on the first two kits
    // In table view, they are inside td elements
    const compareButtons = await page.$$('table button');
    
    if (compareButtons.length >= 2) {
      await compareButtons[0].click();
      await new Promise(r => setTimeout(r, 500));
      await compareButtons[1].click();
      await new Promise(r => setTimeout(r, 1000));
      
      console.log('Captured Comparison Bar screenshot');
      await page.screenshot({ path: 'screenshot_comparison_bar.png', fullPage: true });
      
      // Click "Comparar ahora" in the floating bar
      try {
        await page.waitForSelector('#comparar-ahora-btn', { visible: true, timeout: 5000 });
        await page.click('#comparar-ahora-btn');
        await new Promise(r => setTimeout(r, 1500));
        
        console.log('Captured Kit Comparison Page screenshot');
        await page.screenshot({ path: 'screenshot_kit_comparison.png', fullPage: true });
      } catch (err) {
        console.log('Could not find floating bar button', err);
      }
    } else {
      console.log('Could not find compare buttons in table');
    }
  } catch (error) {
    console.error('Error during Kit Comparison flow:', error);
  }

  await browser.close();
})();
