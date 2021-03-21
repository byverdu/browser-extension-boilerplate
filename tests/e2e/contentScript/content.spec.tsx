jest.mock ( '../../src/api' );
import React from 'react';
import { render, waitFor } from './custom.render';
import '@testing-library/jest-dom/extend-expect';
import { App } from '../../../src/pages/content';

describe ( 'Content script app', () => {
  it ( 'should not render a message if no links present in Document', async () => {
    const { getByText } = render ( <App />, {
      withLinks: false 
    } );

    await waitFor ( () => {

      expect ( getByText ( 'Hello.... this page has 0 links on it' ) ).toBeInTheDocument (); 
    } );
  } );

  it ( 'should render links message if links are present in Document', async () => {
    const { container, getByText } = render ( <App />, {
      withLinks: true 
    } );

    await waitFor ( () => {
      expect ( getByText ( 'Hello.... this page has 3 links on it' ) ).toBeInTheDocument (); 
      expect ( container.querySelectorAll ( 'a' ) ).toHaveLength ( 3 );
    } );
  } );

  it ( 'should remove links message after 5 miliseconds', async () => {
    jest.useFakeTimers ();
    const { getByText } = render ( <App />, {
      withLinks: true 
    } );

    await waitFor ( () => {
      const linksMessage = getByText ( 'Hello.... this page has 3 links on it' );
      jest.runAllTimers ();
      expect ( linksMessage ).not.toBeInTheDocument ();
    } );
  } );

  it ( 'should match the snapshot', async () => {
    const { container, getByText } = render ( <App />, {
      withLinks: true 
    } );

    await waitFor ( () => {
      expect ( container.firstChild ).toMatchSnapshot ( `<section>
        <a href="http://localhost/first-link">first link</a>
        <a href="http://localhost/second-link">second link</a>
        <a href="http://localhost/third-link">third link</a>
        <div class="content">Hello.... this page has 3 links on it</div>
      </section>` );
    } );
  } );
} );


