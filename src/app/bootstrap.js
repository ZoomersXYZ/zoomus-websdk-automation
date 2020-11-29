const browserFunc = require( './config/browserFunc' );
const Automation = require( './Automation' );

const logger = require( './config/logger' );

const initialStrap = require( './initialStrap' );

async function bootstrap() {
// Initializaing
  const browser = await browserFunc();
  const pages = await browser.pages();
  const page = pages[ 0 ];  

  // Initializaing values
  await page.setDefaultTimeout( 7500 );
  await page.setDefaultNavigationTimeout( 30000 );
  await page.setViewport( { width: 1200, height: 900 } );

  logger.info( '-- bootstrapped --' );
  const a = new Automation( page );

  const initialResult = await initialStrap( a );

  return a;
};

module.exports = bootstrap;
