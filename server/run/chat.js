const run = require( '../common/core/run' );

const write = require( '../chat/write' );

async function theFunc() {
  // const usersInitialResult = await participantsInitial();
  await run( 'chat write', [ 'write'] );

  // process.kill( process.pid, 'SIGTERM' );
  return true;
};

theFunc();
