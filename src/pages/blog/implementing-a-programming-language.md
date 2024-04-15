---
path: /blog/implement-language
title: Implementing A Programming Language
date: 2024-04-14
---

## Outline

1. Introduction
    - Explanation of why I would want to implement a programming language
    - Overview of different methods used for implementing languages mentioned in the blog post
2. Implementing Scheme
    - Brief explanation of Scheme and its purpose
    -  Description of method used to implement Scheme and any challenges faced during implementation
        - Challenges
            - Thinking I could shortcut around implementing it using cells/car/cons. This worked until I tried to implement quoting syntax
            - No extension or language server really hurt the development experience
    - Benefits gained from implementing Scheme and any improvements made since then
        - Learning about S expressions and Scheme's macro system
        - Understanding how data we take for granted in dynamic interpreted languages are implemented
3. Implementing Lox
    - Brief explanation of Lox and its purpose
    - Description of method used to implement Lox and any challenges faced during implementation
        - Implementing Bytecode Compiled Stacked Based VM
            - Brief explanation of the VM and its purpose
            - Description of method used to create VM and any challenges faced during implementation
            - Benefits gained from implementing VM and any improvements made since then
            - Explanation of modifications made from open source implementation of Lox
            - Benefits gained from implementing Lox and any improvements made since then
4. Implementing New Language from Scratch
    - Brief explanation of new language and its purpose
    - Description of method used to create new language and any challenges faced during implementation
    - Benefits gained from implementing new language and any improvements made since then
    - Connection between new language and open source project of third implementation
5. Conclusion
    - Summary of different methods used and their outcomes
    - Reflection on personal growth and understanding gained from implementing programming languages
    - Encouragement for others to try implementing their own languages