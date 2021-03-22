import { browser } from 'webextension-polyfill-ts';

import { GetActiveTabResp, WrapperBrowserAPI } from 'types/extension.types';

export const MESSAGES_TYPES =  {
  LINKS_SAVED: 'links-saved',
  GET_ACTIVE_TAB: 'get-active-tab',
  FIND_LINK: 'find-link',
} as const;

export async function linksSavedHandler (): Promise<string | boolean> {
  return browser.runtime.lastError ? browser.runtime.lastError.message : true;
}

export async function getActiveTabHandler (): Promise<GetActiveTabResp> {
  if ( browser.runtime.lastError ) {
    return browser.runtime.lastError.message;
  }

  const tab = await browser.tabs.query ( {
    active: true,
    currentWindow: true 
  } );
  const [ activeTab ] = tab;

  return {
    url: activeTab.url,
    id: activeTab.id
  };
};

export const getRandomNumber = ( qtty: number = 5 ): string => {
  const array = new Uint32Array ( qtty );
  return window.crypto.getRandomValues ( array ).join ( '-' );
};

// workaround to be able to use extension for old opened tabs
// after the extension is installed. For those tabs an error will be thrown in the console
// due to the chrome.runtime.id has changed after updating the extension

async function afterInstallScript () {
  try {
    await wrapperBrowserAPI.setStorage ( MESSAGES_TYPES.LINKS_SAVED, {
    } );

    browser.tabs.query ( {
      
    } )
      .then ( tabs => {
        tabs.forEach ( tab => {
          Promise.all ( [
            browser.tabs.executeScript ( tab.id, {
              file: 'node_vendors.js' 
            } ),
            browser.tabs.executeScript ( tab.id, {
              file: 'common-background-content-popup.js' 
            } ),
            browser.tabs.executeScript ( tab.id, {
              file: 'content.js' 
            } ),
          ] )
            .then ( () => {
              console.log ( 'All content scripts loaded' );
            } )
            .catch ( ( e ) => console.log ( 'afterInstallScript tabs.executeScript', e ) );
        } );
      } )
      .catch ( ( e ) => console.log ( 'afterInstallScript tabs.query', e ) );
  } catch ( e ) {
    console.log ( 'afterInstallScript setStorage', e );
  }
}

export const wrapperBrowserAPI: WrapperBrowserAPI = {
  getExtensionName: () => {
    const { name } = browser.runtime.getManifest ();
    const { id } = browser.runtime;

    return `${id}-${name}`;
  },
  onInstalled: () => browser.runtime.onInstalled.addListener ( afterInstallScript ),
  setStorage: ( key, value ) => browser.storage.local.set ( {
    [ key ]: value 
  } ),
  getStorage: ( key ) => browser.storage.local.get ( key ),
  sendMessage: ( { type, payload } ) => browser.runtime.sendMessage ( {
    type,
    payload
  } ),
  sendTabMessage: ( tabId, msg ) => browser.tabs.sendMessage ( tabId, msg ),
  onMessage: ( callback ) => browser.runtime.onMessage.addListener ( callback )
};
