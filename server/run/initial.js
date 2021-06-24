const run = require( '../common/core/run' );

const chatInitial = require( '../chat/initial' );
const participantsInitial = require( '../participants/initial' );

async function initialIndexRun() {
  const arr = [ 'chatInitial', 'participantsInitial' ];
  await run( 'initial', arr );

  // process.kill( process.pid, 'SIGTERM' );
  return true;
};

module.exports = initialIndexRun;
