#!/usr/bin/env node

import { resolve } from "path";
import { argv, cwd } from "process";
import { migrateDir } from "./migrate-dir";

const dirPath = resolve(argv[1]) ?? cwd();

(async () => {
  const exitCode = await migrateDir(dirPath);
  process.exit(exitCode);
})();
