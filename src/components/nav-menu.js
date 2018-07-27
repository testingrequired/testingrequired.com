import React from 'react';
import styled from 'styled-components';

import InlineList from './inline-list';

const NavMenuStyle = styled(InlineList)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
