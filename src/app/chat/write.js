const cheerio = require( 'cheerio' );

const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../core/bootstrap' );
const initial = require( './initial' );

async function chatWrite() {
  let sel, rootSel, parentSel, combo, $ = '';
  let pause = 1000;
  let timeOut = 5000;
  
  const logger = createLogger( 'solo--chatWrite' );
  logger.info( '-- BEGINNING --' );
  const a = await bootstrap( 'chatWrite' );
  const e = a.extra;
  // const result = await initial();

  // what: click; select user 'lol'
  sel = 'div.chat-receiver-list div.chat-receiver-list__menu > ul div.scroll-content > div > li > a';
  childSel = ' span.chat-receiver-list__appendix';
  combo = sel + childSel;
  await e.removeSelector( combo );
  await e.clickText( sel, 'lol' );


  ////
  // Actual used stuff
  ////

  // hover to grab timestamps as well
  sel = 'div.ReactVirtualized__Grid__innerScrollContainer';
  await a.page.hover( sel );

  // grab all the 
  sel = 'div.chat-item__chat-info';
  const theHtml = await page.evaluate( ( sel ) => 
    Array.from( 
      document.querySelectorAll( sel ), 
      element => element.outerHTML 
    ), sel 
  );

  const chatHistory = theHtml.map( ( solo ) => {
    $ = cheerio.load( solo );
    
    const cSender = $( 'span:nth-child( 1 )' );
    const sender = { 
      id: msg.attr( 'data-userid' ), 
      name: msg.attr( 'data-name' ) 
    };
    // const name = msg.attr( 'title' );

    const cToWhom = $( 'span:nth-child( 2 )' );    
    const toWhom = { 
      id: cToWhom.attr( 'data-userid' ), 
      name: cToWhom.attr( 'data-name' ) 
    };

    const time = $( '.chat-item__chat-info-time-stamp' ).text();
    const msg = $( '.chat-item__chat-info-msg' ).text();

    return {
      sender, 
      toWhom, 
      time, 
      msg 
    };
  } );
};

module.exports = chatWrite;
