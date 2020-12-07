const logger = require( '../config/logger' );

const chatInitial = require( '../chat/initial' );
const participantsInitial = require( '../participants/initial' );

async function initialIndexRun() {
  logger.info( '----- run() THE BEGINNING -----' );
  const chatInitialResult = await chatInitial();
  const usersInitialResult = await participantsInitial();
};

module.exports = initialIndexRun;
