const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  resolve: {
    alias: {
      'webdav-js': path.resolve(__dirname)
    }
  },
  entry: [
    path.resolve(__dirname, 'src/Melba.js'),
    path.resolve(__dirname, 'src/Melba.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Melba-min.js',
    library: 'Melba',
    libraryTarget: 'umd2' // exposes and know when to use module.exports or exports.
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'Melba-min.css',
    }),
    new OptimizeCssAssetsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded'
              }
            }
          }
        ]
      }
    ]
  }
};
