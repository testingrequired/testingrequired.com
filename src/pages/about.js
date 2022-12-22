import React from 'react';
import Layout from '../layouts';
import me from '../images/me.jpg';
import banner from '../images/about-me-banner.jpg';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export default function About() {
    return (
        <Layout>
            <img src={banner} />
            <h2 style={{ fontSize: "2em" }}>About Me</h2>

            <section>
                <div style={{ display: "flex", gap: "1em", alignItems: "flex-start" }}>
                    <div style={{ padding: "1em", flexGrow: "1", width: "20em" }}>
                        <img src={me} style={{ borderRadius: "50%", minWidth: "7em", width: "7em", height: "7em" }} alt="" />

                        <div>
                            <h3>Links</h3>
                            <ul>
                                <li>
                                    <OutboundLink href="https://mastodon.social/@testingrequired">
                                        Mastodon
                                    </OutboundLink>
                                </li>

                                <li>
                                    <OutboundLink href="https://github.com/testingrequired">
                                        Github
                                    </OutboundLink>
                                </li>

                                <li>
                                    <OutboundLink href="https://www.linkedin.com/in/kyleetilley/">
                                        LinkedIn
                                    </OutboundLink>
                                </li>

                                <li>
                                    <OutboundLink href="https://twitter.com/testingrequired">
                                        Twitter
                                    </OutboundLink>
                                </li>
                                <li>
                                    <OutboundLink href="https://www.youtube.com/@testingrequired">
                                        Youtube
                                    </OutboundLink>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div style={{ fontSize: "1.15em", flexGrow: "3" }}>
                        <p>
                            I'm a developer and tester with 10 years of experience delivering software in a range of environments
                            (startup, enterprise, consultant) and over 25 years of experience writing code across many languages.
                            I really love writing test tools.
                        </p>

                        <p>
                            Outside of that I'm passionate about game development, music production and synthesizers.
                        </p>
                    </div>
                </div>
            </section>

            <section style={{ marginLeft: "1em", fontSize: "1.15em" }}>

            </section>
        </Layout>
    );
}
