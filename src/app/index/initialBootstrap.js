const logger = require( '../config/logger' );

const initialBootstrapRun = require( '../run/initialBootstrap' );

async function initialBootstrap() {
  logger.info( '----- initialBootstrap() THE BEGINNING -----' );
  await initialBootstrapRun();
};

initialBootstrap();
