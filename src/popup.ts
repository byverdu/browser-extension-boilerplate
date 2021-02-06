import { wrapperBrowserAPI } from 'api';
import { ExtensionStorage } from './types';

const { getStorage } = wrapperBrowserAPI;

getStorage ( 'links-saved' ).then ( ( storage: ExtensionStorage ) => {
  const links = storage[ 'links-saved' ].map ( ( { textContent } ) => textContent ).join ( '-' );

  document.getElementById ( 'root' ).innerHTML = links;
} );