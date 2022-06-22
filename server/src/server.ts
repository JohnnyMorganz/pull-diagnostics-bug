/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  DocumentDiagnosticReportKind,
} from "vscode-languageserver/node";

import { TextDocument } from "vscode-languageserver-textdocument";

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) => {
  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      diagnosticProvider: {
        interFileDependencies: true,
        workspaceDiagnostics: false,
      },
      workspace: {
        workspaceFolders: {
          supported: true,
        },
      },
    },
  };
  return result;
});

connection.languages.diagnostics.on((params) => {
  const textDocument = documents.get(params.textDocument.uri);
  if (!textDocument)
    return { kind: DocumentDiagnosticReportKind.Full, items: [] };

  const diagnostic: Diagnostic = {
    severity: DiagnosticSeverity.Warning,
    range: {
      start: textDocument.positionAt(0),
      end: textDocument.positionAt(10),
    },
    message: "TEST DIAGNOSTIC",
    source: "ex",
  };

  return {
    kind: DocumentDiagnosticReportKind.Full,
    items: [diagnostic],
  };
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
