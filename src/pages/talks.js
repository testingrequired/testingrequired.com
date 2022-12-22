import React from 'react';
import Layout from '../layouts';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export default function Talks() {
  return (
    <Layout>
      <h2 style={{ fontSize: "2em" }}>Talks</h2>

      <ul>
        <li>
          <OutboundLink href="https://www.ministryoftesting.com/dojo/series/test-bash-2022/lessons/transcending-the-tools">
            {`Transcending The Tools`}
          </OutboundLink> @ Test.Bash() 2022 <OutboundLink href="https://docs.google.com/presentation/d/1Po5RHzyJ--s7kDGY2jI_KxyqQJnNrvbREiF-35rCnvY/edit?usp=sharing">(slides)</OutboundLink>
        </li>
        <li>
          <OutboundLink href="https://docs.google.com/presentation/d/1lWyIckm1lCITqxoRLYA0nLO3hKZ6hp11dtfbaKeHc7w/edit?usp=sharing">
            {`Performance, Stress and Load Testing, Oh My!`}
          </OutboundLink> 2020 (slides only)
        </li>
        <li>
          <OutboundLink href="https://devopsdays.org/events/2019-des-moines/program/kylee-tilley/">
            {`QA: A Task Not A Role`}
          </OutboundLink> @ devopsdays dsm 2019 <OutboundLink href="https://docs.google.com/presentation/d/1Zuvq4iNhYT9ousGXRe-TdJrx8hd7D0aQ0-XlhFVkji4/edit?usp=sharing">(slides)</OutboundLink>
        </li>
        <li>
          <OutboundLink href="https://docs.google.com/presentation/d/1ntsjTF2R8SEI66FJFBjAaheN-6mfBsP_ZqgBsGM78HM/edit?usp=sharing">
            {`Reading Pull Requests: Features, Fixes & Other Diviniations`}
          </OutboundLink> 2019 (slides only) <OutboundLink href="https://github.com/testingrequired/talk-reading-pull-requests">Repo</OutboundLink>
        </li>
        <li>
          <OutboundLink href="https://docs.google.com/presentation/d/1FgutMD7VdJMNMcz0dp9gw5_9CRPLnoaYQXHtJEDJyxQ/edit?usp=sharing">
            {`Modern Page Objects`}
          </OutboundLink> 2018 (slides only)
        </li>
      </ul>

      <h2>Want To Hear Me Speak?</h2>

      <section>
        <ul>
          <li>Talks</li>
          <li>Workshops</li>
          <li>Mobbing, pairing, one-on-one</li>
          <li>Customized</li>
          <li>💻💥Live coding</li>
        </ul>
      </section>

      <section>
        <h3>Topics</h3>

        <ul>
          <li>Why you might not need a tester on your team</li>
          <li>Understanding the different between building something correctly vs building the right thing</li>
          <li>Eliminating story pointing by properly breaking down stories</li>
          <li>How to think about error handling how it affect the architecture of your code</li>
          <li>How to identify risk, assess, monitor vs mitigate and why everything boils down to risk</li>
          <li>Analyzing the connection between testability (or lack of) and quality code architecture</li>
          <li>A working solution versus correct</li>
        </ul>

        <p>As well as several other topics relating to development, testing, delivery.</p>
      </section>

      <section>
        <h3>Target Audiences</h3>

        <ul>
          <li>Entry Level</li>
          <li>Developers</li>
          <li>Testers</li>
          <li>Teams</li>
        </ul>
      </section>

      <section>
        <h3>Contact</h3>

        <p>
          ✉️ kyleetilley[at]gmail.com
        </p>
      </section>
    </Layout>
  );
}
