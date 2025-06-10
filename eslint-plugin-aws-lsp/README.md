# eslint-plugin-aws-lsp

ESLint plugin for AWS LSP

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-aws-lsp`:

```sh
npm install eslint-plugin-aws-lsp --save-dev
```

## Usage

Add `aws-lsp` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "aws-lsp"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "aws-lsp/no-workspace-folders": "error"
    }
}
```

Or use the recommended configuration:

```json
{
    "extends": [
        "plugin:aws-lsp/recommended"
    ]
}
```

## Rules

### no-workspace-folders

This rule disallows the use of the `workspaceFolders` property from the LSP initialization parameters, as the set of active workspace folders can change throughout a user's session. Instead, use the `getAllWorkspaceFolders()` utility method.

#### Rule Details

Examples of **incorrect** code for this rule:

```js
function initialize(params) {
    const folders = params.workspaceFolders;
    // ...
}

function process({ workspaceFolders }) {
    if (workspaceFolders) {
        // ...
    }
}
```

Examples of **correct** code for this rule:

```js
function initialize(params, workspace) {
    const folders = workspace.getAllWorkspaceFolders();
    // ...
}

function process(params, workspace) {
    const workspaceFolders = workspace.getAllWorkspaceFolders();
    if (workspaceFolders) {
        // ...
    }
}
```