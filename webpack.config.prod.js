var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/FilePreview.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'src')
    }, {
      test: /\.less$/,
      loader: 'style!css!autoprefixer-loader!less'
    }, {
      test: [/\.svg/, /\.eot/, /\.ttf/, /\.woff/],
      loader: "file-loader?prefix=assets/fonts/"
    }]
  }
};
