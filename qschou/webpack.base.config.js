var webpack = require('webpack');
var path = require('path');
var fs = require("fs") ;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

var postcssConfigPath = path.resolve(__dirname, '../postcss.config.js');

var postcssLoader = {
	loader: 'postcss-loader',
	options: {
		config: {
			path: postcssConfigPath
		}
	}
};

module.exports = function(paramObj) {

	var commonDir = path.resolve(__dirname);
	var htmlTitle = paramObj.htmlTitle;
	var htmlFileURL = paramObj.htmlFileURL;
	var appDir = paramObj.appDir;
	var uglify = paramObj.uglify;
	var cssDir = paramObj.appDir.replace(/^js/, 'css');
	var imgDir = paramObj.appDir.replace(/^js/, 'img');
	var mockDir = paramObj.appDir.replace(/^js/, 'mock');
	var hash = paramObj.hash;

	var htmlTpl = paramObj.htmlTpl || 'baseTpl.html';
	var baseTplUrl = path.join(commonDir, htmlTpl);

	var hashFileName = hash ? '[name]_' + hash : '[name]_[hash:8]';



	var staticFileDir = path.resolve(commonDir, '../../static');



	var obj = {};

	obj.entry = ["./index"];


	obj.output = {
		filename: hashFileName + '.min.js',
		path: path.join(staticFileDir, appDir),
		publicPath: 'https://static2.qschou.com/' + path.join(appDir, '/')
	};

	obj.resolve = {
		extensions: ['.js', '.json', '.vue','less']
	};

	obj.module = {
		rules: [{
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					postcssLoader,
					'less-loader'
				]
			})
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					postcssLoader
				]
			})
		}, {
			test: /\.(png|jpe?g|gif|svg)$/,
			use: [{
				loader: 'url-loader',
				query: {
					limit: 5000,
					name: path.join(path.relative(appDir, imgDir), hashFileName + '.[ext]')
				}
			}]
		}, {
			test: /\.mock$/,
			use: [{
				loader: 'file-loader',
				query: {
					name: path.join(path.relative(appDir, mockDir), hashFileName + '.[ext]')
				}
			}]
		}, {
			test: /\.(js|es|es6)$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['es2015', {
							modules: false,
							loose: true
						}]
					],
					cacheDirectory: true
				}
			}],
			exclude: /node_modules/
		}, {
			test: /\.vue$/,
			use: [{
				loader: 'vue-loader'
			}]
		}]
	};

	var pluginsArr = [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin([appDir, cssDir, mockDir,imgDir], {
			root: staticFileDir,
			verbose: true
		}),

		new HtmlWebpackPlugin({
			title: htmlTitle,
			filename: path.join(staticFileDir, htmlFileURL),
			template: baseTplUrl
		}),

		new ExtractTextPlugin({
			filename: path.join(path.relative(appDir, cssDir), hashFileName + '.min.css')
		}),

	
	];
	

	
	if(fs.existsSync('./assets')){
		pluginsArr.push(new CopyWebpackPlugin([{
			from: './assets',
			to: path.join(path.relative(appDir, imgDir),'assets'),
			ignore: ['.*']
		}]))
	}

	obj.plugins = pluginsArr;

	if (uglify) {
		pluginsArr.push(new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: false,
				drop_debugger: true
			}
		}));

		pluginsArr.push(new OptimizeCSSPlugin({
			cssProcessorOptions: {
				// 避免 cssnano 重新计算 z-index
				safe: true
			}
		}));
	}

	return obj;
};