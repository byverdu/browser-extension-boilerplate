import { wrapperBrowserAPI, linksSavedHandler, getActiveTabHandler } from 'api';

wrapperBrowserAPI.onMessage ( async ( msg, sender ) => {
  if ( msg && msg.type ) {
    switch ( msg.type ) {
    case ( 'links-saved' ):
      return linksSavedHandler ();

    case ( 'get-active-tab' ):
      return getActiveTabHandler ();
    }
  }
} );