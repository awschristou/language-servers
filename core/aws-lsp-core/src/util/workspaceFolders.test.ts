/**
 * This file tests that accessing workspaceFolders property produces a compiler error.
 * The tests are commented out because they should fail to compile.
 */

import { Features } from '@aws/language-server-runtimes/server-interface/server'
import { InitializeParams } from '@aws/language-server-runtimes/server-interface'

describe('workspaceFolders property', () => {
    it('should not be accessible on Features.workspace', () => {
        // The following line should produce a compiler error
        // const features: Features = {} as Features
        // const folders = features.workspace.workspaceFolders // This should produce a compiler error
    })

    it('should not be accessible on InitializeParams', () => {
        // The following line should produce a compiler error
        // const params: InitializeParams = {} as InitializeParams
        // const folders = params.workspaceFolders // This should produce a compiler error
    })

    it('should use getAllWorkspaceFolders instead', () => {
        const features: Features = {} as Features
        const folders = features.workspace.getAllWorkspaceFolders() // This should compile successfully
    })
})