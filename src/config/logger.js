const log4js = require( 'log4js' );

log4js.configure({
  appenders: { automation: { type: 'file', filename: 'logs/automation.log' } },
  categories: { default: { appenders: [ 'automation' ], level: 'info' } } 
} );

const logger = log4js.getLogger( 'automation' );

module.exports = logger;
