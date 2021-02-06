import { Runtime } from 'webextension-polyfill-ts';

export type ExtensionMessages = 'links-saved' | 'get-active-tab'

export interface WrapperBrowserAPI {
  setStorage: ( key: ExtensionMessages, value: unknown ) => Promise<any>
  getStorage: ( key: ExtensionMessages ) => Promise<any>
  sendMessage: ( msg: {type: ExtensionMessages} ) => Promise<any>
  onMessage: ( callback:  ( msg: {type: ExtensionMessages}, sender: Runtime.MessageSender ) => void  ) => void
}
