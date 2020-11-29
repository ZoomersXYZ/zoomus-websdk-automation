async function initialLaunch( a ) {
  let sel = undefined;
  let rootSel = '';
  let parentSel = '';
  let combo = '';
  logger.info( '-- initialLaunch BEGINNING --' );

  // Launch meeting page
  sel = '#root > div > .form > .MuiButtonBase-root > .MuiButton-label';
  await a.selClick( sel );
  
  rootSel = '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container > .zmu-tabs__tabs-list';
  // Next 2 are just to click things just to make sure things are working

  sel = ' > #voip > .tab-bar-node';
  await a.selClick( rootSel + sel );
  
  sel = ' > #phone > .tab-bar-node';
  await a.selClick( rootSel + sel );
  
  // close the overlay
  sel = ' .zmu-tabs__tab-container > .zm-btn';
  await a.selClick( rootSel + sel );
};

module.exports = initialLaunch;
