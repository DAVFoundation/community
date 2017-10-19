const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.BannerPlugin({
      banner:'require("source-map-support").install();',
      raw:true,
      entryOnly: false
    }),

    new webpack.BannerPlugin({
      banner:'require("babel-polyfill");',
      raw:true,
      entryOnly:false
    })
  ]
});
