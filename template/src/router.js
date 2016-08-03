import Home from "./views/home.vue"

import VueRouter from "vue-router"

Vue.use(VueRouter)

var router = new VueRouter({
	history: true
})

router.map({
	"/": {
		component: Home
	}
})

router.redirect({
	"*": "/"
})

export default router