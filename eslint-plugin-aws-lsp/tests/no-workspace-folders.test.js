/**
 * @fileoverview Tests for no-workspace-folders rule
 * @author AWS LSP Team
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../rules/no-workspace-folders");
const { RuleTester } = require("eslint");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    }
});

ruleTester.run("no-workspace-folders", rule, {
    valid: [
        // Using getAllWorkspaceFolders instead
        `function initialize(params, workspace) {
            const folders = workspace.getAllWorkspaceFolders();
        }`,
        
        // Using a different property
        `function initialize(params) {
            const capabilities = params.capabilities;
        }`,
        
        // Using workspaceFolders on a different object
        `function process(someOtherObject) {
            const folders = someOtherObject.workspaceFolders;
        }`
    ],

    invalid: [
        // Direct access to params.workspaceFolders
        {
            code: `function initialize(params) {
                const folders = params.workspaceFolders;
            }`,
            errors: [{
                messageId: "noWorkspaceFolders",
                type: "MemberExpression"
            }]
        },
        
        // Destructured workspaceFolders from params
        {
            code: `function initialize({ workspaceFolders }) {
                if (workspaceFolders) {
                    // do something
                }
            }`,
            errors: [{
                messageId: "noWorkspaceFolders",
                type: "MemberExpression"
            }]
        },
        
        // With type annotation (simulated)
        {
            code: `
            // @type {InitializeParams}
            const params = getParams();
            const folders = params.workspaceFolders;
            `,
            errors: [{
                messageId: "noWorkspaceFolders",
                type: "MemberExpression"
            }]
        }
    ]
});