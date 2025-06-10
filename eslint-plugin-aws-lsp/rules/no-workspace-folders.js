/**
 * @fileoverview Rule to disallow usage of workspaceFolders property
 */
"use strict";

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow usage of workspaceFolders property",
      category: "Best Practices",
      recommended: true
    },
    fixable: null,
    schema: [],
    messages: {
      noWorkspaceFolders: "Do not use workspaceFolders property. Use getAllWorkspaceFolders() method instead."
    }
  },

  create: function(context) {
    return {
      // Check for property access like obj.workspaceFolders
      MemberExpression(node) {
        if (
          node.property &&
          node.property.type === "Identifier" &&
          node.property.name === "workspaceFolders"
        ) {
          context.report({
            node,
            messageId: "noWorkspaceFolders"
          });
        }
      },

      // Check for object destructuring like { workspaceFolders } = obj or function({ workspaceFolders })
      ObjectPattern(node) {
        for (const property of node.properties) {
          if (
            property.type === "Property" &&
            property.key.type === "Identifier" &&
            property.key.name === "workspaceFolders"
          ) {
            context.report({
              node: property,
              messageId: "noWorkspaceFolders"
            });
          }
        }
      }
    };
  }
};