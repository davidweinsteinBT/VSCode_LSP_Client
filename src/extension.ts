import { ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {

    const serverOptions: ServerOptions = {
        run: {
            // TODO: Implement Sever 
            module: "",
            transport: TransportKind.ipc
        },
        debug: {
            // TODO: Implement Sever 
            module: "",
            transport: TransportKind.ipc
        },

    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            {
                scheme: 'file',
                language: 'plaintext'
            }
        ]
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