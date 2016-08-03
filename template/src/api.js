import promise from "es6-promise"
import "whatwg-fetch"

export let getBanner = async (params) => {
	let response = await fetch("/depression-api/testingCarouselPictures/pro/list.json", {
		method: "POST",
		//mode: "cors",
		credentials: "include",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: params
	}).catch((error) => {
		console.error(error)
	})

	return await response.json().catch((error) => {
		console.error(error)
	})
}