const puppeteer = require('puppeteer');

const cri = require('chrome-remote-interface');

async function scrapPage(targetedURL) {

  //start find browser
  console.log(`Searching for browser...`);
  let browserList = await getAllBrowserListtest();

  //browser validation (Devmode will lunch chromium in case of no browser found)
  if( browserList.length === 0 ){
    return
  }
  //start scrap each browser
    for(browser of browserList){
      //filter only page browser
      if(browser.type !== 'page'){continue}
      console.log(browser);

      try {
        //connect to browser
        const browserEndpoint = browser.webSocketDebuggerUrl;
        console.log(`Connecting to browser at ${browserEndpoint}...`)
        const currentbrowser = await puppeteer.connect({ browserWSEndpoint: browserEndpoint });

        //redirect to targetedURL
        const pages = await currentbrowser.pages();
        const page = pages[0]; 
        console.log(`Scraping: ${targetedURL}...`);
        await page.goto(targetedURL);

        //pull data
        const content = await page.content();
        console.log(content);

        //close connection
        await currentbrowser.close();

        //check response
      if(content !== null){
        pass
      }
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
}

async function getAllBrowserList() {
  try {
    const browserList = await cri.List({});
    return browserList;
  } catch (err) {
    console.log(`Error: No browser found - ${err.message}`);
    return [];
  }
}

async function getAllBrowserListtest() {
  return[{
    description: '',
    devtoolsFrontendUrl: '/devtools/inspector.html?ws=127.0.0.1:9222/devtools/page/C3469CD82067C4D198CB71FA8A66E93E',
    id: 'C3469CD82067C4D198CB71FA8A66E93E',
    title: 'New Tab',
    type: 'page',
    url: 'chrome://newtab/',
    webSocketDebuggerUrl: 'ws://localhost:9222/devtools/browser/09ef1681-e9e9-4569-b4eb-18347a15815b'
  }]
}

module.exports = {
  scrapPage
}