const browserFunc = require( './config/browserFunc' );
const Automation = require( './Automation' );

const logger = require( './config/logger' );

async function run() {
  // Initializaing
  const browser = await browserFunc();
  const pages = await browser.pages();
  const page = pages[ 0 ];  

  // Initializaing values
  await page.setDefaultTimeout( 5000 );
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
  
  ////
  // Actual automation
  ////

  sel = '#root > div > .form > .MuiButtonBase-root > .MuiButton-label';
  await a.selClick( sel );

  // Zoom Room

  sel = '.meeting-client-inner > .join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container';
  await a.selClick( sel );
  
  sel = '.zmu-tabs > .zmu-tabs__tab-container > .zmu-tabs__tabs-list > #voip > .tab-bar-node';
  await a.selClick( sel );
  
  sel = '.zmu-tabs > .zmu-tabs__tab-container > .zmu-tabs__tabs-list > #phone > .tab-bar-node';
  await a.selClick( sel );
  
  sel = '.zmu-tabs__tab-container > .zmu-tabs__tabs-list > #voip > .tab-bar-node > .tab-bar-node__text';
  await a.selClick( sel );
  
  sel = '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container > .zm-btn';
  await a.selClick( sel );
};

run();
