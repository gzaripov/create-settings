import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
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
    {
      file: pkg.browser[pkg.main],
      format: 'cjs',
      exports: 'named',
      plugins: [terser()],
    },
    {
      file: pkg.browser[pkg.module],
      format: 'esm',
      exports: 'named',
      plugins: [
        terser({
          module: true,
        }),
      ],
    },
  ],
};
