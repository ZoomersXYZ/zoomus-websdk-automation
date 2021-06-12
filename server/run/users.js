const logger = require( '../config/logger' );

// const participantsInitial = require( '../participants/initial' );
const participantsWaitingRoom = require( '../participants/waitingRoom' );

async function initialUsersRun() {
  logger.info( '----- initialUsersRun() THE BEGINNING -----' );
  // const usersInitialResult = await participantsInitial();
  const participantsWaitingRoomResult = await participantsWaitingRoom();
  return true;
};

module.exports = initialUsersRun;
