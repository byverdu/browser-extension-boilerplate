import './api';

jest.mock ( './api', () => {
  return {
    getRandomNumber: () => 4,
    wrapperBrowserAPI: {
      getStorage: () => ( {
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
      } ),
      setStorage: () => 4,
      sendMessage: () => new Promise ( ( resolve, reject ) => resolve ( true ) ),
      getExtensionName: () => 'myExtensionId',
      ondMessage: () => new Promise ( ( resolve, reject ) => resolve ( true ) ),
    }
  };
} );