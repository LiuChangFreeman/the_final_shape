const path = require("path");
const {DefinePlugin} = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
publicPath="./"
var proxy={}

module.exports = {
  mode: "production",
  devServer: {
    contentBase:path.join(__dirname,"dist"),
    host:"127.0.0.1",
    port:8088,
    disableHostCheck: true,
    proxy: proxy
  },
  entry: {
    index:path.join(__dirname,"src", "index.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                // ["import", {libraryName: "antd-mobile", style: "css"}]
              ],
              compact:true
            },
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader','css-loader'
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'svg-loader'
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'public','index.html'),
      publicPath:publicPath
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from: __dirname+'/public',
          to: __dirname+'/dist'
        }
      ]
    }),
    new DefinePlugin({
      __WITHOUT_HLSJS__: JSON.stringify(true),
      __WITHOUT_MP4__: JSON.stringify(true)
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          filename: "[name].[chunkhash].js",
          priority: -10
        },
        utilCommon: {
          name: "common",
          minSize: 0,
          minChunks: 2,
          priority: -20
        }
      }
    }
  },
};
