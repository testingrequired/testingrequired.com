import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import Site from '../components/site';
import Header from '../components/header';
import InlineList from '../components/inline-list';
import Content from '../components/content';

import './base.css';
import './index.css';

const Layout = ({ children, data, location }) => (
  <Site>
    <Helmet title={data.site.siteMetadata.title} />

    <Header fullscreen={location.pathname === '/'}>
      <h1>
        <Link to="/">{data.site.siteMetadata.title}</Link>
      </h1>

      <InlineList>
        <Link to="/blog">Blog</Link>
        <a href="https://twitter.com/testingrequired">Twitter</a>
        <a href="https://github.com/testingrequired">Github</a>
      </InlineList>
    </Header>

    {location.pathname === '/' ? null : <Content>{children()}</Content>}
  </Site>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
