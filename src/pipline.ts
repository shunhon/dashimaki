import { Task } from "./task";

export class PipelineRunner<RootTaskInput, RootTaskOutput> {
  private target: Task<RootTaskInput, RootTaskOutput>;

  public constructor(target: Task<RootTaskInput, RootTaskOutput>) {
    this.target = target;
  }

  private _run<T, U>(task: Task<T, U>) {
    for (const dependency of task.dependencies) {
      this._run(dependency);
    }
    console.log(`Start task: ${task.getTaskName()}(${task.getTaskId()})`);
    task.run();
  }

  public run(): RootTaskOutput {
    this._run(this.target);
    return this.target.output();
  }
}
