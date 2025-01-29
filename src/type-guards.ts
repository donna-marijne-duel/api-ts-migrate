import ts from "typescript";

export function isDiagnosticWithLinePosition(
  diagnostic: ts.Diagnostic | ts.DiagnosticWithLocation,
): diagnostic is ts.DiagnosticWithLocation {
  return "start" in diagnostic && diagnostic.start !== undefined && "length" in diagnostic && diagnostic.length !== undefined;
}

export function isDiagnostic(
  diagnostic: ts.Diagnostic | ts.DiagnosticWithLocation | undefined,
): diagnostic is ts.Diagnostic {
  return diagnostic != null && !isDiagnosticWithLinePosition(diagnostic);
}
