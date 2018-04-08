const HtmlWebpackPlugin = require('html-webpack-plugin'),
	  ExtractTextPlugin = require('extract-text-webpack-plugin'),
	  CleanWebpackPlugin = require('clean-webpack-plugin'),
	  webpack = require('webpack'); // 模块热替换要使用的模块

// 区分开发环境与产品环境
// const isProd = process.env.NODE_ENV === 'production';
// console.log(isProd);

module.exports = {
	entry:{
		'app.bundle':'./app.js',
		'list.bundle':'./list.js',
	},
	output:{
		path: __dirname+'/dist',
		filename: '[name][hash].js',
	},
	devServer:{
		port: 3000,
		open: true,
		hot: true,
	},
	module:{
		rules:[

			// 样式处理
			{
				test:/\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader','sass-loader']
				})
			},

			// 图片处理
			{
				test: /\.(png|jpg?g|gif|svg)$/i,
				use: [
					// 加载图片
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/'
						}
					},
					// 压缩图片
					/*{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
						}
					}*/
				]
			},
		]
	},
	plugins:[

		// 首页
		new HtmlWebpackPlugin({
			title:'custom template',	// 网页标题
			template: './index.html',	// 指定模板文件
			filename: 'index.html',		// 指定目标文件
			chunks: ['app.bundle'],		// 指定js文件
			minify:{
				collapseWhitespace: true,	// 压缩html文件
			},
			hash:true,	// 文件名添加hash参数
		}),

		// 列表页
		new HtmlWebpackPlugin({
			title:'list template',
			template: './list.html',
			filename: 'list.html',
			chunks: ['list.bundle'],
			minify:{
				collapseWhitespace:true,
			},
			hash:true,
		}),

		// 生成css文件
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: true
		}),

		new CleanWebpackPlugin(['dist']),	// 清除生成的文件

		// 模块热替换
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	]
}