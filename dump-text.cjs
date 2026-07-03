const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    const text = await page.evaluate(() => {
      const card = document.querySelector('.card-hover');
      if (card) {
        return card.innerText;
      }
      return 'No card found';
    });
    console.log("CARD TEXT:\n", text);
  } catch (error) {
    console.error('Error:', error);
  }

  await browser.close();
})();
