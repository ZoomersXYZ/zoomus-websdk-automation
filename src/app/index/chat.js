const logger = require( '../config/logger' );

const write = require( '../chat/write' );

async function theFunc() {
  logger.info( '----- chat write THE BEGINNING -----' );
  // const usersInitialResult = await participantsInitial();
  const result = await write();
  return true;
};

async function run() {
  await theFunc();
  process.kill( process.pid, 'SIGTERM' );
};

run();
