<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		created() {
			const deviceWidth = Math.min(640, window.innerWidth)

			document.documentElement.style.fontSize = `${deviceWidth / 7.5}px`
		}
	}
</script>