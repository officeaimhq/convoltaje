import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Mobile
  await page.setViewport({ width: 375, height: 812 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'hero_mobile.png', clip: { x: 0, y: 0, width: 375, height: 812 } });

  // Desktop
  await page.setViewport({ width: 1280, height: 800 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'hero_desktop.png', clip: { x: 0, y: 0, width: 1280, height: 800 } });

  await browser.close();
})();
