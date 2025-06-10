// Example file to demonstrate the ESLint rule

// Bad: Using workspaceFolders property directly
const badFolders = workspace.workspaceFolders;

// Bad: Destructuring workspaceFolders property
const { workspaceFolders } = workspace;

// Bad: Using workspaceFolders in function parameters
function processFolders({ workspaceFolders }) {
  console.log(workspaceFolders);
}

// Good: Using getAllWorkspaceFolders() method
const goodFolders = workspace.getAllWorkspaceFolders();

// Good: Destructuring getAllWorkspaceFolders method
const { getAllWorkspaceFolders } = workspace;
const folders = getAllWorkspaceFolders();