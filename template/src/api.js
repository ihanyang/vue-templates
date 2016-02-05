import promise from "es6-promise"
import "whatwg-fetch"

export default {
	async getUser() {
		var response = await fetch("", {
			credentials: "include"
		}).catch((error) => {
			console.log(error)
		})
		
		return await response.json().catch((error) => {
			console.log(error)
		})
	}
}