import { log } from "console";
import { writeFileSync } from "fs";
import { join } from "path";
import ts from "typescript";
import { getTextWithIgnores } from "./get-text-with-ignores";
import { isDiagnosticWithLinePosition } from "./type-guards";

type DiagnosticByFile = Map<ts.SourceFile, ts.DiagnosticWithLocation[]>;

export async function tsIgnoreErrors(rootDir: string): Promise<void> {
  const program = createTypeScriptProgram(rootDir);

  const diagnosticsByFile: DiagnosticByFile = ts
    .getPreEmitDiagnostics(program)
    .filter(isDiagnosticWithLinePosition)
    .reduce((acc, diagnostic) => {
      const { file } = diagnostic;
      if (!acc.has(file)) {
        acc.set(file, []);
      }
      acc.get(file)!.push(diagnostic);
      return acc;
    }, new Map());

  for (const [sourceFile, diagnostics] of diagnosticsByFile.entries()) {
    const text = getTextWithIgnores(sourceFile, diagnostics, {});
    writeFileSync(sourceFile.fileName, text);

    log(`${sourceFile.fileName}: ${diagnostics.length} errors`);
  }
}

function createTypeScriptProgram(rootDir: string) {
  const tsconfigFilePath = join(rootDir, "tsconfig.json");
  const { config, error } = ts.readConfigFile(
    tsconfigFilePath,
    ts.sys.readFile,
  );

  if (error) {
    throw error;
  }

  const commandLine = ts.parseJsonConfigFileContent(config, ts.sys, rootDir);

  const program = ts.createProgram({
    rootNames: commandLine.fileNames,
    options: {
      ...commandLine.options,
      noEmit: true,
    },
  });

  return program;
}
