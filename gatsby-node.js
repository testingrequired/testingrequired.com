const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  await createBlogPages({ actions, graphql });
};

async function createBlogPages({ actions, graphql }) {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/post.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { glob: "**/blog/*.md" } }
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(post => {
    const { node } = post;

    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    });
  });
}
