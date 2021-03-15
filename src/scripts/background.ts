import { wrapperBrowserAPI, linksSavedHandler, getActiveTabHandler } from 'api';
import { browser } from 'webextension-polyfill-ts';

const { onMessage, onInstalled, getStorage } = wrapperBrowserAPI;

onInstalled ();

browser.storage.local.clear ();

onMessage ( async ( msg, sender ) => {
  if ( msg && msg.type ) {
    switch ( msg.type ) {
    case ( 'links-saved' ):
      console.log ( 'links-saved from bg', await getStorage () );
      return linksSavedHandler ();

    case ( 'get-active-tab' ):
      return getActiveTabHandler ();
    }
  }
} );