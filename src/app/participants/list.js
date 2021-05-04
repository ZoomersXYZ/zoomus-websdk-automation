const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../core/bootstrap' );

async function participantsList( bootstrapBool = false ) {
  let sel, rootSel, parentSel, combo = '';
  let pause = 1000;
  let timeOut = 5000;
  
  const logger = createLogger( 'solo--participantsList' );
  logger.info( '-- BEGINNING --' );

  a.TIMEOUT = timeOut;
  a.PAUSE = pause;

  ////
  // STEP ONE: Check if popped out already
  ////
  sel = 'div.participants-item__item-layout';
  const theHtml = await a.grabAllSelectors( sel );

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

    const textTime = $( '.chat-item__chat-info-time-stamp' ).text();
    const msg = $( '.chat-item__chat-info-msg' ).text();

    return {
      sender, 
      toWhom, 
      textTime, 
      msg 
    };
  } );

  
  
  return true;
};

module.exports = participantsList;
