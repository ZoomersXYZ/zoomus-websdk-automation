const createLogger = require( '../config/createLogger' );

const initial = require( './initial' );

async function chatWrite( a ) {
  let sel, rootSel, parentSel, combo = '';
  let pause = 1000;
  let timeOut = 5000;
  
  const logger = createLogger( 'solo--chatInitial' );
  logger.info( '-- BEGINNING --' );

  const result = await initial();

  // crawl through all the elements and remove the span with superflous info
  // Then search by text again
  const toSelection = async function( combo ) { 
    await a.page.$$eval( combo, ( els ) => {
      const purified = els
        .map( el => {
          const parent = el.parentNode;
          el.parentNode.removeChild( el );
          return parent;        
        } );
    } );
  };

  const toSelect = async function( ogSel, text ) { 
    await a.page.$$eval( ogSel, ( els, text ) => {
      return els
        .find( el => 
          el.textContent === text )
          .click();
    }, text );
  };

  // what: click; select user 'lol'
  sel = 'div.chat-receiver-list div.chat-receiver-list__menu > ul div.scroll-content > div > li > a';
  childSel = ' span.chat-receiver-list__appendix';
  combo = sel + childSel;
  await toSelection( combo );
  await toSelect( sel, 'lol' );
};

module.exports = chatWrite;
