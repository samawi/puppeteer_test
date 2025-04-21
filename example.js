import puppeteer from "puppeteer";

async function main() {
  // Launch the browser with specific options
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Create a new page
    const page = await browser.newPage();
    
    // Navigate to the Chrome Developers site
    console.log('Navigating to developer.chrome.com...');
    await page.goto('https://developer.chrome.com/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Type into search box
    console.log('Typing into search box...');
    await page.locator('.devsite-search-field').fill('automate beyond recorder');

    // Wait and click on first result
    console.log('Waiting for search results...');
    await page.waitForSelector('.devsite-result-item-link');
    const searchResults = await page.$$('.devsite-result-item-link');
    if (searchResults.length > 0) {
      await searchResults[0].click();
    } else {
      throw new Error('No search results found');
    }

    // Wait for and locate the text containing "Customize and automate"
    console.log('Looking for article title...');
    const textElement = await page.waitForSelector('text/Customize and automate');
    const fullTitle = await textElement?.evaluate(el => el.textContent);

    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);

    // Take a screenshot for verification
    await page.screenshot({ path: 'chrome-dev.png' });
    console.log('Screenshot saved as chrome-dev.png');

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

main();