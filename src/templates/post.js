import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../layouts';

export default function Template({ data }) {
  const { siteMetadata } = data.site;
  const { frontmatter, html, excerpt } = data.markdownRemark;
  const { title, date } = frontmatter;

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${siteMetadata.title}`}</title>

        <meta
          property="og:title"
          content={`${title} - ${siteMetadata.title}`}
        />
        <meta property="og:description" content={excerpt} />
      </Helmet>

      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{title}</h1>

          <p>{date}</p>

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
