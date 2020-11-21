const puppeteer = require( 'puppeteer' );
// const puppeteer = require( 'puppeteer-core' );
const axios = require( 'axios' );

const logger = console;
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
    if ( !( await super.isVisible( Participants.siblingheaderDom ) ) ) { console.log( '1' ); return false };
    this.page.click( this.participantsDom );
    console.log( '1-1' );
  };

  async deactivateParticipants() {
    if ( await super.isVisible( Participants.siblingheaderDom ) ) { console.log( '2' ); return false };
    this.page.click( this.participantsDom );
    console.log( '2-2' );
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
    // await this.page.waitFor(1500);
    // await this.page.waitForSelector(this.closeDialogDom);
    // await page.focus(this.closeDialogDom);
    await this.page.goto("http://localhost/");
    await this.page.screenshot({ path: "./image.jpg", type: "jpeg" });
    // await page.close();
    // await browser.close();
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

  const browser = await puppeteer.launch( { headless: false } );
  const page = await browser.newPage();
  
  let pageUrl = 'http://localhost/';
  await page.goto( pageUrl, {
    waitUntil: 'networkidle0' 
  } );

  // OR trying to attach still

  const browser = await browserFunc();

  const pages = await browser.pages();
  const page = pages[ 0 ];

  await page.screenshot( { path: "image.jpg", type: "jpeg" } );

  return true;

  // reload
  await page.reload( { waitUntil: [ 'networkidle0', 'domcontentloaded' ] } );
  //  OR
  await page.evaluate( () => {
   location.reload( true );
  } );
  
  

run();

