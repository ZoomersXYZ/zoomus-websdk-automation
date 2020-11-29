const logger = require( './config/logger' );

async function initialStrap( a ) {  
  let sel = undefined;
  let rootSel = '';  
  logger.info( '-- initialStrap BEGINNING --' );

  // Optionally refresh when necessary
  if ( process.env.RELOAD ) {
    await a.page.reload( { 
      waitUntil: [ 
        'networkidle0', 
        'domcontentloaded' 
    ] } );
  };
    
  // Launch meeting page
  sel = '#root > div > .form > .MuiButtonBase-root > .MuiButton-label';
  const onIntroPage = await a.visibleCheck( sel );
  if ( onIntroPage ) {
    await a.selClick( rootSel + sel );
  };

  rootSel = '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container > .zmu-tabs__tabs-list';  
  const overlayVisible = await a.selClick( rootSel + sel );
  if ( overlayVisible ) {
    // Next 2 are just to click things just to make sure things are working
    sel = ' > #voip > .tab-bar-node';
    await a.selClick( rootSel + sel );
    
    sel = ' > #phone > .tab-bar-node';
    await a.selClick( rootSel + sel );
    
    sel = ' .zmu-tabs__tab-container > .zm-btn';
    await a.selClick( rootSel + sel );
  };
};

module.exports = initialStrap;
