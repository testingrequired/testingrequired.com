import React from 'react';
import styled from 'styled-components';

import InlineList from './inline-list';

const NavMenuStyle = styled(InlineList)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 1.3em;
  margin: 0;
  margin-top: 0.5em;

  @media (max-width: 400px) {
    font-size: 1em;
  }
`;

export default function NavMenu({ children }) {
  return (
    <NavMenuStyle>
      {children.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </NavMenuStyle>
  );
}
