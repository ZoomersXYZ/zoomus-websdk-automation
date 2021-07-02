const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../core/bootstrap' );

async function breakoutRoomsInitial( bootstrapBool = false ) {
  let sel, rootSel, parentSel, combo = '';
  let pause = 1000;
  let timeOut = 5000;
  
  const logger = createLogger( 'solo--breakoutRoomsInitial' );
  logger.info( '-- BEGINNING --' );
  const a = await bootstrap( 'breakoutRoomsInitial', bootstrapBool );

  a.TIMEOUT = timeOut;
  a.PAUSE = pause;

  ////
  // STEP ONE: Check if popped out already
  ////

  // what: click; footer breakout room icon

  // Create breakout rooms

  // Use XPath for text to check 3rd box

  // Move the window by editing the html width, height location parameters
  async function moveWebAppWindow() {

  };
  
  return true;
};

module.exports = breakoutRoomsInitial;
