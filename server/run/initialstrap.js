const bootstrap = require( '../common/core/bootstrap' );
const run = require( '../common/core/run' );

// const chatInitial = require( '../chat/initial' );
// const participantsInitial = require( '../participants/initial' );

async function initialBootstrapRun() {
  const a = await bootstrap( 
    'initial', 
    true, 
    true 
  );

  // const arr = [ 'chatInitial', 'participantsInitial' ];
  // await run( 'initial', arr );
  
  process.kill( process.pid, 'SIGTERM' );
  return true;
};

initialBootstrapRun();
// module.exports = initialBootstrapRun;
