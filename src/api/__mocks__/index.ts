import '../extension.api';

import { ExtensionMessagesType } from '../../types/extension.types';

jest.mock ( '../extension.api.ts', () => {
  return {
    getRandomNumber: () => ( Math.random () * 50 ),
    MESSAGES_TYPES: {
      LINKS_SAVED: 'links-saved',
      GET_ACTIVE_TAB: 'get-active-tab',
      FIND_LINK: 'find-link',
    },
    wrapperBrowserAPI: {
      getStorage: () => new Promise ( ( resolve, reject ) => resolve ( {
        'links-saved': {
          localhost: [
            {
              href: 'http://localhost/first-link',
              textContent: 'first link' 
            },
            {
              href: 'http://localhost/second-link',
              textContent: 'second link'
            },
            {
              href: 'http://localhost/third-link',
              textContent: 'third link' 
            }
          ]
        }
      } ) ),
      setStorage: () => new Promise ( ( resolve, reject ) => resolve ( true ) ),
      sendMessage: ( msg: { type: ExtensionMessagesType } ) => {
        let result;

        switch ( msg.type ) {
        case ( 'links-saved' ):
          result = true;
          break;

        case ( 'get-active-tab' ):
          result = {
            url: 'http://localhost',
            id: 30
          };
          break;
        
        default:
          result = false;
          break;
        }

        return new Promise ( ( resolve, reject ) => resolve ( result ) );
      },
      getExtensionName: () => 'myExtensionId',
      onMessage: () => new Promise ( ( resolve, reject ) => resolve ( { 
        id: 30,
        payload: 'http://localhost/second-link' 
      } ) ),
    }
  };
} );