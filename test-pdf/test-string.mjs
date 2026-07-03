import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:5173/');

  // inject html2pdf
  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js' });

  await new Promise(r => setTimeout(r, 1000));

  const result = await page.evaluate(async () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { background: white; color: black; font-family: Arial; padding: 50px; }
          h1 { color: red; }
        </style>
      </head>
      <body>
        <h1>Hello World from HTML String</h1>
        <p>This is a test to see if html2pdf can render a string directly.</p>
      </body>
      </html>
    `;
    const options = {
      margin: 10,
      filename: `test.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    const blob = await window.html2pdf().set(options).from(htmlContent).toPdf().output("blob");
    // return blob size
    return blob.size;
  });

  console.log(`Blob size generated from string: ${result} bytes`);

  await browser.close();
})();
