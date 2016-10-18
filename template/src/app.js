import "./css/normalize.css"
import "./css/common.css"

import Vue from "vue"
import router from "./router"
import App from "./app.vue"

const app = new Vue({
	router,
	... App
}).$mount("#app")