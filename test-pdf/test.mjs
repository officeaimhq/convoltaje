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
  
  const client = await page.createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });

  await page.goto('http://localhost:5173/');

  // Click on "Comprobar disponibilidad" of the first product
  await page.waitForSelector('.card-hover button');
  const buttons = await page.$$('.card-hover button');
  if (buttons.length > 0) {
    await buttons[0].click();
  }

  // Fill form
  await page.waitForSelector('input[name="name"]');
  await page.type('input[name="name"]', 'Test User');
  await page.type('input[name="phone"]', '1234567890');
  await page.type('input[name="email"]', 'test@example.com');
  
  const submitBtn = await page.$('button[type="submit"]');
  await submitBtn.click();

  console.log('Submitted, waiting for download...');
  
  let downloadedFile = null;
  for (let i = 0; i < 30; i++) {
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
    if (stats.size > 10000) { // 10KB+ means it has images
      console.log('SUCCESS: PDF has visual content.');
    } else {
      console.log('FAIL: PDF is too small, likely empty.');
    }
  } else {
    console.log('No file downloaded.');
  }

  await browser.close();
})();
