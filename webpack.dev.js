const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const BrowserSync = require('browser-sync-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new BrowserSync({
      host: 'localhost',
      port: 4000,
      proxy: 'http://localhost:8080/',
      reload: false,
    }),
  ],
  devServer: {
    contentBase: './dist',
  },
})
