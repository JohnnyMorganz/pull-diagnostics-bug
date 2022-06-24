# Pull Diagnostics Bug Example

Run the language client with the corresponding server in an empty directory.
Set the logging to messages: `"languageServerExample.trace.server": "messages"`

Create a sample plain text file. Close said file.

The client (correctly) sends a `textDocument/diagnostic` when the file is closed. However, the returned diagnostic report is not reflected on the closed file (the returned report has no diagnostic items, i.e. clears the diagnostics, but the old diagnostics still remain)
