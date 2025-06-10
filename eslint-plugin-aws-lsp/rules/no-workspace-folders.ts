/**
 * @fileoverview Rule to disallow usage of workspaceFolders property
 * @author AWS LSP Team
 */

import { Rule } from 'eslint';
import * as ESTree from 'estree';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule: Rule.RuleModule = {
    meta: {
        type: "problem",
        docs: {
            description: "disallow usage of workspaceFolders property",
            category: "Best Practices",
            recommended: true,
        },
        fixable: null,
        schema: [],
        messages: {
            noWorkspaceFolders: "Do not use 'workspaceFolders' property. Use 'getAllWorkspaceFolders()' method instead."
        }
    },

    create(context) {
        return {
            MemberExpression(node: ESTree.MemberExpression) {
                // Check if the property being accessed is 'workspaceFolders'
                if (
                    node.property && 
                    node.property.type === 'Identifier' && 
                    node.property.name === 'workspaceFolders'
                ) {
                    // Check if the object is of type InitializeParams or WorkspaceFoldersInitializeParams
                    if (node.object.type === 'Identifier') {
                        const objectName = node.object.name;
                        const variableDeclaration = findVariableDeclaration(context, objectName);
                        
                        if (
                            // Direct access to params.workspaceFolders
                            objectName === 'params' || 
                            // Check for destructured { workspaceFolders } from params
                            isDestructuredFromParams(context, objectName) ||
                            // Check if the variable is of type InitializeParams or WorkspaceFoldersInitializeParams
                            (variableDeclaration && isInitializeParamsType(variableDeclaration))
                        ) {
                            context.report({
                                node,
                                messageId: "noWorkspaceFolders"
                            });
                        }
                    }
                }
            }
        };
    }
};

/**
 * Find the variable declaration for a given identifier
 * @param context - The ESLint context
 * @param name - The variable name to find
 * @returns The variable declaration node or null if not found
 */
function findVariableDeclaration(context: Rule.RuleContext, name: string): ESTree.Node | null {
    if (!name) return null;
    
    const scope = context.getScope();
    const variable = scope.variables.find(v => v.name === name);
    
    if (variable && variable.defs.length > 0) {
        return variable.defs[0].node;
    }
    
    return null;
}

/**
 * Check if a variable was destructured from params
 * @param context - The ESLint context
 * @param name - The variable name to check
 * @returns True if the variable was destructured from params
 */
function isDestructuredFromParams(context: Rule.RuleContext, name: string): boolean {
    if (!name) return false;
    
    const scope = context.getScope();
    const variable = scope.variables.find(v => v.name === name);
    
    if (variable && variable.defs.length > 0) {
        const def = variable.defs[0];
        if (def.type === 'Variable' && def.parent && def.parent.type === 'VariableDeclaration') {
            // Check if it's part of a destructuring assignment
            const declarator = def.parent.declarations.find(d => 
                d.id && d.id.type === 'ObjectPattern' && 
                d.id.properties.some(p => 
                    p.key && 
                    p.key.type === 'Identifier' && 
                    p.key.name === name
                )
            );
            
            if (declarator && declarator.init && 
                declarator.init.type === 'Identifier' && 
                declarator.init.name === 'params') {
                return true;
            }
        }
    }
    
    return false;
}

/**
 * Check if a variable declaration is of type InitializeParams or WorkspaceFoldersInitializeParams
 * @param node - The variable declaration node
 * @returns True if the variable is of the target type
 */
function isInitializeParamsType(node: ESTree.Node): boolean {
    // This is a simplified check - in a real implementation with TypeScript,
    // we would use the TypeScript compiler API to check the actual type
    
    // Check for type annotations in TypeScript
    if ('id' in node && node.id && 
        'typeAnnotation' in node.id && node.id.typeAnnotation) {
        const typeAnnotation = node.id.typeAnnotation;
        if ('typeAnnotation' in typeAnnotation && 
            'typeName' in typeAnnotation.typeAnnotation && 
            typeAnnotation.typeAnnotation.typeName) {
            const typeName = typeAnnotation.typeAnnotation.typeName;
            if ('name' in typeName && 
                (typeName.name === 'InitializeParams' || 
                 typeName.name === 'WorkspaceFoldersInitializeParams')) {
                return true;
            }
        }
    }
    
    // Check for JSDoc comments that might indicate the type
    if ('leadingComments' in node && node.leadingComments) {
        const comments = node.leadingComments;
        for (const comment of comments) {
            if (comment.type === 'Block' && 
                'value' in comment &&
                comment.value.includes('@type') && 
                (comment.value.includes('InitializeParams') || 
                 comment.value.includes('WorkspaceFoldersInitializeParams'))) {
                return true;
            }
        }
    }
    
    return false;
}

export default rule;