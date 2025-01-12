import type * as Babel from '@babel/core';
import type { PluginObj } from '@babel/core';

interface PluginOptions {
  customClientImports?: string[] | undefined;
}

const CLIENT_COMPONENT_FUNCTIONS = [
  'createContext',
  'useContext',
  'useDeferredValue',
  'useEffect',
  'useImperativeHandle',
  'useInsertionEffect',
  'useLayoutEffect',
  'useReducer',
  'useRef',
  'useState',
  'useSyncExternalStore',
  'useTransition',
];

function isClientComponentImport(
  node: Babel.types.ImportSpecifier | Babel.types.ImportDefaultSpecifier,
  customClientImports?: string[] | undefined,
) {
  return (
    CLIENT_COMPONENT_FUNCTIONS.includes(node.local.name) ||
    customClientImports?.includes(node.local.name)
  );
}

function isClientComponentExpression(
  node: Babel.types.PrivateName | Babel.types.Expression,
) {
  return (
    node.type === 'Identifier' && CLIENT_COMPONENT_FUNCTIONS.includes(node.name)
  );
}

function isReactImport(node: Babel.types.StringLiteral) {
  return node.value === 'react';
}

export default function ({ types: t }: typeof Babel): PluginObj {
  return {
    name: 'transform-next-use-client',
    visitor: {
      Program: {
        enter(programPath, state) {
          for (const directive of programPath.node.directives) {
            if (directive.value.value === 'use client') {
              // Can skip since it's already been added.
              programPath.stop();
              return;
            }
          }

          programPath.traverse({
            ImportSpecifier(importSpecifierPath) {
              // Checks for any client API imports.
              // import { name } from 'lib'
              if (
                isClientComponentImport(
                  importSpecifierPath.node,
                  (state.opts as PluginOptions).customClientImports,
                )
              ) {
                state.set('SetUseClientDirective', true);
                importSpecifierPath.stop();
              }
            },
            ImportDefaultSpecifier(importDefaultSpecifierPath) {
              // Checks for any client API default imports.
              // import name from 'lib'
              if (
                isClientComponentImport(
                  importDefaultSpecifierPath.node,
                  (state.opts as PluginOptions).customClientImports,
                )
              ) {
                state.set('SetUseClientDirective', true);
                importDefaultSpecifierPath.stop();
              }
            },
            ImportDeclaration(importDeclarationPath) {
              const source = importDeclarationPath.get('source');
              if (isReactImport(source.node)) {
                const specifiers = importDeclarationPath.get('specifiers');
                for (const specifier of specifiers) {
                  if (specifier.isImportNamespaceSpecifier()) {
                    // Store custom namespace ie. "import * as CustomReact from 'react'"
                    state.set(
                      'ReactImportNamespaceName',
                      specifier.get('local').node.name,
                    );
                  }
                }
              }
            },
            MemberExpression(memberExpressionPath) {
              // Checks for React.useEffect etc.
              const property = memberExpressionPath.get('property');
              if (isClientComponentExpression(property.node)) {
                const obj = memberExpressionPath.get('object');
                if (
                  obj.isIdentifier() &&
                  obj.node.name === state.get('ReactImportNamespaceName')
                ) {
                  state.set('SetUseClientDirective', true);
                  memberExpressionPath.stop();
                }
              }
            },
          });
        },
        exit(programPath, state) {
          if (state.get('SetUseClientDirective')) {
            const directive = t.directive(t.directiveLiteral('use client'));

            // Force this directive to the top because some other plugins
            // could append their code above the directive.
            // @ts-expect-error Fixme: handle _blockHoist property
            directive._blockHoist = 1;
            programPath.unshiftContainer('directives', directive);
          }
        },
      },
    },
  };
}
