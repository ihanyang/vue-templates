import path from "path"
import precss from "precss"
import webpack from "webpack"
import autoprefixer from "autoprefixer"
import ExtractTextPlugin from "extract-text-webpack-plugin"

let plugins = [new ExtractTextPlugin("mobile.css")]
let devtool = "eval-source-map"

const productionPlugins = [
	new webpack.DefinePlugin({
		"process.env": {
			NODE_ENV: "production"
		}
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.optimize.CommonsChunkPlugin("commons.js", ["app", "vendors"]),
	new webpack.BannerPlugin(`This file is created by hanyang\nupdated_at: ${(new Date).toGMTString()}`)
]

if (process.env.NODE_ENV === "production") {
	plugins = plugins.concat(productionPlugins)

	devtool = "source-map"
}

export default {
	entry: {
		app: "./src/app.js",
		vendors: ["vue", "vue-router"]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		publicPath: "/dist/"
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: "vue"
			},
			{
				test: /\.js$/,
				//exclude: /node_modules/,
				include: path.resolve(__dirname, "src"),
				loader: "babel?cacheDirectory"
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css!postcss")
			},
			{
				test: /\.(png|jpg|gif|webp|ttf|svg|ico)$/,
				loader: "url-loader",
				query: {
					name: "[hash].[ext]",
					limit: 10000,
				}
			}
		]
	},
	postcss: [
		precss,
		autoprefixer({
			browsers: "> 5%"
		})
	],
	plugins: plugins,
	resolve: {
		alias: {
			vue: "vue/dist/vue.js"
		},
		extensions: ["", ".js", ".vue", "css"]
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		proxy: {
			"/depression-api/*": {
				target: "http://192.168.0.27:8080",
				secure: false
			}
		}
	},
	devtool: devtool
}
