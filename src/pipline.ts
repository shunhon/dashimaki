import { Task } from "./task";

export type RetryConfiguration = {
  maxAttempts: number;
};

export type PipelineConfiguration = {
  retry?: RetryConfiguration;
};

type InternalPipelineConfiguration = {
  retry: RetryConfiguration;
};

const DefaultConfiguration: InternalPipelineConfiguration = {
  retry: {
    maxAttempts: 5,
  },
};

export class PipelineRunner<RootTaskInput, RootTaskOutput> {
  private target: Task<RootTaskInput, RootTaskOutput>;
  private config: InternalPipelineConfiguration;

  public constructor(
    target: Task<RootTaskInput, RootTaskOutput>,
    config: PipelineConfiguration = DefaultConfiguration
  ) {
    this.target = target;
    const _config: InternalPipelineConfiguration = {
      retry: config.retry ? config.retry : DefaultConfiguration.retry,
    };
    this.config = _config;
  }

  private async _run<T, U>(task: Task<T, U>) {
    for (const dependency of task.dependencies) {
      this._run(dependency);
    }
    for (let i = 0; i < this.config.retry.maxAttempts; i++) {
      try {
        await task.run();
        return;
      } catch (err) {
        if (i === this.config.retry.maxAttempts - 1) {
          throw err;
        }
      }
    }
  }

  public async run(): Promise<RootTaskOutput> {
    await this._run(this.target);
    return this.target.output();
  }
}
