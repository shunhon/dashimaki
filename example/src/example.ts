import { Task, PipelineRunner } from "dashimaki";

class Hoge extends Task<void, string> {
  private result = "";

  public output(): string {
    return this.result;
  }

  public async run() {
    this.result = "Hoge";
  }
}

class Fuga extends Task<string, string> {
  private result = "";

  public constructor() {
    super();
    this.dependsOn(new Hoge());
  }

  public output(): string {
    return this.result;
  }

  public async run() {
    this.result = this.input()[0] + " Fuga";
  }
}

class WriteLog extends Task<string, void> {
  public constructor() {
    super();
    this.dependsOn(new Fuga());
  }

  public output(): void {
    return;
  }

  public async run() {
    console.log(this.input()[0]);
  }
}

const pipline = new PipelineRunner(new WriteLog());
pipline.run();
