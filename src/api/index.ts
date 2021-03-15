import { browser } from 'webextension-polyfill-ts';
import { WrapperBrowserAPI } from 'types';

export async function linksSavedHandler (): Promise<string|boolean> {
  return browser.runtime.lastError ? browser.runtime.lastError.message : true;
}

export async function getActiveTabHandler (): Promise<string> {
  if ( browser.runtime.lastError ) {
    return browser.runtime.lastError.message;
  }

  const tab = await browser.tabs.query ( {
    active: true,
    currentWindow: true 
  } );
  const [ activeTab ] = tab;

  return activeTab.url;
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
    await wrapperBrowserAPI.setStorage ( 'links-saved', {
    } );

    browser.tabs.query ( {
      
    } )
      .then ( tabs => {
        tabs.forEach ( tab => {
          browser.tabs.executeScript ( tab.id, {
            file: './content.js' 
          } )
            .then ( () => console.log ( 'script injected' ) )
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
  sendMessage: ( msg ) => browser.runtime.sendMessage ( {
    type: msg 
  } ),
  onMessage: ( callback ) => browser.runtime.onMessage.addListener ( callback )
};
