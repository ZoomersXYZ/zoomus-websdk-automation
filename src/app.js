const puppeteer = require( 'puppeteer-core' );
const axios = require( 'axios' );
const fs = require( 'fs' );

const browserFunc = async () => {
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

  async isVisible( css ) {
    if ( !css ) {
      console.warn( 'inVisible CSS arg is falsey') ;
      return false;
    };

    try {
      await this.page.$eval( css, ( elem ) => 
      window.getComputedStyle( elem )
            .getPropertyValue( 'display' ) !== 'none' 
            && elem.offsetHeight
      );
    } catch ( e ) {
      if ( e.sender === undefined ) {
        console.warn( 'warn: isVisible received undefined?' );
        console.log( 'CSS, ', css );
        return false;
      };
      return false;
    };

  };

  async waitForSelector( css ) {
    if ( !css ) {
      console.warn( 'waitForSelector CSS arg is falsey') ;
      return false;
    };

    try {
      await this.page.waitForSelector( css )
    } catch ( e ) {
      if ( e.sender === undefined ) {
        console.warn( 'warn: waitForSelector received undefined?' );
        console.log( 'CSS, ', css );
        return false;
      };
      return false;
    };
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
  // closeDialogDom = this.rootDom + this.middleDom + this.closeButtonDom;
  // closeDialogDom = '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container > .zm-btn';
  // closeDialogDom = '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container > .zm-btn';
  // closeDialogDom = 'div#zmmtg-root div.zmu-tabs__tab-container.zmu-tabs__tab-container--top > button[type="button"]';
  // closeDialogDom = '.zm-btn .join-dialog__close .zm-btn--default .zm-btn__outline--blue';

  async closeDialog() {

    // await this.page.waitFor(1500);
    // await this.page.waitForSelector(this.closeDialogDom);
    // await page.focus(this.closeDialogDom);

    // await this.page.screenshot({ path: './image.jpg', type: 'jpeg' });
    await this.page.goto("http://localhost/");
    await this.page.screenshot({ path: "./image.jpg", type: "jpeg" });
    // await page.close();
    // await browser.close();

// if ( !( await super.isVisible( this.closeDialogDom ) ) ) { 
    //   console.log( '3' ); return false;
    // };
    console.log( 'hi1' );
    // await this.page.click( this.closeDialogDom );
    // let hi = null;
    // try {
    //   hi = await this.page.content();
    // } catch( e ) {
    //   console.error( 'fudge' );
    // };
    // console.log( 'hi', hi );

    // fs.writeFileSync( 'test-sync.html', hi );
    // fs.writeFile("/tmp/test", hi, function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("The file was saved!");
    // }); 
    // console.log( 'hi2' );
    // await page.click( '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container > .zm-btn' );
    // console.log( '3-3' );
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
  const browser = await browserFunc();

    // const page = await browser.newPage();
    // let pageUrl = "http://localhost/";

    // await page.goto( pageUrl, {
    //     waitUntil: 'networkidle0' // 'networkidle0' is very useful for SPAs.
    // } );

  const pages = await browser.pages();
  const page = pages[ 0 ];

  await page.screenshot( { path: "image.jpg", type: "jpeg" } );

  return true;

  // lol
  // Only one tab. Not sure if this is needed
  // const pages = await browser.pages();
  // const page = pages[ 0 ];

  // const doc = new Doc( page );  
  // console.log( 'lol1' );

  // const waitingRoomDom = 'section.waiting-room-list-conatiner__wr-scrollbar'
  
  // await page.waitForSelector( 'title' );
  // const title = await page.title();
  
  // console.info( `The title 2: ${ title }` );

  // await doc.initial.closeDialog();
  // console.log( 'lol2' );

  // await doc.controls.activateParticipants();
  // console.log( 'lol3' );
  // await doc.controls.deactivateParticipants();
  // console.log( 'lol4' );

  // console.info( `The title 3: ${ title }` );
};

run();

