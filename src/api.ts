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

export const wrapperBrowserAPI: WrapperBrowserAPI = {
  setStorage: ( key, value ) => browser.storage.local.set ( { [ key ]: value } ),
  getStorage: ( key ) => browser.storage.local.get ( key ),
  sendMessage: ( msg ) => browser.runtime.sendMessage ( { type: msg } ),
  onMessage: ( callback ) => browser.runtime.onMessage.addListener ( callback )
};
