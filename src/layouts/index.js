import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import './base.css';
import './index.css';

const Layout = ({ children, data }) => (
  <div id="main">
    <Helmet title={data.site.siteMetadata.title} />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div id="content">{children()}</div>
  </div>
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
