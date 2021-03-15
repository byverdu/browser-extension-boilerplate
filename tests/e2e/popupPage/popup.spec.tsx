jest.mock ( '../../src/api' );
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Popup } from '../../../src/pages/popup';

describe ( 'Popup page', () => {
  it ( 'should render a title with hostname', async () => {
    const { getByText } = render ( <Popup /> );
    await waitFor ( () => {
      expect ( getByText ( 'localhost' ) ).toBeInTheDocument ();
    } );
  } );

  it ( 'should render as many links as the content page had', async () => {
    const { container } = render ( <Popup /> );
    await waitFor ( () => {
      expect ( container.querySelectorAll ( 'li' ) ).toHaveLength ( 3 );
    } );
  } );

  it ( 'should match the snapshot', async () => {
    const { container } = render ( <Popup /> );

    await waitFor ( () => {
      expect ( container.firstChild ).toMatchSnapshot ( `<div>
        <h1>localhost</h1>
          <ul>
            <li><a href="http://localhost/first-link">first link</a></li>
            <li><a href="http://localhost/second-link">second link</a></li>
            <li><a href="http://localhost/third-link">third link</a></li>
          </ul>
        </div>` );
    } );
  } );
} );