const logger = require( '../config/logger' );

const bootstrap = require( '../core/bootstrap' );
const chatInitial = require( '../chat/initial' );
const participantsInitial = require( '../participants/initial' );

async function initialBootstrapRun() {
  logger.info( '----- run() THE BEGINNING -----' );
  const a = await bootstrap( 'initial', true );

  const chatInitialResult = await chatInitial();
  const usersInitialResult = await participantsInitial();
};

module.exports = initialBootstrapRun;
