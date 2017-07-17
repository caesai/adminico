const path = require('path');

const config = {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: path.resolve(__dirname, './dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            query  :{
                presets:['react','es2015']
            }
          }
        }
      ]
    }
};

module.exports = config;
