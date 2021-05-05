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
