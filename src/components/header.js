import React from 'react';
import Link from 'gatsby-link';
import './header.css';
import HeaderLinks from './header-links';

const Header = ({ siteTitle }) => (
  <div className="header">
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
    <HeaderLinks />
  </div>
);

export default Header;
