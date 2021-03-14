import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import { wrapperBrowserAPI, getRandomNumber } from 'api';
import { Link } from 'types';

import { List, Header } from 'Components';

const { getStorage, sendMessage } = wrapperBrowserAPI;

interface State{
  links: Link[]
  tabHostname: string
}

const Popup = () => {
  const [ state, setState ] = useState<State> ( {
    links: [],
    tabHostname: '' 
  } );

  useEffect (  () => {
    sendMessage ( 'get-active-tab' ).then ( resp => {
      const tabHostname = new URL ( resp ).hostname;
      getStorage ( 'links-saved' ).then ( resp => {
        setState ( {
          links: resp[ 'links-saved' ] [ tabHostname ],
          tabHostname  
        } );
      } );
    } );
  } );

  const { links, tabHostname } = state;

  return (
    <div>
      <Header title={tabHostname} />
      <List links={links} />
    </div>
  );
};

render ( <Popup />, document.getElementById ( 'root' ) );