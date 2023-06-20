import path from 'node:path';
import { pluginTester } from 'babel-plugin-tester';
import plugin from '../src';

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures'),
  babelOptions: {
    presets: ['@babel/preset-react'],
  },
});

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures-ts'),
  babelOptions: {
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
  },
});

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures-cjs'),
  babelOptions: {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          modules: 'commonjs',
        },
      ],
    ],
  },
});
