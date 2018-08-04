import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const InlineListWrapper = styled.ul`
  margin: 1em;

  li {
    display: inline;
    margin: 0.5em;
  }
`;

const InlineList = ({ children }) => (
  <InlineListWrapper>
    {children.map(child => <li>{child}</li>)}
  </InlineListWrapper>
);

export default InlineList;
