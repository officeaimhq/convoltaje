import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5173/');

  // 1. Tintaflash Toast
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const tintaBtn = btns.find(b => b.textContent.includes('Tintaflash'));
    if (tintaBtn) tintaBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  const hasToast = await page.evaluate(() => {
    return document.body.innerHTML.includes('Próximamente: Tintaflash');
  });
  console.log('Tintaflash Toast shown:', hasToast);

  // Navigating to Step 4
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('div.cursor-pointer'));
    if (cards.length > 0) cards[0].click();
  });
  await new Promise(r => setTimeout(r, 200));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent.includes('Siguiente'));
    if (next) next.click();
  });
  await new Promise(r => setTimeout(r, 200));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const add = btns.find(b => b.textContent.includes('Televisor') || b.textContent.includes('Aire Acondicionado'));
    if (add) add.click();
  });
  await new Promise(r => setTimeout(r, 200));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent.includes('Siguiente'));
    if (next && !next.disabled) next.click();
  });
  await new Promise(r => setTimeout(r, 200));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent.includes('Ver Resultados') || b.textContent.includes('Siguiente'));
    if (next && !next.disabled) next.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 3. Upsell Recommendations
  const hasBundleBeforeClick = await page.evaluate(() => {
    return document.body.innerHTML.includes('Oferta de Paquete');
  });
  console.log('Bundle offer shown BEFORE selecting product:', hasBundleBeforeClick);
  
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const addUpsell = btns.find(b => b.textContent.trim() === 'Agregar' && !b.textContent.includes('Televisor'));
    if (addUpsell) addUpsell.click();
  });
  await new Promise(r => setTimeout(r, 500));
  
  const hasBundleAfterClick = await page.evaluate(() => {
    return document.body.innerHTML.includes('Oferta de Paquete');
  });
  console.log('Bundle offer shown AFTER selecting product:', hasBundleAfterClick);

  // 4. "Siguiente" button hidden
  const hasSiguiente = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    // Make sure it's not the next button inside step 3 (which shouldn't be there anyway)
    return !!btns.find(b => b.textContent.trim() === 'Siguiente');
  });
  console.log('Siguiente button present in Step 4:', hasSiguiente);

  await browser.close();
})();
