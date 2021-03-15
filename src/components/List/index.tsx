import React, { FunctionComponent, useMemo } from 'react';

import { Link } from 'types';

import { getRandomNumber } from 'api';

const ListItem: FunctionComponent<Link> = ( { href, textContent } ) => ( <li><a href={href}>{textContent}</a></li> );

const List: FunctionComponent<{links:Link[]}> = ( { links = [] } ) => {
  const memoLinks = useMemo ( () => links, [ links ] );
  return (
    <ul>
      {memoLinks.map ( ( { href, textContent } ) => <ListItem key={getRandomNumber ( 1 )} href={href} textContent={textContent}/> )}
    </ul>
  );
};

export default List;