const puppeteer = require( 'puppeteer' );
const axios = require( 'axios' );

const CHROME_PORT = 9222
const response = await axios.get( `http://localhost:${ CHROME_PORT }/json/version` );
const { webSocketDebuggerUrl } = response.data;
const browser = await puppeteer.connect( { browserWSEndpoint: webSocketDebuggerUrl } );
console.info( browser );

// Only one tab. Not sure if this is needed
const pages = await browser.pages();
const curr = pages[ 0 ];

console.log( 'lol1' );
debugger;
console.log( 'lol2' );

// Probably never run the below?
// await browser.close();
// await chrome.kill();
