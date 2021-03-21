import React from 'react';

const Header: React.SFC<{title, cssClass?}> = ( { title, cssClass } ) => <h1 className={cssClass}>{title}</h1>;

export default Header;
