import babel from 'rollup-plugin-babel';

export default {
  input: './proxy.js',
  output: {
    file: './dist/proxy-state.umd.js',
    format: 'umd',
    name: 'proxy-state'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}