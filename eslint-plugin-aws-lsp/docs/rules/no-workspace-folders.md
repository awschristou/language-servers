# Disallow usage of workspaceFolders property (no-workspace-folders)

This rule disallows the use of the `workspaceFolders` property from the LSP initialization parameters, as the set of active workspace folders can change throughout a user's session. Instead, use the `getAllWorkspaceFolders()` utility method.

## Rule Details

The `workspaceFolders` property is part of the standard LSP protocol's `InitializeParams` interface. However, in the AWS LSP implementation, this property should not be used directly because the set of active workspace folders can change during a user's session.

Instead, the `getAllWorkspaceFolders()` method should be used, which provides the current set of workspace folders at any point in time.

Examples of **incorrect** code for this rule:

```ts
function initialize(params: InitializeParams) {
    const folders = params.workspaceFolders;
    // ...
}

function process({ workspaceFolders }: InitializeParams) {
    if (workspaceFolders) {
        // ...
    }
}
```

Examples of **correct** code for this rule:

```ts
function initialize(params: InitializeParams, workspace: Features['workspace']) {
    const folders = workspace.getAllWorkspaceFolders();
    // ...
}

function process(params: InitializeParams, features: Features) {
    const workspaceFolders = features.workspace.getAllWorkspaceFolders();
    if (workspaceFolders) {
        // ...
    }
}
```

## When Not To Use It

You should always use this rule in the AWS LSP codebase to ensure consistent handling of workspace folders.

## Further Reading

- [AWS LSP Core Documentation](https://github.com/awschristou/language-servers)
- [Language Server Protocol Specification](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)