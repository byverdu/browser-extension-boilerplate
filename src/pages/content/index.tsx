import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { wrapperBrowserAPI } from 'api';
import { Link,ExtensionMessages } from 'types';
import styles from './content.scss';

const { setStorage, sendMessage, getExtensionName } = wrapperBrowserAPI;
const extensionName = getExtensionName ();
const linksSaved: ExtensionMessages = 'links-saved';

export const App = () => {
  const [ linksCount, setLinksCount ] = useState<number> ( 0 );
  const container = useRef<HTMLDivElement> ();
  const saveLinks = async ( links ) => {
    const oldStorage = await wrapperBrowserAPI.getStorage ( linksSaved );
    const newStorage = {
      ...oldStorage[ linksSaved ],
      ...links
    };
    return await setStorage ( linksSaved, newStorage );
  };

  useEffect ( () => {
    let toUpdate = true;
    const links: Link[] = [
      ...document.querySelectorAll ( 'a' ),
    ]
      .map ( ( { href, textContent } ) => ( {
        href,
        textContent 
      } ) )
      .filter ( ( link ) => link.textContent );
    const newX = window.location.hostname;

    if ( toUpdate ) {
      saveLinks ( {
        [ newX ]: links 
      } ).then ( ( resp ) => {
        sendMessage ( linksSaved )
          .then ( resp => {
            if ( typeof resp === 'boolean' ) {
              setLinksCount ( links.length );
            }
          } );
      } );
    }

    return () => {
      toUpdate = false;
    };

  } );

  useEffect ( () => {
    setTimeout ( () => {
      if ( container.current ) {
        container.current.remove ();
      }
    }, 5000 );
  } );

  return (
    <div ref={container} className={styles.content}>
      Hello.... this page has {linksCount} links on it
    </div>
  );
};

if ( process.env.ENV !== 'test' ) {
  const root = document.createElement ( 'div' );
  root.setAttribute ( 'id',  extensionName );
  document.body.appendChild ( root );
  
  render ( <App />, document.getElementById ( extensionName ) );
}

