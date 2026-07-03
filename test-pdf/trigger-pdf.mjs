import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:5173/');

  // Wait for React to mount
  await new Promise(r => setTimeout(r, 2000));

  // Expose a function to call generatePDF
  // Wait, I can't easily call generatePDF because it's an ES module internal to Vite.
  // Let's just click the "Calculadora Solar" -> "Casa" -> "Siguiente" ...
  // But wait, the previous test timed out because it didn't find the elements.
  // Let's print the buttons it sees to debug.
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    console.log("Buttons on screen:");
    btns.forEach(b => console.log(`- ${b.textContent.trim()}`));
  });

  await browser.close();
})();
