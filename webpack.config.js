const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/src/scripts/app.js',
  output: {
    path: path.resolve(__dirname, './app/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};