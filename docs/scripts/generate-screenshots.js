const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const OUTPUT_DIR = path.join(__dirname, '../static/img');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureScreenshots() {
  console.log(`Iniciant captures des de ${BASE_URL}...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  try {
    // 1. Login
    console.log('Capturant Login...');
    await page.goto(`${BASE_URL}/login`);
    await page.waitForTimeout(1000);
    // Ofuscar inputs si cal
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01-login.png') });

    // Fem Login simulador o pre-configurat si tenim un entorn mock.
    // Com assumim que tenim backend aixecat:
    await page.fill('input[type="text"]', 'demo_user');
    await page.fill('input[type="password"]', 'demo_pass');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);

    // 2. Dashboard
    console.log('Capturant Dashboard...');
    await page.goto(`${BASE_URL}/`);
    await page.waitForTimeout(2000);
    
    // Ofuscar dades sensibles al Dashboard (ex: noms de BBDD o usuaris)
    await page.evaluate(() => {
      document.querySelectorAll('.sensitive-data').forEach(el => el.style.filter = 'blur(4px)');
    });
    
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02-dashboard.png') });

    // 3. Menú Principal (obrint el sidebar o similar)
    // Assumint que el menú està visible o l'obrim
    console.log('Capturant Menú Principal...');
    // await page.click('button.menu-toggle');
    // await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03-menu-principal.png') });

    // 4. Auditoria BBDD
    console.log('Capturant Auditoria BBDD...');
    await page.goto(`${BASE_URL}/auditoria`);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-auditoria.png') });

    console.log('Captures finalitzades amb èxit!');

  } catch (error) {
    console.error('Error durant les captures:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
