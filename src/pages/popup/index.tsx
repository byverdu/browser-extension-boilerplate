import React, { useState, useEffect, useCallback } from 'react';
import { render } from 'react-dom';

import { GetActiveTabResp, Link } from 'types/extension.types';

import { wrapperBrowserAPI, MESSAGES_TYPES } from 'api/extension.api';

import { Header } from 'components/Header';
import { List } from 'components/List';

import styles from './popup.scss';

const { getStorage, sendMessage, sendTabMessage } = wrapperBrowserAPI;
const { LINKS_SAVED, FIND_LINK, GET_ACTIVE_TAB } = MESSAGES_TYPES;

interface State{
  links: Link[]
  tabHostname: string
  tabId: number
}

export const Popup = () => {
  const [ state, setState ] = useState<State> ( {
    links: [],
    tabHostname: '',
    tabId: undefined
  } );

  const onclickHandler = useCallback ( async ( href ) => {
    try {
      await sendTabMessage ( state.tabId, { 
        type: FIND_LINK,
        payload: href 
      } );
    } catch ( e ) {
      console.log ( 'state', state );
      console.log ( 'sendTabMessage', e );
    }
  }, [ state ] );

  useEffect (  () => {
    ( sendMessage ( { 
      type: GET_ACTIVE_TAB 
    } ) as Promise<GetActiveTabResp> ).then ( ( resp ) => {
      console.log ( GET_ACTIVE_TAB, resp );
      if ( typeof resp === 'object' ) {
        const { url, id: tabId } = resp;
        const tabHostname = new URL ( url ).hostname;

        getStorage ( LINKS_SAVED ).then ( resp => {
          setState ( {
            links: resp[ LINKS_SAVED ] [ tabHostname ],
            tabHostname,
            tabId
          } );
        } );
      }
    } );
  }, [] );

  const { links, tabHostname } = state;

  return (
    <div className={styles.popup}>
      <Header title={tabHostname} cssClass={styles.title} />
      <List
        links={links}
        onclick={onclickHandler}
      />
    </div>
  );
};

if ( process.env.ENV !== 'test' ) {
  render ( <Popup />, document.getElementById ( 'root' ) );
}
