async function initialChat( a ) {
  let sel = undefined;
  let rootSel = '';
  let parentSel = '';
  let combo = '';
  logger.info( '-- initialChat BEGINNING --' );

  // Llaunch meeting page

  sel = 'div.chat-container';
  const chatOpen = await a.visibleCheck( sel );
  if ( !chatOpen ) {
    // action: Click.
    // what: footer chat icon
    sel = '#wc-footer > div > .footer-button__button > .footer-button__img-layer > .footer-button__chat-icon';
    await a.selClick( sel );
  };

  // action: visible
  // what: chat popped out
  parentSel = '#chat-window ';
  combo = parentSel + sel;
  const chatPopped = await a.visibleCheck( combo );

  parentSel = '#wc-container-right';
  combo = parentSel + sel;
  
  if ( !chatPopped ) {
    sel = '#wc-footer > div > .footer-button__button > .footer-button__img-layer > .footer-button__chat-icon';
    await a.selClick( sel );
  } else if ( await a.visibleCheck( combo ) ) {
    // if chat is popped
    sel = ;    
  };

  // dont need to 


  parentSel = '#wc-container-right '
  combo = parentSel + sel;
    
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

initialChat();
