/**
 * This file demonstrates how to properly use the getAllWorkspaceFolders() method.
 */

import { expect } from 'chai'
import * as sinon from 'sinon'
import { Features } from '@aws/language-server-runtimes/server-interface/server'
import { getWorkspaceFolderPaths } from './workspaceUtils'

describe('getAllWorkspaceFolders', () => {
    it('should use getAllWorkspaceFolders method', () => {
        // Create a mock workspace
        const mockWorkspace = {
            getAllWorkspaceFolders: sinon.stub().returns([
                { uri: 'file:///workspace/folder1', name: 'folder1' },
                { uri: 'file:///workspace/folder2', name: 'folder2' }
            ])
        } as unknown as Features['workspace']

        // Use the utility function that uses getAllWorkspaceFolders
        const folderPaths = getWorkspaceFolderPaths(mockWorkspace)
        
        // Verify the results
        expect(folderPaths).to.have.lengthOf(2)
        expect(folderPaths[0]).to.include('/workspace/folder1')
        expect(folderPaths[1]).to.include('/workspace/folder2')
        
        // Verify that getAllWorkspaceFolders was called
        expect(mockWorkspace.getAllWorkspaceFolders.calledOnce).to.be.true
    })

    it('should handle empty workspace folders', () => {
        // Create a mock workspace with no folders
        const mockWorkspace = {
            getAllWorkspaceFolders: sinon.stub().returns(null)
        } as unknown as Features['workspace']

        // Use the utility function that uses getAllWorkspaceFolders
        const folderPaths = getWorkspaceFolderPaths(mockWorkspace)
        
        // Verify the results
        expect(folderPaths).to.be.an('array').that.is.empty
        
        // Verify that getAllWorkspaceFolders was called
        expect(mockWorkspace.getAllWorkspaceFolders.calledOnce).to.be.true
    })
})