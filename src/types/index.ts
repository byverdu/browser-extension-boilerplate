import { Runtime } from 'webextension-polyfill-ts';

export type ExtensionMessages = 'links-saved' | 'get-active-tab'

export interface Link {
  href: string
  textContent: string
}

export type ExtensionStorage = {[key in ExtensionMessages]: Link[]}

export interface WrapperBrowserAPI {
  onInstalled: () => void
  setStorage: ( key: ExtensionMessages, value: unknown ) => Promise<any>
  getStorage: ( key: ExtensionMessages ) => Promise<any>
  sendMessage: ( type: ExtensionMessages ) => Promise<any>
  onMessage: ( callback:  ( msg: {type: ExtensionMessages}, sender: Runtime.MessageSender ) => void  ) => void
}
