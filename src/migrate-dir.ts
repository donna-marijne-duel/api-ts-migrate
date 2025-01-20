import {
  addConversionsPlugin,
  declareMissingClassPropertiesPlugin,
  eslintFixPlugin,
  explicitAnyPlugin,
  hoistClassStaticsPlugin,
  jsDocPlugin,
  memberAccessibilityPlugin,
  stripTSIgnorePlugin,
  tsIgnorePlugin,
} from "ts-migrate-plugins";
import { migrate, MigrateConfig } from "ts-migrate-server";

export async function migrateDir(rootDir: string): Promise<number> {
  const config = new MigrateConfig()
    .addPlugin(stripTSIgnorePlugin, {})
    .addPlugin(explicitAnyPlugin, {})
    .addPlugin(addConversionsPlugin, {})
    // We need to run eslint-fix before ts-ignore because formatting may affect where
    // the errors are that need to get ignored.
    .addPlugin(eslintFixPlugin, {})
    .addPlugin(tsIgnorePlugin, {})
    // We need to run eslint-fix again after ts-ignore to fix up formatting.
    .addPlugin(eslintFixPlugin, {});

  const { exitCode } = await migrate({ rootDir, config });

  return exitCode;
}
