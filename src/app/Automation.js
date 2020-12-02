const createLogger = require( './config/createLogger' );

class Automation {
  constructor( page, name ) {
    this.page = page;
    this.logger = createLogger( `${ name }--Automation` );
  };

  // Returns the turn of the method
  // or Puppeteer ElementHandle
  async findElFromText( sel, text, method = undefined ) {
    await this.page.$$eval( sel, ( els, method, text, logger, console ) => {
      if ( method ) {
        return els
          .find( el => 
            el.textContent === text )
            [ method ]();
      } else {
        return els
          .find( el => 
            el.textContent === text );

      };
    }, method, text, this.logger, console );
  };

  // Returns boolean
  async isVisibleCommand( sel ) {
    return await this.page.$eval( sel, ( elem ) => 
      ( window.getComputedStyle( elem )
        .getPropertyValue( 'display' ) 
        !== 'none' )
        && 
        elem.offsetHeight
    );
  };

  async innerCore( method, sel, pageBool, timeOut = 7500, options = {} ) {
    this.logger.info( 'innerCore pageBool: method, sel', `${ pageBool }: ${ method },, ${ sel }` );
    if ( pageBool ) {
      return await this.page[ method ]( sel, {
        timeout: timeOut, 
        ...options 
      } );
    } else {
      return await this[ method ]( sel );      
    };
  };

  defaultErr( e, sender, method, sel, identifier ) {
    this.logger.error( `${ identifier } fail - ${ method }: `, sel );
    this.logger.error( `${ method } - ERR Sender: `, e.sender );
    // this.logger.error( `${ method } - ERR: `, e );
    return false;
  };

  async coreWrapper( method, sel, timeOut = undefined, pause = undefined, options ) {
    let pageFlag = true;
    // I know, but going quickly for controlling value
    if ( !timeOut ) {
      pageFlag = false;
      timeOut = 7500;
    };
    pause == !pause ? pause = 1500 : pause;

    if ( !sel ) {
      this.logger.warn( `${ method } CSS arg is falsey` ) ;
      return false;
    };

    this.logger.info( ':: METHOD, SEL :: ', `${ method }, ${ sel }` );

    await this.page.waitForTimeout( pause );
    try {    
      return await this.innerCore( method, sel, pageFlag, timeOut, options );
    } catch ( e ) {
      if ( pageFlag ) {
        this.defaultErr( e, e.sender, method, sel, '1st' );

        await this.page.waitForTimeout( pause );
        try {
          return await this.innerCore( method, sel, pageFlag, timeOut, options )
        } catch ( e ) {
          // this.logger.warn( 'Failed the 2nd time: ', sel );
          return this.defaultErr( e, e.sender, method, sel, '2nd' );
        };
      } else {
        if ( e.sender === undefined ) {
          this.logger.warn( `warn: ${ method } received undefined?` );
          this.logger.info( 'CSS, ', sel );
          return false;
        };
        return this.finalErr( e, e.sender, method, sel );
      };
    };
    this.logger.info( ':: END :: ', method );
  };

  async isVisible( sel, pause = 1500 ) {
    return await this.coreWrapper( 'isVisibleCommand', sel, undefined, pause );
  };

  async essential( method, sel, timeOut = 7500, pause = 1500, options = {} ) {
    return await this.coreWrapper( method, sel, timeOut, pause, options );
  };

  async pWaitVisible( sel, timeOut = 7500, pause = 1500 ) {
    const options = { visible: true };
    return await this.essential( 'waitForSelector', sel, timeOut, pause, options );
  };

  async pWaitSelector( sel ) {
    return await this.essential( 'waitForSelector', sel );
  };

  async pClick( sel ) {
    return await this.essential( 'click', sel );
  };

  async selClick( sel ) {
    if ( await this.pWaitSelector( sel ) ) {
      if ( await this.pWaitVisible( sel ) ) {
        // await this.pSelector( sel );
        return await this.pClick( sel );
      } else {
        return { bool: false, issue: 'notVisible' };
      };
    } else {
      return { bool: false, issue: 'cantSelect' };
    }
  };

  async visibleCheck( sel ) {
    if ( await this.pWaitSelector( sel ) ) {
       return await this.pWaitVisible( sel );
    } else {
      return { bool: false, issue: 'cantSelect' };
    }
  };
};

module.exports = Automation;
