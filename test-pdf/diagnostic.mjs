import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push('Console Error: ' + msg.text());
  });
  page.on('pageerror', err => errors.push('Page Error: ' + err.message));
  page.on('requestfailed', request => {
    errors.push(`Failed Request: ${request.url()} (${request.failure().errorText})`);
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  // 1. Hero
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_01_hero.png' });
  
  // 2. Catalog
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_02_catalog.png' });
  
  // 3. Calculator Step 1
  await page.evaluate(() => {
    const calc = document.querySelector('h2.text-primary'); // "Calculadora Solar Inteligente"
    if (calc) calc.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_03_calc_step1.png' });
  
  // Click home (Casa)
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('div.cursor-pointer'));
    if (cards.length > 0) cards[0].click();
  });
  await new Promise(r => setTimeout(r, 200));
  // Click Next
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent.includes('Siguiente'));
    if (next) next.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_04_calc_step2.png' });
  
  // Click add appliance
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const add = btns.find(b => b.textContent.includes('Televisor'));
    if (add) add.click();
  });
  await new Promise(r => setTimeout(r, 200));
  // Click Next
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent.includes('Siguiente'));
    if (next && !next.disabled) next.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_05_calc_step3.png' });
  
  // Click Next
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent.includes('Ver Resultados') || b.textContent.includes('Siguiente'));
    if (next && !next.disabled) next.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_06_calc_step4.png' });
  
  // Click "Solicitar este Sistema"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const request = btns.find(b => b.textContent.includes('Solicitar este Sistema'));
    if (request) request.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_07_lead_modal.png' });
  
  // Close Modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const closeBtn = btns.find(b => b.querySelector('svg.lucide-x')); // The X button
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Comparison Table
  await page.evaluate(() => {
    const table = document.querySelector('h2').parentElement.parentElement;
    window.scrollBy(0, 1000);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_08_comparison.png' });

  // Scroll to bottom (FAQ + Footer)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/Users/rodyfigueroa/Desktop/index/test-pdf/downloads/mobile_09_footer.png' });

  console.log(JSON.stringify({ errors }, null, 2));

  await browser.close();
})();
