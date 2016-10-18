import Home from "../views/home.vue"

import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const mode = "history"
const routes = [
	{
		path: "/",
		component: Home
	},
	{
		path: "*",
		redirect: "/"
	}
]

export default new VueRouter({
	mode,
	routes,
	scrollBehavior(to, from, savedPosition) {
		// if (savedPosition) {
		// 	return savedPosition
		// }

		return {
			y: 0
		}
	}
})
