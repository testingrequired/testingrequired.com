import React from 'react';
import Layout from '../layouts';
import me from '../images/me.jpg';
import banner from '../images/about-me-banner.jpg';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export default function About() {
  return (
    <Layout>
      <img src={banner} alt="Me standing on stage giving a talk" />
      <div style={{ float: 'left', marginRight: '3em', marginBottom: '1em' }}>
        <div>
          <img
            src={me}
            style={{
              borderRadius: '50%',
              width: '10em',
              height: '10em',
            }}
            alt=""
          />
        </div>

        <div>
          <h2 style={{ fontSize: '2em' }}>Kylee Tilley</h2>

          <ul
            style={{
              listStyleType: 'none',
              padding: '0',
              margin: '0',
              fontSize: '1.1em',
            }}
          >
            <li>
              <OutboundLink
                href="https://github.com/testingrequired"
                style={{ textDecoration: 'none' }}
              >
                🧑‍💻 github.com/testingrequired
              </OutboundLink>
            </li>

            <li>
              <OutboundLink
                href="https://www.linkedin.com/in/kyleetilley/"
                style={{ textDecoration: 'none' }}
              >
                👔 in/kyleetilley
              </OutboundLink>
            </li>

            <li>
              <OutboundLink
                href="https://bsky.app/profile/testingrequired.com"
                style={{ textDecoration: 'none' }}
              >
                🦋 @testingrequired.com
              </OutboundLink>
            </li>
          </ul>
        </div>
      </div>

      <section>
        <div
          style={{
            fontSize: '1.1em',
            textJustify: 'inter-character',
            textAlign: 'justify',
          }}
        >
          <p>
            Hi there! I'm a software engineer with over 10 years of professional
            experience. I started as a self-taught coder, making webpages
            (Geocities 😍) and writing small utilities to make my IT help desk
            job easier.
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
            legacy systems, and establish best practices in development,
            testing, and delivery. My expertise spans the entire software
            lifecycle—from early product discussions to defining robust testing
            strategies, building automation frameworks, and mentoring teams on
            implementing scalable, testable, maintainable software.
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
