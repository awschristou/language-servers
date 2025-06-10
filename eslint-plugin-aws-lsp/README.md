# eslint-plugin-aws-lsp

Custom ESLint rules for AWS Language Servers

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

Add `aws-lsp` to the plugins section of your `.eslintrc` configuration file:

```json
{
    "plugins": [
        "aws-lsp"
    ]
}
```

Then configure the rules you want to use under the rules section:

```json
{
    "rules": {
        "aws-lsp/no-workspace-folders": "error"
    }
}
```

## Rules

### no-workspace-folders

This rule disallows the use of the `workspaceFolders` property, which can change during a user's session. Instead, use the `getAllWorkspaceFolders()` method.

#### Rule Details

Examples of **incorrect** code for this rule:

```js
const folders = workspace.workspaceFolders;
const { workspaceFolders } = workspace;
function test({ workspaceFolders }) { console.log(workspaceFolders); }
```

Examples of **correct** code for this rule:

```js
const folders = workspace.getAllWorkspaceFolders();
const { getAllWorkspaceFolders } = workspace;
getAllWorkspaceFolders();
```