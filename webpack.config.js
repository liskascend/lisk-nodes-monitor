const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
   devServer: {
      historyApiFallback: true
   },
   entry: [ 
      './client/src/index.js',
      './client/scss/main.scss'
   ],
   module: {
      rules: [
         {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: 'babel-loader',
                  options: {
                     presets: ['env'],
                     plugins: [
                        require('babel-plugin-transform-object-rest-spread'),
                        'transform-runtime'
                     ]
                  }
               },
               'eslint-loader'
            ]
         },
         {
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: 'client/src/index.html'
      }),
      new ExtractTextPlugin({
         filename: 'client/dist/[name].bundle.css',
         allChunks: true,
      })
   ],
   output: {
      publicPath: '/',
      filename: 'client/dist/bundle.js'
   },
   target: 'web'
};
