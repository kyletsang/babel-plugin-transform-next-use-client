import { node } from '@kyletsang/eslint-config';

/** @type {import('eslint').Linter.Config} */
export default [
  ...node,
  {
    ignores: ['tests'],
  },
];
