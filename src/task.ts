import { v4 as uuidv4 } from "uuid";

export abstract class Task<Input, Output> {
  private _id: string;
  private _dependencies: Task<unknown, Input>[];

  public constructor() {
    this._id = uuidv4();
    this._dependencies = [];
  }

  public get dependencies() {
    return this._dependencies;
  }

  public get name() {
    return this.constructor.name;
  }

  public get id() {
    return this._id;
  }

  public conditions() {
    return true;
  }

  public dependsOn(task: Task<unknown, Input>) {
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
