const logger = require( './config/logger' );

const chatInitial = require( './chat/initial' );

async function run() {
  logger.info( '----- run() THE BEGINNING -----' );
  await chatInitial();
};

run();
