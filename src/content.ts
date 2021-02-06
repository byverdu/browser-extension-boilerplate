import { wrapperBrowserAPI } from 'api';
import { Link } from 'types';

const { setStorage, sendMessage } = wrapperBrowserAPI;
const allLinksInTab: Link[] = [
  ...document.querySelectorAll ( 'a' ),
]
  .map ( ( { href, textContent } ) => ( { href, textContent } ) )
  .filter ( ( link ) => link.textContent );


const div: HTMLDivElement = document.createElement ( 'div' );

setStorage ( 'links-saved', allLinksInTab  )
  .then ( () => {
    sendMessage ( 'links-saved' )
      .then ( resp => {
        if ( typeof resp === 'boolean' ) {
          div.textContent = `Hello.... this page has ${allLinksInTab.length} links on it`;
          document.body.appendChild ( div );
        }
      } );
  } );