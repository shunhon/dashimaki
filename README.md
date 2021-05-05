# dashimaki

Dashimaki is a Typescript pipeline builder that provides dependency management, conditional execution, error handling, type-safed inputs/outputs, and match more.

## Installation

Install with yarn:

```
yarn add dashimaki
```

Or with npm:

```
npm install dashimaki
```

## Motivation
The purpose of Dashimaki is to concisely describe processes with multiple dependencies.

In Node.js or a web browser application, you need to describe the chains between multiple tasks and consider that they may fail.
If you take into account the possibility that tasks may fail, the program becomes more complex, and the nesting of try catches becomes deeper.
In addition, examples of ML in JavaScript have emerged, such as Tensorflow.js, and there is a growing demand for efficient implementation of more complex pipeline processing in JavaScript.

Dashimaki provides a simple interface to solve these problems.
You can build complex pipeline processing in a simple way, allowing you to focus on developing the logic you really need to focus on.
