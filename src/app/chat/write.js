const cheerio = require( 'cheerio' );

const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../core/bootstrap' );
const initial = require( './initial' );

async function chatWrite() {
  let sel, rootSel, parentSel, combo, $ = '';
  let pause = 1000;
  let timeOut = 5000;
  let prevChat = '';
  
  const logger = createLogger( 'solo--chatWrite' );
  logger.info( '-- BEGINNING --' );
  const a = await bootstrap( 'chatWrite' );
  const e = a.extra;
  // const result = await initial();

  // what: click; select user 'lol'
  sel = 'div.chat-receiver-list div.chat-receiver-list__menu > ul div.scroll-content > div > li > a';
  childSel = ' span.chat-receiver-list__appendix';
  combo = sel + childSel;
  await e.removeSelector( combo );
  await e.clickText( sel, 'lol' );


  ////
  // Actual used stuff
  ////

  // hover to grab timestamps as well
  sel = 'div.ReactVirtualized__Grid__innerScrollContainer';
  await a.page.hover( sel );

  // grab all the 
  sel = 'div.chat-item__chat-info';
  const theHtml = await a.grabAllSelectors( sel );
  // const theHtml = await page.evaluate( ( sel ) => 
  //   Array.from( 
  //     document.querySelectorAll( sel ), 
  //     element => element.outerHTML 
  //   ), sel 
  // );

  const setupChatHistory = function( solo ) {
    $ = cheerio.load( solo );
    
    const cSender = $( 'span:nth-child( 1 )' );
    const sender = { 
      id: msg.attr( 'data-userid' ), 
      name: msg.attr( 'data-name' ) 
    };
    // const name = msg.attr( 'title' );

    const cToWhom = $( 'span:nth-child( 2 )' );    
    const toWhom = { 
      id: cToWhom.attr( 'data-userid' ), 
      name: cToWhom.attr( 'data-name' ) 
    };

    const textTime = $( '.chat-item__chat-info-time-stamp' ).text();
    const msg = $( '.chat-item__chat-info-msg' ).text();
    msgArr = msg.split( /\n/ );

    const final = msgArr.map( ( solo ) => { 
      return {
        sender, 
        toWhom, 
        textTime, 
        msg: solo 
      };
    } )
    
    return final;
  };

  const chatHistory = theHtml
    .map( ( solo ) => setupChatHistory( solo ) )
    .flat( 2 )
    .reverse();

  const setInitialItem = function( item, value = '' )  {
    if ( !sessionStorage.getItem( item ) ) {
      sessionStorage.setItem( item, value );
    };
    sessionStorage.getItem( item );
  };

  const checkForNewMessages = function( arr ) {
    const last = {
      time: new Date( parseInt( setInitialItem( 'lastTime', Number( 0 ) ) ) ), 
      msg: setInitialItem( 'lastMsg' ), 
      sender: setInitialItem( 'lastSender' ), 
      toWhom: setInitialItem( 'lastToWhom' ) 
    };

    arr.forEach( ( solo, index ) => {
      solo.time = parse( solo.textTime, 'h:mm:ss a', new Date() );

      // Check if not a new msg
      if ( 
        solo.time === last.time && 
        solo.sender === last.sender &&
        solo.toWhom === last.toWhom 
      ) {
        if ( index === 0 ) {
          return;
        };

        // Set the previous array item which is further ahead in time as the new session storage
        const prev = arr[ index - 1 ];
        sessionStorage.setItem( 'time', Number( parse( prev.textTime, 'h:mm:ss a', new Date() ) ) );
        sessionStorage.setItem( 'sender', prev.sender );
        sessionStorage.setItem( 'toWhom', prev.toWhom );
        sessionStorage.setItem( 'msg', prev.msg );
      };

      // check if the message is talking to the bot


      // obj to make namespace cleaner

      const parameters = {
        tasks: [
          '#todo', 
          '#to-do', 
          '#task', 
        ],

        do: [
          '#doing', 
          '#working', 
          '#working_on', 
          '#workingon', 
        ], 

        done: [
          '[x]', 
          '#done', 
        ], 

        checkin: [
          '#note', 
          '#progress', 
          '#checkin', 
          '#chickin', 
          '#check-in', 
        ], 

        verbal: [
          '#verbal', 
          '#verbal_checkin', 
          '#verbal_chickin' 
        ], 

        bye: [
          '#bye', 
          '#byefelecia', 
          '#later', 
          '#latertater', 
          '#aurevoir', 
          '#toodleoo', 
          '#peace', 
          '#adieu', 
          '#sayonara' 
        ]
      };

      const parameterFind = ( arr, message ) => arr.find( ( solo ) => 
        message.search( solo ) != -1
      );

      if ( parameterFind( parameters.tasks, solo.msg ) ) {
        
      } else if ( parameterFind( parameters.do, solo.msg ) ) {

      } else if ( parameterFind( parameters.done, solo.msg ) ) {

      } else if ( parameterFind( parameters.checkin, solo.msg ) ) {

      } else if ( parameterFind( parameters.verbal, solo.msg ) ) {

      };

    } );
    return true;
  };

  const findDeluminator = function( str ) { 
    const possibilities = [
      [ '0. ', /(\d)\.\s/ ], 
      [ '0) ', /(\d)\)\s/ ], 

      [ '1. ', /(\d)\.\s/ ], 
      [ '1) ', /(\d)\)\s/ ], 

      [ '-- ', /--\s/ ], 
      [ '* ', /\*\s/ ] 

      // [ [ '0 ', '1 ' ], /(\d )/ ], 
      // [ [ '1 ', '2 ' ], /(\d )/ ] 
    ];
    
    return possibilities.find( ( solo ) => 
      str.search( solo[ 1 ] ) != -1
    );
  };

  const deluminatorLogic = function( delimiter ) { 
    const whichDelimeter = delimiter[ 0 ];

    if ( delimeter == '1. ' ) {

    } else if ( delimeter == '1) ' ) {

    } else if ( delimeter == '-- ' ) {

    } else if ( delimeter == '* ' ) {

  };

  // checkForNewMessages( chatHistory );
};

module.exports = chatWrite;
