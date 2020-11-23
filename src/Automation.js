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

  async innerCore( method, sel, pageBool, timeOut = 5000 ) {
    logger.info( 'innerCore pageBool: method,, sel', `${ pageBool }: ${ method },, ${ sel }` );
    if ( pageBool ) {
      await this.page[ method ]( sel, {
        timeout: timeOut
      } );
    } else {
      await this[ method ]( sel );      
    };
  };

  finalErr( e, sender, method, sel ) {
    logger.error( `2nd fail - ${ method }: `, sel );
    logger.error( `${ method } - ERR Sender: `, e.sender );
    logger.error( `${ method } - ERR: `, e );
    return false;
  };

  async coreWrapper( method, sel, timeOut = undefined, pause = undefined ) {
    let pageFlag = true;
    // I know, but going quickly for controlling value
    if ( !timeOut ) {
      pageFlag = false;
      timeOut = 5000;
    };
    pause == !pause ? pause = 1000 : pause;

    if ( !sel ) {
      logger.warn( `${ method } CSS arg is falsey` ) ;
      return false;
    };

    logger.info( ':: METHOD, SEL :: ', `${ method }, ${ sel }` );

    await this.page.waitForTimeout( pause );
    try {    
      await this.innerCore( method, sel, pageFlag, timeOut );
    } catch ( e ) {
      if ( pageFlag ) {
        logger.warn( 'Failed the first time: ', sel );

        await this.page.waitForTimeout( pause );
        try {
          await this.innerCore( method, sel, pageFlag, timeOut )
        } catch ( e ) {
          logger.warn( 'Failed the 2nd time: ', sel );
          this.finalErr( e, e.sender, method, sel );
        };
      } else {
        if ( e.sender === undefined ) {
          logger.warn( `warn: ${ method } received undefined?` );
          logger.info( 'CSS, ', sel );
          return false;
        };
        this.finalErr( e, e.sender, method, sel );
      };
    };
    logger.info( ':: END :: ', method );
  };


  async isVisible( sel, pause = 1000 ) {
    return await this.coreWrapper( 'isVisibleCommand', sel, undefined, pause );
  };

  async essential( method, sel, timeOut = 5000, pause = 1000 ) {
    return await this.coreWrapper( method, sel, timeOut, pause );
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
