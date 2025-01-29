#!/usr/bin/env node

import { log } from "console";
import { resolve } from "path";
import { argv, cwd } from "process";
import { tsIgnoreErrors } from "./ts-ignore-errors";
import { tsMigrate } from "./ts-migrate";

const dirPath = argv[2] ? resolve(cwd(), argv[2]) : cwd();

log(`Running in ${dirPath}`);

(async () => {
  await tsMigrate(dirPath);
  await tsIgnoreErrors(dirPath);
})();
