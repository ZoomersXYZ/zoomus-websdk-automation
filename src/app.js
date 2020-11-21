const puppeteer = require( 'puppeteer' );
// const puppeteer = require( 'puppeteer-core' );
const axios = require( 'axios' );
const log4js = require( 'log4js' );

log4js.configure({
  appenders: { automation: { type: 'file', filename: 'logs/automation.log' } },
  categories: { default: { appenders: [ 'automation' ], level: 'info' } } 
} );
const logger = log4js.getLogger( 'automation' );

async function browserFunc() {
  const CHROME_PORT = 9222
  const response = await axios.get( `http://localhost:${ CHROME_PORT }/json/version` );
  const { webSocketDebuggerUrl } = response.data;
  return await puppeteer.connect( { browserWSEndpoint: webSocketDebuggerUrl } );  
};

class Dom {
  constructor( thePage ) {
    this.S = ' ';
    this.page = thePage;
  };
};

class MeetingControls extends Dom {
  rootDom = 'footer#wc-footer';
  participantsDom = this.rootDom + ' ' + 'div.footer-button__participants-icon';
  
  async activateParticipants() {
  };

  async deactivateParticipants() {
  };
};

class Participants extends Dom {
  static rootDom = 'div#wc-container-right';
  static siblingheaderDom = this.rootDom + ' ' + 'div.participants-header__header';
};

class ParticipantsMore extends Participants {
};

class ChatBox extends Dom {
};

class Initial extends Dom {
  rootDom = 'div.join-dialog';
  middleDom = ' div[role="tablist"]';
  closeButtonDom = ' > button[type="button"]';
  closeDialogDom = this.rootDom + this.middleDom + this.closeButtonDom;

  async closeDialog() {
  };
};

class Doc {
  constructor( page ) {
    this.controls = new MeetingControls( page );
    this.people = new Participants( page );
    this.more = new ParticipantsMore( page );
    this.chat = new ChatBox( page );
    this.initial = new Initial( page );
  };
};

async function run() {
  // Functions
  async function isVisibleCommand( sel ) {
    return await this.page.$eval( sel, ( elem ) => 
      ( window.getComputedStyle( elem )
        .getPropertyValue( 'display' ) 
        !== 'none' )
        && 
        elem.offsetHeight
    );
  };

  async function isVisible( sel, pause = 500 ) {
    if ( !sel ) {
      logger.warn( 'inVisible CSS arg is falsey') ;
      return false;
    };

    await page.waitForTimeout( pause );
    try {
      await isVisibleCommand( sel )

    } catch ( e ) {

      logger.warn( 'Failed the first time: ', sel );
      await page.waitForTimeout( 1000 );
      try {
        await isVisibleCommand( sel )
      } catch ( e ) {

        if ( e.sender === undefined ) {
          logger.warn( 'warn: isVisible received undefined?' );
          logger.info( 'CSS, ', sel );
          return false;
        };

        logger.error( 'isVisible fail: ', sel );
        logger.error( 'isVisible - ERR Sender: ', e.sender );
        logger.error( 'isVisible - ERR: ', e );

        return false;
      };
    };
  };

  async function essential( method, sel, timeOut = 5000, pause = 1000 ) {
    logger.info( '--- START ---' );
    logger.info( 'METHOD: ', method );
    logger.info( 'SEL: ', sel );

    await page.waitForTimeout( pause );
    try {
      await page[ method ]( sel, {
        timeout: timeOut
      } );
    } catch ( e ) {

      logger.warn( 'Failed the first time: ', sel );
      await page.waitForTimeout( 1000 );
      try {
        await page[ method ]( sel, {
          timeout: timeOut
        } );
      } catch ( e ) {

        logger.error( `2nd fail - ${ method }: `, sel );
        logger.error( `${ method } - ERR Sender: `, e.sender );
        logger.error( `${ method } - ERR: `, e );
      };
    };
    logger.info( '--- END ---' );
  };

  async function pSelector( sel ) {
    return await essential( 'waitForSelector', sel );
  };

  async function pClick( sel ) {
    return await essential( 'click', sel );
  };

  //
  // -> Base package

  ////
  // -> Core package  
  ////

  const browser = await browserFunc();
  const pages = await browser.pages();
  const page = pages[ 0 ];

  // Initializaing
  await page.setDefaultTimeout( 5000 );
  //Change default navigation time
  await page.setDefaultNavigationTimeout( 30000 );
  let sel = undefined;

  // reload
  await page.reload( { waitUntil: [ 'networkidle0', 'domcontentloaded' ] } );
  
  await page.setViewport( { width: 1200, height: 900 } );  
  

  ////
  // Actual automation
  ////

  sel = '#root > div > .form > .MuiButtonBase-root > .MuiButton-label';
  await pSelector( sel );
  await isVisible( sel );
  await pSelector( sel );
  await pClick( sel );

  //
  // Zoom Room

  sel = '.meeting-client-inner > .join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container';
  await pSelector( sel );
  await isVisible( sel );
  await pSelector( sel );
  await pClick( sel );
  
  sel = '.zmu-tabs > .zmu-tabs__tab-container > .zmu-tabs__tabs-list > #voip > .tab-bar-node';
  await pSelector( sel );
  await isVisible( sel );
  await pSelector( sel );
  await pClick( sel );
  
  sel = '.zmu-tabs > .zmu-tabs__tab-container > .zmu-tabs__tabs-list > #phone > .tab-bar-node';
  await pSelector( sel );
  await isVisible( sel );
  await pSelector( sel );
  await pClick( sel );
  
  sel = '.zmu-tabs__tab-container > .zmu-tabs__tabs-list > #voip > .tab-bar-node > .tab-bar-node__text';
  await pSelector( sel );
  await isVisible( sel );
  await pSelector( sel );
  await pClick( sel );
  
  sel = '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container > .zm-btn';
  await pSelector( sel );
  await isVisible( sel );
  await pSelector( sel );
  await pClick( sel );
  
  // await browser.close();
} );

run();
