import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  
  await page.goto('http://localhost:5173/admin', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  
  // Login: hacer clic en el usuario "Ángel Eduardo"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const userButton = buttons.find(b => b.textContent.trim().includes('Ángel Eduardo'));
    if (userButton) userButton.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Clic en el botón de Calendario
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, div[role="button"]'));
    // Encontrar mosaico de Calendario en MobileHomeGrid
    const calButton = buttons.find(b => b.textContent.includes('Calendario'));
    if (calButton) calButton.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Obtener los estilos computados de los elementos y sus padres
  const styles = await page.evaluate(() => {
    const getStyles = (el) => {
      if (!el) return null;
      const comp = window.getComputedStyle(el);
      const parent = el.parentElement;
      const parentStyle = parent ? window.getComputedStyle(parent) : null;
      return {
        tag: el.tagName,
        className: el.className,
        display: comp.display,
        position: comp.position,
        top: comp.top,
        rect: el.getBoundingClientRect().toJSON(),
        parent: parent ? {
          tag: parent.tagName,
          className: parent.className,
          display: parentStyle.display,
          position: parentStyle.position,
          flexDirection: parentStyle.flexDirection,
          rect: parent.getBoundingClientRect().toJSON()
        } : null
      };
    };
    
    return {
      viewSelector: getStyles(document.querySelector('.grid-cols-4')),
      dateNavigator: getStyles(document.querySelector('.backdrop-blur-md')),
      weekDays: getStyles(document.querySelector('.grid-cols-7'))
    };
  });
  
  console.log(JSON.stringify(styles, null, 2));
  await browser.close();
})();
