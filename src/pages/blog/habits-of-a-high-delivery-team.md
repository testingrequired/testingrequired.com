---
path: /blog/habits-of-a-high-delivery-team
title: Habits of a High Delivery Team
date: '2020-02-16'
---

We've all worked on team's that fall somewhere in the "agile scrum" spectrum: highly effective to totally missed the point. I've worked on a lot of these teams and I've learned that while each team implements it different there are clear and definitive best practices that should be adopted for high delivery teams. This blog post will discuss my experiences with these teams, the challenges that were faced and these best practices I learned.

As mentioned all teams have their own take on "agile scrum" this originates from many sources: company culture, scrum master's direction, team's experiences. Heavy versus anti process. You also face two scenarios where you're coming on to an established team or it's a greenfield team. Both of these provide challenges to individuals on how things are done. With the established team even ineffective practices can be touchy topics especially when coming from a new member of the team.

## Startup

My first exposure to Agile and Scrum was at a startup. We were six people across the world. We had early morning stand-ups on Google Hangouts. With such a small team we generally knew what had happened but it gave us a chance to sync up and discuss the work going forward.

This was also a time I learned to listen for things I should know as a QA. Deployments, investor demos, bug fixes, features worked on.

- We didn't point stories or have retros.
- We used Jira but have no form of a scrum board.
- Changes were often made directly on the prod server.
- "Move fast and break things" was common
  - Fixes required a full regression pass
  - Little communication about when there
- No tests what so ever.
- The core "secret sauce" code was only understandable/maintained by founder.
  - Was asked to write tests for it
- I picked up development stories as well
- Initially had one QA and no test automation
- Test automation allowed for more exploratory testing

## Consultant

My next experience

### Pilot

- Small team
- Self directed team
- CI/CD
- Actively developed
- Everyone involved in implementation discussions
- Was tester as a role

### Purple Squirrel

- Tester as a role
- Split across two teams
- Attended both teams meetings
- Both teams working on different parts of a larger product
- Convert QA written test cases to automation
  - Sense of apathy on how application worked
- Disconnect between test automation and web app being tested
  - Page objects being applied to semi duplicate angular components
- Lack of development experience showed from test automators
- Test data was incredible difficult
  - Developers were pressed for time to help with SQL queries
    - Developers are in the best position to understand the data

## Enterprise

- Two people working on the same thing
- Stand-ups where everyone is siloed
- Dedicated test automation team shared across development teams/projects
- Test automation did not attend or participate in any development team meetings
- Test automation team under QA team's budget
- Automated tests not trusted by QA
- Unusual and burdensome test setups to satisfy QA
- Large parts of the day in meetings
- Testing vendor products with little support
- Two remote testers who were more of a burden than help.
- QA and test automation was completely outsourced but wasn't working
- Developers not writing tests. Relying on webdriver tests.
- Developer, QA, testers completely siloed
- Automate everything
- Automated tests requested but never ran
- Test lead who wasn't effective. Lack of leadership.

## Red October

- Introduced the idea of testing as a task not a role
- Teaching developers how to think like a tester is challenging
- Watch it go through the pipeline
- Team sense of ownership
  - Being on call everyone
- Testing as a task got stories moving through faster
- Everyone on the team was on call
- Weekly team katas
- Lean meetings
- Retros
- Team owned infrastructure
- Team owned jenkins
- Team owned PR and merging
- Highly effective tech leads
- TDD
  - Ping pong during pairing
- Pairing
  - Highly encouraged
  - Knowledge sharing
  - Higher quality
  - Team rule: Can't say no
- Walk the board not the team
  - Someone not talking is a symptom. Un-tracked worked? What are they working on?
- Prefer splitting up in to two day cards versus pointing
  - Faster feedback
  - Tried T-Shirt sizes
    - Found that splitting was just as effective
  - Easier to not step on each other
  - Pointing doesn't protect you from surprises
  - Splitting is an abstraction over pointing
  - High point stories get split anyways
  - Focus on small deliverables versus "do the thing"
    - Don't do infrastructure

## Enterprise 2
