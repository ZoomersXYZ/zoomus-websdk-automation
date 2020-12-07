const logger = require( '../config/logger' );

const initialIndexRun = require( '../run/initial' );

async function initialIndex() {
  logger.info( '----- initialIndex() THE BEGINNING -----' );
  await initialIndexRun();
};

initialIndex();
