import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default [
  {
    input: './src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: pkg.browserExport,
      exports: 'named'
    },
    plugins: [
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },
  {
    input: './src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
      name: pkg.browserExport,
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
]