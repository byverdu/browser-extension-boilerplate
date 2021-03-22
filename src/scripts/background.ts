import { browser } from 'webextension-polyfill-ts';

import { wrapperBrowserAPI, linksSavedHandler, getActiveTabHandler } from 'api/extension.api';

const { onMessage, onInstalled, getStorage } = wrapperBrowserAPI;

browser.storage.local.clear ();

onInstalled ();

onMessage ( async ( msg, sender ) => {
  if ( msg && msg.type ) {
    switch ( msg.type ) {
    case ( 'links-saved' ):
      console.log ( 'links-saved from bg', await getStorage () );
      return linksSavedHandler ();

    case ( 'get-active-tab' ):
      return getActiveTabHandler ();

    default:
      return;
    }
  }
} );