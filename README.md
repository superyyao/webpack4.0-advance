## webpack 进阶 ##
## 参考至 [https://juejin.im/post/5de87444518825124c50cd36](https://juejin.im/post/5de87444518825124c50cd36) ##

### 1.1 创建 build目录 ###
    创建webpack.config.js
    // webpack.config.js

    const path = require('path');
    module.exports = {
    mode:'development', // 开发模式
    entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
    output: {
        filename: 'output.js',      // 打包后的文件名称
        path: path.resolve(__dirname,'../dist')  // 打包后的目录
        }
    }
	修改 
	"scripts": {
    "build": "webpack --config build/webpack.config.js"	
    },

### 1.2.1 配置html模板 ###
	npm i -D html-webpack-plugin
	// webpack.config.js
	const path = require('path');
	const HtmlWebpackPlugin = require('html-webpack-plugin')
	module.exports = {
    mode:'development', // 开发模式
    entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
    output: {
      filename: '[name].[hash:8].js',      // 打包后的文件名称
      path: path.resolve(__dirname,'../dist')  // 打包后的目录
    },
    plugins:[
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html')
      	})
      ]
	}

### 1.2.2 配置多入口 ###
	const path = require('path')

	const HtmlWebpackPlugin = require('html-webpack-plugin')
	module.exports = {
    mode: 'development',
    //单入口形式
    // entry: path.resolve(__dirname,'../src/main.js'),
    // 多入口形式
    entry: {
        main: path.resolve(__dirname,'../src/main.js'),
        home: path.resolve(__dirname,'../src/home.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist/js'),
        filename: '[name].[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html'),
            filename:'index.html',
            chunks:['main'] // 与入口文件对应的模块名
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/home.html'),
            filename:'home.html',
            chunks:['home'] 
          }),
    	]
	} 
### 1.2.3 清除dist ###
	const path = require('path');
	//生成html模板
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	// 清除目录文件
	const { CleanWebpackPlugin } = require('clean-webpack-plugin');

	module.exports = {
    mode: 'development',
    //单入口形式
    // entry: path.resolve(__dirname,'../src/main.js'),
    // 多入口形式
    entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    home: path.resolve(__dirname, '../src/home.js')
    },
    output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].[hash].js'
    },
    plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello World app',
    //   minify: {
    //     // 压缩HTML文件
    //     removeComments: true, // 移除HTML中的注释
    //     collapseWhitespace: true, // 删除空白符与换行符
    //     minifyCSS: true // 压缩内联css
    //   },
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
    //   minify: {
    //     // 压缩HTML文件
    //     removeComments: true, // 移除HTML中的注释
    //     collapseWhitespace: true, // 删除空白符与换行符
    //     minifyCSS: true // 压缩内联css
    //   },
      template: path.resolve(__dirname, '../public/home.html'),
      filename: 'home.html',
      //可以同时引入 main
      chunks: ['main', 'home']
    }),
    new CleanWebpackPlugin()
    ]
    };



### 1.3 引入 css ###
	npm i -D style-loader css-loader
	//less sass
	npm install less less-loader -D
    npm install node-sass sass-loader -D

	const path = require('path');
	//生成html模板
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	// 清除目录文件
	const { CleanWebpackPlugin } = require('clean-webpack-plugin');
	module.exports = {
          mode: 'development',
      	  //单入口形式
      	  // entry: path.resolve(__dirname,'../src/main.js'),
      	  // 多入口形式
    entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    home: path.resolve(__dirname, '../src/home.js')
    },
    output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].[hash].js'
    },
    module: {
    rules: [
        {
            // npm i -D style-loader css-loader
            test: /\.css$/,
            use: ['style-loader','css-loader']
        },
        {
            // npm install less less-loader -D
            test: /\.less$/,
            use: ['style-loader','css-loader','less-loader']
        },
        {
            // npm install node-sass sass-loader -D
            test: /\.scss$/,
            use: ['style-loader','css-loader','sass-loader']
        },
    ]
    },
    plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello World app',
    //   minify: {
    //     // 压缩HTML文件
    //     removeComments: true, // 移除HTML中的注释
    //     collapseWhitespace: true, // 删除空白符与换行符
    //     minifyCSS: true // 压缩内联css
    //   },
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
    //   minify: {
    //     // 压缩HTML文件
    //     removeComments: true, // 移除HTML中的注释
    //     collapseWhitespace: true, // 删除空白符与换行符
    //     minifyCSS: true // 压缩内联css
    //   },
      template: path.resolve(__dirname, '../public/home.html'),
      filename: 'home.html',
      //可以同时引入 main
      chunks: ['main', 'home']
    }),
    new CleanWebpackPlugin()
    ]
    };

### 1.3.1 添加浏览器前缀 ###
    npm i -D postcss-loader autoprefixer
	
    方法一
	//根目录创建 postcss.config.js
	module.exports = {
    	plugins: [require('autoprefixer')] 
	}
	webpack.config.js修改
	{
        //npm i -D postcss-loader autoprefixer  为css添加浏览器前缀
        // npm i -D style-loader css-loader
        test: /\.css$/,
        use: ['style-loader','css-loader','postcss-loader']
     },
    {
        // npm install less less-loader -D
        test: /\.less$/,
        use: ['style-loader','css-loader','postcss-loader','less-loader']
    },
    {
        // npm install node-sass sass-loader -D
        test: /\.scss$/,
        use: ['style-loader','css-loader','postcss-loader','sass-loader']
    },


	方法二
    use:['style-loader','css-loader',{
                loader:'postcss-loader',
                options:{
                    plugins:[require('autoprefixer')]
                }
    },'less-loader'] // 从右向左解析原则


	

	
### 1.3.2 拆分 css ###
	npm i mini-css-extract-plugin -D
	const MiniCssExtract-plugin = require('mini-css-extract-plugin')
	
	rules: [
      {
        test: /\.less$/,
        use: [
           MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      }
    ]

	plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].css",
      })
    ]


### 1.4 打包 图片 字体 媒体...文件 ###
	file-loader就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中
	url-loader 一般与file-loader搭配使用，功能与 file-loader 类似，如果文件小于限制的大小。则会返回 base64 编码，否则使用 file-loader 将文件移动到输出的目录中
    
    npm i file-loader url-loader -D
	
	rules: [
      // ...
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
    ]


### babel 使用 ###
	npm i -D babel-loader @babel/preset-env @babel/core
	
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

    添加垫脚片 npm i @babel/polyfill
