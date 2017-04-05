const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: {App: [
    'webpack-dev-server/?http://localhost:8080/build/',
    './vueTestServer.js'
  ]},
  output: {
      path: path.resolve(__dirname , 'build'),
      filename: "webpack-bundle.js",
      publicPath: 'http://localhost:8080/build'
  },
  node: {
    fs: "empty",
    child_process: 'empty'
  },
  plugins: [
    HtmlWebpackPluginConfig
  ],
  // watch: true,
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: ['vue-loader', 'vue'],
      },
      {
        test: /(\.css|\.scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'vue']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    contentBase: './client',
    inline: true,
    hot: true,
  },
};
