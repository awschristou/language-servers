# AWS LSP Core

Core library, contains common code and utilities for servers.

## Workspace Folders

When working with workspace folders, always use the `getAllWorkspaceFolders()` method instead of accessing the `workspaceFolders` property directly. The `workspaceFolders` property is deprecated because the set of active workspace folders can change throughout a user's session.

```typescript
// ❌ Don't do this:
const folders = workspace.workspaceFolders;
// or
const folders = params.workspaceFolders;

// ✅ Do this instead:
const folders = workspace.getAllWorkspaceFolders();
```

A TypeScript compiler error will be generated if you try to access the `workspaceFolders` property directly.