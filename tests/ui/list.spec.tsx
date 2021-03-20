import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import List from '../../src/Components/List';

jest.mock ( '../../src/api' );

describe ( 'List Component', () => {
  let component: ShallowWrapper;
  const links = [
    {
      href: 'http://localhost:9000',
      textContent: 'sweet home' 
    },
    {
      href: '127.0.0.1',
      textContent: 'sweet home too' 
    }
  ];
  beforeEach ( () => {
    component = shallow ( <List links={links} onclick={() => ''} /> );
  } );

  it ( 'should render ListItems with the correct props', () => {
    expect ( component.find ( 'ListItem' ) ).toHaveLength ( 2 );
    expect ( component.find ( 'ListItem' ).at ( 0 ).props () ).toEqual ( links[ 0 ] );
  } );
} );