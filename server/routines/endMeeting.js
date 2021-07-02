const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../core/bootstrap' );

async function endMeeting( bootstrapBool = false ) {
  let sel, rootSel, parentSel, combo = '';
  let pause = 1000;
  let timeOut = 5000;
  
  const logger = createLogger( 'solo--endMeeting' );
  logger.info( '-- BEGINNING --' );
  const a = await bootstrap( 'endMeeting', bootstrapBool );

  a.TIMEOUT = timeOut;
  a.PAUSE = pause;

  // Click the End then End Meeting for All buttons
  async function endMeetup() {
    let sel = '';
    sel = 'button.footer__leave-btn';
    await a.selClick( sel );
    await a.page.waitForTimeout( 500 );
    sel = 'button.leave-meeting-options__btn--danger';
    await a.selClick( sel );
  };

  return true;
};

module.exports = endMeeting;
