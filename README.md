# Pull Diagnostics Bug Example

Run the language client with the corresponding server in an empty directory.
Set the logging to messages: `"languageServerExample.trace.server": "messages"`

Create sample plaintext files

Note how `textDocument/diagnostic` is not received from the client on document open / type.

It may work for the first file you create, but if you create a new one and start typing, the request is not fired.
