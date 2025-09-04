#!/usr/bin/env node
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { build } from 'tsdown';
import { demoBundle, distBundle, projectRoot } from './constants';


const baseOptions = {
  cwd: projectRoot,
  entry: ['./src/index.ts'],
  dts: true,
  plugins: [],
  ignoreWatch: ['./src/__tests__', './src/style'],
  external: [],
  loader: {
    '.svg': 'text',
  } as const,
  sourcemap: true,
  minify: false,
  clean: false,
  watch: false,
};

export async function buildTS({
  isDev = false,
  onSuccess = () => {},
} = {}) {
  const options = {
    ...baseOptions,
    minify: !isDev,
    watch: isDev ? ['./src'] : false,
  };
  return Promise.all([
    build(
      {
        ...options,
        format: ['umd'],
        platform: 'browser',
        target: ['es2015'],
        inputOptions: {
          plugins: [
            ...options.plugins || [],
            // typescript({ tsconfig: './tsconfig.json', exclude: ['src/__tests__/**/*'] }),
            // babel({
            //   babelHelpers: 'bundled',
            //   presets: [
            //     [
            //       '@babel/preset-env',
            //       {
            //         targets: {
            //           browsers: ['> 0.25%', 'last 2 versions'],
            //         },
            //         modules: false,
            //       },
            //     ],
            //   ],
            //   exclude: 'node_modules/**',
            //   extensions: ['.js', '.ts'],
            // }),
          ],
        },
        outputOptions: {
          name: 'bundle',
          format: 'umd',
          exports: 'named',
          plugins: [],
        },
        onSuccess() {
          copyFileSync(resolve(distBundle, 'index.umd.js'), resolve(demoBundle, 'index.umd.js'));
          copyFileSync(resolve(distBundle, 'index.umd.js.map'), resolve(demoBundle, 'index.umd.js.map'));
          console.log(`Copied index.umd.js to demo bundle`);
          onSuccess();
        },
      },
    ),
  ]);
}
