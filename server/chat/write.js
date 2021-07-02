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

  // what: click; select user ${ who }
  async function specifyWhoToDM( who ) {
    const sel = 'div.chat-receiver-list div.chat-receiver-list__menu > ul div.scroll-content > div > li > a';
    const childSel = ' span.chat-receiver-list__appendix';
    const combo = sel + childSel;
    await e.removeSelector( combo );
    await e.clickText( sel, who );
  };

  async function clickChatBox() {
    const sel = 'textarea';
    await a.selClick( sel );
  };

  async function sendMsg( msg ) {
    await clickChatBox();
    await a.page.type( msg );
    await a.page.waitForTimeout( 750 );
    await a.page.keyboard.press( 'Enter' );
  };

  // async function dmEveryPerson() {};
};

module.exports = chatWrite;
