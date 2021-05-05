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

## Basic example
The following example shows a simple use case that sorts the provided time series data in descending order and then converts it to CSV.

```ts
import { Task, PipelineRunner } from "dashimaki";

type Data = {
  time: number;
  name: string;
};

class SortData extends Task<Data[], Data[]> {
  private result: Data[] = [];

  public output(): Data[] {
    return this.result;
  }

  public async run() {
    const target = [...this.input()[0]];
    target.sort((left, right) => {
      return left.time < right.time ? 1 : -1;
    });
    this.result = target;
  }
}

class SaveCSV extends Task<Data[], string> {
  private result = "";

  public output(): string {
    return this.result;
  }

  public async run() {
    this.result = "time, name";
    for (const line of this.input()[0]) {
      this.result += `\n${line.time}, ${line.name}`;
    }
  }
}

const sortData = new SortData();
sortData.addInput([
  { time: 1, name: "A" },
  { time: 3, name: "B" },
  { time: 2, name: "C" },
]);
const saveCSV = new SaveCSV();
saveCSV.dependsOn(sortData);

const pipline = new PipelineRunner(saveCSV);
pipline.run().then((res) => console.log(res));
// Output:
// time, name
// 3, B
// 2, C
// 1, A
```
