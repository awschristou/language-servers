// Valid usage examples

// Using getAllWorkspaceFolders() is valid
const folders = workspace.getAllWorkspaceFolders();

// Destructuring getAllWorkspaceFolders method is valid
const { getAllWorkspaceFolders } = workspace;
const moreFolders = getAllWorkspaceFolders();

// Using other properties is valid
const otherProperty = workspace.someOtherProperty;

// Using workspaceFolders as a variable name is valid
const workspaceFolders = ['folder1', 'folder2'];

// Using workspaceFolders as a function parameter name is valid
function processWorkspaceFolders(workspaceFolders) {
  console.log(workspaceFolders);
}

// Using workspaceFolders as a property name in a different object is valid
const myObject = {
  workspaceFolders: ['folder1', 'folder2']
};