import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

interface RenderOptionsExtension extends RenderOptions {
  withLinks: boolean
}

const links = [
  {
    textContent: 'first link',
    href: 'http://localhost/first-link'
  },
  {
    textContent: 'second link',
    href: 'http://localhost/second-link'
  },
  {
    textContent: 'third link',
    href: 'http://localhost/third-link'
  }
];

const customRender = (
  ui: ReactElement,
  { withLinks, ...options }: RenderOptionsExtension
) => {

  const RenderWrapper: FC = ( { children } ) => {
    return (
      <section>
        {
          withLinks
            ? links.map ( ( { href, textContent } ) => <a key={href} href={href}>{textContent}</a> )
            : 'No links'
        }
        {children}
      </section>
    );
  };

  return render ( ui, { wrapper: RenderWrapper, ...options } );
};

export * from '@testing-library/react';

export { customRender as render };