const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\David\\.gemini\\antigravity\\brain\\a258b507-7d63-495e-92dd-28f19149f7f3';

async function main() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3001 ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 1500));

  // 1. Home Hero
  console.log('Capturing Home Hero...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_home_hero.png') });

  // 2. Scroll to Featured Rooms
  console.log('Capturing Featured Rooms & Bento Grid...');
  await page.evaluate(() => window.scrollBy(0, 900));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02_featured_rooms.png') });

  // 3. Scroll to Bento Grid & SafeRentGuide
  await page.evaluate(() => window.scrollBy(0, 1100));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_bento_and_guide.png') });

  // 4. Navigate to Search Page
  console.log('Navigating to Search page...');
  await page.evaluate(() => {
    const navSearch = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Khám phá phòng'));
    if (navSearch) navSearch.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_search_split_screen.png') });

  // 5. Click on first room card to open Detail
  console.log('Opening Room Detail View...');
  await page.evaluate(() => {
    const card = document.querySelector('[data-room-card]') || document.querySelector('article') || document.querySelector('.group.cursor-pointer');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_room_detail_view.png') });

  console.log('Verification screenshots captured successfully!');
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
