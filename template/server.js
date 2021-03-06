const http = require("http")
const path = require("path")
const querystring = require("querystring")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(express.static(__dirname))

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./index.html"))
})

app.post("/depression-api/*", (req, res) => {
	const postData = querystring.stringify(req.body)
	const proxyRequest = http.request({
		host: process.argv[2] || "api.120xinmao.com",
		port: process.argv[3] || 80,
		path: req.path,
		method: req.method,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": Buffer.byteLength(postData)
		}
	}, (proxyResponse) => {
		res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

		proxyResponse.pipe(res)
	})

	proxyRequest.write(postData)
	proxyRequest.end()
})

app.listen(process.env.PORT || 8080)