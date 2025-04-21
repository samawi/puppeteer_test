import puppeteer from "puppeteer";

async function main() {
  // Launch the browser with specific options
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to a simpler page
    console.log('Navigating to example.com...');
    await page.goto('https://example.com');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Wait for the content to load
    await page.waitForSelector('h1');

    // Get the title
    const title = await page.$eval('h1', el => el.textContent);
    console.log('The title of this page is "%s".', title);

    // Take a screenshot
    await page.screenshot({ path: 'example.png' });
    console.log('Screenshot saved as example.png');

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

main();