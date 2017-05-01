const HtmlWebPackPlugin   = require('html-webpack-plugin');
const webpack             = require('webpack');
const path                = require('path');
const ExtractTextPlugin   = require("extract-text-webpack-plugin");
const CriticalPlugin      = require('webpack-plugin-critical').CriticalPlugin;
var ImageminPlugin        = require('imagemin-webpack-plugin').default;
const OnlyIfChangedPlugin = require('only-if-changed-webpack-plugin');
//var WebpackDevServer    = require('webpack-dev-server');
var WebpackCopyPlugin = require('webpack-copy-plugin');
//var imageminMozjpeg = require('imagemin-mozjpeg');

// var compiler = webpack({
//   // configuration
// });
var live =  false;
const config =  {
  context: path.resolve(__dirname),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
  		modules: [
  			path.resolve(__dirname, './source/components'),
  			"node_modules/"
  		]
  	},
  module:{
    rules:[
      {test:/\.(js|jsx)$/, use:'babel-loader'},
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [{
            loader: 'css-loader',
            options: {
                minimize: true
            }
        },
        {
            loader: "sass-loader",
            options: {
                includePaths: [
                  path.join(__dirname, './source/scss/')
                ]
            }
        },
        'autoprefixer-loader'
    ]
    })

      }
    ]

  },
  devServer:{

    contentBase: path.resolve(__dirname, './dist')
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebPackPlugin({template:'./index.html',hash:true,minify: {collapseWhitespace:true} }),
    new ExtractTextPlugin("styles.min.css"),
    // new CriticalPlugin({
    //   src:'index.html',
    //   inline:true,
    //   minify:true,
    //   dest:'index.html'
    // }),
     new WebpackCopyPlugin({
          dirs: [
              { from: './source/images', to: './dist' },
          ],
          options: {},
      }),
      new ImageminPlugin({
        test: 'dist/**',
        optipng: {
          optimizationLevel: 9
        }
      })//,
    //  new WebpackDevServer(compiler,{
    //                        contentBase: path.join(__dirname, "./dist"),
    //                        compress: true,
    //                        hot: true,
    //                        historyApiFallback: false
     //
    //                      })
  ]
};

module.exports = config;
