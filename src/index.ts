#!/usr/bin/env node

import { resolve } from "path";
import { argv, cwd } from "process";
import { migrateDir } from "./migrate-dir";
import { log } from "console";

const dirPath = argv[2] ? resolve(cwd(), argv[2]) : cwd();

log(`Running in ${dirPath}`);

(async () => {
  const exitCode = await migrateDir(dirPath);
  process.exit(exitCode);
})();
