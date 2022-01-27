import { ExtensionContext, workspace } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {

    const serverConfig = {
        command: "dotnet",
        args: ["C:\\repos\\LSP\\LSP_Server\\LSP_Server\\LSP_Server\\bin\\Debug\\net5.0\\LSP_Server.dll"],
        transport: TransportKind.pipe
    }
    const serverOptions: ServerOptions = {
        run: serverConfig,
        debug: serverConfig
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            {
                scheme: 'file',
                language: 'plaintext'
            }
        ],
        synchronize: {
           fileEvents: workspace.createFileSystemWatcher("*")
        }
    };

    client = new LanguageClient(
        'DavidLS',
        'David LS',
        serverOptions,
        clientOptions
    );

    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }

    return client.stop();
}