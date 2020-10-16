const puppeteer = require( 'puppeteer-core' );
const axios = require( 'axios' );

const browserFunc = async () => {
  const CHROME_PORT = 9222
  const response = await axios.get( `http://localhost:${ CHROME_PORT }/json/version` );
  const { webSocketDebuggerUrl } = response.data;
  return await puppeteer.connect( { browserWSEndpoint: webSocketDebuggerUrl } );  
};

( async () => {
  const browser = await browserFunc();
  // Only one tab. Not sure if this is needed
  const pages = await browser.pages();
  const page = pages[ 0 ];
  
  console.log( 'lol1' );
  // await page.waitForSelector( 'button.join-dialog__close' );
  await page.click( 'button.join-dialog__close' );
  
  // Waits until the `title` meta element is rendered
  await page.waitForSelector('title');
  // Fetches page's title
  const title = await page.title();
  console.info(`The title 1: ${title}`);
  console.info(`The title 3: ${title}`);

  
  // Probably never run the below?
  // await browser.close();
  // await chrome.kill();
} )();

