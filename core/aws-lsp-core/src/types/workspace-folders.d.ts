/**
 * This declaration file adds a compiler error when accessing the workspaceFolders property.
 * The workspaceFolders property is deprecated in favor of getAllWorkspaceFolders() method.
 */

import { Features } from '@aws/language-server-runtimes/server-interface/server'
import { InitializeParams } from '@aws/language-server-runtimes/server-interface'

// Augment the InitializeParams interface to make workspaceFolders property throw an error
declare module '@aws/language-server-runtimes/server-interface' {
    interface InitializeParams {
        /**
         * @deprecated Use workspace.getAllWorkspaceFolders() instead.
         * The set of workspace folders can change throughout a user's session.
         */
        readonly workspaceFolders: never
    }
}

// Augment the Features interface to make workspace.workspaceFolders property throw an error
declare module '@aws/language-server-runtimes/server-interface/server' {
    interface Features {
        workspace: {
            /**
             * @deprecated Use workspace.getAllWorkspaceFolders() instead.
             * The set of workspace folders can change throughout a user's session.
             */
            readonly workspaceFolders: never
        } & Omit<Features['workspace'], 'workspaceFolders'>
    }
}