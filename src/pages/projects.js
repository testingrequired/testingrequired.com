import React from 'react';
import Layout from '../layouts';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export default function Projects() {
  return (
    <Layout>
      <h2>Projects</h2>

      <section>
        <h3>
          <OutboundLink href="https://exampletest.app">
            Example Test App
          </OutboundLink>
        </h3>

        <p>
          A mock social media web app designed to teach webdriver style test
          automation and best practices.
        </p>

        <p>
          It features a number of feature flags and configuration to simulate
          various challenges you'll find with legacy web applications.
        </p>

        <ul>
          <li>
            <OutboundLink href="https://exampletest.app">
              https://exampletest.app
            </OutboundLink>
          </li>
          <li>
            <OutboundLink href="https://github.com/testingrequired/exampletest.app">
              https://github.com/testingrequired/exampletest.app
            </OutboundLink>
          </li>
        </ul>
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
