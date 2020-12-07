const logger = require( './config/logger' );

const participantsInitial = require( './participants/initial' );
const participantsWaitingRoom = require( './participants/waitingRoom' );

async function initialUsersRun() {
  logger.info( '----- run() THE BEGINNING -----' );
  const usersInitialResult = await participantsInitial();
  const participantsWaitingRoomResult = await participantsWaitingRoomResult();
};

module.exports = initialUsersRun;
