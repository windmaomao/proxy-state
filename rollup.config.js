import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default {
  input: './src/proxy.js',
  output: {
    file: pkg.browser,
    format: 'umd',
    name: pkg.browserExport,
    exports: 'default'
  },
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}