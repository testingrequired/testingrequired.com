import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Link from 'gatsby-link';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';

import Site from '../components/site';
import Header from '../components/header';
import InlineList from '../components/inline-list';
import Content from '../components/content';

import './base.css';

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Location>
        {({ location }) => (
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

            {location.pathname === '/' ? null : <Content>{children}</Content>}
          </Site>
        )}
      </Location>
    )}
  />
);
