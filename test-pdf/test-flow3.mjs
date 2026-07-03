import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const downloadPath = path.resolve(__dirname, 'downloads');
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  const client = await page.createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });

  await page.goto('http://localhost:5173/');

  // Step 1: Casa
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('div.cursor-pointer'));
    if (cards.length > 0) cards[0].click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent.includes('Siguiente'));
    if (next) next.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Step 2: Appliances ("Televisor" or "Aire Acondicionado")
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const add = btns.find(b => b.textContent.includes('Televisor') || b.textContent.includes('Aire Acondicionado'));
    if (add) add.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent.includes('Siguiente'));
    if (next && !next.disabled) next.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Step 3: Location
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find(b => b.textContent.includes('Ver Resultados') || b.textContent.includes('Siguiente'));
    if (next && !next.disabled) next.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  // Step 4: Results -> Descargar Prefactura
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const download = btns.find(b => b.textContent.includes('Descargar Prefactura'));
    if (download && !download.disabled) download.click();
  });

  console.log('Clicked download, waiting...');
  
  let downloadedFile = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const files = fs.readdirSync(downloadPath);
    const pdf = files.find(f => f.endsWith('.pdf') && !f.endsWith('.crdownload'));
    if (pdf) {
      downloadedFile = path.join(downloadPath, pdf);
      break;
    }
  }

  if (downloadedFile) {
    const stats = fs.statSync(downloadedFile);
    console.log(`Downloaded file size: ${stats.size} bytes`);
    if (stats.size > 10000) {
      console.log('SUCCESS: PDF has visual content.');
    } else {
      console.log('FAIL: PDF is too small, likely empty.');
    }
    // Also run file command on it
    import('child_process').then(cp => {
       console.log('File type:');
       console.log(cp.execSync(`file "${downloadedFile}"`).toString());
    });
  } else {
    console.log('No file downloaded.');
  }

  await browser.close();
})();
