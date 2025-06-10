import { InitializeParams } from '@aws/language-server-runtimes/server-interface'

// Override the InitializeParams interface to make workspaceFolders property inaccessible
declare module '@aws/language-server-runtimes/server-interface' {
    interface InitializeParams {
        /**
         * @deprecated Do not use workspaceFolders directly. Use getAllWorkspaceFolders() from workspace utils instead.
         * The set of workspace folders can change throughout a user's session.
         */
        workspaceFolders: never
    }
}