const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../core/bootstrap' );

async function chatInitial( bootstrapBool = false ) {
  let sel, rootSel, parentSel, combo = '';
  let pause = 1000;
  let timeOut = 5000;
  
  const logger = createLogger( 'solo--chatInitial' );
  logger.info( '-- BEGINNING --' );
  const a = await bootstrap( 'chatInitial', bootstrapBool );

  a.TIMEOUT = timeOut;
  a.PAUSE = pause;

  // NOTE: Not checking if chat is popped out. This is only an issue if the browser window is too narrow which will mess up checking chat anyway. No need to over optimizie.

  ////
  // STEP ONE: Check if chat is already on the right side. If so, done
  // STEP TWO: If not, click footer button to open it up
  ////
  parentSel = '#wc-container-right';
  sel = ' #chatSectionMenu';
  combo = parentSel + sel;
  const chatToRight = await a.visibleCheck( combo );
  if ( chatToRight ) {
    logger.info( 'chat already open on right side' );
    return true;
  } else {
    // what: click; footer chat icon
    sel = '#wc-footer > div > .footer-button__button > .footer-button__img-layer > .footer-button__chat-icon';
    await a.selClick( sel );    
  };
  
  await a.page.waitForTimeout( pause );

  ////
  // STEP THREE: Check if chat is open on right side now. If so, done.
  // STEP FOUR: If not, it's a bust
  ////
  // what: visible; chat on right side
  parentSel = '#wc-container-right';
  sel = ' #chatSectionMenu';
  combo = parentSel + sel;
  const chatRightSide = await a.visibleCheck( combo );
  if ( !chatRightSide ) {
    logger.warning( 
      'participants panel not showing up on the right hand side' 
    );
    return false;
  };
  
  return true;
};

module.exports = chatInitial;
