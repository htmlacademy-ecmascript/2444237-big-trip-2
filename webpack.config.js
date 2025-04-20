// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const CopyPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line no-undef
const HtmlPlugin = require('html-webpack-plugin');


// eslint-disable-next-line no-undef
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.[contenthash].js',
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlPlugin ({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }
    ]
  }
};
