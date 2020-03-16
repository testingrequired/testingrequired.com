import React from 'react';
import Layout from '../layouts';

export default function Training() {
  return (
    <Layout>
      <h2>Training</h2>

      <section>
        <h3>Contact</h3>

        <p>
          <a href="mailto:kylee@testingrequired.com">
            kylee@testingrequired.com
          </a>
        </p>
      </section>

      <section>
        <h3>Services</h3>

        <ul>
          <li>On Site or Remote</li>
          <li>Talks</li>
          <li>Workshops</li>
          <li>One-on-one</li>
          <li>Customized</li>
        </ul>
      </section>

      <section>
        <h3>Target Audiences</h3>

        <ul>
          <li>Entry Level</li>
          <li>Manual Testers</li>
          <li>Test Automators</li>
          <li>Developers</li>
          <li>Teams</li>
        </ul>
      </section>
    </Layout>
  );
}
