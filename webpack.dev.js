const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV':JSON.stringify('development')
      }
    }),

    new webpack.BannerPlugin({
      banner:'require("source-map-support").install();',
      raw:true, 
      entryOnly: false
    })
  ]
})