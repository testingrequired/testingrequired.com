import React from 'react';
import Layout from '../layouts';
import me from '../images/me.jpg';
import banner from '../images/about-me-banner.jpg';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export default function About() {
  return (
    <Layout>
      <img src={banner} alt="Me standing on stage giving a talk" />
      <h2 style={{ fontSize: '2em' }}>Kylee Tilley</h2>

      <section>
        <div
          style={{
            float: 'left',
            padding: '1em',
            width: '10em',
            marginRight: '1em',
          }}
        >
          <img
            src={me}
            style={{
              borderRadius: '50%',
              minWidth: '7em',
              width: '7em',
              height: '7em',
            }}
            alt=""
          />

          <ul>
            <li>
              <OutboundLink href="https://github.com/testingrequired">
                github.com/testingrequired
              </OutboundLink>
            </li>

            <li>
              <OutboundLink href="https://www.linkedin.com/in/kyleetilley/">
                linkedin.com/in/kyleetilley
              </OutboundLink>
            </li>

            <li>
              <OutboundLink href="https://bsky.app/profile/testingrequired.com">
                🦋 @testingrequired.com
              </OutboundLink>
            </li>
          </ul>
        </div>

        <div style={{ fontSize: '1.15em' }}>
          <p>
            Hi there! I’m Kylee Tilley, a software engineer with over 10 years
            of professional experience. I started as a self-taught coder, making
            webpages (Geocities 😍) and writing small utilities to make my IT
            help desk job easier.
          </p>

          <p>
            I broke into the industry as a tester at a small startup that
            frequently deployed and demoed its product to investors. This
            experience taught me how critical software quality is to the
            business—especially as I observed how development practices directly
            impacted the app's reliability. To help keep up with the rapid pace
            of development (one-week sprints), I implemented extensive test
            automation, which eventually allowed me to take on development work.
            This shift gave me more control over the quality of the product.
          </p>

          <p>
            After the startup, I moved into software delivery consulting,
            bringing my experience in both development and testing. I spent my
            time pairing and mobbing with teams to implement application code
            while advocating for better testing practices—asking about potential
            test scenarios, encouraging developers to update end-to-end browser
            tests, and generally influencing how teams thought about testing as
            an integral part of development.
          </p>

          <p>
            The more I worked as both a developer and tester, the more I saw a
            deep connection between good implementation design and testability.
            My "tester spidey sense" would tingle during story refinement or
            while pairing on a feature. I had learned through experience—often
            painful experience—how certain design decisions could create testing
            headaches. Over time, I developed a strong intuition for spotting
            trouble before it happened, and my technical background allowed me
            to address it effectively. Being able to wear both hats at the same
            time turned out to be a major superpower.
          </p>

          <p>
            Over my career, I've worked across multiple industries, helping
            organizations design and build greenfield applications, modernize
            legacy systems, optimize workflows, and establish best practices in
            development, testing, and delivery. My expertise spans the entire
            software lifecycle—from early product discussions to defining robust
            testing strategies, building automation frameworks, and mentoring
            teams on implementing scalable, testable, maintainable software.
          </p>

          <p>
            Outside of work, I love writing test tools, game development,
            cooking, and synthesizers. I love to learn new things, so this list
            is constantly growing.
          </p>
        </div>
      </section>
    </Layout>
  );
}
