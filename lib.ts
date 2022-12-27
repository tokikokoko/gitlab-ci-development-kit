import { stringify } from "https://deno.land/std/encoding/yaml.ts";

export type Stage = string;
export type Stages = Stage[];

export class Root {
  stages?: Stages;
  jobs?: Jobs;

  constructor(init?: Partial<Root>) {
    Object.assign(this, init);
  }

  toObj() {
    return {
      ...this.jobs?.toObj(),
      stages: this.stages,
    };
  }

  toYaml() {
    return stringify(this.toObj());
  }
}

export class Jobs {
  jobs: Map<string, Job>;

  constructor(init?: Map<string, Job>) {
    this.jobs = init || new Map();
  }

  toObj() {
    return [...this.jobs || []].reduce(
      (l, [k, v]) => Object.assign(l, { [k]: v }),
      {},
    );
  }

  addJob(name: string, job: Partial<Job>) {
    this.jobs.set(name, job);
  }
}

export class Job {
  tags?: string[];
  stage?: Stage;
  scripts?: string[];
  image?: {
    name?: string;
  };

  constructor(init?: Partial<Job>) {
    Object.assign(this, init);
  }
}
