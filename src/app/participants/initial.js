const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../core/bootstrap' );

async function participantsInitial( bootstrapBool = false ) {
  let sel, rootSel, parentSel, combo = '';
  let pause = 1000;
  let timeOut = 5000;
  
  const logger = createLogger( 'solo--participantsInitial' );
  logger.info( '-- BEGINNING --' );
  const a = await bootstrap( 'participantsInitial', bootstrapBool );

  a.TIMEOUT = timeOut;
  a.PAUSE = pause;

  await a.page.waitForTimeout( pause );
  // what: visible; chat
  sel = '[aria-label="participant list"]';
  const usersOpen = await a.visibleCheck( sel );
  if ( !usersOpen ) {
    // what: click; footer chat icon
    sel = '#wc-footer > div > .footer-button__button > .footer-button__img-layer > .footer-button__participants-icon';
    await a.selClick( sel );
  };
  
  await a.page.waitForTimeout( pause );
  // what: visible; chat on right side
  parentSel = '#wc-container-right';
  sel = ' [aria-label="participant list"]';
  combo = parentSel + sel;
  const usersRightSide = await a.visibleCheck( combo );
  // If chat isn't popped out, pop it out
  if ( !usersRightSide ) {
    logger.warning( 
      'participants panel not showing up on the right hand side' 
    );
    return false;
  };
  
  return true;
};

module.exports = participantsInitial;
