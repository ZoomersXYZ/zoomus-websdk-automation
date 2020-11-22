const logger = require( './config/logger' );

class Automation {
  constructor( page ) {
    this.page = page;
  };

  async isVisibleCommand( sel ) {
    return await this.page.$eval( sel, ( elem ) => 
      ( window.getComputedStyle( elem )
        .getPropertyValue( 'display' ) 
        !== 'none' )
        && 
        elem.offsetHeight
    );
  };

  async isVisible( sel, pause = 500 ) {
    if ( !sel ) {
      logger.warn( 'inVisible CSS arg is falsey') ;
      return false;
    };

    await this.page.waitForTimeout( pause );
    try {
      await this.isVisibleCommand( sel )

    } catch ( e ) {
      logger.warn( 'Failed the first time: ', sel );
      await this.page.waitForTimeout( 1000 );
      try {
        await this.isVisibleCommand( sel )
      } catch ( e ) {

        if ( e.sender === undefined ) {
          logger.warn( 'warn: isVisible received undefined?' );
          logger.info( 'CSS, ', sel );
          return false;
        };

        logger.error( 'isVisible fail: ', sel );
        logger.error( 'isVisible - ERR Sender: ', e.sender );
        logger.error( 'isVisible - ERR: ', e );

        return false;
      };
    };
  };

  async essential( method, sel, timeOut = 5000, pause = 1000 ) {
    logger.info( '--- START ---' );
    logger.info( 'METHOD: ', method );
    logger.info( 'SEL: ', sel );

    await this.page.waitForTimeout( pause );
    try {
      await this.page[ method ]( sel, {
        timeout: timeOut
      } );
    } catch ( e ) {

      logger.warn( 'Failed the first time: ', sel );
      await this.page.waitForTimeout( 1000 );
      try {
        await this.page[ method ]( sel, {
          timeout: timeOut
        } );
      } catch ( e ) {

        logger.error( `2nd fail - ${ method }: `, sel );
        logger.error( `${ method } - ERR Sender: `, e.sender );
        logger.error( `${ method } - ERR: `, e );
      };
    };
    logger.info( '--- END ---' );
  };

  async pSelector( sel ) {
    return await this.essential( 'waitForSelector', sel );
  };

  async pClick( sel ) {
    return await this.essential( 'click', sel );
  };

  async selClick( sel ) {
    await this.pSelector( sel );
    await this.isVisible( sel );
    await this.pSelector( sel );
    await this.pClick( sel );
  };
};

module.exports = Automation;
