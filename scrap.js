const puppeteer = require('puppeteer');

async function scrapPage(targetedURL) {
  const devmodeInitlized = false
  
  try {
    //initialize
    let browser;
    let browserWSEndpoint;

    //start find browser
    console.log(`Connecting to browser...`)
    const endpointObj = findBrowserWSEndpoint();
    browserWSEndpoint = endpointObj.endpoint;
    const endpointFound = endpointObj.found;

    //browser validation (Devmode in case of no browser found)
    if ( !endpointFound ) {
      if( devmodeInitlized ){
        browser = await puppeteer.launch({
          headless: false,
          executablePath: '/usr/bin/chromium-browser',
        });
        browserWSEndpoint = browser.wsEndpoint();
        console.log(browserWSEndpoint);
      } else {
      throw new Error('Browser not found')
      }
    }
    
    //connect to browser
    console.log(`Connecting to ${browserWSEndpoint}...`)
    browser = await puppeteer.connect({ browserWSEndpoint });

    //redirect to targetedURL
    const pages = await browser.pages();
    const page = pages[0]; 
    console.log(`Scraping: ${targetedURL}...`);
    await page.goto(targetedURL);

    //pull data
    const content = await page.content();
    console.log(content);

    //close connection
    await browser.close();
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }

}

function findBrowserWSEndpoint() {
    return {
      endpoint: 'ws://localhost:9222/devtools/browser/3772afa5-3589-4a24-ae20-847d3e86cb40',
      found: false
    }
}
module.exports = {
  scrapPage
};
