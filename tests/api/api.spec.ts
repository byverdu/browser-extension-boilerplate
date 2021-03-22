import type { Browser } from 'webextension-polyfill-ts';
import { deepMock } from 'mockzilla';

const [ browser, mockBrowser, mockBrowserNode ] = deepMock<Browser> (
  'browser',
  false
);

const { wrapperBrowserAPI } = require ( '../../src/api/extension.api' );
const { getStorage, setStorage, sendMessage } = wrapperBrowserAPI;

jest.mock ( 'webextension-polyfill-ts', () => ( {
  browser 
} ) );

describe ( 'Web-Extension API', () => {
  const linksSaved = {
    'links-saved': {
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

      await setStorage ( 'links-saved', linksSaved[ 'links-saved' ] );
      expect ( setStorage ).toHaveBeenCalled;
      expect ( mockBrowser.storage.local.set ).toHaveBeenCalled;
    } );
  } );

  describe ( 'getStorage()', () => {
    it ( 'should get local storage', async () => {
      mockBrowser.storage.local.set.expect ( linksSaved ).andResolve ();
      mockBrowser.storage.local.get
        .expect ( 'links-saved' )
        .andResolve ( linksSaved );
      await setStorage ( 'links-saved', linksSaved[ 'links-saved' ] );

      expect ( await getStorage ( 'links-saved' ) ).toEqual ( {
        'links-saved': {
          'http://localhost:9000': [ 'link-1', 'link-2' ] 
        },
      } );
    } );
  } );

  describe ( 'sendMessage()', () => {
    it ( 'should transform a string into {type: string}', async () => {
      mockBrowser.runtime.sendMessage.expect ( {
        type: 'links-saved',
        payload: true
      } ).andResolve ( true );

      expect ( await sendMessage ( {
        type: 'links-saved',
        payload: true
      } ) ).toEqual ( true );
    } );
  } );
} );
