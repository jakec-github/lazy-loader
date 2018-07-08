const path = require('path')

module.exports = {
  entry: {
    app: './src/client/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?modules' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    // publicPath: 'dist/',
  },
}
