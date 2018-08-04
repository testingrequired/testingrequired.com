import React from 'react';
import Link from 'gatsby-link';
import './header-links.css';

const HeaderLinks = props => (
  <ul className="headerLinks">
    <li>
      <Link to="/posts">Posts</Link>
    </li>
    <li>
      <a href="https://twitter.com/testingrequired">Twitter</a>
    </li>
    <li>
      <a href="https://github.com/testingrequired">Github</a>
    </li>
  </ul>
);

export default HeaderLinks;
