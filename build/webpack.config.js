const path = require('path');
//生成html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除目录文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 拆分 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  //单入口形式
  // entry: path.resolve(__dirname,'../src/main.js'),
  // 多入口形式
  entry: {
    main: ["@babel/polyfill",path.resolve(__dirname, '../src/main.js')],
    home: ["@babel/polyfill",path.resolve(__dirname, '../src/home.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
        {
            //npm i -D postcss-loader autoprefixer  为css添加浏览器前缀
            // npm i -D style-loader css-loader
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
        },
        {
            // npm install less less-loader -D
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader']
        },
        {
            // npm install node-sass sass-loader -D
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader']
        },
        {
          test: /\.(jpe?g|png|gif)$/i, //图片文件
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                fallback: {
                  loader: 'file-loader',
                  options: {
                      name: 'img/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'media/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'fonts/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
        // babel
        {
          test:/\.js$/,
          use:{
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env']
            }
          },
          exclude:/node_modules/
        },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello Index',
    //   minify: {
    //     // 压缩HTML文件
    //     removeComments: true, // 移除HTML中的注释
    //     collapseWhitespace: true, // 删除空白符与换行符
    //     minifyCSS: true // 压缩内联css
    //   },
      template: path.resolve(__dirname, '../public/index.html'),
      filename: '../html/index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
        title: 'Hello Home',
    //   minify: {
    //     // 压缩HTML文件
    //     removeComments: true, // 移除HTML中的注释
    //     collapseWhitespace: true, // 删除空白符与换行符
    //     minifyCSS: true // 压缩内联css
    //   },
      template: path.resolve(__dirname, '../public/home.html'),
      filename: '../html/home.html',
      //可以同时引入 main
      chunks: ['main', 'home']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename:'[name].[hash].css',
        chunnkFilename: '[id].css'
    })
  ]
};
