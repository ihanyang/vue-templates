import Vue from "Vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

var router = new VueRouter({
	history: true
})

router.map({
	"*": {
		component: require("./components/404.vue")
	}
})

export default router