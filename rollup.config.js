import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      file: pkg.browser,
      format: 'cjs',
      exports: 'named',
      plugins: [terser()],
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
    },
  ],
};
