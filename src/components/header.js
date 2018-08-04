import React from 'react';
import Link from 'gatsby-link';
import './header.css';

const Header = ({ siteTitle }) => (
  <div className="header">
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
  </div>
);

export default Header;
