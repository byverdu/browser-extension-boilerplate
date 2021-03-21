import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { wrapperBrowserAPI } from 'api';
import { Link, MESSAGES_TYPES } from 'types';
import styles from './content.scss';

const { setStorage, sendMessage, getExtensionName, onMessage } = wrapperBrowserAPI;
const extensionName = getExtensionName ();
const { LINKS_SAVED, FIND_LINK } = MESSAGES_TYPES;
const httpAndHostNameRegex = /([a-z][a-z0-9+\-.]*:(\/\/[^/?#]+)?)?/;

export const App = () => {
  const [ linksCount, setLinksCount ] = useState<number> ( 0 );
  const container = useRef<HTMLDivElement> ();
  const saveLinks = async ( links ) => {
    const oldStorage = await wrapperBrowserAPI.getStorage ( LINKS_SAVED );
    const newStorage = {
      ...oldStorage[ LINKS_SAVED ],
      ...links
    };
    return await setStorage ( LINKS_SAVED, newStorage );
    
  };

  const onMessageHandler = async () => {
    return await onMessage ( ( { type, payload } ) => {
      if ( type === FIND_LINK && typeof payload === 'string' ) {
        console.log ( 'payload onMessageHandler', payload );
        const pathname = payload.includes ( 'http' )
          ? payload.replace ( httpAndHostNameRegex , '' )
          : payload;

        try {
          const target = ( document.querySelector ( `[href*="${pathname}"]` ) as HTMLDivElement );
          target.style.border = '3px solid red';
          target.scrollIntoView ( { 
            behavior: 'smooth',
            block: 'center',
            inline: 'center' 
          } );
        } catch ( e ) {
          console.log ( `${pathname} can't be find`, e );
        }
      }
    } );
  };

  useEffect ( () => {
    const links: Link[] = [ ...document.querySelectorAll ( 'a' ),
    ]
      .map ( ( { href, textContent, title } ) => ( {
        href,
        textContent: textContent.trim () || title
      } ) )
      .filter ( ( link ) => link.textContent );
    const { hostname } = window.location;

    saveLinks ( {
      [ hostname ]: links 
    } ).then ( ( resp ) => {
      sendMessage ( { 
        type: LINKS_SAVED 
      } )
        .then ( resp => {
          if ( typeof resp === 'boolean' ) {
            setLinksCount ( links.length );
          }
        } );
    } );
  }, [] );

  useEffect ( () => {
    onMessageHandler ().then ( console.log );
  }, [] );

  useEffect ( () => {
    setTimeout ( () => {
      if ( container.current ) {
        container.current.remove ();
      }
    }, 5000 );
  } );

  return (
    <div ref={container} className={styles.content}>
      Hello.... this page has 
      {' '}
      {linksCount}
      {' '}
      links on it
    </div>
  );
};

if ( process.env.ENV !== 'test' ) {
  const root = document.createElement ( 'div' );
  root.setAttribute ( 'id',  extensionName );
  document.body.appendChild ( root );
  
  render ( <App />, document.getElementById ( extensionName ) );
}

