import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { wrapperBrowserAPI } from 'api';
import { Link,ExtensionMessages } from 'types';

import styles from './content.scss';

const { setStorage, sendMessage, getExtensionName } = wrapperBrowserAPI;
const extensionName = getExtensionName ();
const linksSaved: ExtensionMessages = 'links-saved'

const App = () => {
  const [ linksCount, setLinksCount ] = useState<number> ( 0 );
  const container = useRef<HTMLDivElement> ();
  const saveLinks = async ( links ) => {
    const oldStorage = await wrapperBrowserAPI.getStorage ( linksSaved );
    const newValues = {
      [ linksSaved ]: {
        ...oldStorage[ linksSaved ],
        ...links
      }
    };

    return await setStorage ( linksSaved, newValues );
  };

  useEffect ( () => {
    const links: Link[] = [
      ...document.querySelectorAll ( 'a' ),
    ]
      .map ( ( { href, textContent } ) => ( { href, textContent } ) )
      .filter ( ( link ) => link.textContent );

    saveLinks ( links ).then ( ( resp ) => {
      console.log ( 'storage', resp );
      sendMessage ( linksSaved )
        .then ( resp => {
          if ( typeof resp === 'boolean' ) {
            setLinksCount ( links.length );
          }
        } );
    } );
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

const root = document.createElement ( 'div' );
root.setAttribute ( 'id',  extensionName );
document.body.appendChild ( root );

render ( <App />, document.getElementById ( extensionName ) );
