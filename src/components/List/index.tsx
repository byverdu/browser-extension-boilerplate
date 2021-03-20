import React, { useCallback, useMemo, MouseEvent } from 'react';
import { Link } from 'types';
import { getRandomNumber } from 'api';

import styles from './list.scss';

type ListProps = {
  links: Link[],
  onclick: ( href: string ) => void
}

type ListItemProps = {
  href?: string,
  textContent: string
  onclick: ( href: string ) => void
}

function ListItem ( { href, textContent, onclick }: ListItemProps ): JSX.Element {
  const clickHandler = useCallback ( ( e: MouseEvent ) => {
    e.preventDefault ();
    ( e.target as HTMLAnchorElement ).classList.add ( styles.visited );
    onclick ( href );
  }, [ onclick, href ] );
  return ( <li className={styles.listItem}>
    <a
      className={styles.listItemLink}
      onClick={clickHandler}
    >
      {textContent}
    </a>
  </li> );
}



function List ( { links = [], onclick }: ListProps ) {
  const memoLinks = useMemo ( () => links, [ links ] );
  return (
    <ul className={styles.list}>
      {memoLinks.map ( ( { href, textContent } ) => (
        <ListItem
          onclick={onclick}
          key={getRandomNumber ( 1 )}
          href={href}
          textContent={textContent}
        /> ) )}
    </ul>
  );
};

export default List;