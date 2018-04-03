const path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./lib/app.js",
  output: {
    path: __dirname + "/lib/",
    publicPath: "/lib/",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
