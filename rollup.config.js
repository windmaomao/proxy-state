import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: './main.js',
  output: {
    file: './dist/proxy-state.umd.js',
    format: 'umd',
    name: 'proxy-state'
  },
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}