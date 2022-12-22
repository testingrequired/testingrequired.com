import React from 'react';
import Layout from '../layouts';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export default function Projects() {
  return (
    <Layout>
      <h2 style={{ fontSize: "2em" }}>Projects</h2>

      <section>
        <h3>
          <OutboundLink href="https://github.com/testingrequired/bespin">
            bespin
          </OutboundLink>
        </h3>

        <p>A test framework engine</p>
      </section>

      <section>
        <h3>
          <OutboundLink href="https://github.com/testingrequired/restfile">
            restfile
          </OutboundLink>
        </h3>

        <p>A specification for storing HTTP requests in an easy to read and write file format</p>
      </section>

      <section>
        <h3>
          <OutboundLink href="https://testingrequired.github.io/selector-display/">
            Selector Display
          </OutboundLink>
        </h3>

        <p>
          Built for testing how HTML and CSS selectors work together. Visualizes
          selector results against a blob of HTML.
        </p>

        <ul>
          <li>
            <OutboundLink href="https://testingrequired.github.io/selector-display/">
              https://testingrequired.github.io/selector-display/
            </OutboundLink>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
