import { browser } from 'webextension-polyfill-ts';
import { WrapperBrowserAPI } from 'types';

export const linksSavedHandler = async (): Promise<string|boolean> => browser.runtime.lastError ? browser.runtime.lastError.message : true;

export const getActiveTabHandler = async (): Promise<string> => {
  if ( browser.runtime.lastError ) {
    return browser.runtime.lastError.message;
  }

  const tab = await browser.tabs.query ( { active: true, currentWindow: true } );
  const [ activeTab ] = tab;

  return activeTab.url;
};

// workaround to be able to use extension for old opened tabs
// after the extension is installed. For those tabs an error will be thrown in the console
// due to the chrome.runtime.id has changed after updating the extension

function afterInstallScript () {
  browser.tabs.query ( {} )
    .then ( tabs => {
      tabs.forEach ( tab => {
        browser.tabs.executeScript ( tab.id, { file: './content.js' } )
          .then ( () => console.log ( 'script injected' ) )
          .catch ( ( e ) => console.log ( e ) );
      } );
    } );
}

export const wrapperBrowserAPI: WrapperBrowserAPI = {
  onInstalled: () => browser.runtime.onInstalled.addListener ( afterInstallScript ),
  setStorage: ( key, value ) => browser.storage.local.set ( { [ key ]: value } ),
  getStorage: ( key ) => browser.storage.local.get ( key ),
  sendMessage: ( msg ) => browser.runtime.sendMessage ( { type: msg } ),
  onMessage: ( callback ) => browser.runtime.onMessage.addListener ( callback )
};
