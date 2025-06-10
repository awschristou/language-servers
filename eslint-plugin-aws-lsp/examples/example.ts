// Example file demonstrating the no-workspace-folders rule

import { InitializeParams } from '@aws/language-server-runtimes/server-interface';
import { Features } from '@aws/language-server-runtimes/server-interface/server';

// INCORRECT: Direct access to workspaceFolders property
function incorrectInitialize(params: InitializeParams) {
    // This will trigger the ESLint error
    const folders = params.workspaceFolders;
    if (folders) {
        console.log(`Found ${folders.length} workspace folders`);
    }
}

// INCORRECT: Destructured workspaceFolders
function incorrectDestructured({ workspaceFolders }: InitializeParams) {
    // This will trigger the ESLint error
    if (workspaceFolders) {
        console.log(`Found ${workspaceFolders.length} workspace folders`);
    }
}

// CORRECT: Using getAllWorkspaceFolders method
function correctInitialize(params: InitializeParams, features: Features) {
    // This is the correct way to access workspace folders
    const folders = features.workspace.getAllWorkspaceFolders();
    if (folders) {
        console.log(`Found ${folders.length} workspace folders`);
    }
}

// CORRECT: Using a different property
function correctOtherProperty(params: InitializeParams) {
    // This is fine because we're not accessing workspaceFolders
    const capabilities = params.capabilities;
    console.log('Client capabilities:', capabilities);
}

// CORRECT: Using workspaceFolders on a different object
function correctDifferentObject(someOtherObject: any) {
    // This is fine because it's not on an InitializeParams object
    const folders = someOtherObject.workspaceFolders;
    console.log('Some other folders:', folders);
}