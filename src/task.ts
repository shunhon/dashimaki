import { v4 as uuidv4 } from "uuid";

export abstract class Task<Input, Output> {
  private _id: string;
  private _dependencies: Task<unknown, Input>[];

  public constructor() {
    this._id = uuidv4();
    this._dependencies = [];
  }

  public get dependencies(): Task<unknown, Input>[] {
    return this._dependencies;
  }

  public get name(): string {
    return this.constructor.name;
  }

  public get id(): string {
    return this._id;
  }

  public conditions(): boolean {
    return true;
  }

  public dependsOn(task: Task<unknown, Input>): void {
    this.dependencies.push(task);
  }

  public input(): Input[] {
    return this.dependencies.map((dependency) => {
      return dependency.output();
    });
  }

  public abstract output(): Output;

  public abstract run(): Promise<void>;
}
