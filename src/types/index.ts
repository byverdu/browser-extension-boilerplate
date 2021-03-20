import { Runtime } from 'webextension-polyfill-ts';

export type ExtensionMessagesType = 'links-saved' | 'get-active-tab' | 'find-link'
export type ExtensionMessage = {type: ExtensionMessagesType, payload?: unknown }

export type Link = {
  href: string
  textContent: string
}

export type ExtensionStorage = Record<'links-saved', Link[]>

export type GetActiveTabResp = string | {url: string, id: number}

export interface WrapperBrowserAPI {
  getExtensionName(): string
  onInstalled: () => void
  setStorage: ( key: ExtensionMessagesType, value: unknown ) => Promise<any>
  getStorage: ( key?: ExtensionMessagesType ) => Promise<unknown>
  sendMessage: ( msg: ExtensionMessage ) => Promise<unknown>
  sendTabMessage: ( tabId: number, msg: ExtensionMessage ) => Promise<unknown>
  onMessage: ( callback:  ( msg: ExtensionMessage, sender: Runtime.MessageSender ) => void | Promise<unknown> ) => void
}

export const MESSAGES_TYPES =  {
  LINKS_SAVED: 'links-saved',
  GET_ACTIVE_TAB: 'get-active-tab',
  FIND_LINK: 'find-link',
} as const;
