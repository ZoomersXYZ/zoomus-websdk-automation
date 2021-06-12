const logger = require( './config/logger' );

const chatInitial = require( './chat/initial' );
const participantsInitial = require( './participants/initial' );

async function run() {
  logger.info( '----- run() THE BEGINNING -----' );
  const chatInitialResult = await chatInitial();
  const usersInitialResult = await participantsInitial();
  process.kill( process.pid, 'SIGTERM' );
};

run();
