---
path: /blog/implement-language
title: Implementing A Programming Language
date: 2024-04-14
---

## Outline

1. Introduction
    - Explanation of why I would want to implement a programming language
    - Overview of different methods used for implementing languages mentioned in the blog post
2. Implementing My Own Scheme Dialect: "CID"
    - Brief explanation of Scheme
        - S expressions
        - Code as data. Data as code.
        - Macros
    - Description of method used to implement Scheme and any challenges faced during implementation
        - Method used
            - Written in typescript
            - Based largely on the Python implementation described here: https://norvig.com/lispy.html
        - Challenges
            - Thinking I could shortcut around implementing cells/car/cons. This worked until I tried to implement quoting syntax
            - Thinking of edge cases and writing enough tests
                - Code coverage vs test coverage. Code coverage doesn't help you with projects like this
                - I did find a number of test suites targetted at lisp like languages
            - No code editor extension or language server really hurt the development experience. Being able to use the language really really helps
    - Benefits gained from implementing Scheme
        - Learning about the broad family of lisp like languages
        - Learning about S expressions, code as data, and Scheme/Lisp's macro system
        - Learning more about lexical scoping alternatives
        - Implemented tail call recursion optimization
        - Understanding how data we take for granted in dynamic interpreted languages are implemented
        - Learning about lexical analysis (converting text in to tokens) and parsing tokens in to abstract syntax trees (AST)
        - Implemented syntax changes to make it my own dialect of Scheme
3. Implementing "Locks"
    - Brief explanation of Lox and its purpose
        - Discovered Lox through "craftinginterpreters.com"
        - Found an open source implementation of Lox https://github.com/ajeetdsouza/loxcraft
            - Written in Rust
            - Already had a language server implementation
            - Already had an online playground implementation
            - Worked with WebAssembly (WASM)
    - Description of method used to implement Locks
        - Bytecode Compiled Stacked Based VM
            - Brief explanation of the VM and its purpose
            - Description of method used to create VM and any challenges faced during implementation
            - Benefits gained from implementing VM and any improvements made since then
    - Challenges faced during implementation
        - Debugging recursive compiler and iterpreter
            - Very easy to get lost
        - Learning Rust
        - Understanding the Lox implementation
            - Why certain choices were made
            - Lots of unsafe Rust
            - Manual allocation from the VM's memory, data size, and segfaults
            - Garbage collection method: mark and sweep
    - Explanation of modifications made from open source implementation of Lox
    - Benefits gained from implementing Locks and any improvements made since then
        - Learned how byte code compiliation and stack based VMs work
        - Implemented a VS Code extension to integrate the language server
        - Dramatically improved the online playground
            - Added the ability to display the lexical tokens for Locks code
            - Added the ability to display the AST for Locks code
            - Added "live" code examples that could display lexical tokens, AST or just run the code
        - Learned to always provide a Docker image for languages and tools to make it easy to experiment with
        - Gave me a better appreciation for decisions made in other languages (like type erasure in Java)
4. Implementing New Language from Scratch: "Egon"
    - Brief explanation of new language and its purpose
    - Description of method used to create new language
    - Challenges faced during implementation
    - Benefits gained from implementing new language and any improvements made since then
    - Connection between new language and open source project of third implementation
5. Conclusion
    - Summary of different methods used and their outcomes
    - Reflection on personal growth and understanding gained from implementing programming languages
    - Encouragement for others to try implementing their own languages

## Introduction

Have you ever thought about implementing your own programming language? There are many reasons why someone might want to create their own language. It could be for fun or to solve specific problems that existing languages don't address effectively. In this blog post, we'll discuss my experience implementing three different programming languages and the methods used for each implementation. We'll also explore the challenges and benefits gained from each experience and encourage others to try implementing their own languages too.

As we dive into each implementation, we'll start with my experience implementing Scheme. Scheme is a dialect of Lisp and has been used in many educational settings to teach programming concepts. I learned a lot about S expressions and Scheme's macro system during this implementation. We'll explore the method used to implement Scheme and any challenges faced along the way. We'll also discuss any improvements made since then. Stay tuned for more!

--

As someone who has always had a passion for programming and computer science, I have often wondered about how programming languages are created and what goes into developing one from scratch. I have always been fascinated by how some programming languages are more efficient and easier to use than others, and I have often considered trying to implement my own programming language to see what it would take to create something truly unique and efficient. In this blog post, I will be discussing my experiences in implementing three different programming languages and what I have learned from each one. By sharing my experiences and providing details about the methods used and challenges faced during each implementation, I hope to encourage others to try implementing their own programming languages and gain a deeper understanding of how these languages work under the hood.

In this post, I will be discussing my experiences in implementing three different programming languages: Scheme, Lox, and my own custom language from scratch. I will provide an overview of each language, the method used to implement it, any challenges faced during implementation, and the benefits gained and improvements made since then. Finally, I will reflect on my personal growth and understanding gained from implementing these programming languages and encourage others to try implementing their own languages to learn more about how programming languages work and to develop their skills as programmers.

--

As someone who has always been fascinated by programming languages and their inner workings, I have taken it upon myself to implement several languages over the years. This has provided me not only with a greater understanding of how these languages function but has also allowed me to gain valuable insights into the process of language development. In this blog post, I will be sharing my experiences implementing three different programming languages: Scheme, Lox, and a new language from scratch. I will be discussing the methods used for each implementation, any challenges faced along the way, and the benefits gained from each endeavor. By sharing my journey, I hope to encourage others to take up the challenge of implementing their own programming languages and gain a deeper appreciation for the complexity and beauty of these tools we use every day.