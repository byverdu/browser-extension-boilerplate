import type { Browser } from 'webextension-polyfill-ts';
import { deepMock } from 'mockzilla';
import { MESSAGES_TYPES } from '../../src/types';

const [ browser, mockBrowser, mockBrowserNode ] = deepMock<Browser> (
  'browser',
  false
);

const { wrapperBrowserAPI } = require ( '../../src/api' );
const { getStorage, setStorage, sendMessage } = wrapperBrowserAPI;
const { LINKS_SAVED } = MESSAGES_TYPES;

jest.mock ( 'webextension-polyfill-ts', () => ( {
  browser 
} ) );

describe ( 'Web-Extension API', () => {
  const linksSaved = {
    LINKS_SAVED: {
      'http://localhost:9000': [ 'link-1', 'link-2' ] 
    } 
  };
  beforeEach ( () => {
    mockBrowserNode.enable ();
  } );
  afterEach ( () => mockBrowserNode.verifyAndDisable () );

  describe ( 'setStorage()', () => {
    it ( 'should set local storage', async () => {
      mockBrowser.storage.local.set.expect ( linksSaved ).andResolve ();

      await setStorage ( LINKS_SAVED, linksSaved[ LINKS_SAVED ] );
      expect ( setStorage ).toHaveBeenCalled;
      expect ( mockBrowser.storage.local.set ).toHaveBeenCalled;
    } );
  } );

  describe ( 'getStorage()', () => {
    it ( 'should get local storage', async () => {
      mockBrowser.storage.local.set.expect ( linksSaved ).andResolve ();
      mockBrowser.storage.local.get
        .expect ( LINKS_SAVED )
        .andResolve ( linksSaved );
      await setStorage ( LINKS_SAVED, linksSaved[ LINKS_SAVED ] );

      expect ( await getStorage ( LINKS_SAVED ) ).toEqual ( {
        LINKS_SAVED: {
          'http://localhost:9000': [ 'link-1', 'link-2' ] 
        },
      } );
    } );
  } );

  describe ( 'sendMessage()', () => {
    it ( 'should transform a string into {type: string}', async () => {
      mockBrowser.runtime.sendMessage.expect ( {
        type: LINKS_SAVED,
        payload: true
      } ).andResolve ( true );

      expect ( await sendMessage ( {
        type: LINKS_SAVED,
        payload: true
      } ) ).toEqual ( true );
    } );
  } );
} );
