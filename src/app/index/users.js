const logger = require( '../config/logger' );

const initialUsersRun = require( '../run/users' );

async function participantsIndex() {
  logger.info( '----- participantsRun() THE BEGINNING -----' );
  await initialUsersRun();
};

participantsIndex();
return true;
