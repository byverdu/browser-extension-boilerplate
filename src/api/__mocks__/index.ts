import { ExtensionMessages } from '../../types';
import './api';

jest.mock ( './api', () => {
  return {
    getRandomNumber: () => ( Math.random () * 50 ),
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
      sendMessage: ( msg: ExtensionMessages ) => {
        let result;

        switch ( msg ) {
        case ( 'links-saved' ):
          result = true;
          break;

        case ( 'get-active-tab' ):
          result = 'http://localhost';
          break;
        
        default:
          result = false;
          break;
        }

        return new Promise ( ( resolve, reject ) => resolve ( result ) );
      },
      getExtensionName: () => 'myExtensionId',
      ondMessage: () => new Promise ( ( resolve, reject ) => resolve ( true ) ),
    }
  };
} );