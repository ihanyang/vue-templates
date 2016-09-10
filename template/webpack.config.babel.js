import path from "path"
import precss from "precss"
import webpack from "webpack"
import autoprefixer from "autoprefixer"
import ExtractTextPlugin from "extract-text-webpack-plugin"

let plugins = [new ExtractTextPlugin("mobile.css")]
let productionPlugins = [
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
	new webpack.optimize.OccurrenceOrderPlugin()
]

if (process.env.NODE_ENV === "production") {
	plugins = plugins.concat(productionPlugins)
}

export default {
	entry: {
		app: "./src/app.js",
		vendor: ["vue", "vue-router"]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		publicPath: "/dist/"
	},
	module: {
		noParse: [/vue-router/],
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
				test: /\.(png|jpg|gif|ttf|svg|ico)$/,
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
		root: path.resolve(__dirname, "node_modules"),
		alias: {
			"vue-router": "vue-router/dist/vue-router.min.js"
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
				target: "http://192.168.0.247:8080",
				secure: false
			}
		}
	},
	devtool: "source-map"
}
