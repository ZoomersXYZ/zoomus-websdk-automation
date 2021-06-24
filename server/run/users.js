const run = require( '../common/core/run' );

// const participantsInitial = require( '../participants/initial' );
const participantsWaitingRoom = require( '../participants/waitingRoom' );

async function initialUsersRun() {
  // const usersInitialResult = await participantsInitial();
  await run( 'initialUsersRun', [ participantsWaitingRoom ] );

  process.kill( process.pid, 'SIGTERM' );
  return true;
};

initialUsersRun();
