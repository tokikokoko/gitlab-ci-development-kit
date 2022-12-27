import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { Jobs, Root } from "./lib.ts";

Deno.test(function buildRootTest() {
  const jobs = new Jobs(
    new Map([
      ["test_1", {
        tags: ["t1"],
        stage: "test",
        script: ['echo "test"'],
      }],
    ]),
  );

  const root: Root = new Root({
    jobs,
    stages: ["test", "build", "deploy"],
  });

  const t = {
    test_1: {
      tags: ["t1"],
      stage: "test",
      script: ['echo "test"'],
    },
    stages: ["test", "build", "deploy"],
  };

  assertEquals(
    root.toObj(),
    t,
  );
});

Deno.test(function buildRootTestUseAddJob() {
  const jobs = new Jobs();
  jobs.addJob("test_1", {
    tags: ["t1"],
    stage: "test",
    script: ['echo "test"'],
  });
  const root: Root = new Root({
    jobs,
    stages: ["test", "build", "deploy"],
  });

  const t = {
    test_1: {
      tags: ["t1"],
      stage: "test",
      script: ['echo "test"'],
    },
    stages: ["test", "build", "deploy"],
  };

  assertEquals(
    root.toObj(),
    t,
  );
});

Deno.test(function canUseImageName() {
  const jobs = new Jobs();
  jobs.addJob("test_1", {
    tags: ["t1"],
    image: {
      name: "test_image:latest",
    },
    stage: "test",
    script: ['echo "test"'],
  });
  const root: Root = new Root({
    stages: ["test", "build", "deploy"],
    jobs,
  });

  const t = {
    test_1: {
      image: {
        name: "test_image:latest",
      },
      tags: ["t1"],
      stage: "test",
      script: ['echo "test"'],
    },
    stages: ["test", "build", "deploy"],
  };

  assertEquals(
    root.toObj(),
    t,
  );
});

Deno.test(function convertYaml() {
  const jobs = new Jobs(
    new Map([
      ["test_1", {
        tags: ["t1"],
        stage: "test",
        script: ['echo "test"'],
      }],
    ]),
  );

  const root: Root = new Root({
    jobs,
    stages: ["test", "build", "deploy"],
  });

  assert(
    root.toYaml(),
  );
});
