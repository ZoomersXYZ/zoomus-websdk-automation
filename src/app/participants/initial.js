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

  ////
  // STEP ONE: Check if popped out already
  ////
  parentSel = '#participant-window .participant-scrollbar ';
  const partPopped = await a.visibleCheck( parentSel );
  if ( partPopped ) {
    logger.info( 'participants already popped out' );
    return true;
  };

  await a.page.waitForTimeout( pause );

  ////
  // STEP TWO: Check if on the right hand side already (unlikely)
  // STEP THREE: If not, then click the footer button
  ////
  // what: visible; chat
  parentSel = '#wc-container-right';
  sel = ' #participantSectionMenu';
  combo = parentSel + sel;
  const partOpenToRight = await a.visibleCheck( combo );
  if ( !partOpenToRight ) {
    // what: click; footer chat icon
    sel = '#wc-footer > div > .footer-button__button > .footer-button__img-layer > .footer-button__participants-icon'; 
    await a.selClick( sel );
  };
  await a.page.waitForTimeout( pause );

  ////
  // STEP FOUR: Check if popped out again - post footer button
  ////
  // Check if popped out now
  parentSel = '#participant-window .participant-scrollbar ';
  const partPopped = await a.visibleCheck( parentSel );
  if ( partPoppedDeux ) {
    logger.info( 'participants popped out deux' );
    return true;
  };

  ////
  // STEP FIVE: Check if on right side again - post button.
  // If not, shit is broken. Abort!
  // STEP SIX: If it is, pop it out
  ////
  // Check if on right side again now
  parentSel = '#wc-container-right';
  sel = ' #participantSectionMenu';
  combo = parentSel + sel;
  const partOpenToRightDeux = await a.visibleCheck( combo );
  if ( !partOpenToRightDeux ) {
    logger.warn( 'participants isn\'t open' );
  } else {
    // what: visible; chat on right side
    const usersRightSide = await a.visibleCheck( combo );
    if ( usersRightSide ) {
      // what: click; dropdown menu icon
      await a.selClick( combo );
      // Or manually go to it via keyboard
      await a.page.waitForTimeout( 1000 );
      await a.page.keyboard.press( 'ArrowDown' );
      await a.page.waitForTimeout( 500 );
      await a.page.keyboard.press( 'ArrowDown' );
      await a.page.waitForTimeout( 500 );
      await a.page.keyboard.press( 'Enter' );
    };
  }
  
  return true;
};

module.exports = participantsInitial;
