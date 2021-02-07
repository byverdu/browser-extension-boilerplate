import { wrapperBrowserAPI, linksSavedHandler, getActiveTabHandler } from 'api';

const { onMessage, onInstalled, getStorage } = wrapperBrowserAPI;

onInstalled ();

onMessage ( async ( msg, sender ) => {
  if ( msg && msg.type ) {
    switch ( msg.type ) {
    case ( 'links-saved' ):
      console.log ( await getStorage () );
      return linksSavedHandler ();

    case ( 'get-active-tab' ):
      return getActiveTabHandler ();
    }
  }
} );