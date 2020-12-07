const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../core/bootstrap' );

async function waitingRoom( a ) {
  let sel, rootSel, parentSel, combo = '';
  let pause = 1000;
  let timeOut = 5000;
  logger.info( '-- participantsJoin BEGINNING --' );

  const logger = createLogger( 'solo--waitingRoom' );
  logger.info( '-- BEGINNING --' );
  const a = await bootstrap( 'waitingRoom' );

  // [aria-label="View waiting room list"]
  await a.page.waitForTimeout( pause );
  
  parentSel = '#wc-container-left > .notification-manager > .notification-message-wrap > .notification-message-wrap__layer';
  sel = ' i.notification-message-wrap__close';
  combo = parentSel + sel;
  const waitingRoomQueue = await a.visibleCheck( combo );
  if ( !waitingRoomQueue ) {
    logger.info(
      'queue - no queue detected. Stopping here'
    );
    return false;
  };
  
  // parentSel = '#wc-container-left > .notification-manager > .notification-message-wrap > .notification-message-wrap__layer';
  parentSel = '#wc-container-left > .notification-manager';
  sel = ' .notification-message-wrap__btns > .zmu-btn--primary';
  combo = parentSel + sel;
  const waitingRoomSoloPerson = await a.visibleCheck( combo );
  if ( waitingRoomSoloPerson ) {
    await a.click( combo );
    logger.info(
      'queue - admitted single person via popover'
    );
    return true;
  };

  ////
  // Multiple people
  ////

  // check for participants panel specific queue or for View button
  sel = '.waiting-room-list-conatiner__title-section > button';
  const multipleWaitingSide = await a.visibleCheck( sel );
  if ( multipleWaitingSide ) {
    await a.click( sel );
    logger.info(
      'queue - admitted multiple people via Admit All -- first try'
    );
    return true;
  };

  // Final test of seeing if participants panel isnt open
  parentSel = '#wc-container-left > .notification-manager > .notification-message-wrap > .notification-message-wrap__layer';
  sel = ' .notification-message-wrap__btns > button.zmu-btn--default';
  combo = parentSel + sel;
  const multipleWaitingNoPanel = await a.visibleCheck( combo );
  if ( multipleWaitingNoPanel ) {
    await a.click( combo );
    logger.info(
      'queue - opened panel. Continuing'
    );
  };

  // repeat above
// check for participants panel specific queue or for View button
  sel = '.waiting-room-list-conatiner__title-section > button';
  const multipleWaitingSide = await a.visibleCheck( sel );
  if ( multipleWaitingSide ) {
    await a.click( sel );
    logger.info(
      'queue - admitted multiple people via Admit All -- second try'
    );
    return true;
  };

  logger.warning( 
    'notification popover seemingly up but could not admit person[s]' 
  );
  return false;
};

module.exports = waitingRoom;
