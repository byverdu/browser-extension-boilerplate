import React from 'react';

import { Link } from 'types';

import { getRandomNumber } from 'api';

const ListItem: React.SFC<Link> = ( { href, textContent } ) => ( <a key={getRandomNumber ( 1 )} href={href}>{textContent}</a> );

const List: React.SFC<{links:Link[]}> = ( { links } ) => (
  <ul>
    {links.map ( ( { href, textContent } ) => <ListItem href={href} textContent={textContent}/> )}
  </ul>
);

export default List;