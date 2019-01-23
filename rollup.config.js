import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'amd',
      file: './dist/index.amd.js'
    },
    {
      format: 'cjs',
      file: './dist/index.js',
      sourcemap: false
    },
    {
      format: 'esm',
      file: './dist/index.esm.js'
    },
    {
      format: 'iife',
      name: 'hub',
      file: './dist/index.iife.js'
    },
    {
      format: 'umd',
      name: 'hub',
      file: './dist/index.umd.js',
      sourcemap: false
    }
  ],
  plugins: [typescript()]
};
