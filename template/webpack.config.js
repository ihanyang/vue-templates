var path = require("path")
var vue = require("vue-loader")
var webpack = require("webpack")
var postcss = require("postcss-loader")
var autoprefixer = require("autoprefixer")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	entry: "./src/app.js",
	output: {
		path: "D:/wamp/www/wanba/openplatform/assets/",
		filename: "app.js",
		publicPath: "/assets/"
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: "vue"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel"
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css!postcss")
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: "url-loader?limit=8192"
			}
		]
	},
	babel: {
		presets: ["es2015", "stage-3"],
		plugins: ["transform-runtime"]
	},
	postcss: [
		autoprefixer({
			browsers: "IE 10"
		})
	],
	plugins: [
		new ExtractTextPlugin("[contenthash].css")
	],
	externals: {
		Vue: "Vue"
	},
	devtool: "source-map"
}
