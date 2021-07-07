const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: 'js/[name].[hash].bundle.js',
    filename: 'js/bundle.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: [
          /(node_modules)/,
        ],
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          // {
          //   loader:  'css-loader',
          // },
          // {
          //   loader: 'sass-loader',
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: 'dist/css/[name].[hash].bundle.css',
      filename: 'dist/css/bundle.css',
    }),
    // new HtmlWebpackPlugin(),
  ],
};
