const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const postTemplate = path.resolve(`src/templates/post.js`);

  await makePostPages('**/blog/*.md', actions.createPage, postTemplate);
};

async function makePostPages(glob, createPage, template) {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { glob: "${glob}" } }
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
      component: template,
      context: {}, // additional data can be passed via context
    });
  });
}
