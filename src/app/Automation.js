const createLogger = require( './config/createLogger' );
const to = require( 'await-to-js' ).default;

class Automation {
  constructor( page, name, defaultTimeOut ) {
    // @TODO can this be done? Is it the best way?
    this.to = to;

    this.page = page;
    this.logger = createLogger( `${ name }--Automation` );
    this.TIMEOUT = defaultTimeOut;
  };

  // Returns the turn of the method
  // or Puppeteer ElementHandle
  async findElFromText( sel, text, method = undefined ) {
    const [ err, result ] = await to( this.page.$$eval( sel, ( els, method, text, logger, console ) => {
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
    }, method, text, this.logger, console ) );
    if ( err ) {
      this.defaultErr( err.sender, method, sel, '2nd' );
      return false;
    };
    return result ? result : true;
  };

  // Returns boolean
  async isVisibleCommand( sel ) {
    const [ err, result ] = await to( this.page.$eval( sel, ( elem ) => 
      ( window.getComputedStyle( elem )
        .getPropertyValue( 'display' ) 
        !== 'none' )
        && 
        elem.offsetHeight
    ) );
    return [ err, result ];
    // if ( err ) {
    //   this.defaultErr( err.sender, method, sel, '2nd' );
    //   return false;
    // };
    // return result ? result : true;
  };

  async innerCore( method, sel, pageBool, timeOut = this.TIMEOUT, options = undefined ) {
    this.logger.info( 'innerCore pageBool: method, sel', `${ pageBool }: ${ method }, ${ sel }` );
    let err, result;
    if ( pageBool ) {
      [ err, result ] = await to( this.page[ method ]( sel, {
        timeout: timeOut, 
        ...options 
      } ) );
    } else {
      [ err, result ] = await to( this[ method ]( sel ) );
    };
    return [ err, result ];
  };

  defaultErr( sender, method, sel, identifier ) {
    this.logger.error( `${ identifier } fail - ${ method }: `, sel );
    this.logger.error( `${ method } - ERR Sender: `, sender );
    return false;
  };

  async coreWrapper( method, sel, timeOut = undefined, pause = undefined, options = undefined ) {
    let identifier = '';
    if ( options ) {
      if ( options.hasOwnProperty( 'visible' ) ) {
        identifier = options;
      };
    };

    let err, result;
    let pageFlag = true;

    if ( !timeOut ) {
      pageFlag = false;
      timeOut = this.TIMEOUT;
    };
    pause == !pause ? pause = 1500 : pause;

    if ( !sel ) {
      this.logger.warn( `${ method } CSS arg is falsey` );
      return false;
    };

    this.logger.info( ':: METHOD, SEL :: ', `${ method } ${ JSON.stringify( identifier ) }, ${ sel }` );

    await this.page.waitForTimeout( pause );
    [ err, result ] = await to( this.innerCore( method, sel, pageFlag, timeOut, options ) );
    
    if ( err ) {
      if ( pageFlag ) {
        this.defaultErr( err.sender, method, sel, '1st' );
        [ err, result ] = await to( this.innerCore( method, sel, pageFlag, timeOut, options ) );
        if ( err ) {
          this.defaultErr( err.sender, method, sel, '2nd' );
          return false;
        };
      } else {
        if ( err.sender === undefined ) {
          this.logger.warn( `warn: ${ method } received undefined?` );
          this.logger.info( 'CSS, ', sel );
        };
        this.defaultErr( err.sender, method, sel, '2nd' );
        return false;
      };
    };

    this.logger.info( ':: END :: ', method );
    return result ? result : true;
  };

  async isVisible( sel, pause = 1500 ) {
    return await this.coreWrapper( 'isVisibleCommand', sel, undefined, pause );
  };

  async essential( method, sel, timeOut = this.TIMEOUT, pause = 1500, options = undefined ) {
    return await this.coreWrapper( method, sel, timeOut, pause, options );
  };

  async pWaitVisible( sel, timeOut = this.TIMEOUT, pause = 1500 ) {
    const options = { visible: true };
    return await this.essential( 'waitForSelector', sel, timeOut, pause, options );
  };

  async pWaitSelector( sel, timeOut = this.TIMEOUT, pause = 1500 ) {
    const options = { visible: false };
    return await this.essential( 'waitForSelector', sel, timeOut, pause, options );
  };

  async pClick( sel ) {
    return await this.essential( 'click', sel );
  };

  async selClick( sel ) {
    if ( await this.pWaitSelector( sel ) ) {
      if ( await this.pWaitVisible( sel ) ) {
        return await this.pClick( sel );
      };
    };
    return false;
  };

  async visibleCheck( sel ) {
    if ( await this.pWaitSelector( sel ) ) {
      return await this.pWaitVisible( sel );
    };
    return false;
  };
};

module.exports = Automation;
