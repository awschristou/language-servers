// Invalid usage examples

// Direct property access is invalid
const folders = workspace.workspaceFolders;

// Using workspaceFolders in a condition is invalid
if (workspace.workspaceFolders) {
  console.log('Has workspace folders');
}

// Destructuring workspaceFolders property is invalid
const { workspaceFolders } = workspace;

// Destructuring workspaceFolders property with alias is invalid
const { workspaceFolders: folders2 } = workspace;

// Using workspaceFolders in function parameters is invalid
function processWorkspace({ workspaceFolders }) {
  console.log(workspaceFolders);
}

// Using workspaceFolders in a method call is invalid
processWorkspace({ workspaceFolders: workspace.workspaceFolders });

// Using workspaceFolders in an object is invalid
const config = {
  folders: workspace.workspaceFolders
};