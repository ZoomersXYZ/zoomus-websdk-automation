const browserFunc = require( './config/browserFunc' );
const Automation = require( './Automation' );

const logger = require( './config/logger' );

const initialLaunch = require( './initialLaunch' );

async function run() {
  // Initializaing
  const browser = await browserFunc();
  const pages = await browser.pages();
  const page = pages[ 0 ];  

  // Initializaing values
  await page.setDefaultTimeout( 7500 );
  await page.setDefaultNavigationTimeout( 30000 );
  await page.setViewport( { width: 1200, height: 900 } );  

  // Own initializing
  const a = new Automation( page );
  let sel = undefined;

  logger.info( '----- THE BEGINNING -----' );

  // Reload
  await page.reload( { 
    waitUntil: [ 'networkidle0', 'domcontentloaded' ] } 
  );

  await initialLaunch( a );
};

run();
