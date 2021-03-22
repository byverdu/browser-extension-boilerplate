import React from 'react';

export function Header ( { title, cssClass }: {title: string, cssClass: string} ) {
  return ( <h1 className={cssClass}>
    {title}
  </h1> );
}

