const path = require('path');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');//这个插件 Loader和plugin要一起用 否则不生效
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
module.exports={
    entry:{
      main:path.resolve("./src/main.tsx"),
      polyfill:"@babel/polyfill"
    },
    output:{
      filename:"js/[name].bundle.js",
      path:path.resolve('./dist')
    },
    module:{
      rules:[
        {
          test:/\.(js|jsx)$/,
          use:{
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env','@babel/preset-react']
            }
          },
          exclude:/node_modules/
        },
        { test: /\.tsx?$/, 
          loader: "ts-loader"
        },
        {
          test:/\.css$/,
          use:[
             {
              loader:MiniCssExtractPlugin.loader,
              options:{publicPath:'./'}
            },
            {loader:'css-loader',options:{modules:false}}
          ]
        },
        {
          test:/\.scss$/,
          use:[
            {
              loader:MiniCssExtractPlugin.loader,
              options:{publicPath:'./'}
            },
            {loader:'css-loader',options:{modules:false}},
            {loader:'sass-loader'}
          ]
        },
        {
           test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
           use: [
               {loader:'file-loader',options:{outputPath:"assets/"}}
            
           ]
         }
      ]
    },
    plugins:[
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[hash].[id].css',
        ignoreOrder: false // Enable to remove warnings about conflicting order
      }),
      new HtmlWebpackPlugin({
        template:path.resolve('./src/index.html')
      })
    ],
    resolve: {
    extensions: [".js", ".css","ts","tsx"],
    alias: {
      
      }
  },
    // optimization: { 多入口 多出口时 提取公共代码 减少各bundle体积的
    //   splitChunks: {
    //     chunks: 'all',
    //     minSize: 30000,
    //     minChunks: 1,
    //     maxAsyncRequests: 5,
    //     maxInitialRequests: 3,
    //     automaticNameDelimiter: '~',
    //     name: true,
    //     cacheGroups: {
    //       vendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: -10
    //       },
    //       default: {
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true
    //       }
    //     }
    //   }
    // }
  }