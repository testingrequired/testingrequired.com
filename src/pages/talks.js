import React from 'react';
import Layout from '../layouts';

export default function Talks() {
  return (
    <Layout>
      <h2>Talks</h2>

      <ul>
        <li>
          <OutboundLink href="https://www.ministryoftesting.com/dojo/series/test-bash-2022/lessons/transcending-the-tools">
            {`Transcending The Tools @ Test.Bash() 2022`}
          </OutboundLink>
        </li>
        <li>
          <OutboundLink href="https://devopsdays.org/events/2019-des-moines/program/kylee-tilley/">
            {`QA: A Task Not A Role @ devopsdays dsm 2019`}
          </OutboundLink>
        </li>
      </ul>

      <h2>Want To Hear Me Speak?</h2>

      <section>
        <h3>Contact</h3>

        <p>
          ✉️ kyleetilley[at]gmail.com
        </p>
      </section>

      <section>
        <ul>
          <li>On Site or Remote</li>
          <li>Talks</li>
          <li>Workshops</li>
          <li>One-on-one</li>
          <li>Customized</li>
        </ul>
      </section>

      <section>
        <h3>Topics</h3>

        <ul>
          <li>Why you might not need a tester on your team</li>
          <li>Understanding the different between building something correctly vs building the right thing</li>
          <li>Eliminating story pointing by properly breaking down stories</li>
          <li>How to think about error handling how it affect the architecture of your code</li>
          <li>How to identify risk, assess, monitor vs mitigate</li>
          <li>And many more development, testing and delivery topics</li>
        </ul>
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
    </Layout>
  );
}
