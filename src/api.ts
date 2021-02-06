import { browser } from 'webextension-polyfill-ts';
import { WrapperBrowserAPI } from 'types';

export const wrapperBrowserAPI: WrapperBrowserAPI = {
  setStorage: ( key, value ) => browser.storage.local.set ( { [ key ]: value } ),
  getStorage: ( key ) => browser.storage.local.get ( key ),
  sendMessage: ( msg ) => browser.runtime.sendMessage ( msg ),
  onMessage: ( callback ) => browser.runtime.onMessage.addListener ( callback )
};
