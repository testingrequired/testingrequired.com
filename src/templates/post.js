import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layouts';
export default function Template({ data }) {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <div className="blog-post-container">
        <Helmet title={`${frontmatter.title} - Testing Required`} />
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>

          <p>{frontmatter.date}</p>

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
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
