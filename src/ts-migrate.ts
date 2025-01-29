import {
  declareMissingClassPropertiesPlugin,
  explicitAnyPlugin,
  hoistClassStaticsPlugin,
  memberAccessibilityPlugin,
  stripTSIgnorePlugin,
} from "ts-migrate-plugins";
import { migrate, MigrateConfig } from "ts-migrate-server";

export async function tsMigrate(rootDir: string): Promise<void> {
  const config = new MigrateConfig()
    .addPlugin(stripTSIgnorePlugin, {})
    .addPlugin(hoistClassStaticsPlugin, {})
    .addPlugin(declareMissingClassPropertiesPlugin, {})
    .addPlugin(memberAccessibilityPlugin, {})
    .addPlugin(explicitAnyPlugin, {});

  const { exitCode } = await migrate({ rootDir, config });

  if (exitCode !== 0) {
    throw new Error(`ts-migrate failed with exit code: ${exitCode}`);
  }
}
