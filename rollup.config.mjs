// rollup.config.js

import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/index.js',
  output: {
    format: 'iife',
    name: 'Median',
    file: 'dist/median.min.js',
    exports: 'default'
  },
  plugins: [nodeResolve(), terser()],
};
